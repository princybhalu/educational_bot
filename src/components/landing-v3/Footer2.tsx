'use client';

import { motion } from 'framer-motion';
import { Twitter, Github, Linkedin, Lock, Smartphone, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const legalLinks = [
    { name: 'Terms of Service', to: '#' },
    { name: 'Privacy Policy', to: '#' },
    { name: 'Cookie Policy', to: '#' },
    { name: 'Data Security', to: '#' },
    { name: 'Contact', to: 'mailto:info@vidhyarhiai.com' },
  ];

  const features = [
    {
      icon: <Lock className="h-5 w-5" />,
      text: "We respect your privacy. Your information is safe with us.",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "All images and videos are optimized for quick loading.",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      text: "Access Vidhyarhi AI on any device, anytime.",
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 className="text-[20vw] font-bold tracking-tighter bg-gradient-to-br from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
            Vidhya
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand and Features Section */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold mb-6"
            >
              Vidhyarthi AI
            </Link>
            <p className="text-gray-400 mb-8">
              Education Evolved. Coming Soon.
            </p>
            
            <div className="space-y-6">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-400">
                    {feature.icon}
                    <span className="text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <p className="text-gray-400 text-sm mb-4">
                  Unlock exclusive features designed just for you. Stay tuned!
                </p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Get Notified
                  </button>
                  <button className="px-4 py-2 border border-gray-600 text-white rounded-md hover:bg-gray-800 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Legal and Newsletter Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Subscribe now and get early bird access along with special benefits!
              </h3>
              <form className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line with animation */}
      <motion.div
        className="border-t border-gray-800"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Vidhyarhi AI. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              to="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Discord
            </Link>
            <Link
              to="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Twitter
            </Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}