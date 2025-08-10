// Builds teacher data from files in client/Teachers_data
// Expected pairs: Name_Surname.jpeg and Name_Surname.txt
// NEW: Supports ordering with Name_Surname_1.jpeg (number at end controls order)

export type Teacher = {
  slug: string
  name: string
  photoUrl: string
  description: string
  orderNumber?: number | null // Added for ordering
}

function toName(slug: string): string {
  return slug.replace(/_/g, ' ')
}

// Extract order number from filename if present
function extractOrderAndSlug(filename: string): { slug: string, orderNumber: number | null } {
  // Remove file extension first
  const baseName = filename.replace(/\.(png|jpg|jpeg|webp|gif|txt)$/i, '')
  
  // Check for order number pattern: Name_Surname_1 -> { slug: "Name_Surname", orderNumber: 1 }
  const orderMatch = baseName.match(/^(.+?)_(\d+)$/)
  
  if (orderMatch) {
    return {
      slug: orderMatch[1], // "Name_Surname"
      orderNumber: parseInt(orderMatch[2], 10) // 1, 2, 3, etc.
    }
  } else {
    return {
      slug: baseName, // "Name_Surname" 
      orderNumber: null // No ordering number
    }
  }
}

const imageModules = import.meta.glob('../../Teachers_data/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const textModules = import.meta.glob('../../Teachers_data/*.txt', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

const bySlug: Record<string, Partial<Teacher>> = {}

// Process image files with order extraction
for (const [path, url] of Object.entries(imageModules)) {
  const filename = path.split('/').pop() || ''
  const { slug, orderNumber } = extractOrderAndSlug(filename)
  
  bySlug[slug] = { 
    ...(bySlug[slug] || {}), 
    slug, 
    name: toName(slug), 
    photoUrl: url,
    orderNumber 
  }
}

// Process text files (these don't have order numbers, just match by slug)
for (const [path, raw] of Object.entries(textModules)) {
  const filename = path.split('/').pop() || ''
  const { slug } = extractOrderAndSlug(filename) // Only need slug from text files
  
  bySlug[slug] = { 
    ...(bySlug[slug] || {}), 
    slug, 
    name: toName(slug), 
    description: String(raw).trim() 
  }
}

// Create final teachers array with custom sorting
export const TEACHERS: Teacher[] = Object.values(bySlug)
  .filter((t): t is Teacher => Boolean(t.slug && t.name && t.photoUrl))
  .sort((a, b) => {
    // Both have order numbers - sort by order number
    if (a.orderNumber !== null && a.orderNumber !== undefined && 
        b.orderNumber !== null && b.orderNumber !== undefined) {
      return a.orderNumber - b.orderNumber
    }
    
    // Teachers with order numbers come first
    if ((a.orderNumber !== null && a.orderNumber !== undefined) && 
        (b.orderNumber === null || b.orderNumber === undefined)) {
      return -1
    }
    
    if ((a.orderNumber === null || a.orderNumber === undefined) && 
        (b.orderNumber !== null && b.orderNumber !== undefined)) {
      return 1
    }
    
    // Both have no order numbers - sort alphabetically by name
    return a.name.localeCompare(b.name)
  })

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return TEACHERS.find((t) => t.slug.toLowerCase() === slug.toLowerCase())
}

// Debug function to see the ordering
export function debugTeachersOrder(): void {
  console.table(TEACHERS.map((t, idx) => ({
    position: idx + 1,
    name: t.name,
    slug: t.slug,
    orderNumber: t.orderNumber,
    hasCustomOrder: t.orderNumber !== null && t.orderNumber !== undefined
  })))
}