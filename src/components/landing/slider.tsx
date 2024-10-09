// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import customziedPath from "../../assets/customzied_path.jpeg";
// import customziedPath1 from "../../assets/customzied_path_1.jpg";
// import interactiveLearning from "../../assets/interactive-learning.webp"; 
// import dailyStudyPlanner from "../../assets/daily-study-planner.webp";
// import progessMatrix from "../../assets/progess-matrix.webp";

// interface SliderSettings {
//   dots: boolean;
//   infinite: boolean;
//   speed: number;
//   slidesToShow: number;
//   slidesToScroll: number;
//   autoplay: boolean;
//   autoplaySpeed: number;
//   responsive: {
//     breakpoint: number;
//     settings: {
//       slidesToShow?: number;
//       slidesToScroll?: number;
//       dots?: boolean;
//       infinite?: boolean;
//       speed?: number;
//       autoplay?: boolean;
//       autoplaySpeed?: number;
//     };
//   }[];
// }

// const SliderComponent: React.FC = (props) => {
//   const [sliderRef, setSliderRef] = useState<Slider | null>(null);

//   const settings: SliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     //@ts-ignore
//     beforeChange: (oldIndex, newIndex) => props?.setCurrentBgFuc(newIndex), // Track the current slide
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div
//         className="mb-20 element transition-all duration-500 ease-in-out text-white justify-between items-center max-w-[1280px] mx-auto"
//       >
//         <Slider className="min-h-full" ref={setSliderRef} {...settings}>
//           {/* 1 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Customised Learning Path
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Every learner is unique, and so is their path to success.
//                       Our AI-driven learning paths adjust to your pace,
//                       providing personalized content that enhances your
//                       strengths while focusing on areas where you need
//                       improvement. Whether learning through your syllabus or
//                       specific topics, we deliver a tailored curriculum for
//                       maximum retention and exam success.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={customziedPath1}
//                       alt="Customized Path"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 2 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Interactive Learning Options
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Transform the way you learn with our interactive tools.
//                       Join syllabus-based discussions, explore topics that
//                       interest you, and prepare for exams with real-time
//                       feedback. With personalized quizzes and instant reviews,
//                       your study sessions will be more productive and enjoyable.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={interactiveLearning}
//                       alt="Interactive Learning"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 3 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Daily Study Planner
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Stay organized and maximize your time with our Daily Study
//                       Planner. Whether you're balancing school, college, or
//                       career, our planner adapts to your schedule, helping you
//                       track your progress and stay focused on your goals.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={dailyStudyPlanner}
//                       alt="Daily Study Planner"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 4 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Progress Matrix & Exam Strategy
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Gauge your readiness with our Progress Matrix and Exam
//                       Strategy. Track your understanding, revisit weak areas,
//                       and improve your overall performance. Plus, tailor your
//                       exam strategy based on real-time insights and analytics.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={progessMatrix}
//                       alt="Progress Matrix"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//             {/* 5 */}
//             <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Exam Preparation, Tools, & Paper Prediction
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Stay ahead with our exam preparation tools. Access
//                       important concepts, model papers, and predictions based on
//                       past exams. Practice smarter and ensure you’re fully
//                       prepared.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={customziedPath}
//                       alt="Customized Path"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 6 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Mental Health & Stress Support
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Studying shouldn’t overwhelm you. Access expert mental
//                       health support, stress management tools, and guided
//                       relaxation sessions to keep your mind healthy and focused.
//                       Take control of your well-being and thrive academically.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={customziedPath}
//                       alt="Customized Path"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 7 */}
//           <div className="slide-content">
//             <div className="flex items-center justify-center min-h-[70vh]">
//               <div className="container mx-auto">
//                 <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
//                   <div className="flex-1">
//                     <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">
//                       Career Assessment Tools
//                     </h1>
//                     <p className="text-lg lg:text-xl">
//                       Unlock your potential with AI-driven career insights.
//                       Discover your strengths, take career aptitude tests, and
//                       receive personalized suggestions to guide you toward the
//                       perfect career path.
//                     </p>
//                   </div>
//                   <div className="flex-1 mt-8 lg:mt-0 relative w-72 h-72 lg:w-80 lg:h-80 flex items-center justify-center">
//                     <img
//                       src={customziedPath}
//                       alt="Customized Path"
//                       className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Slider>
//       </div>
//     </>
//   );
// };

