// // import React, { useEffect, useRef, useState } from 'react';
// // import { gsap } from 'gsap';

// // const AnimatedCircleTyping = () => {
// //   const [isTypingComplete, setIsTypingComplete] = useState(false);
// //   const [currentColor, setCurrentColor] = useState('#FF6B6B');
// //   const circleRef = useRef(null);
// //   const cursorRef = useRef(null);
// //   const textRef = useRef(null);
// //   const particlesRef = useRef(null);

// //   const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
// //   const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

// //   // Create particle effect
// //   const createParticles = (color : string) => {
// //     const particles = [];
// //     for (let i = 0; i < 12; i++) {
// //       const angle = (i * Math.PI * 2) / 12;
// //       const particle = document.createElement('div');
// //       particle.className = 'absolute w-2 h-2 rounded-full';
// //       particle.style.backgroundColor = color;
// //       particles.push(particle);
// //       //@ts-ignore
// //       particlesRef.current?.appendChild(particle);

// //       gsap.fromTo(particle,
// //         {
// //           x: 0,
// //           y: 0,
// //           opacity: 1,
// //           scale: 0
// //         },
// //         {
// //           x: Math.cos(angle) * 100,
// //           y: Math.sin(angle) * 100,
// //           opacity: 0,
// //           scale: 2,
// //           duration: 1.5,
// //           ease: "power2.out",
// //           onComplete: () => particle.remove()
// //         }
// //       );
// //     }
// //   };

// //   useEffect(() => {
// //     console.log(currentColor , " :  new color")
// //      // Enhanced typing animation
// //      let currentText = '';
// //      const words = loremText.split(' ');

// //      const typeWord = (word : string, index : number , color : string) => {
// //        return new Promise<void>(resolve => {
// //          let charIndex = 0;
// //          const interval = setInterval(() => {
// //            if (charIndex <= word.length) {
// //              currentText += word[charIndex - 1] || ' ';
// //              if (textRef.current) {
// //                //@ts-ignore
// //                textRef.current.innerHTML = currentText +
// //                  `<span style="color: ${color}; text-shadow: 0 0 10px ${color}44">` +
// //                  `${word.slice(charIndex)}</span>` +
// //                  `<span class="cursor" style="color: ${color}">|</span>`;
// //              }
// //              charIndex++;
// //            } else {
// //              clearInterval(interval);
// //              resolve();
// //            }
// //          }, 50);
// //        });
// //      };

// //      const animateTyping = async (color : string) => {
// //        for (let i = 0; i < words.length; i++) {
// //          await typeWord(words[i], i , currentColor);
// //        }
// //        setIsTypingComplete(true);
// //      };

// //      animateTyping(currentColor);
// //   },[currentColor])

// //   useEffect(() => {
// //     // Firecracker-like gradient animation
// //     const tl = gsap.timeline({
// //       repeat: -1,
// //       onUpdate: () => {
// //         // if (circleRef.current) {
// //         //   const computedStyle = window.getComputedStyle(circleRef.current);
// //         //   const backgroundColor = computedStyle.background;
// //         //   console.log("inside color setting : " , backgroundColor)
// //         //   setCurrentColor(backgroundColor);
// //         // }
// //       }
// //     });

// //     colors.forEach((color) => {
// //       tl.to(circleRef.current, {
// //         background: `radial-gradient(circle at center, ${color} 0%, transparent 100%)`,
// //         duration: 0.5,
// //         ease: "expo.out",
// //         onStart: () => { createParticles(color);   setCurrentColor(color); }
// //       })
// //       .to(circleRef.current, {
// //         background: `radial-gradient(circle at center, ${color} 30%, transparent 70%)`,
// //         duration: 1,
// //         ease: "power2.inOut"
// //       });
// //     });

// //     // Cursor animation
// //     gsap.to(cursorRef.current, {
// //       opacity: 0,
// //       duration: 0.5,
// //       repeat: -1,
// //       yoyo: true
// //     });

// //     // Enhanced typing animation
// //     // let currentText = '';
// //     // const words = loremText.split(' ');

