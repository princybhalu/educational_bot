// import React, { useState, useEffect } from 'react';
// import IntroductionImage from '../../assets/landing-page/introduction.png';


// const IntroductionComponent = () => {
//   const [isOldMethod, setIsOldMethod] = useState(true);
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true);
//       setTimeout(() => {
//         setIsOldMethod((prev) => !prev);
//         setIsTransitioning(false);
//       }, 300);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 max-w-7xl">
//       {/* Title Section */}
//       <div className="text-center mb-8 md:mb-12">
//         <h1 className="text-[#003366]">
//           <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-2">
//             Why Traditional Learning
//           </span>
//           <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
//             Isn&apos;t Enough
//           </span>
//         </h1>
//       </div>

//       {/* Toggle Buttons */}
//       <div className="bg-[#FFE2CF] rounded-lg p-2 sm:p-3 mb-8 md:mb-12 max-w-3xl mx-auto">
//         <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-4">
//           <button
//             onClick={() => setIsOldMethod(true)}
//             className={`flex-1 px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base md:text-lg
//               ${
//                 isOldMethod
//                   ? 'bg-white text-[#003366] shadow-md font-medium'
//                   : 'text-gray-600 hover:bg-white/50'
//               }`}
//           >
//             Traditional Learning Method
//           </button>
//           <button
//             onClick={() => setIsOldMethod(false)}
//             className={`flex-1 px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base md:text-lg
//               ${
//                 !isOldMethod
//                   ? 'bg-white text-[#003366] shadow-md font-medium'
//                   : 'text-gray-600 hover:bg-white/50'
//               }`}
//           >
//             With our AI
//           </button>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
//         <div
//           className={`space-y-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
//         >
//           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] leading-tight">
//             {isOldMethod ? 'In a typical classroom,' : 'In a modern classroom,'}
//           </h2>

//           <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
//             {isOldMethod
//               ? "One teacher handles many students, each with different learning needs. This one-size-fits-all approach often leaves students feeling lost or behind, even though they're fully capable of succeeding."
//               : 'Teachers use personalized learning approaches to cater to the individual needs of each student. This method helps students stay engaged and succeed at their own pace.'}
//           </p>

//           <ul className="space-y-3 text-gray-700">
//             {isOldMethod ? (
//               <>
//                 <ListItem>Limited individual attention</ListItem>
//                 <ListItem>Standardized pace for all</ListItem>
//                 <ListItem>Fixed teaching methods</ListItem>
//                 <ListItem>One-size-fits-all approach</ListItem>
//               </>
//             ) : (
//               <>
//                 <ListItem>Personalized learning plans</ListItem>
//                 <ListItem>AI-powered adaptive learning</ListItem>
//                 <ListItem>Real-time feedback system</ListItem>
//                 <ListItem>Flexible learning pace</ListItem>
//               </>
//             )}
//           </ul>
//         </div>

//         <div className="relative h-full flex items-center justify-center">
//           <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl">
//             <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/5 to-[#FFE2CF]/5"></div>
//             <div className="relative group">
//               <div className="absolute inset-0 bg-[#003366]/0 group-hover:bg-[#003366]/5 transition-colors duration-300"></div>
//               <img
//                 src={IntroductionImage}
//                 alt="Learning illustration"
//                 className="relative w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // List Item Component
// const ListItem = ({ children }: { children: React.ReactNode }) => (
//   <li className="flex items-start space-x-3 text-sm sm:text-base md:text-lg">
//     <svg
//       className="w-5 h-5 text-[#003366] mt-1 flex-shrink-0"
//       viewBox="0 0 20 20"
//       fill="currentColor"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//         clipRule="evenodd"
//       />
//     </svg>
//     <span>{children}</span>
//   </li>
// );

// export default IntroductionComponent;


import React, { useState, useEffect } from 'react';
import IntroductionImage from '../../assets/landing-page/introduction.png';

const IntroductionComponent: React.FC = () => {
  const [tabState, setTabState] = useState({
    isOldMethod: true,
    userChanged: false,
  });

  // Handle tab change
  const handleTabChange = (isOldMethod: boolean) => {
    setTabState({
      isOldMethod,
      userChanged: true, // Mark that the user manually changed the tab
    });
  };

  useEffect(() => {
    if (!tabState.userChanged) {
      const interval = setInterval(() => {
        setTabState((prev) => ({
          isOldMethod: !prev.isOldMethod,
          userChanged: prev.userChanged, // Keep the userChanged state intact
        }));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [tabState.userChanged]);

  return (
    <div className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 max-w-7xl">
      {/* Title Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-[#003366]">
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-2">
            Why Traditional Learning
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            Isn&apos;t Enough
          </span>
        </h1>
      </div>

      {/* Toggle Buttons */}
      <div className="bg-[#FFE2CF] rounded-lg p-2 sm:p-3 mb-8 md:mb-12 max-w-3xl mx-auto">
        <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
            onClick={() => handleTabChange(true)}
            className={`flex-1 px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base md:text-lg
              ${
                tabState.isOldMethod
                  ? 'bg-white text-[#003366] shadow-md font-medium'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
          >
            Traditional Learning Method
          </button>
          <button
            onClick={() => handleTabChange(false)}
            className={`flex-1 px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base md:text-lg
              ${
                !tabState.isOldMethod
                  ? 'bg-white text-[#003366] shadow-md font-medium'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
          >
            With our AI
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div
          className={`space-y-6 transition-opacity duration-300 ${tabState.userChanged ? 'opacity-100' : 'opacity-100'}`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003366] leading-tight">
            {tabState.isOldMethod ? 'In a typical classroom,' : 'In a modern classroom,'}
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
            {tabState.isOldMethod
              ? "One teacher handles many students, each with different learning needs. This one-size-fits-all approach often leaves students feeling lost or behind, even though they're fully capable of succeeding."
              : 'Teachers use personalized learning approaches to cater to the individual needs of each student. This method helps students stay engaged and succeed at their own pace.'}
          </p>

          <ul className="space-y-3 text-gray-700">
            {tabState.isOldMethod ? (
              <>
                <ListItem>Limited individual attention</ListItem>
                <ListItem>Standardized pace for all</ListItem>
                <ListItem>Fixed teaching methods</ListItem>
                <ListItem>One-size-fits-all approach</ListItem>
              </>
            ) : (
              <>
                <ListItem>Personalized learning plans</ListItem>
                <ListItem>AI-powered adaptive learning</ListItem>
                <ListItem>Real-time feedback system</ListItem>
                <ListItem>Flexible learning pace</ListItem>
              </>
            )}
          </ul>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#003366]/5 to-[#FFE2CF]/5"></div>
            <div className="relative group">
              <div className="absolute inset-0 bg-[#003366]/0 group-hover:bg-[#003366]/5 transition-colors duration-300"></div>
              <img
                src={IntroductionImage}
                alt="Learning illustration"
                className="relative w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// List Item Component
const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start space-x-3 text-sm sm:text-base md:text-lg">
    <svg
      className="w-5 h-5 text-[#003366] mt-1 flex-shrink-0"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <span>{children}</span>
  </li>
);

export default IntroductionComponent;
