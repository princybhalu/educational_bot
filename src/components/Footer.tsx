// 'use client';

// import { motion } from 'framer-motion';
// import { Triangle } from 'lucide-react';

// export default function Component() {
//   return (
//     <div className="relative min-h-[50vh] bg-black text-white overflow-hidden">
//       {/* Background Brand Text */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 0.1, scale: 1 }}
//         transition={{ duration: 1, ease: 'easeOut' }}
//         className="absolute inset-0 flex items-center justify-center pointer-events-none"
//       >
//         <h1 className="text-[20vw] font-bold tracking-tighter bg-gradient-to-br from-neutral-600 to-neutral-900 bg-clip-text text-transparent">
//           CREEM
//         </h1>
//       </motion.div>

//       {/* Header Content */}
//       <div className="relative z-10 container mx-auto px-4">
//         <nav className="py-6 flex flex-col gap-8">
//           {/* Top Bar */}
//           <div className="flex items-center justify-between">
//             <Link
//               to="#"
//               className="flex items-center gap-2 text-sm hover:text-neutral-400 transition-colors"
//             >
//               <Triangle className="h-4 w-4" />
//               Creem
//             </Link>
//             <div className="flex items-center gap-6 text-sm">
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Pricing
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Privacy Policy
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Twitter
//               </Link>
//             </div>
//           </div>

//           {/* Bottom Bar */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div className="text-sm text-neutral-400">
//               <p>Copyright © 2024 Armitage Labs OÜ</p>
//               <p>All rights reserved</p>
//             </div>
//             <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Contact
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Discord
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 Blog
//               </Link>
//               <Link
//                 to="#"
//                 className="hover:text-neutral-400 transition-colors"
//               >
//                 About Us
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import { Triangle, Twitter, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', to: '#' },
        { name: 'Pricing', to: '#' },
        { name: 'Tutorial', to: '#' },
        { name: 'Changelog', to: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', to: '#' },
        { name: 'Careers', to: '#' },
        { name: 'Blog', to: '#' },
        { name: 'Contact', to: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', to: '#' },
        { name: 'Privacy Policy', to: '#' },
        { name: 'Cookie Policy', to: '#' },
      ],
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
            CREEM
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold mb-4"
            >
              <Triangle className="h-6 w-6" />
              Creem
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering creators with cutting-edge tools and a vibrant
              community.
            </p>
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

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
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
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">
            Subscribe to our newsletter
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
            © {new Date().getFullYear()} Armitage Labs OÜ. All rights reserved.
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