// //     // const typeWord = (word : string, index : number , color : string) => {
// //     //   return new Promise<void>(resolve => {
// //     //     let charIndex = 0;
// //     //     const interval = setInterval(() => {
// //     //       if (charIndex <= word.length) {
// //     //         currentText += word[charIndex - 1] || ' ';
// //     //         if (textRef.current) {
// //     //           //@ts-ignore
// //     //           textRef.current.innerHTML = currentText +
// //     //             `<span style="color: ${color}; text-shadow: 0 0 10px ${color}44">` +
// //     //             `${word.slice(charIndex)}</span>` +
// //     //             `<span class="cursor" style="color: ${color}">|</span>`;
// //     //         }
// //     //         charIndex++;
// //     //       } else {
// //     //         clearInterval(interval);
// //     //         resolve();
// //     //       }
// //     //     }, 50);
// //     //   });
// //     // };

// //     // const animateTyping = async (color : string) => {
// //     //   for (let i = 0; i < words.length; i++) {
// //     //     await typeWord(words[i], i , currentColor);
// //     //   }
// //     //   setIsTypingComplete(true);
// //     // };

// //     // animateTyping(currentColor);
// //   }, []);

// //   return (
// //     <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-gray-900">
// //       {/* Circle Container with Particles */}
// //       <div className="relative">
// //         <div
// //           ref={particlesRef}
// //           className="absolute inset-0 pointer-events-none"
// //         />
// //         <div
// //           ref={circleRef}
// //           className="w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-transparent
// //                      shadow-lg shadow-current transition-all duration-300"
// //         />
// //       </div>

// //       {/* Typing Text Container */}
// //       <div className="max-w-2xl p-8 bg-gray-800 rounded-lg shadow-xl">
// //         <div
// //           ref={textRef}
// //           className="text-white font-mono text-2xl leading-relaxed"
// //         />
// //       </div>

// //       {/* Text Area and Submit */}
// //       {isTypingComplete && (
// //         <div className="w-full max-w-2xl space-y-4">
// //           <textarea
// //             className="w-full p-6 bg-gray-700 text-white rounded-lg resize-none
// //                        text-xl border-2 border-gray-600 focus:border-current
// //                        transition-colors duration-300"
// //             rows={4}
// //             placeholder="Enter your text here..."
// //           />
// //           <button
// //             className="px-8 py-3 bg-current text-white rounded-lg hover:opacity-90
// //                        transition-all duration-300 text-xl font-semibold"
// //           >
// //             Submit
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AnimatedCircleTyping;

// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// let timeOut : any = null;
// // Typing Component
// interface TypingProps {
//   text: string;
//   color: string;
//   onComplete: () => void;
// }

// const TypingEffect: React.FC<TypingProps> = ({ text, color, onComplete }) => {
//   const textRef = useRef<HTMLDivElement>(null);
//   const [displayText, setDisplayText] = useState('');

//   useEffect(() => {
//     let currentText = '';
//     const words = text.split(' ');
//     let wordIndex = 0;

//     const typeWord = () => {
//       if (wordIndex >= words.length) {
//         onComplete();
//         return;
//       }

//       const word = words[wordIndex];
//       let charIndex = 0;

//       const typeChar = () => {
//         if (charIndex <= word.length) {
//           currentText = words.slice(0, wordIndex).join(' ') +
//             ' ' + word.slice(0, charIndex);

//           if (textRef.current) {
//             textRef.current.innerHTML = currentText +
//               `<span style="color: ${color}; text-shadow: 0 0 10px ${color}44">` +
//               `${word.slice(charIndex)}</span>` +
//               `<span class="cursor" style="color: ${color}">|</span>`;
//           }

//           charIndex++;
//           if(timeOut) clearTimeout(timeOut);
//           timeOut = setTimeout(typeChar, 50);
//         } else {
//           wordIndex++;
//           if(timeOut) clearTimeout(timeOut);
//           timeOut = setTimeout(typeWord, 100);
//         }
//       };

//       typeChar();
//     };

//     typeWord();
//   }, [text, color, onComplete]);

//   return (
//     <div
//       ref={textRef}
//       className="text-white font-mono text-2xl leading-relaxed"
//     />
//   );
// };

// // Main Component
// const AnimatedCircleTyping = () => {
//   const [isTypingComplete, setIsTypingComplete] = useState(false);
//   const [currentColor, setCurrentColor] = useState('#FF6B6B');
//   const [currentColorIndex, setCurrentColorIndex] = useState(0);
//   const circleRef = useRef<HTMLDivElement>(null);
//   const particlesRef = useRef<HTMLDivElement>(null);

//   const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
//   const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

