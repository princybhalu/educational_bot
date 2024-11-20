import React, { useState, useEffect } from 'react';

const FullscreenQuotes = () => {
  const quotes = [
    {
      text: 'Education is the most powerful weapon which you can use to change the world.',
      author: 'Nelson Mandela',
    },
    {
      text: 'The beautiful thing about learning is that no one can take it away from you.',
      author: 'B.B. King',
    },
    {
      text: 'The future belongs to those who believe in the beauty of their dreams.',
      author: 'Eleanor Roosevelt',
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Floating particles data
  const particles = Array(20)
    //@ts-ignore
    .fill()
    .map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 500);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0d1e]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {/* Geometric shapes that float and pulse */}
            <div
              className={`
              absolute w-full h-full rounded-lg
              animate-pulse
              ${particle.id % 3 === 0 ? 'bg-[#4361ee]' : 'bg-[#4cc9f0]'}
              opacity-${Math.floor(Math.random() * 30) + 10}
            `}
            />
          </div>
        ))}
      </div>

      {/* Dynamic Light Beams */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#4361ee] via-transparent to-transparent opacity-20 animate-beam-slide" />
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[#4cc9f0] via-transparent to-transparent opacity-20 animate-beam-slide-delayed" />
      </div>

      {/* Main Content Container */}
      <div className="relative h-full flex items-center justify-center px-8">
        <div className="max-w-4xl w-full">
          {/* Quote Container with Glass Effect */}
          <div className="relative rounded-2xl bg-[rgba(16,20,46,0.8)] p-12 md:p-16 backdrop-blur-xl border border-[rgba(67,97,238,0.2)]">
            {/* Animated Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4361ee] to-transparent animate-expand-right" />
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#4361ee] to-transparent animate-expand-down" />
            </div>
            <div className="absolute top-0 right-0 w-20 h-20">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-[#4cc9f0] to-transparent animate-expand-left" />
              <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#4cc9f0] to-transparent animate-expand-down" />
            </div>

            {/* Quote Content */}
            <div className="min-h-[200px] flex flex-col items-center justify-center">
              <div
                className={`transition-all duration-700 ${
                  isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <p className="text-3xl md:text-4xl lg:text-5xl text-center font-light mb-8 text-white leading-relaxed">
                  &quot;{quotes[currentQuote].text}&quot;
                </p>
                <div className="flex items-center justify-center">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#4361ee] to-transparent" />
                  <p className="mx-4 text-xl md:text-2xl bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent font-medium">
                    {quotes[currentQuote].author}
                  </p>
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#4cc9f0] to-transparent" />
                </div>
              </div>
            </div>

            {/* Quote Navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAnimating(true);
                    setTimeout(() => {
                      setCurrentQuote(index);
                      setIsAnimating(false);
                    }, 500);
                  }}
                  className={`
                    transition-all duration-500 
                    ${
                      currentQuote === index
                        ? 'w-8 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0]'
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    } h-2 rounded-full
                  `}
                  aria-label={`Quote ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-100px) rotate(180deg);
          }
        }

        @keyframes beam-slide {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes expand-right {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes expand-left {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes expand-down {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-beam-slide {
          animation: beam-slide 5s linear infinite;
        }

        .animate-beam-slide-delayed {
          animation: beam-slide 5s linear infinite;
          animation-delay: 2.5s;
        }

        .animate-expand-right {
          animation: expand-right 2s ease-out infinite;
        }

        .animate-expand-left {
          animation: expand-left 2s ease-out infinite;
        }

        .animate-expand-down {
          animation: expand-down 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FullscreenQuotes;