// export default SliderComponent;



import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customziedPath from "../../assets/customzied_path.jpeg";
import customziedPath1 from "../../assets/customzied_path_1.jpg";
import interactiveLearning from "../../assets/interactive-learning.webp"; 
import dailyStudyPlanner from "../../assets/daily-study-planner.webp";
import progessMatrix from "../../assets/progess-matrix.webp";

interface SlideContent {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
}

const slidesData: SlideContent[] = [
  {
    title: "Customised Learning Path",
    description: "Every learner is unique, and so is their path to success. Our AI-driven learning paths adjust to your pace, providing personalized content that enhances your strengths while focusing on areas where you need improvement. Whether learning through your syllabus or specific topics, we deliver a tailored curriculum for maximum retention and exam success.",
    imageSrc: customziedPath1,
    altText: "Customized Path",
  },
  {
    title: "Interactive Learning Options",
    description: "Transform the way you learn with our interactive tools. Join syllabus-based discussions, explore topics that interest you, and prepare for exams with real-time feedback. With personalized quizzes and instant reviews, your study sessions will be more productive and enjoyable.",
    imageSrc: interactiveLearning,
    altText: "Interactive Learning",
  },
  {
    title: "Daily Study Planner",
    description: "Stay organized and on track with our AI-powered Daily Study Planner. Customize your study schedule, receive reminders to stay productive, and manage tasks effortlessly. Achieve your goals without the stress and last-minute cramming—plan smarter, learn better.",
    imageSrc: dailyStudyPlanner,
    altText: "Daily Study Planner",
  },
  {
    title: "Progress Matrix & Exam Strategy",
    description: "Track your academic progress in real-time with in-depth analytics. Monitor your performance, review recent activities, and discover your strengths and weaknesses. Get personalized insights to improve and achieve your academic goals faster.",
    imageSrc: progessMatrix,
    altText: "Progress Matrix",
  },
  {
    title: "Exam Preparation, Tools, & Paper Prediction",
    description: "Stay ahead with our exam preparation tools. Access important concepts, model papers, and predictions based on past exams. Practice smarter and ensure you’re fully prepared.",
    imageSrc: customziedPath,
    altText: "Exam Preparation",
  },
  {
    title: "Mental Health & Stress Support",
    description: "Studying shouldn’t overwhelm you. Access expert mental health support, stress management tools, and guided relaxation sessions to keep your mind healthy and focused. Take control of your well-being and thrive academically.",
    imageSrc: customziedPath,
    altText: "Mental Health",
  },
  {
    title: "Career Assessment Tools",
    description: " Unlock your potential with AI-driven career insights.Discover your strengths, take career aptitude tests, and receive personalized suggestions to guide you toward the perfect career path.",
    imageSrc: customziedPath,
    altText: "Career Assessment",
  },
];

const SliderComponent: React.FC = (props) => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: any) => (
      <div className="w-full">
        <ul className="w-full flex justify-center gap-2">
          {dots.map((dot: any, index: number) => (
            <li key={index}>{dot}</li>
          ))}
        </ul>
      </div>
    ),
    customPaging: () => <div className="w-8 h-1 bg-gray-500 rounded"></div>,
    //@ts-ignore
    beforeChange: (oldIndex: number, newIndex: number) => props?.setCurrentBgFuc?.(newIndex),
    nextArrow: <></>,
    prevArrow: <></>
  };

  return (
    <div className="mb-20 element transition-all duration-500 ease-in-out text-white justify-between items-center max-w-[1280px] mx-auto">
      <Slider className="min-h-full" ref={setSliderRef} {...settings}>
        {slidesData.map((slide, index) => (
          <div key={index} className="slide-content">
            <div className="flex items-center justify-center min-h-[70vh]">
              <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-start text-left pl-10 space-x-0 lg:space-x-4">
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-poppins">{slide.title}</h1>
                    <p className="text-lg lg:text-xl">{slide.description}</p>
                  </div>
                  <div className="flex-1 mt-8 mb-3 lg:mt-0 relative w-78 h-78 lg:w-80 lg:h-80 flex items-center justify-center">
                    <img src={slide.imageSrc} alt={slide.altText} className="w-full h-auto max-w-[40vh] lg:max-w-none lg:h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
