import React, { useState, useEffect } from 'react';
import { Triangle, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed w-full z-50 px-4">
      <header
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? 'mt-2' : 'mt-0'
        }`}
      >
        <nav
          className={`mx-auto rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
            isScrolled
              ? 'max-w-4xl bg-[#10142E]/80 border-[#4361ee]/20 shadow-lg shadow-[#4361ee]/10'
              : 'max-w-5xl bg-[#10142E]/60 border-transparent'
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                {/* <Triangle className="w-6 h-6 text-[#4cc9f0] rotate-180 transition-transform duration-300 group-hover:scale-110" /> */}
                <span className="text-lg font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
                  Vidhyarthi Ai
                </span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {['Contact', 'Pricing', 'Blog', 'Docs'].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(76,201,240,0.3)] relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#4cc9f0] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href="/login"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white text-sm font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(76,201,240,0.4)] hover:scale-105"
                >
                  Login
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white/70 hover:text-white transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="px-6 py-4 space-y-4 border-t border-[#4361ee]/20">
              {['Contact', 'Pricing', 'Blog', 'Docs'].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block text-white/70 hover:text-white font-medium transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="/login"
                className="block px-6 py-2 rounded-xl bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white font-medium text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(76,201,240,0.4)] hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
