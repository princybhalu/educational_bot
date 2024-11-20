import React, { useEffect, useState, useRef } from 'react';
import SparklesComp from './sparkles';
import Orbit from '../avatar/Orbit';
import { Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// function Index() {
//   const scrollRef = useRef(null);
//   const scrollContainerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: scrollRef,
//     // container: scrollContainerRef,
//     offset: ['start start', 'end start'],
//   });

//   // Transform scroll progress to orbit movement
//   const orbitY = useTransform(scrollYProgress, [0, 1], [0, 1000]);
//   const orbitScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
//   const orbitOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

//   return (
//     <>
//       <div className="">
//         {/* 1st section */}
//         <div
//           ref={scrollRef}
//           className="min-h-screen w-screen overflow-hidden bg-[#0a0d1e]"
//         >
//           <div className="relative h-[60vh] w-screen overflow-hidden [mask-image:radial-gradient(60%_60%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#4361ee,transparent_90%)] before:opacity-30 after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#4361ee33] after:bg-[#0a0d1e]">
//             <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4cc9f015_1px,transparent_1px),linear-gradient(to_bottom,#4361ee15_1px,transparent_1px)] bg-[size:70px_80px]"></div>
//             <SparklesComp
//               density={300}
//               size={1.6}
//               speed={1}
//               color="#4cc9f0"
//               opacity={0.8}
//               direction="top"
//               className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(60%_60%,white,transparent_85%)]"
//             />
//           </div>

//           {/* Animated Orbit */}
//           <motion.div
//             className="mx-auto -mt-60 md:-mt-80 w-screen max-w-2xl relative z-10"
//             style={{
//               y: orbitY,
//               scale: orbitScale,
//               opacity: orbitOpacity
//             }}
//           >
//             <div className="p-4 w-28 h-28 mx-auto grid place-content-center rounded-full">
//               <div className="my-auto">
//                 <Orbit opration={null} size={100} smSize={75} />
//               </div>
//             </div>
//           </motion.div>

//           <article className="text-white pt-2 w-2/3 mx-auto block text-center z-10 relative">
//             <div className="relative z-10 max-w-4xl mx-auto">
//               <div className="text-center mb-16">
//                 <div className="inline-flex items-center gap-2 px-6 py-2 md:py-3 rounded-full bg-[rgba(67,97,238,0.15)] border border-[rgba(76,201,240,0.3)] mb-8 hover:border-[#4cc9f0] transition-all duration-300">
//                   <Sparkles className="w-5 h-5 text-[#4cc9f0] animate-pulse" />
//                   <span className="text-[#4cc9f0] font-medium">
//                     Coming Soon
//                   </span>
//                 </div>

//                 <h1 className="text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-br from-[#4361ee] via-[#4cc9f0] to-white bg-clip-text text-transparent drop-shadow-lg">
//                   Unlock the Future of Education
//                 </h1>

//                 <p className="text-md md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
//                   Experience revolutionary AI-powered learning that adapts to
//                   your unique journey. Join us in transforming education
//                   forever.
//                 </p>

//                 <div className="p-4 rounded-3xl bg-[rgba(16,20,46,0.95)] border border-[rgba(76,201,240,0.2)] backdrop-blur-xl shadow-xl shadow-[#4361ee]/10">
//                   <h2 className="text-lg md:text-2xl font-semibold mb-8 bg-gradient-to-r from-[#4cc9f0] to-white bg-clip-text text-transparent">
//                     Launching In
//                   </h2>
//                   <CountdownTimer />
//                 </div>

//                 <div className="mt-8">
//                   <button className="px-8 py-3 md:py-4 rounded-full bg-gradient-to-br from-[#4361ee] to-[#4cc9f0] text-white text-base md:text-lg font-semibold hover:shadow-lg hover:shadow-[#4cc9f0]/30 transition-all duration-300 transform hover:-translate-y-1">
//                     Join the Waitlist
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>

//         {/* 2nd section */}
//         <div className="h-screen w-screen overflow-hidden bg-[#0a0d1e]">
//           <div className="h-full flex justify-center items-center gap-2 my-auto">
//             <div>{/* Orbit will be placed here when scrolling */}</div>
//             <div className="text-white text-lg p-4 border border-[#4cc9f0] rounded-md">
//               Hello! I&lsquo;m Vidhya, your personal learning assistant.
//               Can&lsquo;t wait to embark on an exciting educational journey with
//               you soon!
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

function Index() {
  const scrollContainerRef = useRef(null);

  // Track scroll progress for the combined sections
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef, // Combined container
    offset: ['start start', 'end start'], // Scroll begins at container start, ends at container end
  });

  // Transform scroll progress to orbit movement
  const orbitY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, window.innerHeight * 2]
  ); // Moves further for both sections
  const orbitScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const orbitOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <>
      {/* Shared Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="h-[200vh] w-screen bg-[#0a0d1e] overflow-hidden"
      >
        {/* 1st Section */}
        <div className="min-h-screen w-screen overflow-hidden bg-[#0a0d1e]">
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

          {/* Animated Orbit */}
          <motion.div
            className="mx-auto -mt-60 md:-mt-80 w-screen max-w-2xl relative z-50"
            style={{
              y: orbitY,
              scale: orbitScale,
              opacity: orbitOpacity,
            }}
          >
            <div className="p-4 w-28 h-28 mx-auto grid place-content-center rounded-full">
              <div className="my-auto">
                <Orbit opration={null} size={100} smSize={75} />
              </div>
            </div>
          </motion.div>

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

          <div className="h-screen w-2/3 mx-auto overflow-hidden flex flex-col justify-center items-center bg-[#0a0d1e]">
            <div>
              {/* Orbit continues moving here */}
              <Orbit opration={null} size={100} smSize={75} />
            </div>
            <div className="text-white text-lg p-4 border border-[#4cc9f0] rounded-md">
              Hello! I&lsquo;m Vidhya, your personal learning assistant.
              Can&lsquo;t wait to embark on an exciting educational journey with
              you soon!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

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

