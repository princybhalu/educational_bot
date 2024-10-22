import React, { useState } from 'react';
import engineer from '../../assets/landing-page/engineer.jpeg';
import medical from '../../assets/landing-page/medical.jpeg';
import commerce from '../../assets/landing-page/commerce.jpeg';

type CareerOption = {
  title: string;
  heading: string;
  description: string;
  image: string;
};

const careerOptions: CareerOption[] = [
  {
    title: 'Engineering',
    heading:
      'Learn to design, build, and maintain structures, machines, or systems in fields like civil, mechanical, or computer engineering.',
    description:
      'Explore hands-on experience with in-depth projects to enhance your problem-solving and technical skills.',
    image: engineer,
  },
  {
    title: 'Medicine',
    heading:
      'Study to become a doctor, nurse, or specialist by gaining in-depth medical knowledge and skills to care for patients.',
    description:
      'Gain practical experience in medical facilities and explore various specializations to determine your focus.',
    image: medical,
  },
  {
    title: 'Commerce',
    heading:
      'Explore opportunities in accounting, management, or entrepreneurship by studying subjects like economics, business, and finance.',
    description:
      'Learn about global markets and business operations, preparing for roles in diverse corporate environments.',
    image: commerce,
  },
];

const CareerAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full bg-gradient-to-tr from-[#f3d9c866] to-[#FF660066]">
      <div className="w-full max-w-6xl mx-auto px-4 py-32 ">
        <h2 className="text-4xl md:text-5xl Darker-Grotesque  font-bold text-blue-900 mb-4">
          Your AI-Powered Career Mentor
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Our AI doesn’t just prepare you for exams; it helps you understand
          current trends in the real world and guides you toward the right path
          for your future career. You’ll know exactly which skills and topics
          are most relevant for your aspirations.
        </p>
        <div className="space-y-4">
          {careerOptions.map((option, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 transition-all duration-300 bg-white"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <h3 className="text-xl font-semibold">{option.title}</h3>
                  {activeIndex === index && (
                    <p className="mt-2">{option.heading}</p>
                  )}
                </div>
                <div
                  className={`text-2xl  px-3 py-1.5 -rotate-45 ${activeIndex === index ? 'text-white bg-[#FF6600] rounded-full' : 'text-[#FF6600] !border-[#FF6600]'}`}
                >
                  →
                </div>
              </div>
              {activeIndex === index && (
                <div className="mt-4 flex flex-col md:flex-row">
                  <img
                    src={option.image}
                    alt={option.title}
                    className="w-full md:w-1/4 rounded-lg"
                  />
                  <p className="w-full md:w/3/4 p-4 ">{option.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerAccordion;
