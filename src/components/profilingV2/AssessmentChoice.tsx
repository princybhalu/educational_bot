import React from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  title: string;
  description: string;
  buttonText: string;
  iconPath: string;
  bgFromColor: string;
  bgToColor: string;
  borderColor: string;
  hoverBorderColor: string;
  buttonGradientFrom: string;
  buttonGradientTo: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  buttonText,
  iconPath,
  bgFromColor,
  bgToColor,
  borderColor,
  hoverBorderColor,
  buttonGradientFrom,
  buttonGradientTo,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative p-4 md:p-8 bg-gray-900/50 rounded-xl backdrop-blur-sm border ${borderColor} hover:${hoverBorderColor} transition-all`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgFromColor} ${bgToColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="mb-6 w-16 h-16 bg-blue-500/20 rounded-2xl p-4 group-hover:scale-110 transition-transform duration-300">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-blue-400"
          >
            <path
              d={iconPath}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-lg md:text-2xl font-semibold text-blue-400 mb-2 md:mb-4">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 md:mb-6">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-2 md:py-4 bg-gradient-to-r ${buttonGradientFrom} ${buttonGradientTo} rounded-lg text-white font-semibold transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25`}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

const AssessmentChoice = ({
  scrollToComponent,
}: {
  scrollToComponent: (componentId: 'intro' | 'assessment') => void;
}) => {
  return (
    <div className="w-full max-w-4xl p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 animate-gradient-x mb-4">
          Choose Your Learning Path
        </h1>
        <div className="relative">
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Select the assessment style that feels most natural to you
          </p>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 rounded-full animate-shimmer" />
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-12">
        <InfoCard
          title="Guided Questions"
          description="Take a structured approach with our carefully crafted questions designed to understand your unique learning style."
          buttonText="Start Guided Journey"
          iconPath="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
          bgFromColor="from-blue-600/10"
          bgToColor="to-purple-600/10"
          borderColor="border-blue-500/20"
          hoverBorderColor="hover:border-blue-500/40"
          buttonGradientFrom="from-blue-500"
          buttonGradientTo="to-purple-500"
        />

        <InfoCard
          title="Free Description"
          description="Express yourself freely and tell us about your learning preferences in your own words."
          buttonText="Start Free Expression"
          iconPath="M12 5v14M5 12h14"
          bgFromColor="from-purple-600/10"
          bgToColor="to-pink-600/10"
          borderColor="border-purple-500/20"
          hoverBorderColor="hover:border-purple-500/40"
          buttonGradientFrom="from-purple-500"
          buttonGradientTo="to-pink-500"
        />
      </div>

      {/* Previous Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <motion.button
          onClick={() => scrollToComponent('intro')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center gap-3 group"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="transform transition-transform group-hover:-translate-y-1"
          >
            <path
              d="M18 15l-6-6-6 6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Return to Introduction
        </motion.button>
      </motion.div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { opacity: 0.4; transform: translate(-50%, 0) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
          100% { opacity: 0.4; transform: translate(-50%, 0) scale(0.9); }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AssessmentChoice;
