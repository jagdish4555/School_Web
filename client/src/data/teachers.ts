// Builds teacher data from files in client/Teachers_data
// Expected pairs: Name_Surname.jpeg and Name_Surname.txt

export type Teacher = {
  slug: string
  name: string
  photoUrl: string
  description: string
}

function toName(slug: string): string {
  return slug.replace(/_/g, ' ')
}

const imageModules = import.meta.glob('../../Teachers_data/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  as: 'url',
}) as Record<string, string>

const textModules = import.meta.glob('../../Teachers_data/*.txt', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

function baseName(path: string): string {
  const file = path.split('/').pop() || path
  return file.replace(/\.(png|jpg|jpeg|webp|gif|txt)$/i, '')
}

const bySlug: Record<string, Partial<Teacher>> = {}

for (const [path, url] of Object.entries(imageModules)) {
  const slug = baseName(path)
  bySlug[slug] = { ...(bySlug[slug] || {}), slug, name: toName(slug), photoUrl: url }
}

for (const [path, raw] of Object.entries(textModules)) {
  const slug = baseName(path)
  bySlug[slug] = { ...(bySlug[slug] || {}), slug, name: toName(slug), description: String(raw).trim() }
}

export const TEACHERS: Teacher[] = Object.values(bySlug)
  .filter((t): t is Teacher => Boolean(t.slug && t.name && t.photoUrl))
  .sort((a, b) => a.name.localeCompare(b.name))

export function getTeacherBySlug(slug: string): Teacher | undefined {
  return TEACHERS.find((t) => t.slug.toLowerCase() === slug.toLowerCase())
}


