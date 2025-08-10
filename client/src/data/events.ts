export type EventDetail = {
  slug: string
  title: string
  cover: string
  description: string
  overview: string
  gallery: string[]
}

function toSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

const coverModules = import.meta.glob('../../School_Events/**/1.{jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const galleryModules = import.meta.glob('../../School_Events/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const descriptionModules = import.meta.glob('../../School_Events/**/Description.txt', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

const overviewModules = {
  ...(import.meta.glob('../../School_Events/**/Overview.txt', { eager: true, as: 'raw' }) as Record<string, string>),
  ...(import.meta.glob('../../School_Events/**/overview.txt', { eager: true, as: 'raw' }) as Record<string, string>),
}

function folderNameFromPath(p: string): string {
  const parts = p.split('/')
  const idx = parts.findIndex((x) => x === 'School_Events')
  return parts[idx + 1] || ''
}

const map: Record<string, Partial<EventDetail>> = {}

for (const [p, url] of Object.entries(coverModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  map[slug] = { ...(map[slug] || {}), slug, title: folder, cover: url }
}

for (const [p, raw] of Object.entries(descriptionModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const description = String(raw).trim()
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, description }
}

for (const [p, raw] of Object.entries(overviewModules)) {
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const overview = String(raw).trim()
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, overview }
}

for (const [p, url] of Object.entries(galleryModules)) {
  if (/\/1\.(jpg|jpeg|png|webp)$/i.test(p)) continue
  const folder = folderNameFromPath(p)
  const slug = toSlug(folder)
  const current = map[slug] || { slug, title: folder }
  map[slug] = { ...current, gallery: [ ...(current.gallery as string[] | undefined) || [], url ] }
}

// Finalize with sensible fallbacks
const finalized = Object.values(map).map((e) => {
  const gallerySorted = [...(e.gallery || [])].sort((a, b) => a.localeCompare(b))
  const cover = e.cover || gallerySorted[0] || ''
  const description = (e.description || e.overview || '').trim()
  const overview = (e.overview || e.description || '').trim()
  return {
    slug: e.slug || '',
    title: e.title || '',
    cover,
    description,
    overview,
    gallery: gallerySorted.filter((g) => g !== cover),
  } as EventDetail
})

export const EVENTS: EventDetail[] = finalized
  .filter((e): e is EventDetail => Boolean(e.slug && e.title && e.cover && e.description))
  .sort((a, b) => a.title.localeCompare(b.title))

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS.find((e) => e.slug === slug)
}


