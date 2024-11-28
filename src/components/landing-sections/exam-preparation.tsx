import React from 'react';

// Define the props for the StatCard component
interface StatCardProps {
  text: string;
  number: string;
  suffix: string;
  lineColor: string;
}

// Define the StatCard component with proper typing
const StatCard: React.FC<StatCardProps> = ({
  text,
  number,
  suffix,
  lineColor,
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-200 w-[90%] mx-auto">
    <p className="text-gray-600 text-xl mb-3">{text}</p>
    <div className="flex items-center justify-center space-x-4">
      <div className={`w-1 h-8 md:h-12 ${lineColor}`} />
      <span className="text-5xl md:text-7xl font-bold text-gray-800">
        {number}
      </span>
      <span className="text-xl text-gray-600">{suffix}</span>
    </div>
  </div>
);

// Define the stats array type
interface Stat {
  text: string;
  number: string;
  suffix: string;
  lineColor: string;
}

// Define the ExamPreparation component
const ExamPreparation: React.FC<{ handlNavigationToRegister: any }> = ({
  handlNavigationToRegister,
}) => {
  // Stats array with proper typing
  const stats: Stat[] = [
    {
      text: 'Success Rate',
      number: '21',
      suffix: '+',
      lineColor: 'bg-blue-500',
    },
    {
      text: 'Student Growth',
      number: '39',
      suffix: '+',
      lineColor: 'bg-yellow-500',
    },
    {
      text: 'Learning Hours',
      number: '1B',
      suffix: '+',
      lineColor: 'bg-blue-500',
    },
    {
      text: 'Performance',
      number: '2',
      suffix: 'x',
      lineColor: 'bg-green-500',
    },
  ];

  return (
    <section className="bg-[#E5F3FF] py-12 px-4 md:py-16 lg:py-40">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10  lg:gap-20 items-center">
          {/* Left Content Section */}
          <div className="space-y-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#003366] leading-tight">
              Prepare For Exams
              <br />
              Smarter, Not Harder
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed ">
              Preparing for exams but short on time? Our{' '}
              <strong className="text-[#003366]">
                AI breaks down the syllabus
              </strong>{' '}
              based on marks weightage, guiding you to focus on the most
              important parts.{' '}
              <strong className="text-[#003366]">
                Even with less time, you can maximize your preparation
              </strong>{' '}
              by focusing on key areas, thanks to the smart techniques{' '}
              <strong className="text-[#003366]">personalized for you.</strong>
            </p>

            <button
              className="inline-flex items-center justify-center px-6 py-3 bg-[#003366] text-white rounded-lg font-medium hover:bg-[#002347] transition-colors duration-200 transform hover:scale-105"
              onClick={handlNavigationToRegister}
            >
              Start Your Exam Prep Now
            </button>
          </div>

          {/* Right Stats Section */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 transform -rotate-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamPreparation;
