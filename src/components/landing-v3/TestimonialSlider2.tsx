'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: 'Vidhyarhi AI is a game-changer for personalized learning!',
    author: 'Dr. Ananya Sharma',
    role: 'Education Specialist',
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    quote: "An innovative approach that's set to redefine how students learn.",
    author: 'Michael Lee',
    role: 'High School Teacher',
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    quote: 'A platform that truly understands the needs of modern education.',
    author: 'Sara Kim',
    role: 'Curriculum Developer',
    image: '/placeholder.svg?height=80&width=80',
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="w-full min-h-[500px] bg-[#0a0d1e] p-4 sm:p-8 relative overflow-hidden font-darker-grotesque">
      {/* Glassmorphic background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#4361ee] to-[#4cc9f0] opacity-30 filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tl from-[#4361ee] to-[#4cc9f0] opacity-30 filter blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Orbital animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
        <div className="w-full h-full rounded-full border-2 border-[#4361ee] animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full border-2 border-[#4cc9f0] animate-spin-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full border-2 border-white animate-spin-slow animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#4cc9f0] text-center mb-12 font-darker-grotesque">
          What Educators Are Saying
        </h2>

        <div className="relative bg-[rgba(16,20,46,0.9)] backdrop-filter backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-[rgba(67,97,238,0.2)] transition-all duration-300 hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
          <Quote className="absolute text-white text-opacity-20 top-4 left-4 w-16 h-16" />
          <Quote className="absolute text-white text-opacity-20 bottom-4 right-4 w-16 h-16 transform rotate-180" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-white text-xl sm:text-2xl mb-6 italic">
                {testimonials[current].quote}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].author}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {testimonials[current].author}
                  </h3>
                  <p className="text-blue-200">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[rgba(16,20,46,0.9)] text-white hover:bg-[rgba(67,97,238,0.15)] transition-colors duration-300 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] hover:shadow-[0_0_20px_rgba(67,97,238,0.2)]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[rgba(16,20,46,0.9)] text-white hover:bg-[rgba(67,97,238,0.15)] transition-colors duration-300 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] hover:shadow-[0_0_20px_rgba(67,97,238,0.2)]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
