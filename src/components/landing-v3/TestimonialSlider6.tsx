/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import P1 from '../../assets/images/p1.webp';

const testimonials = [
  {
    quote: 'Vidhyarhi AI is a game-changer for personalized learning!',
    author: 'Dr. Ananya Sharma',
    role: 'Education Specialist',
    image: P1,
    rating: 5,
    category: 'Personalization',
  },
  {
    quote: "An innovative approach that's set to redefine how students learn.",
    author: 'Michael Lee',
    role: 'High School Teacher',
    image: P1,
    rating: 5,
    category: 'Innovation',
  },
  {
    quote: 'A platform that truly understands the needs of modern education.',
    author: 'Sara Kim',
    role: 'Curriculum Developer',
    image: P1,
    rating: 5,
    category: 'Education',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection('next');
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection('prev');
    setIsAnimating(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getSlideClass = () => {
    if (!isAnimating) return 'translate-x-0';
    return direction === 'next' ? '-translate-x-full' : 'translate-x-full';
  };

  const getNextSlideClass = () => {
    if (!isAnimating) return 'translate-x-full';
    return direction === 'next' ? 'translate-x-0' : '-translate-x-full';
  };

  return (
    <div className="min-h-screen bg-[#0a0d1e] flex items-center justify-center w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4361ee] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#4cc9f0] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        </div>

        {/* Header Section */}
        <div className="text-center mt-4 mb-12 relative">
          <div className="inline-block">
            <span className="relative inline-block px-4 py-1 text-sm font-medium text-[#4cc9f0] bg-[rgba(76,201,240,0.1)] rounded-full mb-4">
              Success Stories
              <div className="absolute inset-0 border border-[#4cc9f0] rounded-full animate-pulse" />
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-white to-[#4cc9f0] bg-clip-text text-transparent px-4">
            What Educators Are Saying
          </h2>
        </div>

        {/* Slider Container */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Left Navigation */}
            <button
              onClick={handlePrev}
              className="hidden sm:flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(67,97,238,0.1)] backdrop-blur-lg border border-[rgba(67,97,238,0.2)] hover:bg-[rgba(67,97,238,0.2)] transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#4cc9f0]" />
            </button>

            {/* Testimonial Content */}
            <div className="flex-1 overflow-hidden">
              <div className="relative">
                <div
                  className={`transform transition-transform duration-600 ease-out ${getSlideClass()}`}
                  style={{
                    position: isAnimating ? 'absolute' : 'relative',
                    width: '100%',
                  }}
                >
                  <TestimonialCard testimonial={testimonials[currentIndex]} />
                </div>

                {isAnimating && (
                  <div
                    className={`transform transition-transform duration-600 ease-out ${getNextSlideClass()}`}
                    style={{ width: '100%' }}
                  >
                    <TestimonialCard
                      testimonial={
                        testimonials[
                          direction === 'next'
                            ? (currentIndex + 1) % testimonials.length
                            : currentIndex === 0
                              ? testimonials.length - 1
                              : currentIndex - 1
                        ]
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Navigation */}
            <button
              onClick={handleNext}
              className="hidden sm:flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(67,97,238,0.1)] backdrop-blur-lg border border-[rgba(67,97,238,0.2)] hover:bg-[rgba(67,97,238,0.2)] transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-[#4cc9f0]" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex sm:hidden justify-between items-center mt-6 px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-[rgba(67,97,238,0.1)] backdrop-blur-lg border border-[rgba(67,97,238,0.2)] group"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#4cc9f0]" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev');
                    setCurrentIndex(index);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-6 bg-[#4361ee]'
                      : 'w-3 bg-[rgba(67,97,238,0.2)]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-[rgba(67,97,238,0.1)] backdrop-blur-lg border border-[rgba(67,97,238,0.2)] group"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-[#4cc9f0]" />
            </button>
          </div>

          {/* Desktop Progress Indicators */}
          <div className="hidden sm:flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(index);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-[#4361ee]'
                    : 'w-4 bg-[rgba(67,97,238,0.2)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: any }) => (
  <div className="relative group">
    <div className="relative backdrop-blur-xl bg-[rgba(16,20,46,0.9)] rounded-2xl p-6 sm:p-8">
      <div className="relative z-10">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white">
            {testimonial.category}
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-[auto,1fr] gap-6 items-start">
          {/* Profile Image */}
          <div className="relative mx-auto md:mx-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#4361ee] group-hover:border-[#4cc9f0] transition-colors duration-300">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <div className="relative mb-4">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#4cc9f0] opacity-20" />
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed pl-6">
                {testimonial.quote}
              </p>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#4cc9f0] text-[#4cc9f0]"
                />
              ))}
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-1">
                {testimonial.author}
              </h4>
              <p className="text-[#4cc9f0]">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Card Border Gradient */}
    <div className="absolute -inset-[1px] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
  </div>
);

export default TestimonialsSection;