//   // Create particle effect
//   const createParticles = (color: string) => {
//     const particles: HTMLDivElement[] = [];
//     for (let i = 0; i < 12; i++) {
//       const angle = (i * Math.PI * 2) / 12;
//       const particle = document.createElement('div');
//       particle.className = 'absolute w-2 h-2 rounded-full';
//       particle.style.backgroundColor = color;
//       particles.push(particle);
//       particlesRef.current?.appendChild(particle);

//       gsap.fromTo(particle,
//         {
//           x: 0,
//           y: 0,
//           opacity: 1,
//           scale: 0
//         },
//         {
//           x: Math.cos(angle) * 100,
//           y: Math.sin(angle) * 100,
//           opacity: 0,
//           scale: 2,
//           duration: 1.5,
//           ease: "power2.out",
//           onComplete: () => particle.remove()
//         }
//       );
//     }
//   };

//   // Handle color and typing progression
//   const handleTypingComplete = () => {
//     const nextColorIndex = (currentColorIndex + 1) % colors.length;
//     setCurrentColorIndex(nextColorIndex);
//     setCurrentColor(colors[nextColorIndex]);
//   };

//   useEffect(() => {
//     // Firecracker-like gradient animation
//     const tl = gsap.timeline({
//       repeat: -1
//     });

//     colors.forEach((color) => {
//       tl.to(circleRef.current, {
//         background: `radial-gradient(circle at center, ${color} 0%, transparent 100%)`,
//         duration: 0.5,
//         ease: "expo.out",
//         onStart: () => {
//           createParticles(color);
//           setCurrentColor(color);
//         }
//       })
//       .to(circleRef.current, {
//         background: `radial-gradient(circle at center, ${color} 30%, transparent 70%)`,
//         duration: 1,
//         ease: "power2.inOut"
//       });
//     });
//   }, []);

//   return (
//     <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-gray-900">
//       {/* Circle Container with Particles */}
//       <div className="relative">
//         <div
//           ref={particlesRef}
//           className="absolute inset-0 pointer-events-none"
//         />
//         <div
//           ref={circleRef}
//           className="w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 to-transparent
//                      shadow-lg shadow-current transition-all duration-300"
//         />
//       </div>

//       {/* Typing Text Container */}
//       <div className="max-w-2xl p-8 bg-gray-800 rounded-lg shadow-xl">
//         <TypingEffect
//           text={loremText}
//           color={currentColor}
//           onComplete={handleTypingComplete}
//         />
//       </div>

//       {/* Text Area and Submit */}
//       {isTypingComplete && (
//         <div className="w-full max-w-2xl space-y-4">
//           <textarea
//             className="w-full p-6 bg-gray-700 text-white rounded-lg resize-none
//                        text-xl border-2 border-gray-600 focus:border-current
//                        transition-colors duration-300"
//             rows={4}
//             placeholder="Enter your text here..."
//           />
//           <button
//             className="px-8 py-3 bg-current text-white rounded-lg hover:opacity-90
//                        transition-all duration-300 text-xl font-semibold"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnimatedCircleTyping;

// 3333333333333333333
// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// let timeOut: any = null;

// // Typing Component
// interface TypingProps {
//   text: string;
//   color: string;
//   onComplete: () => void;
// }

// const TypingEffect: React.FC<TypingProps> = ({ text, color, onComplete }) => {
//   const textRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let currentText = '';
//     const words = text.split(' ');
//     let wordIndex = 0;

//     const typeWord = () => {
//       if (wordIndex >= words.length) {
//         onComplete();
//         return;
//       }

//       const word = words[wordIndex];
//       let charIndex = 0;

//       const typeChar = () => {
//         if (charIndex <= word.length) {
//           currentText = words.slice(0, wordIndex).join(' ') +
//             ' ' + word.slice(0, charIndex);

//           if (textRef.current) {
//             textRef.current.innerHTML = currentText +
//               `<span style="color: ${color}; text-shadow: 0 0 10px ${color}44">` +
//               `${word.slice(charIndex)}</span>` +
//               `<span class="cursor" style="color: ${color}">|</span>`;
//           }

//           charIndex++;
//           if(timeOut) clearTimeout(timeOut);
//           timeOut = setTimeout(typeChar, 50);
//         } else {
//           wordIndex++;
//           if(timeOut) clearTimeout(timeOut);
//           timeOut = setTimeout(typeWord, 100);
//         }
//       };

//       typeChar();
//     };

