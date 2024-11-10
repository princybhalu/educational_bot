// import React from 'react';

// const ChoicePath: React.FC<{
//     scrollToComponent: (componentId: 'intro' | 'assessment') => void;
//   }> = ({
//     scrollToComponent,
//   }) => {
//   return (
//     <div className="ChoicePath-container">
//       <h1 className="ChoicePath-title">Choose Your Learning Path</h1>
//       <p className="ChoicePath-subtitle">Select the assessment style that feels most natural to you</p>

//       <div className="ChoicePath-choice-cards">
//         <div className="ChoicePath-choice-card" style={{ '--index': 0 } as React.CSSProperties}>
//           <div className="ChoicePath-highlight"></div>
//           <div className="ChoicePath-card-content">
//             <div className="ChoicePath-card-icon">⋮</div>
//             <h2 className="ChoicePath-card-title">Guided Questions</h2>
//             <p className="ChoicePath-card-description">
//               Take a structured approach with our carefully crafted questions designed to understand your unique learning style.
//             </p>
//             <button className="ChoicePath-start-btn">Start Guided Journey</button>
//           </div>
//         </div>

//         <div className="ChoicePath-choice-card" style={{ '--index': 1 } as React.CSSProperties}>
//           <div className="ChoicePath-highlight"></div>
//           <div className="ChoicePath-card-content">
//             <div className="ChoicePath-card-icon">+</div>
//             <h2 className="ChoicePath-card-title">Free Description</h2>
//             <p className="ChoicePath-card-description">
//               Express yourself freely and tell us about your learning preferences in your own words.
//             </p>
//             <button className="ChoicePath-start-btn">Start Free Expression</button>
//           </div>
//         </div>
//       </div>

//       <button className="ChoicePath-return-btn" onClick={() => scrollToComponent('intro')}>
//         <span>↑</span>
//         Return to Introduction
//       </button>
//     </div>
//   );
// };

// export default ChoicePath;

import React from 'react';
import { ChevronUp, Menu, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PsychologicalProfileRoutesName } from '../../utils/enums';

// Custom styles for animations
const styles = `
@keyframes titlePulse {
  0%, 100% { text-shadow: 0 0 30px rgba(67, 97, 238, 0.8); }
  50% { text-shadow: 0 0 50px rgba(67, 97, 238, 1), 0 0 80px rgba(67, 97, 238, 0.5); }
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.title-pulse {
  animation: titlePulse 3s infinite;
}

.card-float-0 {
  animation: cardFloat 3s ease-in-out infinite;
}

.card-float-1 {
  animation: cardFloat 3s ease-in-out infinite;
  animation-delay: 0.2s;
}

.glass-morph {
  backdrop-filter: blur(10px);
  background: rgba(13, 15, 30, 0.5);
}
`;

const ChoicePath = ({
  scrollToComponent,
}: {
  scrollToComponent: (componentId: 'intro' | 'assessment') => void;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <style>{styles}</style>
      <div className="relative z-[2] w-full max-w-[500px] p-4 md:p-8 md:mt-4 text-white mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-4 tracking-wide title-pulse">
          Choose Your Learning Path
        </h1>

        <p className="text-white/80 text-center mb-12 text-lg">
          Select the assessment style that feels most natural to you
        </p>

        <div className="flex flex-col gap-4 md:gap-6">
          {/* Guided Questions Card */}
          <div className="card-float-0 relative glass-morph rounded-3xl overflow-hidden border border-[#4361ee4d] transition-all duration-400">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-[1] p-8">
              <div
                className="w-8 h-8 md:w-16 md:h-16  rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                          flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
              >
                <Menu className="w-4 h-4 md:w-8 md:h-8 text-white" />
              </div>

              <h2 className="text-2xl font-semibold text-white mb-2 md:mb-4">
                Guided Questions
              </h2>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-4 md:mb-6">
                Take a structured approach with our carefully crafted questions
                designed to understand your unique learning style.
              </p>

              <button
                className="w-full bg-gradient-to-r from-[#4361ee] to-[#3498db] text-white py-2 px-4 md:py-2 md:px-8 rounded-full text-lg md:text-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(67,97,238,0.5)] relative overflow-hidden shadow-[0_0_30px_rgba(67,97,238,0.3)]"
                onClick={() =>
                  navigate(PsychologicalProfileRoutesName.QUESTIONS)
                }
              >
                Start Guided Journey
              </button>
            </div>
          </div>

          {/* Free Description Card */}
          <div className="card-float-1 relative glass-morph rounded-3xl overflow-hidden border border-[#4361ee4d] transition-all duration-400">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(67,97,238,0.1)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-[1] p-8">
              <div
                className="w-8 h-8 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                          flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30"
              >
                <PlusCircle className="w-4 h-4 md:w-8 md:h-8 text-white" />
              </div>

              <h2 className="text-2xl font-semibold text-white mb-2 md:mb-4">
                Free Description
              </h2>

              <p className="text-white/80 text-lg md:text-xl  leading-relaxed mb-4 md:mb-6">
                Express yourself freely and tell us about your learning
                preferences in your own words.
              </p>

              <button
                className="w-full bg-gradient-to-r from-[#4361ee] to-[#3498db] text-white py-2 px-4 md:py-2 md:px-8 rounded-full text-lg md:text-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(67,97,238,0.5)] relative overflow-hidden shadow-[0_0_30px_rgba(67,97,238,0.3)]"
                onClick={() =>
                  navigate(PsychologicalProfileRoutesName.DESCRIPTION)
                }
              >
                Start Free Expression
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => scrollToComponent('intro')}
          className="mt-4 md:mt-10  w-full glass-morph text-white/80 border border-[#4361ee4d] py-4 rounded-xl text-base md:text-md transition-all duration-300 hover:bg-[rgba(67,97,238,0.2)] hover:border-[#4361ee80] hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          <ChevronUp className="w-6 h-6" />
          Return to Introduction
        </button>
      </div>
    </>
  );
};

export default ChoicePath;
