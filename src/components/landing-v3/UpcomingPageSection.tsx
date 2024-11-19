// import React, { useState, useEffect } from 'react';

// const CountdownTimer = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   useEffect(() => {
//     const targetDate = new Date('2024-12-01T00:00:00'); // Set your launch date here
//     const interval = setInterval(() => {
//       const now = new Date();
//       const difference = targetDate.getTime() - now.getTime();

//       if (difference <= 0) {
//         clearInterval(interval);
//       } else {
//         setTimeLeft({
//           days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//           hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//           minutes: Math.floor((difference / (1000 * 60)) % 60),
//           seconds: Math.floor((difference / 1000) % 60),
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex items-center justify-center space-x-4 text-white text-lg font-semibold">
//       <div>
//         <span className="text-4xl">{timeLeft.days}</span> days
//       </div>
//       <div>
//         <span className="text-4xl">{timeLeft.hours}</span> hrs
//       </div>
//       <div>
//         <span className="text-4xl">{timeLeft.minutes}</span> mins
//       </div>
//       <div>
//         <span className="text-4xl">{timeLeft.seconds}</span> secs
//       </div>
//     </div>
//   );
// };

// const UpcomingPageSection = () => {
//   return (
//     <section className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white py-20 px-4">
//       <div className="max-w-3xl mx-auto text-center">
//         <h1 className="text-5xl font-bold mb-6">Unlock the Future of Education with Vidhyarhi AI</h1>
//         <p className="text-lg font-medium mb-8">
//           An Innovative AI Platform Transforming Learning Experiences
//         </p>
//         <div className="bg-black/60 rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4">Launching In:</h2>
//           <CountdownTimer />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UpcomingPageSection;

import React, { useState, useEffect } from 'react';
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
      <div className="w-24 h-24 bg-[rgba(16,20,46,0.9)] rounded-2xl border border-[rgba(67,97,238,0.2)] backdrop-blur-xl flex flex-col items-center justify-center transform transition-all duration-300 group-hover:border-[#4361ee] group-hover:shadow-lg group-hover:shadow-[#4361ee]/20">
        <span className="text-4xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
          {value.toString().padStart(2, '0')}
        </span>
        <span className="text-white/70 text-sm mt-1">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

const UpcomingPageSection = () => {
  return (
    <section className="relative bg-gray-900 min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Animated background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4361ee] rounded-full filter blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4cc9f0] rounded-full filter blur-[128px] opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(67,97,238,0.1)] border border-[rgba(67,97,238,0.2)] mb-6">
            <Sparkles className="w-4 h-4 text-[#4cc9f0]" />
            <span className="text-white/90">Coming Soon</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            Unlock the Future of Education
          </h1>
          
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Experience revolutionary AI-powered learning that adapts to your unique journey. Join us in transforming education forever.
          </p>

          <div className="p-8 rounded-3xl bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold mb-8 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
              Launching In
            </h2>
            <CountdownTimer />
          </div>

          <div className="mt-12">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white font-semibold hover:shadow-lg hover:shadow-[#4361ee]/50 transition-all duration-300">
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingPageSection;