export type EventDetail = {
  slug: string
  title: string
  cover: string
  description: string
  overview: string
  gallery: string[]
  orderNumber?: number | null // Added for ordering
}

function toSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

// Extract order number and clean folder name for events
function extractEventOrderAndTitle(folderName: string): { title: string, orderNumber: number | null } {
  // Check for order number pattern: "જન્મ દિવસની અનોખી રીતે ઊજવણી__1" -> { title: "જન્મ દિવસની અનોખી રીતે ઊજવણી", orderNumber: 1 }
  const orderMatch = folderName.match(/^(.+?)__(\d+)$/)
  
  if (orderMatch) {
    return {
      title: orderMatch[1].trim(), // "જન્મ દિવસની અનોખી રીતે ઊજવણી"
      orderNumber: parseInt(orderMatch[2], 10) // 1, 2, 3, etc.
    }
  } else {
    return {
      title: folderName.trim(), // Original folder name
      orderNumber: null // No ordering number
    }
  }
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

// Process cover images with order extraction
for (const [p, url] of Object.entries(coverModules)) {
  const rawFolderName = folderNameFromPath(p)
  const { title, orderNumber } = extractEventOrderAndTitle(rawFolderName)
  const slug = toSlug(title) // Use cleaned title for slug
  
  map[slug] = { 
    ...(map[slug] || {}), 
    slug, 
    title, // Use cleaned title (without *_1 suffix)
    cover: url,
    orderNumber
  }
}

// Process descriptions
for (const [p, raw] of Object.entries(descriptionModules)) {
  const rawFolderName = folderNameFromPath(p)
  const { title } = extractEventOrderAndTitle(rawFolderName)
  const slug = toSlug(title)
  const description = String(raw).trim()
  const current = map[slug] || { slug, title }
  map[slug] = { ...current, description }
}

// Process overviews
for (const [p, raw] of Object.entries(overviewModules)) {
  const rawFolderName = folderNameFromPath(p)
  const { title } = extractEventOrderAndTitle(rawFolderName)
  const slug = toSlug(title)
  const overview = String(raw).trim()
  const current = map[slug] || { slug, title }
  map[slug] = { ...current, overview }
}

// Process gallery images
for (const [p, url] of Object.entries(galleryModules)) {
  if (/\/1\.(jpg|jpeg|png|webp)$/i.test(p)) continue
  const rawFolderName = folderNameFromPath(p)
  const { title } = extractEventOrderAndTitle(rawFolderName)
  const slug = toSlug(title)
  const current = map[slug] || { slug, title }
  map[slug] = { 
    ...current, 
    gallery: [
      ...(current.gallery as string[] | undefined) || [], 
      url
    ] 
  }
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
    orderNumber: e.orderNumber, // Include order number
  } as EventDetail
})

// Sort with custom ordering: numbered events first, then alphabetical
export const EVENTS: EventDetail[] = finalized
  .filter((e): e is EventDetail => Boolean(e.slug && e.title && e.cover && e.description))
  .sort((a, b) => {
    // Both have order numbers - sort by order number
    if (a.orderNumber !== null && a.orderNumber !== undefined && 
        b.orderNumber !== null && b.orderNumber !== undefined) {
      return a.orderNumber - b.orderNumber
    }
    
    // Events with order numbers come first
    if ((a.orderNumber !== null && a.orderNumber !== undefined) && 
        (b.orderNumber === null || b.orderNumber === undefined)) {
      return -1
    }
    
    if ((a.orderNumber === null || a.orderNumber === undefined) && 
        (b.orderNumber !== null && b.orderNumber !== undefined)) {
      return 1
    }
    
    // Both have no order numbers - sort alphabetically by title
    return a.title.localeCompare(b.title)
  })

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

// Debug function to see the event ordering
export function debugEventsOrder(): void {
  console.table(EVENTS.map((e, idx) => ({
    position: idx + 1,
    title: e.title,
    slug: e.slug,
    orderNumber: e.orderNumber,
    hasCustomOrder: e.orderNumber !== null && e.orderNumber !== undefined
  })))
}