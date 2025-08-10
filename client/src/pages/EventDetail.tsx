import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getEventBySlug } from '../data/events';
import FloatingParticles from '../components/FloatingParticles';

export default function EventDetail() {
  const { slug } = useParams()
  const event = getEventBySlug(slug || '')

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-700">Event not found. <Link to="/events" className="text-blue-700">Back to Events</Link></p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      {/* Enhanced hero section */}
      <motion.section 
        className="relative min-h-[35vh] bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 overflow-hidden py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-hero-gradient opacity-40" />
        <div className="absolute top-5 left-5 w-20 h-20 bg-white/10 rounded-full animate-blob" />
        <div className="absolute bottom-5 right-5 w-16 h-16 bg-white/10 rounded-full animate-blob" style={{ animationDelay: '2s' }} />
        <motion.div 
          className="relative z-10 h-full flex items-center justify-center px-6 py-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link 
            to="/events" 
            className="group flex items-center text-white/90 hover:text-white font-medium transition-all duration-300 text-lg"
          >
            <motion.svg 
              className="w-6 h-6 mr-3 group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ scale: 1.1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
            Back to Events
          </Link>
        </motion.div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-start"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Enhanced image section */}
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
              <motion.img
                src={event.cover}
                alt={event.title}
                className="rounded-2xl w-full h-[500px] object-cover shadow-lg"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-6 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Enhanced content section */}
          <motion.div 
            className="space-y-8"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ lineHeight: '1.5', wordBreak: 'break-word', hyphens: 'auto' }}
              >
                {event.title}
              </motion.h1>
              
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full mb-6"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              <motion.p 
                className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {event.description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Event Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                  {event.overview}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced gallery section */}
        <motion.div 
          className="mt-20"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            Event Gallery
          </motion.h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.gallery.map((g, idx) => (
              <motion.div
                key={idx}
                className="group relative overflow-hidden rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: 2 + idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ scale: 1.05, rotateY: 5, y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <motion.img 
                  src={g} 
                  alt={`${event.title} ${idx+1}`} 
                  className="w-full h-48 object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div 
                  className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <p className="font-medium text-sm">Image {idx + 1}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}