// function index() {
//   return (
//     <>
//       <div className="min-h-screen w-screen overflow-hidden bg-black">
//         <div className="relative  h-80 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_90%)] before:opacity-100  after:absolute after:border-2 after:-left-1/2 after:top-1/2 after:aspect-[1/1.8] after:w-[200%] after:rounded-[50%] after:border-b after:border-[#7876c566] after:bg-zinc-900">
//           <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px] "></div>
//           <SparklesComp
//             density={400}
//             size={1.4}
//             direction="top"
//             className="absolute inset-x-0 top-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
//           />
//         </div>
//         <div className="mx-auto -mt-52  w-screen max-w-2xl relative z-10">
//           <div className="p-4  w-28 h-28 mx-auto grid place-content-center rounded-full">
//             {/* <div className=" w-12 h-12 translate-x-1 translate-y-1 mx-auto bg-black rounded-lg before:absolute relative before:w-full before:h-full before:bg-black/50 before:rounded-lg before:-top-2 before:-left-2"></div> */}

//             <div className='my-auto'>
//             <Orbit opration={null} size={100} />
//             </div>
//           </div>
//         </div>
//         <article className="text-white  pt-2 w-2/3 mx-auto block text-center z-10 relative ">
//           <div className="relative z-10 max-w-4xl mx-auto">
//             <div className="text-center mb-16">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(67,97,238,0.1)] border border-[rgba(67,97,238,0.2)] mb-6">
//                 <Sparkles className="w-4 h-4 text-[#4cc9f0]" />
//                 <span className="text-white/90">Coming Soon</span>
//               </div>

//               <h1 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
//                 Unlock the Future of Education
//               </h1>

//               <p className=" text-md md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
//                 Experience revolutionary AI-powered learning that adapts to your
//                 unique journey. Join us in transforming education forever.
//               </p>

//               <div className="p-4 rounded-3xl bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)] backdrop-blur-xl">
//                 <h2 className="text-md md:text-xl font-semibold mb-4 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
//                   Launching In
//                 </h2>
//                 <CountdownTimer />
//               </div>

//               <div className="mt-12">
//                 <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white font-semibold hover:shadow-lg hover:shadow-[#4361ee]/50 transition-all duration-300">
//                   Join the Waitlist
//                 </button>
//               </div>
//             </div>
//           </div>
//         </article>
//       </div>
//     </>
//   );
// }
