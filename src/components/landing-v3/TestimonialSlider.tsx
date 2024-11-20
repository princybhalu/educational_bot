'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialSlider() {
  const testimonials = [
    {
      quote: 'Vidhyarhi AI is a game-changer for personalized learning!',
      author: 'Dr. Ananya Sharma',
      role: 'Education Specialist',
    },
    {
      quote:
        "An innovative approach that's set to redefine how students learn.",
      author: 'Michael Lee',
      role: 'High School Teacher',
    },
    {
      quote: 'A platform that truly understands the needs of modern education.',
      author: 'Sara Kim',
      role: 'Curriculum Developer',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="bg-[#0a0d1e] text-white py-24 relative overflow-hidden">
      {/* Orbital Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,#4361ee,#3498db,#2ecc71,#e74c3c,#4361ee)] opacity-5"
        />
      </div>

      {/* Glass Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Darker_Grotesque'] text-4xl font-bold mb-3 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            What Educators Are Saying
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] mx-auto rounded-full" />
        </motion.div>

        <div className="relative h-80">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute w-full"
            >
              <div className="relative mx-auto max-w-3xl">
                <div className="bg-[rgba(16,20,46,0.9)] backdrop-blur-xl rounded-2xl p-8 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] transition-all duration-300 shadow-[0_10px_30px_rgba(67,97,238,0.2)] hover:shadow-[0_0_30px_rgba(67,97,238,0.4)]">
                  <Quote className="w-12 h-12 mx-auto mb-8 text-transparent bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text" />
                  <p className="text-2xl md:text-3xl font-['Darker_Grotesque'] font-medium mb-8 text-white/90">
                    {testimonials[currentIndex].quote}
                  </p>
                  <div className="space-y-2">
                    <p className="font-['Darker_Grotesque'] font-bold text-xl bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-white/70">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
            {[-1, 1].map((dir) => (
              <button
                key={dir}
                onClick={() => {
                  setDirection(dir);
                  setCurrentIndex((prevIndex) => {
                    let newIndex = prevIndex + dir;
                    if (newIndex < 0) newIndex = testimonials.length - 1;
                    if (newIndex >= testimonials.length) newIndex = 0;
                    return newIndex;
                  });
                }}
                className="w-12 h-12 rounded-full bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(67,97,238,0.4)] pointer-events-auto"
              >
                {dir === -1 ? (
                  <ChevronLeft className="w-6 h-6 text-white/70" />
                ) : (
                  <ChevronRight className="w-6 h-6 text-white/70" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] shadow-[0_0_20px_rgba(67,97,238,0.4)]'
                  : 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
