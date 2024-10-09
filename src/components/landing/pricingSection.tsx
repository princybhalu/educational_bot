import React from "react";

const CheckMark: React.FC<{ tick?: boolean }> = ({ tick = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={tick ? "green" : "currentColor"} // Change fill color based on tick
    className="size-6" // Ensure size class is applied
  >
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  </svg>
);


const PricingPlans: React.FC = () => {
  return (
    <div className="lg:flex-row items-center justify-center min-h-screen bg-white text-black font-sans mt-20 mb-20 my-3">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center">
        Invest in Your Future with Flexible Plans
      </h1>
      <p className="text-center text-lg mb-12 lg:mb-20 text-gray-600">
        Choose the perfect package to unlock your learning potential
      </p>
      <div className="flex flex-col mx-auto lg:flex-row gap-6 justify-center w-full max-w-6xl">
        {/* Basic Plan */}
        <div className="text-white rounded-lg shadow-md p-6 flex flex-col animate-shimmer border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <div className="text-3xl font-bold mb-6">
            $299 <span className="text-base text-gray-400">Per Month</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">Basic</h2>
          <p className="text-gray-300 mb-6">
            Essential tools for small teams, affordable learning experience.
          </p>
          <div className="flex-1">
            <ul className="text-gray-300 mb-8">
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Personalized learning paths
              </li>
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Basic progress tracking
              </li>
              <li className="flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Limited content library
              </li>
            </ul>
          </div>
          <button className="bg-white text-black rounded-lg py-2 text-center hover:text-white hover:bg-black">
            Get started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-900 text-white rounded-lg shadow-md p-6 flex flex-col
        border-slate-800 bg-blue-900 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 animate-shimmer " 
        style={{backgroundColor: "#002E4D" , animation: 'shimmer 1.5s infinite',}}>
          <div className="text-3xl font-bold mb-6">
            $399 <span className="text-base" style={{color: "#F6A322"}}>Per Month</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Pro</h2>
          <p className="mb-6">
            Advanced features, ideal for growing teams needing more
            customization.
          </p>
          <div className="flex-1">
            <ul className="mb-8">
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark 
                  //@ts-ignore
                  tick/>
                </span>{" "}
                All Basic features
              </li>
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark //@ts-ignore
                  tick/>
                </span>{" "}
                Advanced analytics
              </li>
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark //@ts-ignore
                  tick/>
                </span>{" "}
                Full content library
              </li>
              <li className="flex">
                <span className="mr-2">
                  <CheckMark //@ts-ignore
                  tick/>
                </span>{" "}
                Mental health support
              </li>
            </ul>
          </div>
          <button className="text-black rounded-lg py-2 text-center" style={{backgroundColor: "#F6A322"}}>
            Get started
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="text-white rounded-lg shadow-md p-6 flex flex-col animate-shimmer border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <div className="text-3xl font-bold mb-6">
            $499+ <span className="text-base text-gray-400">Per Month</span>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">
            Enterprise
          </h2>
          <p className="text-gray-300 mb-6">
            Scalable solutions, comprehensive support for large organizations.
          </p>
          <div className="flex-1">
            <ul className="text-gray-300 mb-8">
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                All Pro features
              </li>
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Custom integrations
              </li>
              <li className="mb-2 flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Dedicated support
              </li>
              <li className="flex">
                <span className="mr-2">
                  <CheckMark />
                </span>{" "}
                Group management tools
              </li>
            </ul>
          </div>
          <button className="bg-white text-black rounded-lg py-2 text-center w-full">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;

// 1 st from website ref
// import React, { useState, useEffect } from "react";

// enum PricingNameList {
//   BASIC = "Basic",
//   PRO = "Pro",
//   ENTERPRISE = "Enterprise",
// }

// const DelayTimer = 20;

// const CheckMark: React.FC = () => (
//   <>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="currentColor"
//       className="size-6"
//     >
//       <path
//         fillRule="evenodd"
//         d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//         clipRule="evenodd"
//       />
//     </svg>
//   </>
// );

// interface CircularLoaderProps {
//   percentage: number;
// }

// const CircularLoader: React.FC<CircularLoaderProps> = ({ percentage }) => (
//   <svg className="w-6 h-6" viewBox="0 0 36 36">
//     <path
//       className="circle"
//       d="M18 2.0845
//         a 15.9155 15.9155 0 0 1 0 31.831
//         a 15.9155 15.9155 0 0 1 0 -31.831"
//       fill="none"
//       stroke="#2e2c2c"
//       strokeWidth="2.5"
//     />
//     <path
//       className="circle"
//       strokeDasharray={`${percentage}, 100`}
//       d="M18 2.0845
//         a 15.9155 15.9155 0 0 1 0 31.831
//         a 15.9155 15.9155 0 0 1 0 -31.831"
//       fill="none"
//       stroke="#ffffff"
//       strokeWidth="2.5"
//     />
//   </svg>
// );

// const PricingSection: React.FC = () => {
//   const [activeCard, setActiveCard] = useState<PricingNameList>(
//     PricingNameList.BASIC
//   );
//   const [remainingTime, setRemainingTime] = useState<number>(DelayTimer);

//   const cardList = [
//     PricingNameList.BASIC,
//     PricingNameList.PRO,
//     PricingNameList.ENTERPRISE,
//   ];

//   // Function to handle card change manually
//   const onClickOnPricing = (whichSelected: PricingNameList) => {
//     setActiveCard(whichSelected);
//     setRemainingTime(DelayTimer); // Reset timer
//   };

//   // Function to auto-switch cards every DelayTimer seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRemainingTime((prevTime) =>
//         prevTime === 1 ? DelayTimer : prevTime - 1
//       );
//     }, 1000);

//     if (remainingTime === 1) {
//       setActiveCard((prevCard) => {
//         const currentIndex = cardList.indexOf(prevCard);
//         const nextIndex = (currentIndex + 1) % cardList.length;
//         return cardList[nextIndex];
//       });
//     }

//     return () => clearInterval(interval);
//   }, [remainingTime]);

//   return (
//     <>
//       <div id="pricing" className="my-10 min-h-[80vh] element">
//         <div className="text-center font-bold text-4xl">
//           Invest in Your Future with Flexible Plans
//         </div>
//         <div className="text-center text-xl text-gray-500">
//           Choose the perfect package to unlock your learning potential
//         </div>
//         <div className="container mx-auto px-4 mt-8">
//           <div className="flex h-full">
//             <div className="flex-1 p-4">
//               {/* Render Basic, Pro, and Enterprise based on the activeCard */}
//               {activeCard === PricingNameList.BASIC && (
//                 <div className="w-66 m-7 p-6 border rounded-lg border-orange-300 shadow-sm">
//                   <p className="text-xl font-semibold text-gray-700">
//                     {PricingNameList.BASIC}
//                   </p>
//                   <p className="mt-2 text-3xl font-bold text-gray-900">
//                     $19<span className="text-base font-normal">/month</span>
//                   </p>
//                   <div className="mt-4">
//                     <p className="flex items-center mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Personalized learning paths
//                     </p>
//                     <p className="flex items-center mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Basic progress tracking
//                     </p>
//                     <p className="flex items-center  mb-4">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Limited content library
//                     </p>
//                     <button className="inline-flex h-12 text-white animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,40%,#3a4a60,50%,#6c798f,60%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors shadow-lg shadow-slate-900/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       Get Started
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {activeCard === PricingNameList.PRO && (
//                 <div className="w-65 m-7 p-6 border rounded-lg border-orange-300 shadow-sm">
//                   <p className="text-xl font-semibold text-gray-700">
//                     {PricingNameList.PRO}
//                   </p>
//                   <p className="mt-2 text-3xl font-bold text-gray-900">
//                     $39<span className="text-base font-normal">/month</span>
//                   </p>
//                   <div className="mt-4">
//                     <p className="flex items-center  mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       All Basic features
//                     </p>
//                     <p className="flex items-center mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Advanced analytics
//                     </p>
//                     <p className="flex items-center  mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Full content library
//                     </p>
//                     <p className="flex items-center  mb-4">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Mental health support
//                     </p>
//                     <button className="inline-flex h-12 text-white animate-shimmer items-center  rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,40%,#3a4a60,50%,#6c798f,60%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors shadow-lg shadow-slate-900/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       Get Started
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {activeCard === PricingNameList.ENTERPRISE && (
//                 <div className="w-65 m-7 p-6 border rounded-lg border-orange-300 shadow-sm">
//                   <p className="text-xl font-semibold text-gray-700">
//                     {PricingNameList.ENTERPRISE}
//                   </p>
//                   <p className="mt-2 text-3xl font-bold text-gray-900">
//                     $99<span className="text-base font-normal">/month</span>
//                   </p>
//                   <div className="mt-4">
//                     <p className="flex items-center  mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       All Pro features
//                     </p>
//                     <p className="flex items-center  mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Custom integrations
//                     </p>
//                     <p className="flex items-center  mb-2">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Dedicated support
//                     </p>
//                     <p className="flex items-center mb-4">
//                       <span className="mr-2">
//                         <CheckMark />
//                       </span>
//                       Group management tools
//                     </p>
//                     <button className="inline-flex h-12 text-white animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,40%,#3a4a60,50%,#6c798f,60%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors shadow-lg shadow-slate-900/30 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                       Get Started
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Card selection list with remaining time and loader */}
//             <div className="flex-1 p-4 h-full">
//               <ul className="space-y-2">
//                 {cardList.map((card) => (
//                   <li
//                     key={card}
//                     className={`justify-center text-center text-white items-center p-4 border border-gray-200 rounded text-xl cursor-pointer
//                     ${
//                       activeCard === card ? "bg-orange-500" : "bg-black"
//                     } transition duration-500`}
//                     onClick={() => onClickOnPricing(card)}
//                   >
//                     <div className="flex justify-start">
//                       {activeCard === card && (
//                         <div className="flex justify-center items-center mt-2">
//                           <CircularLoader
//                             percentage={(remainingTime / DelayTimer) * 100}
//                           />
//                         </div>
//                       )}
//                       <div className="justify-center w-full">
//                       {card}
//                       <p className="mt-1">
//                         $
//                         <span className="font-bold text-3xl">
//                           {card === PricingNameList.BASIC
//                             ? 19
//                             : card === PricingNameList.PRO
//                             ? 39
//                             : 99}
//                         </span>
//                         /Month
//                       </p>
//                       </div>

//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PricingSection;
