import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TEACHERS } from '../data/teachers';
import FloatingParticles from '../components/FloatingParticles';

export default function Teachers() {
  return (
    <div className="relative">
      <FloatingParticles />
      <section className="relative min-h-[45vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
          <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-blob" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <motion.div 
          className="relative z-10 text-center text-white px-6 py-8"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-relaxed text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ lineHeight: '1.4' }}
          >
            Our Teachers
          </motion.h1>
          <motion.p 
            className="mt-4 opacity-90 text-base md:text-lg lg:text-xl text-center px-4 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Meet our dedicated educators shaping future leaders
          </motion.p>
          <motion.div 
            className="mt-8 w-24 h-1 bg-white/60 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          />
        </motion.div>
      </section>
      <section className="relative py-20 bg-gradient-to-b from-gray-50/50 via-blue-50/30 to-purple-50/20 dark:from-gray-900/50 dark:via-blue-950/20 dark:to-purple-950/10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{ animationDelay: '2s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {TEACHERS.map((t, idx) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 40, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.7, 
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8, rotateY: 5, scale: 1.02 }}
                className="group"
              >
                <Link to={`/teachers/${encodeURIComponent(t.slug)}`}>
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
                    <div className="relative overflow-hidden">
                      <motion.img 
                        src={t.photoUrl} 
                        className="h-64 w-full object-cover transition-transform duration-500" 
                        alt={t.name}
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.div 
                        className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ y: 20 }}
                        whileHover={{ y: 0 }}
                      >
                        <p className="text-sm font-medium">Click to learn more →</p>
                      </motion.div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 mb-2">
                        {t.name}
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


