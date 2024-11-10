// import { useState } from "react";
// import { FaArrowRight, FaSyncAlt } from "react-icons/fa";

// const MetricCard: React.FC<{
//     title: string;
//     icon: React.ReactNode;
//     scale: number;
//     total: number;
//     text: string;
//   }> = ({ title, icon, scale, text }) => {
//     const [isFlipped, setIsFlipped] = useState(false);

//     return (
//       <div className="relative h-[200px] group">
//         <div
//           className={`absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
//             isFlipped ? '[transform:rotateY(180deg)]' : ''
//           }`}
//         >
//           {/* Front */}
//           <div className="absolute w-full h-full [backface-visibility:hidden] bg-[rgba(16,20,46,0.6)] rounded-2xl p-6 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-white/90">{title}</h3>
//               <div className="w-10 h-10 flex items-center justify-center bg-[rgba(67,97,238,0.15)] rounded-lg text-xl">
//                 {icon}
//               </div>
//             </div>
//             <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
//               <div
//                 className="h-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-full transition-all duration-1000"
//                 style={{ width: `${(scale / 10) * 100}%` }}
//               />
//             </div>
//             <div className="flex justify-between text-sm">
//               <div>
//                 <p className="text-white/60">Score</p>
//                 <p className="text-[#4cc9f0] font-medium">
//                   {((scale / 10) * 100).toFixed(0)}%
//                 </p>
//               </div>
//               <button
//                 onClick={() => setIsFlipped(true)}
//                 className="flex items-center gap-2 text-[#4cc9f0] hover:text-white transition-colors duration-300"
//               >
//                 Details <FaArrowRight />
//               </button>
//             </div>
//           </div>

//           {/* Back */}
//           <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[rgba(16,20,46,0.6)] rounded-2xl p-6 border border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
//             <div className="h-full flex flex-col">
//               <p className="text-white/90 flex-grow">{text}</p>
//               <button
//                 onClick={() => setIsFlipped(false)}
//                 className="flex items-center gap-2 text-[#4cc9f0] hover:text-white transition-colors duration-300 mt-4"
//               >
//                 <FaSyncAlt /> Flip Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default MetricCard;

import React from 'react';

export default function MetricCard() {
  return <div>MetricCard</div>;
}
