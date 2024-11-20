import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import P1 from "../../assets/images/P2.webp";

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

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="w-full min-h-[400px] bg-[#0a0d1e] p-8 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#4361ee] opacity-10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#4cc9f0] opacity-10 blur-[80px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          What Educators Are Saying
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[rgba(16,20,46,1)] rounded-2xl p-8 shadow-xl backdrop-blur-lg transition-all duration-500 hover:bg-[rgba(67,97,238,0.15)]">
            <Quote className="absolute text-[#4361ee] top-4 left-4 w-8 h-8 opacity-50" />

            <div className="mt-8">
              <div
                className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                <p className="text-white text-xl mb-6 text-center">
                  {testimonials[current].quote}
                </p>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-16 h-16 rounded-full border-2 border-[#4361ee]"
                  />
                  <div>
                    <h3 className="text-white font-semibold">
                      {testimonials[current].author}
                    </h3>
                    <p className="text-[#4cc9f0]">
                      {testimonials[current].role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[rgba(16,20,46,1)] text-white hover:bg-[#4361ee] transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots indicator */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    current === index ? 'bg-[#4361ee] w-4' : 'bg-gray-400'
                  }`}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[rgba(16,20,46,1)] text-white hover:bg-[#4361ee] transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