//     typeWord();
//   }, [text, color, onComplete]);

//   return (
//     <div
//       ref={textRef}
//       className="text-white font-mono text-2xl leading-relaxed"
//     />
//   );
// };

// // Main Component
// const AnimatedCircleTyping = () => {
//   const [isTypingComplete, setIsTypingComplete] = useState(false);
//   const [currentColor, setCurrentColor] = useState('#FF6B6B');
//   const circleRef = useRef<HTMLDivElement>(null);
//   const particlesRef = useRef<HTMLDivElement>(null);
//   const gradientRef = useRef<HTMLDivElement>(null);

//   const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.";
//   const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

//   // Create particle effect
//   const createParticles = (color: string) => {
//     const particles: HTMLDivElement[] = [];
//     for (let i = 0; i < 12; i++) {
//       const angle = (i * Math.PI * 2) / 12;
//       const particle = document.createElement('div');
//       particle.className = 'absolute w-2 h-2 rounded-full';
//       particle.style.backgroundColor = color;
//       particles.push(particle);
//       particlesRef.current?.appendChild(particle);

//       gsap.fromTo(particle,
//         {
//           x: 0,
//           y: 0,
//           opacity: 1,
//           scale: 0
//         },
//         {
//           x: Math.cos(angle) * 100,
//           y: Math.sin(angle) * 100,
//           opacity: 0,
//           scale: 2,
//           duration: 1.5,
//           ease: "power2.out",
//           onComplete: () => particle.remove()
//         }
//       );
//     }
//   };

//   const handleTypingComplete = () => {
//     setIsTypingComplete(true);
//   };

//   useEffect(() => {
//     // Create rotating gradient effect
//     const gradientColors = colors.map((color, index) => {
//       const nextColor = colors[(index + 1) % colors.length];
//       return `${color} ${(index * 100) / colors.length}%, ${nextColor} ${((index + 1) * 100) / colors.length}%`;
//     }).join(', ');

//     if (gradientRef.current) {
//       gradientRef.current.style.background = `conic-gradient(${gradientColors})`;
//     }

//     // Animate rotation
//     gsap.to(gradientRef.current, {
//       rotation: 360,
//       duration: 8,
//       repeat: -1,
//       ease: "none"
//     });

//     // Cyclone particle effect
//     const createCycloneParticles = () => {
//       const currentColorIndex = Math.floor(Math.random() * colors.length);
//       createParticles(colors[currentColorIndex]);
//       setCurrentColor(colors[currentColorIndex]);
//     };

//     const interval = setInterval(createCycloneParticles, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-gray-900">
//       {/* Circle Container with Particles */}
//       <div className="relative">
//         <div
//           ref={particlesRef}
//           className="absolute inset-0 pointer-events-none"
//         />
//         <div className="relative w-80 h-80 rounded-full overflow-hidden">
//           <div
//             ref={gradientRef}
//             className="absolute inset-0 w-full h-full"
//           />
//           <div
//             ref={circleRef}
//             className="absolute inset-0 bg-black opacity-20"
//           />
//         </div>
//       </div>

//       {/* Typing Text Container */}
//       <div className="max-w-2xl p-8 bg-gray-800 rounded-lg shadow-xl">
//         <TypingEffect
//           text={loremText}
//           color={currentColor}
//           onComplete={handleTypingComplete}
//         />
//       </div>

//       {/* Text Area and Submit */}
//       {isTypingComplete && (
//         <div className="w-full max-w-2xl space-y-4">
//           <textarea
//             className="w-full p-6 bg-gray-700 text-white rounded-lg resize-none
//                        text-xl border-2 border-gray-600 focus:border-current
//                        transition-colors duration-300"
//             rows={4}
//             placeholder="Enter your text here..."
//           />
//           <button
//             className="px-8 py-3 bg-current text-white rounded-lg hover:opacity-90
//                        transition-all duration-300 text-xl font-semibold"
//           >
//             Submit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnimatedCircleTyping;

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

let timeOut: any = null;

// Typing Component
interface TypingProps {
  text: string;
  color: string;
  onComplete: () => void;
}

