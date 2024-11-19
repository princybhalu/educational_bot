import React, { useEffect, useState, useRef } from 'react';
import SparklesComp from './sparkles';
import Orbit from '../../components/avatar/Orbit';

import { Sparkles } from 'lucide-react';

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
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="relative group">
      <div className="w-12 h-12 md:w-24 md:h-24 bg-[rgba(16,20,46,0.9)] rounded-2xl border border-[rgba(67,97,238,0.2)] backdrop-blur-xl flex flex-col items-center justify-center transform transition-all duration-300 group-hover:border-[#4361ee] group-hover:shadow-lg group-hover:shadow-[#4361ee]/20">
        <span className=" text-md md:text-2xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
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

function Index() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const orbitalRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (orbitalRef.current && introRef.current) {
        const introSection = introRef.current;
        const orbitalSection = orbitalRef.current;

        // Calculate scroll progress
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        //@ts-ignore
        const introHeight = introSection.offsetHeight;
        const progress = Math.min(Math.max(scrollTop / introHeight, 0), 1);

        setScrollProgress(progress);

        // Determine if Orbit should be sticky
        //@ts-ignore
        const introBottom = introSection.getBoundingClientRect().bottom;
        setIsSticky(introBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <div
        ref={introRef}
        className="min-h-screen w-screen overflow-hidden bg-[#0a0d1e]"
      >
        {' '}
        {/* Updated background color */}
        <div className="relative h-[60vh] w-screen overflow-hidden [mask-image:radial-gradient(60%_60%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#4361ee,transparent_90%)] before:opacity-30 after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#4361ee33] after:bg-[#0a0d1e]">
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
        {/* <div className="mx-auto -mt-60 md:-mt-80 w-screen max-w-2xl relative z-10">
          <div className="p-4 w-28 h-28 mx-auto grid place-content-center rounded-full">
            <div className="my-auto">
              <Orbit opration={null} size={100} smSize={75} />
            </div>
          </div>
        </div> */}
        {/* Previous intro section content remains the same */}
        <div className="mx-auto -mt-60 md:-mt-80 w-screen max-w-2xl relative z-10">
          <div
            className="p-4 w-28 h-28 mx-auto grid place-content-center rounded-full"
            style={{
              transform: `scale(${1 - scrollProgress * 0.3})`,
              opacity: 1 - scrollProgress,
            }}
          >
            <div className="my-auto">
              <Orbit opration={null} size={100} smSize={75} />
            </div>
          </div>
        </div>
        <article className="text-white pt-2 w-2/3 mx-auto block text-center z-10 relative">
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-2 md:py-3 rounded-full bg-[rgba(67,97,238,0.15)] border border-[rgba(76,201,240,0.3)] mb-8 hover:border-[#4cc9f0] transition-all duration-300">
                <Sparkles className="w-5 h-5 text-[#4cc9f0] animate-pulse" />
                <span className="text-[#4cc9f0] font-medium">Coming Soon</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-br from-[#4361ee] via-[#4cc9f0] to-white bg-clip-text text-transparent drop-shadow-lg">
                Unlock the Future of Education
              </h1>

              <p className="text-md md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Experience revolutionary AI-powered learning that adapts to your
                unique journey. Join us in transforming education forever.
              </p>

              <div className="p-4 rounded-3xl bg-[rgba(16,20,46,0.95)] border border-[rgba(76,201,240,0.2)] backdrop-blur-xl shadow-xl shadow-[#4361ee]/10">
                <h2 className="text-lg md:text-2xl font-semibold mb-8 bg-gradient-to-r from-[#4cc9f0] to-white bg-clip-text text-transparent">
                  Launching In
                </h2>
                <CountdownTimer />
              </div>

              <div className="mt-8">
                <button className="px-8 py-3 md:py-4 rounded-full bg-gradient-to-br from-[#4361ee] to-[#4cc9f0] text-white text-base md:text-lg font-semibold hover:shadow-lg hover:shadow-[#4cc9f0]/30 transition-all duration-300 transform hover:-translate-y-1">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div
        ref={orbitalRef}
        className="min-h-screen w-screen overflow-hidden bg-[#0a0d1e] relative"
      >
        {isSticky && (
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              transform: `scale(${0.7 + (1 - scrollProgress) * 0.3}) translate(-50%, -50%)`,
              opacity: scrollProgress,
            }}
          >
            <Orbit opration={null} size={100} smSize={75} />
            <div className="mt-4 text-white text-center">
              <h2 className="text-xl font-semibold">Intro Function</h2>
              <p className="text-sm text-gray-300">
                Exploring innovative learning solutions
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
