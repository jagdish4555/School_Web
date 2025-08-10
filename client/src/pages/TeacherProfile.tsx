import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getTeacherBySlug } from '../data/teachers';
import FloatingParticles from '../components/FloatingParticles';

export default function TeacherProfile() {
  const { id } = useParams();
  const teacher = getTeacherBySlug(id || '');
  if (!teacher) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-700">Teacher not found. <Link to="/teachers" className="text-blue-700">Back</Link></p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <FloatingParticles />
      {/* Enhanced hero section */}
      <motion.section 
        className="relative min-h-[35vh] bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="absolute top-5 left-5 w-20 h-20 bg-white/10 rounded-full animate-blob" />
        <div className="absolute bottom-5 right-5 w-16 h-16 bg-white/10 rounded-full animate-blob" style={{ animationDelay: '2s' }} />
        <motion.div 
          className="relative z-10 h-full flex items-center justify-center px-6 py-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link 
            to="/teachers" 
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
            Back to Teachers
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6">
              <motion.img
                src={teacher.photoUrl}
                alt={teacher.name}
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ lineHeight: '1.5', wordBreak: 'break-word', hyphens: 'auto' }}
              >
                {teacher.name}
              </motion.h1>
              
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 1, duration: 0.8 }}
              />

              <motion.p 
                className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {teacher.description}
              </motion.p>

              <motion.div 
                className="mt-8 flex flex-wrap gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                {[
                  { label: 'Experienced', color: 'from-blue-500 to-blue-600' },
                  { label: 'Student Mentor', color: 'from-emerald-500 to-emerald-600' },
                  { label: 'Certified Educator', color: 'from-purple-500 to-purple-600' }
                ].map((badge, idx) => (
                  <motion.span
                    key={badge.label}
                    className={`px-4 py-2 text-sm font-semibold rounded-full bg-gradient-to-r ${badge.color} text-white shadow-lg`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.6 + idx * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    {badge.label}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


