import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import P1 from '../../assets/images/P2.webp';

const testimonials = [
  {
    quote: 'Vidhyarhi AI is a game-changer for personalized learning!',
    author: 'Dr. Ananya Sharma',
    role: 'Education Specialist',
    image: P1,
  },
  {
    quote: "An innovative approach that's set to redefine how students learn.",
    author: 'Michael Lee',
    role: 'High School Teacher',
    image: P1,
  },
  {
    quote: 'A platform that truly understands the needs of modern education.',
    author: 'Sara Kim',
    role: 'Curriculum Developer',
    image: P1,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full min-h-screen bg-[#0a0d1e] flex items-center justify-center p-6">
      <div className="relative max-w-6xl w-full mx-auto">
        {/* Orbital Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#4361ee]/10 to-[#4cc9f0]/10 rounded-3xl animate-pulse" />

        {/* Main Content Container */}
        <div className="relative backdrop-blur-xl bg-[rgba(16,20,46,0.9)] rounded-3xl p-8 md:p-12 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
          <h2 className="text-center text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            What Educators Are Saying
          </h2>

          {/* Testimonial Card */}
          <div className="relative overflow-hidden">
            <div
              className={`transform transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4361ee] relative z-10">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#4361ee] blur-xl opacity-30 animate-pulse" />
                </div>

                <Quote className="w-12 h-12 text-[#4cc9f0] mb-4" />

                <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                  {testimonials[currentIndex].quote}
                </p>

                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-[#4cc9f0]">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[rgba(67,97,238,0.1)] border border-[rgba(67,97,238,0.2)] hover:bg-[rgba(67,97,238,0.2)] hover:border-[#4361ee] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[rgba(67,97,238,0.1)] border border-[rgba(67,97,238,0.2)] hover:bg-[rgba(67,97,238,0.2)] hover:border-[#4361ee] transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-[#4361ee] w-6'
                    : 'bg-[rgba(67,97,238,0.2)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
