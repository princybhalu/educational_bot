import React, { useEffect, useState, useRef } from 'react';
import SparklesComp from './sparkles';
import Orbit from '../avatar/Orbit';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });

  // Create transform animations based on scroll progress
  const translateY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <>
      <div
        className="h-[200vh] w-screen overflow-hidden bg-[#0a0d1e] relative"
      >
        {/* First Section */}
        <motion.div
          className="h-screen w-full sticky top-0 overflow-hidden"
          style={{
            backgroundColor: '#0a0d1e',
            position: 'sticky',
            top: 0,
          }}
        >
          {/* Existing intro content */}
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
          <div
            ref={scrollRef}
            className="min-h-screen w-screen overflow-hidden bg-[#0a0d1e] flex justify-center items-center relative"
          >
            <motion.div
              style={{
                translateY,
                scale,
                opacity,
              }}
              className="absolute flex justify-center items-center w-full"
            >
              <Orbit opration={null} size={100} smSize={75} />
            </motion.div>

            <div className="flex justify-center items-center w-full">
              <div className="text-white text-center">
                <h2 className="text-2xl mb-4">Scroll to See Orbit Animation</h2>
                <p>This demonstrates a scroll-triggered animation</p>
              </div>
            </div>
          </div>

          <article className="text-white pt-2 w-2/3 mx-auto block text-center z-10 relative">
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-6 py-2 md:py-3 rounded-full bg-[rgba(67,97,238,0.15)] border border-[rgba(76,201,240,0.3)] mb-8 hover:border-[#4cc9f0] transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-[#4cc9f0] animate-pulse" />
                  <span className="text-[#4cc9f0] font-medium">
                    Coming Soon
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-br from-[#4361ee] via-[#4cc9f0] to-white bg-clip-text text-transparent drop-shadow-lg">
                  Unlock the Future of Education
                </h1>

                <p className="text-md md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Experience revolutionary AI-powered learning that adapts to
                  your unique journey. Join us in transforming education
                  forever.
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
        </motion.div>

        {/* Second Section */}
        <motion.div className="h-screen w-full bg-[#0a0d1e] flex items-center justify-center">
          {/* Additional content for second section */}
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">Next Section</h2>
            <p>Continued journey of innovation</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Index;
