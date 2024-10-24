// import React from 'react';
// const BeatExam = () => {
//   return (
//     <>
//       <div className="flex flex-col p-10 lg:px-48 gap-10">
//         <div className="text-blue-900 text-3xl font-semibold text-3xl md:text-4xl lg:text-5xl md:leading-none font-semibold text-[#003366]">
//           Beat Exam Stress With Confidence
//         </div>
//         <div className="flex flex-col md:flex-row gap-10">
//           <div className="w-full h-[250px] bg-sky-300 flex items-center justify-center">
//             Image
//           </div>
//           <div className="flex flex-col justify-between py-4 gap-10">
//             <div className="text-xl leading-relaxed my-10">
//               We know how stressful exams be. That&apos;s why{' '}
//               <b>our AI goes beyond just teaching.</b>
//               It helps you tackle your exam anxiety by understanding your
//               learning style and customizing the approach accodingly.
//               You&apos;ll <b>fill more confident and prepared</b>&nbsp;then even
//               before!
//             </div>
//             <button className="py-2 px-4 bg-blue-900 hover:bg-blue-800 text-white text-md font-semibold rounded-md inline w-fit">
//               Let AI Help You Overcome Exam Stress
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default BeatExam;

import React from 'react';
import { FaBookOpen } from 'react-icons/fa';

interface ImagePlaceholderProps {
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  className = '',
}) => (
  <div
    className={`relative bg-gradient-to-br from-sky-300 to-sky-400 rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 ${className}`}
  >
    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-blue-900/10 transition-colors duration-300" />
    <div className="absolute inset-0 flex items-center justify-center">
      <FaBookOpen className="w-16 h-16 text-white/90" />
    </div>
    <div className="absolute bottom-4 left-4 text-white/90 font-medium">
      Student Success Stories
    </div>
  </div>
);

const BeatExam: React.FC<{handlNavigationToRegister : any}> = ({ handlNavigationToRegister }) => {
  return (
    <section className="w-full py-40 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#003366] leading-tight max-w-4xl">
            Beat Exam Stress
            <span className="block md:inline md:ml-2">With Confidence</span>
          </h2>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Image */}
            <ImagePlaceholder className="w-full aspect-video md:aspect-square lg:aspect-video" />

            {/* Right Side - Content */}
            <div className="flex flex-col justify-between gap-6 md:gap-8">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                We know how stressful exams can be. That&apos;s why{' '}
                <strong className="text-[#003366]">
                  our AI goes beyond just teaching.
                </strong>{' '}
                It helps you tackle your exam anxiety by understanding your
                learning style and customizing the approach accordingly.
                You&apos;ll{' '}
                <strong className="text-[#003366]">
                  feel more confident and prepared
                </strong>{' '}
                than ever before!
              </p>

              <div className="flex items-center">
                <button className="group relative inline-flex items-center justify-center px-6 py-3 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#002347] transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg" onClick={handlNavigationToRegister}>
                  <span className="relative">
                    Let AI Help You Overcome Exam Stress
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatExam;
