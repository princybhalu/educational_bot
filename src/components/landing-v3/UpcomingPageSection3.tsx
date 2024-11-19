import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import SparklesComp from './sparkles';
import Orbit from '../avatar/Orbit';

const ScrollAnimationIndex = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      // Calculate when to fix the orbit
      if (position > 300 && position < 800) {
        setIsFixed(true);
        setHasReachedTarget(false);
      } else if (position >= 800) {
        setIsFixed(false);
        setHasReachedTarget(true);
      } else {
        setIsFixed(false);
        setHasReachedTarget(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    useEffect(() => {
      const targetDate = new Date('2024-12-01T00:00:00');
      const interval = setInterval(() => {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference <= 0) {
          clearInterval(interval);
        } else {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    //@ts-ignore
    // eslint-disable-next-line react/prop-types
    const TimeUnit = ({ value, label }) => (
      <div className="relative group">
        <div className="w-12 h-12 md:w-24 md:h-24 bg-[rgba(16,20,46,0.9)] rounded-2xl border border-[rgba(67,97,238,0.2)] backdrop-blur-xl flex flex-col items-center justify-center transform transition-all duration-300 group-hover:border-[#4361ee]">
          <span className="text-md md:text-2xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-white/70 text-sm mt-1">{label}</span>
        </div>
      </div>
    );

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    );
  };

  return (
    <div className="min-h-[200vh] w-screen overflow-hidden bg-[#0a0d1e]">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-screen overflow-hidden [mask-image:radial-gradient(60%_60%,white,transparent)]">
        <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#4361ee,transparent_90%)] before:opacity-30">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4cc9f015_1px,transparent_1px),linear-gradient(to_bottom,#4361ee15_1px,transparent_1px)] bg-[size:70px_80px]"></div>
          <SparklesComp
            density={300}
            size={1.6}
            speed={1}
            color="#4cc9f0"
            opacity={0.8}
            direction="top"
            className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(60%_60%,white,transparent_85%)]"
          />
        </div>
      </div>

      {/* Orbit Container */}
      <div
        className={`w-28 h-28 mx-auto transition-all duration-300 ${
          isFixed
            ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
            : hasReachedTarget
              ? 'absolute left-1/4 transform -translate-x-1/2'
              : 'relative -mt-60 md:-mt-80'
        }`}
      >
        <Orbit opration={null} size={100} smSize={75} />
      </div>

      {/* Content Section */}
      <div className="relative z-10 w-2/3 mx-auto text-center pt-20">
        <div className="inline-flex items-center gap-2 px-6 py-2 md:py-3 rounded-full bg-[rgba(67,97,238,0.15)] border border-[rgba(76,201,240,0.3)] mb-8">
          <Sparkles className="w-5 h-5 text-[#4cc9f0] animate-pulse" />
          <span className="text-[#4cc9f0] font-medium">Coming Soon</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-br from-[#4361ee] via-[#4cc9f0] to-white bg-clip-text text-transparent">
          Unlock the Future of Education
        </h1>

        <div className="text-md md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          <p className="leading-relaxed">
            Experience revolutionary AI-powered learning that adapts to your
            unique journey.
          </p>
        </div>

        <div className="p-4 rounded-3xl bg-[rgba(16,20,46,0.95)] border border-[rgba(76,201,240,0.2)] backdrop-blur-xl">
          <h2 className="text-lg md:text-2xl font-semibold mb-8 bg-gradient-to-r from-[#4cc9f0] to-white bg-clip-text text-transparent">
            Launching In
          </h2>
          <CountdownTimer />
        </div>
      </div>

      {/* Target Section */}
      <div className="min-h-screen w-full relative mt-40">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-4/5 mx-auto">
          {hasReachedTarget && (
            <div className="md:w-1/2 text-white space-y-6 opacity-0 animate-fade-in">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
                Transform Your Learning Experience
              </h2>
              <p className="text-lg text-white/80">
                Our AI-powered platform adapts to your learning style, providing
                personalized content and guidance to help you achieve your
                educational goals faster and more effectively.
              </p>
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white font-semibold hover:shadow-lg transition-all duration-300">
                Learn More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimationIndex;
