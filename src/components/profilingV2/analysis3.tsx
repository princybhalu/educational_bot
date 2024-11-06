import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit2, Save, ArrowRight } from 'lucide-react';

interface LearningData {
  text: string;
  scale: number;
  recommended_approach: string;
}

interface AnalysisData {
  [key: string]: LearningData;
}

const LearningProfile: React.FC<{ analysisData: AnalysisData }> = ({ analysisData }) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Initialize edit values with recommended approaches
    const initialEditValues: { [key: string]: string } = {};
    Object.entries(analysisData).forEach(([key, value]) => {
      initialEditValues[key] = value.recommended_approach;
    });
    setEditValues(initialEditValues);
  }, [analysisData]);

  const handleEdit = (key: string) => {
    setIsEditing(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (key: string) => {
    setIsEditing(prev => ({ ...prev, [key]: false }));
  };

  const handleChange = (key: string, value: string) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  const toggleExpand = (key: string) => {
    setExpandedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getScaleColor = (scale: number) => {
    const colors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-green-500',
      5: 'bg-blue-500'
    };
    return colors[scale as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8 text-center"
        >
          Your Learning Journey
        </motion.h2>

        <div className="space-y-6">
          {Object.entries(analysisData).map(([key, data], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`bg-gray-800 rounded-xl p-6 border-2 ${
                  expandedCards[key] ? 'border-blue-500' : 'border-gray-700'
                } transition-all duration-300 hover:border-blue-400`}
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(key)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getScaleColor(data.scale)}`} />
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {key.replace(/_/g, ' ')}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedCards[key] ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-gray-400" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedCards[key] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4"
                    >
                      <p className="text-gray-300">{data.text}</p>
                      
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-pink-300 font-medium">Recommended Approach</h4>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              isEditing[key] ? handleSave(key) : handleEdit(key);
                            }}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {isEditing[key] ? (
                              <Save size={18} />
                            ) : (
                              <Edit2 size={18} />
                            )}
                          </button>
                        </div>

                        {isEditing[key] ? (
                          <textarea
                            value={editValues[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                            rows={3}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <p className="text-gray-300">{editValues[key]}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-8"
        >
          <button
            onClick={() => console.log('Creating teacher profile...')}
            className="group relative inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
          >
            <span className="mr-2">Create Your AI Teacher</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningProfile;