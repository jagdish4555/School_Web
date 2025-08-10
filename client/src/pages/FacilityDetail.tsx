import { useParams, Link } from 'react-router-dom'
import { getFacilityBySlug } from '../data/facilities'

export default function FacilityDetail() {
  const { slug } = useParams()
  const facility = getFacilityBySlug(slug || '')

  if (!facility) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-700">Facility not found. <Link to="/" className="text-blue-700">Go home</Link></p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/" className="text-sm text-blue-700 hover:underline">← Back to Home</Link>
      <div className="mt-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-3 flex items-center justify-center">
          <img src={facility.cover} alt={facility.title} className="rounded-lg max-h-[460px] w-full object-cover" />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{facility.title}</h1>
          <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{facility.summary}</p>
          {facility.sections && facility.sections.map((s, i) => (
            <div key={i} className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{s.heading}</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-line">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Gallery</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {facility.gallery.map((g, idx) => (
            <img key={idx} src={g} alt={`${facility.title} ${idx+1}`} className="w-full h-40 object-cover rounded-lg shadow" />
          ))}
        </div>
      </div>
    </div>
  )
}


