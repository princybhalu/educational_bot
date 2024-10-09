import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mx-auto py-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Explore Section */}
        <div className="ml-4 ">
          <h4 className="text-lg font-semibold mb-4">Explore</h4>
          <ul>
            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
            <li><a href="/features" className="text-gray-300 hover:text-white">Features</a></li>
            <li><a href="/pricing" className="text-gray-300 hover:text-white">Pricing</a></li>
            <li><a href="/blog" className="text-gray-300 hover:text-white">Blog</a></li>
            <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Features Section */}
        <div className="ml-4  ">
          <h4 className="text-lg font-semibold mb-4">Features</h4>
          <ul>
            <li><a href="/personalized-learning" className="text-gray-300 hover:text-white">Personalized Learning Paths</a></li>
            <li><a href="/interactive-tools" className="text-gray-300 hover:text-white">Interactive Learning Tools</a></li>
            <li><a href="/study-planner" className="text-gray-300 hover:text-white">Daily Study Planner</a></li>
            <li><a href="/progress-tracking" className="text-gray-300 hover:text-white">Progress Tracking</a></li>
            <li><a href="/exam-prep" className="text-gray-300 hover:text-white">Exam Preparation Tools</a></li>
            <li><a href="/mental-health" className="text-gray-300 hover:text-white">Mental Health Support</a></li>
            <li><a href="/career-assessment" className="text-gray-300 hover:text-white">Career Assessment</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="ml-4  ">
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul>
            <li><a href="/help" className="text-gray-300 hover:text-white">Help Center</a></li>
            <li><a href="/faq" className="text-gray-300 hover:text-white">FAQs</a></li>
            <li><a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
            <li><a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social and Newsletter */}
        <div className="ml-4  ">
          <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
          <ul className="flex space-x-4 mb-4">
            <li><a href="https://facebook.com" className="text-gray-300 hover:text-white">Facebook</a></li>
            <li><a href="https://twitter.com" className="text-gray-300 hover:text-white">Twitter</a></li>
            <li><a href="https://instagram.com" className="text-gray-300 hover:text-white">Instagram</a></li>
            <li><a href="https://linkedin.com" className="text-gray-300 hover:text-white">LinkedIn</a></li>
          </ul>
          <form className="mx-auto mr-3">
            <label htmlFor="newsletter" className="block text-gray-300 mb-2">Subscribe to our Newsletter</label>
            <div className="flex flex-col md:flex-row">
              <input 
                type="email" 
                id="newsletter" 
                className="px-4 py-2 w-full bg-gray-700 text-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:mr-2" 
                placeholder="Your email" 
              />
              <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 mt-2 md:mt-0">Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
