import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teachers from './pages/Teachers';
import TeacherProfile from './pages/TeacherProfile';
import FacilityDetail from './pages/FacilityDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Results from './pages/Results';
import DevelopedBy from './pages/DevelopedBy';
import DeveloperLogin from './pages/DeveloperLogin';
import AdminUpload from './pages/AdminUpload';
// Admin and Results temporarily disabled
import About from './pages/About';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facility/:slug" element={<FacilityDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/:id" element={<TeacherProfile />} />
            <Route path="/results" element={<Results />} />
            <Route path="/developed-by" element={<DevelopedBy />} />
            <Route path="/developer-login" element={<DeveloperLogin />} />
            <Route path="/admin-upload" element={<AdminUpload />} />
            {/* Routes temporarily disabled */}
            <Route path="/about" element={<About />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
