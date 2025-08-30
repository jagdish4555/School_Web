import { Link } from 'react-router-dom';

export default function DevelopedBy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900 dark:to-pink-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Developed By
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional Web Development Services
          </p>
        </div>

        {/* Developer Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">KD</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Karan Developer
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              Full Stack Web Developer
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>📍 Gujarat, India</span>
              <span>💻 React • Node.js • MongoDB</span>
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Modern UI/UX Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Beautiful, responsive designs that work on all devices
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized performance with modern technologies
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure & Scalable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with security best practices and scalability in mind
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Get Your Own Website Like This!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Contact Information:</h4>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>📧 Email: karan.developer@example.com</p>
                  <p>📱 WhatsApp: +91 98765 43210</p>
                  <p>📞 Phone: +91 98765 43210</p>
                  <p>📍 Location: Gujarat, India</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Services Offered:</h4>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• School/College Websites</li>
                  <li>• E-commerce Platforms</li>
                  <li>• Business Websites</li>
                  <li>• Portfolio Websites</li>
                  <li>• Custom Web Applications</li>
                  <li>• Mobile App Development</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link
              to="/developer-login"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <span className="mr-2">🔐</span>
              Developer Login
            </Link>
          </div>
        </div>

        {/* Features Showcase */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            What You Get With Our Development Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Responsive Design</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Works perfectly on desktop, tablet, and mobile devices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Modern Technologies</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Built with React, Node.js, MongoDB, and other cutting-edge tools
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">SEO Optimized</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Search engine friendly to help you rank better online
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Fast Loading</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Optimized for speed to provide the best user experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Easy Management</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Simple admin panel to manage content without technical knowledge
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">24/7 Support</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ongoing support and maintenance after launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
