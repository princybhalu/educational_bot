// Filp Card Animation
// import React, { useState, useEffect } from 'react';
// import arrowImage from '../../assets/arrow.png';
// import nagetiveFaceEmoji from "../../assets/nagetiveFaceEmoji.png";
// import nagetiveBookEmoji from "../../assets/nagetiveBookEmoji.png";
// import nagetiveDownFlowEmoji from "../../assets/nagetiveDownFlowEmoji.png";

// // Custom hook for typewriter effect
// const useTypewriter = (text : string, speed = 50) => {
//   const [displayText, setDisplayText] = useState('');
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     if (index < text.length) {
//       const timer = setTimeout(() => {
//         setDisplayText((prev) => prev + text[index]);
//         setIndex((prev) => prev + 1);
//       }, speed);

//       return () => clearTimeout(timer);
//     }
//   }, [index, text, speed]);

//   return displayText;
// };

// const StrugglingSection: React.FC = () => {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const typewriterText = useTypewriter("YES Tailored Learning with Edubot", 100);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIsFlipped((per) => !per);
//     }, 2000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 element h-screen lg:h-[50vh] sm:h-screen">
//       <div className="max-w-7xl mx-auto text-center">
//         <h2 className="space-grotesk font-bold w-50 text-[26px] sm:text-[35px] md:text-[38px] lg:text-[46px] leading-normal sm:leading-snug md:leading-relaxed lg:leading-tight">
//           Are You Struggling To Keep Up In Traditional Classrooms?
//           {isFlipped && <><br/><span className='text-blue-500'>{typewriterText}</span></>}
//         </h2>
//         <div className="mt-20">
//           <div className={`flip-card w-full h-[400px] perspective-1000 ${isFlipped ? 'flipped' : ''}`}>
//             <div className="flip-card-inner relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d">
//               {/* Negative Part (Front) */}
//               <div className="flip-card-front absolute w-full h-full backface-hidden">
//                 <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
//                   <CardItem
//                     emoji='📚'
//                     alt="Books"
//                     text="Struggling with a standardized, impersonal educational model"
//                   />
//                   <ArrowImage />
//                   <CardItem
//                     emoji='😓'
//                     alt="Struggling"
//                     text="Struggling to keep pace with the accelerated pace of coursework"
//                   />
//                   <ArrowImage />
//                   <CardItem
//                     emoji='📉'
//                     alt="Graph Down"
//                     text="Limited personalized assistance in the lead-up to exams"
//                   />
//                 </div>
//               </div>
//               {/* Positive Part (Back) */}
//               <div className="flip-card-back absolute w-full h-full backface-hidden transform rotate-y-180">
//                 <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
//                   <CardItem
//                     emoji="🎯"
//                     text="EduBot offers personalized learning paths for you"
//                   />
//                   <ArrowImage />
//                   <CardItem
//                     emoji="😃"
//                     text="Learn at your own pace with adaptive content"
//                   />
//                   <ArrowImage />
//                   <CardItem
//                     emoji="📈"
//                     text="Get tailored support and resources before exams"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CardItem: React.FC<{ image?: string; emoji?: string; alt?: string; text: string , className?: string}> = ({ image, emoji, alt, text , className = "" }) => (
//   <div className={`flex flex-col items-center ` + className }>
//     {image && <img src={image} alt={alt} className="h-20 w-20" />}
//     {emoji && <span className="text-7xl">{emoji}</span>}
//     <h3 className="mt-4 text-xl font-medium">{text}</h3>
//   </div>
// );

// const ArrowImage: React.FC = () => (
//   <img src={arrowImage} alt="Arrow" className="h-10 w-auto hidden sm:block" />
// );

// export default StrugglingSection;

// without flip
import React from "react";
import arrowImage from "../../assets/arrow.png";
import nagetiveFaceEmoji from "../../assets/nagetiveFaceEmoji.png";
import nagetiveBookEmoji from "../../assets/nagetiveBookEmoji.png";
import nagetiveDownFlowEmoji from "../../assets/nagetiveDownFlowEmoji.png";

const StrugglingSection: React.FC = () => {
  return (
    <div className="struggling-section-div bg-white py-16 px-4 sm:px-6 lg:px-8 element">
      {/* nagetive part */}
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="space-grotesk font-bold text-[28px] sm:text-[35px] md:text-[38px] lg:text-[46px] leading-normal sm:leading-snug md:leading-relaxed lg:leading-tight">
          Are You Struggling To Keep Up In Traditional Classrooms?
        </h2>

        <div className="mt-20 flex flex-col sm:flex-row justify-center items-center gap-8">
          {/* First Card */}
          <div className="flex flex-col items-center">
            <img src={nagetiveBookEmoji} alt="Books" className="h-20 w-20" />
            <h3 className="mt-4 text-xl font-medium">
              Struggling with a standardized, impersonal educational model
            </h3>
          </div>

          {/* Arrow Between Cards */}
          <img
            src={arrowImage}
            alt="Arrow"
            className="h-10 w-auto hidden sm:block"
          />

          {/* Second Card */}
          <div className="flex flex-col items-center">
            <img
              src={nagetiveFaceEmoji}
              alt="Struggling"
              className="h-20 w-20"
            />
            <h3 className="mt-4 text-xl font-medium">
              Struggling to keep pace with the accelerated pace of coursework
            </h3>
          </div>

          {/* Arrow Between Cards */}
          <img
            src={arrowImage}
            alt="Arrow"
            className="h-10 w-auto hidden sm:block"
          />

          {/* Third Card */}
          <div className="flex flex-col items-center">
            <img
              src={nagetiveDownFlowEmoji}
              alt="Graph Down"
              className="h-20 w-20"
            />
            <h3 className="mt-4 text-xl font-medium">
              Limited personalized assistance in the lead-up to exams
            </h3>
          </div>
        </div>
      </div>

      {/* positive part */}
   
    </div>
  );
};

export default StrugglingSection;


