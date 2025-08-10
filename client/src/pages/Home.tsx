import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FACILITIES } from '../data/facilities';
import { EVENTS } from '../data/events';
import FloatingParticles from '../components/FloatingParticles';
import schoolMain from '../../Other_Data/School_Main.jpeg'

const events = EVENTS.map(e => ({ title: e.title, desc: e.description, img: e.cover, slug: e.slug }));

const features = FACILITIES.map(f => ({ title: f.title, img: f.cover, desc: f.description ?? f.summary, slug: f.slug }));

export default function Home() {
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % events.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <FloatingParticles />
      {/* Hero with parallax */}
      <motion.section 
        className="relative h-[70vh] bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: `url(${schoolMain})`, y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full animate-blob" />
          <div className="absolute top-20 right-20 w-24 h-24 bg-purple-400/20 rounded-full animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-pink-400/20 rounded-full animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 h-full flex items-center justify-center text-center text-white px-4"
        >
          <div>
            <motion.h1 className="text-4xl md:text-6xl font-extrabold mb-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              Welcome to SHETH D.H. HIGH SCHOOL, JAGUDAN
            </motion.h1>
            <motion.p className="max-w-2xl mx-auto mb-6 text-lg opacity-90" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }}>
              Empowering young minds through quality education, sports, and values.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex gap-3 justify-center">
              <Link to="/teachers" className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="relative z-10">Meet Our Teachers</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg animate-shimmer transform -skew-x-12 -translate-x-full" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Event highlight with enhanced design */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-5" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Events
          </motion.h2>
          <Link to="/events" className="block group">
            <motion.div 
              className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:scale-[1.02]"
              whileHover={{ rotateY: 2, rotateX: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={events[index].img}
                  src={events[index].img}
                  alt={events[index].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1, rotateZ: 1 }}
                  animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotateZ: -1 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
              <div className="relative z-10 h-full flex items-end">
                <motion.div 
                  className="p-8 md:p-10 text-white max-w-4xl"
                  key={index}
                  initial={{ opacity: 0, y: 30, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{events[index].title}</h3>
                  <p className="mt-2 text-white/90 whitespace-pre-line text-lg leading-relaxed">{events[index].desc}</p>
                </motion.div>
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full" 
                key={`progress-${index}`}
                initial={{ width: '0%' }} 
                animate={{ width: '100%' }} 
                transition={{ duration: 4, ease: 'linear' }} 
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                {index + 1} / {events.length}
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Student Section - New Addition */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-950 dark:via-green-950/20 dark:to-teal-950/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-5" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-400/20 rounded-full animate-blob" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-400/20 rounded-full animate-blob" style={{ animationDelay: '3s' }} />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group"
          >
            <a
              href="https://worldedusafari.blogspot.com/2023/10/shiksha-app.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div 
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 p-8 md:p-12 border border-white/20 group-hover:border-emerald-200/50"
                whileHover={{ scale: 1.03, rotateY: 2, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 group-hover:from-emerald-700 group-hover:to-teal-700 transition-all duration-300">
                    Student Section
                  </h3>
                  
                  <motion.div 
                    className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                  શૈક્ષણિક મટીરીયલ, જુના પ્રશ્નપત્રો, ટેસ્ટ- ક્વિઝ આપવા માટે, તથા લેક્ચરના વિડીયો વગેરે જોવા માટે અહીં ક્લિક કરો.
                  </p>
                  
                  <motion.div 
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-lg group-hover:translate-x-2 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span>Click Here</span>
                    <motion.svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
                
                {/* Animated background elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Facilities with enhanced animations */}
      <section className="py-20 bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900/90 dark:to-blue-950/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Campus Facilities
          </motion.h2>
          <div className="space-y-16">
            {features.map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 60, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className="group"
              >
                <Link to={`/facility/${f.slug}`}>
                  <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-500 overflow-hidden md:flex border border-white/20">
                    <motion.div 
                      className={`md:w-1/2 relative overflow-hidden ${idx % 2 === 0 ? '' : 'md:order-2'}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <motion.img 
                        src={f.img} 
                        alt={f.title} 
                        className="h-72 md:h-full w-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </motion.div>
                    <div className={`md:w-1/2 p-8 md:p-12 flex items-center ${idx % 2 === 0 ? '' : 'md:order-1'}`}>
                      <motion.div 
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                          {f.title}
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-lg">
                          {f.desc}
                        </p>
                        <div className="pt-4">
                          <span className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                            Explore More →
                          </span>
                        </div>
                      </motion.div>
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