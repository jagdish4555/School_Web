export type FacilityDetail = {
  slug: string
  title: string
  cover: string
  summary: string
  gallery: string[]
  sections: { heading: string; content: string }[]
  description?: string
}

function toSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

const coverModules = import.meta.glob('../../Campus_facilities/**/1.{jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const galleryModules = import.meta.glob('../../Campus_facilities/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const descModules = import.meta.glob('../../Campus_facilities/**/Description.txt', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

// New: explicit Overview and Highlights files (support both capitalized and lowercase)
const overviewModules = {
  ...(import.meta.glob('../../Campus_facilities/**/Overview.txt', { eager: true, as: 'raw' }) as Record<string, string>),
  ...(import.meta.glob('../../Campus_facilities/**/overview.txt', { eager: true, as: 'raw' }) as Record<string, string>),
}
const highlightsModules = {
  ...(import.meta.glob('../../Campus_facilities/**/Highlights.txt', { eager: true, as: 'raw' }) as Record<string, string>),
  ...(import.meta.glob('../../Campus_facilities/**/highlights.txt', { eager: true, as: 'raw' }) as Record<string, string>),
}

function folderNameFromPath(p: string): string {
  const parts = p.split('/')
  // .../Campus_facilities/<Folder>/1.jpg -> take the folder
  const idx = parts.findIndex((x) => x === 'Campus_facilities')
  return parts[idx + 1] || ''
}

const map: Record<string, Partial<FacilityDetail>> = {}

for (const [p, url] of Object.entries(coverModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  map[slug] = { ...(map[slug] || {}), slug, title: folder, cover: url }
}

// Prefer explicit Overview/Highlights when available; otherwise fall back to Description.txt splitting
for (const [p, raw] of Object.entries(overviewModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const overview = String(raw).trim()
  const summary = (overview.split(/\n\s*\n/)[0] || overview).trim()
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, slug, title: folder, summary, sections: [{ heading: 'Overview', content: overview }] }
}
for (const [p, raw] of Object.entries(highlightsModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const highlights = String(raw).trim()
  const current = map[slug] || { slug, title: folder }
  const existingSections = (current.sections as { heading: string; content: string }[] | undefined) || []
  const mergedSections = existingSections.length
    ? [...existingSections, { heading: 'Facilities & Highlights', content: highlights }]
    : [
        { heading: 'Overview', content: highlights },
        { heading: 'Facilities & Highlights', content: highlights },
      ]
  map[slug] = { ...current, slug, title: folder, sections: mergedSections }
}
// Fallback: if no explicit overview/highlights, use Description.txt
for (const [p, raw] of Object.entries(descModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const text = String(raw).trim()
  // Always store description for use on Home page
  const currentBase = map[slug] || { slug, title: folder }
  map[slug] = { ...currentBase, description: text }

  if ((map[slug] as any)?.sections && (map[slug] as any).sections.length) {
    // If sections already exist from overview/highlights, ensure summary exists (fallback to first paragraph of description)
    if (!(map[slug] as any).summary) {
      (map[slug] as any).summary = (text.split(/\n\s*\n/)[0] || text).trim()
    }
    continue
  }
  const paragraphs = text.split(/\n\s*\n/)
  const summary = paragraphs[0] || text
  const mid = Math.max(1, Math.ceil(paragraphs.length / 2))
  const section1 = paragraphs.slice(0, mid).join('\n\n')
  const section2 = paragraphs.slice(mid).join('\n\n')
  const sections = [
    { heading: 'Overview', content: section1 },
    { heading: 'Facilities & Highlights', content: section2 || section1 },
  ]
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, slug, title: folder, summary, sections }
}

for (const [p, url] of Object.entries(galleryModules)) {
  // Skip the cover images (1.*)
  if (/\/1\.(jpg|jpeg|png|webp)$/i.test(p)) continue
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, gallery: [ ...(current.gallery as string[] | undefined) || [], url ] }
}

export const FACILITIES: FacilityDetail[] = Object.values(map)
  .filter((f): f is FacilityDetail => Boolean(f.slug && f.title && f.cover && f.summary))
  .sort((a, b) => a.title.localeCompare(b.title))

export function getFacilityBySlug(slug: string): FacilityDetail | undefined {
  return FACILITIES.find((f) => f.slug === slug)
}


