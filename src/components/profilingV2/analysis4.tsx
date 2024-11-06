import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit2, Save, ArrowRight, Lightbulb } from 'lucide-react';
import { ProfileScreenNameV2 } from '../../utils/enums';

interface LearningData {
  text: string;
  scale: number;
  recommended_approach: string;
}

interface AnalysisData {
  [key: string]: LearningData;
}

const LearningProfile: React.FC<{
  analysisData: AnalysisData;
  setCurrentScreen: (a: string) => void;
}> = ({ analysisData, setCurrentScreen }) => {
  const [expandedCards, setExpandedCards] = useState<{
    [key: string]: boolean;
  }>({});
  const [isEditing, setIsEditing] = useState(false);
  const [recommendedApproach, setRecommendedApproach] = useState('');

  useEffect(() => {
    // Combine all recommended approaches
    const combinedApproach = Object.values(analysisData)
      .map((data) => data.recommended_approach)
      .join('\n\n');
    setRecommendedApproach(combinedApproach);
  }, [analysisData]);

  const toggleExpand = (key: string) => {
    setExpandedCards((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getScaleColor = (scale: number) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-green-500',
      5: 'bg-blue-500',
    };
    return colors[scale as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-4 md:p-8 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8 text-center"
        >
          Your Learning Journey
        </motion.h2>

        {/* Recommended Approach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-xl p-4 md:p-6 lg:p-8 shadow-xl border-2 border-blue-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Lightbulb className="text-yellow-400 w-6 h-6 md:w-8 md:h-8" />
              <h3 className="text-xl md:text-2xl font-semibold text-yellow-400">
                Personalized Learning Recommendations
              </h3>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-300 hover:text-blue-200 transition-colors p-2"
            >
              {isEditing ? (
                <Save className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Edit2 className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>
          </div>

          {isEditing ? (
            <textarea
              value={recommendedApproach}
              onChange={(e) => setRecommendedApproach(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white rounded-lg border border-blue-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
              rows={6}
            />
          ) : (
            <div className="prose prose-lg prose-invert max-w-none">
              {recommendedApproach.split('\n\n').map((approach, index) => (
                <p
                  key={index}
                  className="text-gray-200 text-sm md:text-base lg:text-lg mb-4"
                >
                  {approach}
                </p>
              ))}
            </div>
          )}
        </motion.div>

        {/* Analysis Cards */}
        <div className="grid gap-4 md:gap-6">
          {Object.entries(analysisData).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className={`bg-gray-800 rounded-xl p-4 md:p-6 border ${
                  expandedCards[key] ? 'border-gray-600' : 'border-gray-700'
                } transition-all duration-300 hover:border-gray-500`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(key)}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${getScaleColor(data.scale)}`}
                    />
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white capitalize">
                      {key.replace(/_/g, ' ')}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCards[key] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedCards[key] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <p className="text-gray-300 text-sm md:text-base lg:text-lg">
                        {data.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-6 md:pt-8"
        >
          <button
            onClick={() => setCurrentScreen(ProfileScreenNameV2.AI_CRAFTING)}
            className="group relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 text-sm md:text-base"
          >
            <span className="mr-2">Create Your AI Teacher</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningProfile;