const TypingEffect: React.FC<TypingProps> = ({ text, color, onComplete }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentText = '';
    const words = text.split(' ');
    let wordIndex = 0;

    const typeWord = () => {
      if (wordIndex >= words.length) {
        onComplete();
        return;
      }

      const word = words[wordIndex];
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex <= word.length) {
          currentText =
            words.slice(0, wordIndex).join(' ') +
            ' ' +
            word.slice(0, charIndex);

          if (textRef.current) {
            textRef.current.innerHTML =
              currentText +
              `<span style="color: ${color}; text-shadow: 0 0 10px ${color}44">` +
              `${word.slice(charIndex)}</span>` +
              `<span class="cursor" style="color: ${color}">|</span>`;
          }

          charIndex++;
          if (timeOut) clearTimeout(timeOut);
          timeOut = setTimeout(typeChar, 50);
        } else {
          wordIndex++;
          if (timeOut) clearTimeout(timeOut);
          timeOut = setTimeout(typeWord, 100);
        }
      };

      typeChar();
    };

    typeWord();
  }, [text, color, onComplete]);

  return (
    <div
      ref={textRef}
      className="text-white font-mono text-2xl leading-relaxed"
    />
  );
};

// Main Component
const AnimatedCircleTyping = () => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const loremText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  const createCycloneTransition = (fromColor: string, toColor: string) => {
    if (!svgRef.current) return;

    // Clear previous paths
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild);
    }

    // Create spiral segments
    const segments = 12;
    const rotations = 2;
    const radius = 160;

    for (let i = 0; i < segments; i++) {
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      const startAngle = (i / segments) * Math.PI * 2 * rotations;
      const endAngle = ((i + 1) / segments) * Math.PI * 2 * rotations;

      // Create spiral path
      let d = `M ${radius * Math.cos(startAngle)} ${radius * Math.sin(startAngle)}`;

      // Add curve points
      const points = 10;
      for (let j = 1; j <= points; j++) {
        const angle = startAngle + (endAngle - startAngle) * (j / points);
        const scale = 1 - (j / points) * 0.5;
        d += ` L ${radius * scale * Math.cos(angle)} ${radius * scale * Math.sin(angle)}`;
      }

      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', fromColor);
      path.setAttribute('stroke-width', '8');
      path.setAttribute('stroke-linecap', 'round');
      svgRef.current.appendChild(path);

      // Animate the path
      gsap.to(path, {
        stroke: toColor,
        duration: 0.5,
        delay: i * 0.05,
        ease: 'power2.inOut',
      });

      // Fade out and rotate
      gsap.to(path, {
        opacity: 0,
        rotation: 360,
        scale: 0,
        transformOrigin: 'center center',
        duration: 1,
        delay: i * 0.05,
        ease: 'power2.inOut',
      });
    }
  };

  const changeColor = () => {
    const nextIndex = (currentColorIndex + 1) % colors.length;
    const fromColor = colors[currentColorIndex];
    const toColor = colors[nextIndex];

    createCycloneTransition(fromColor, toColor);

    // Update background color with delay
    setTimeout(() => {
      if (circleRef.current) {
        circleRef.current.style.backgroundColor = toColor;
      }
      setCurrentColor(toColor);
      setCurrentColorIndex(nextIndex);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(changeColor, 3000);
    return () => clearInterval(interval);
  }, [currentColorIndex]);

  return (
    <div className="flex flex-col items-center gap-8 p-8 min-h-screen bg-gray-900">
      {/* Circle Container with SVG Overlay */}
      <div className="relative w-80 h-80">
        <div
          ref={circleRef}
          className="absolute inset-0 rounded-full transition-colors duration-500"
          style={{ backgroundColor: currentColor }}
        />
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="-160 -160 320 320"
        />
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        />
      </div>

      {/* Typing Text Container */}
      <div className="max-w-2xl p-8 bg-gray-800 rounded-lg shadow-xl">
        <TypingEffect
          text={loremText}
          color={currentColor}
          onComplete={() => setIsTypingComplete(true)}
        />
      </div>

      {/* Text Area and Submit */}
      {isTypingComplete && (
        <div className="w-full max-w-2xl space-y-4">
          <textarea
            className="w-full p-6 bg-gray-700 text-white rounded-lg resize-none 
                       text-xl border-2 border-gray-600 focus:border-current
                       transition-colors duration-300"
            rows={4}
            placeholder="Enter your text here..."
          />
          <button
            className="px-8 py-3 text-white rounded-lg hover:opacity-90 
                       transition-all duration-300 text-xl font-semibold"
            style={{ backgroundColor: currentColor }}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AnimatedCircleTyping;
