import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NeuralNetwork from '../../components/background-animations/NeuralNetwork';
import '../../style/psychological-profile-introduction.css';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import { FaEdit, FaCheck } from 'react-icons/fa';

interface MetricData {
  text: string;
  scale: number;
  recommended_approach: string;
}

interface LearningData {
  hobby: MetricData;
  learning_style: MetricData;
  academic_confidence: MetricData;
}

const ICONS = {
  hobby: '🎯',
  learning_style: '📚',
  academic_confidence: '⭐',
} as const;

const TITLES = {
  hobby: 'Hobby & Interests',
  learning_style: 'Learning Style',
  academic_confidence: 'Academic Confidence',
} as const;

const MetricCard: React.FC<{
  title: string;
  icon: string;
  scale: number;
  total: number;
  text: string;
}> = ({ title, icon, scale, total, text }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="group perspective cursor-pointer">
      <div
        className={`relative transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={handleClick}
      >
        {/* Front of card */}
        <div className="backface-hidden">
          <div className="bg-[rgba(16,20,46,0.6)] rounded-2xl p-3 md:p-6 border border-[rgba(67,97,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)] relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="text-md md:text-lg text-white/90">{title}</div>
              <div className="w-6 h-6 md:w-9 md:h-9 flex items-center justify-center bg-[rgba(67,97,238,0.15)] rounded-lg text-md md:text-lg">
                {icon}
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-full transition-all duration-1000"
                style={{ width: `${(scale / total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <div className="text-white/60">Score</div>
                <div className="text-[#4cc9f0] font-medium">
                  {((scale / total) * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="text-white/60">Progress</div>
                <div className="text-[#4cc9f0] font-medium">
                  {scale}/{total}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 rotate-y-180 backface-hidden">
          <div className="bg-[rgba(16,20,46,0.6)] rounded-2xl p-3 md:p-6 border border-[rgba(67,97,238,0.2)] h-full flex items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
            <p className="text-white/90">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const useTypingPlaceholder = (
  phrases: string[],
  speed: number,
  delay: number
) => {
  const [placeholder, setPlaceholder] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      if (!isDeleting && charIndex < phrases[phraseIndex].length) {
        setPlaceholder((prev) => prev + phrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === phrases[phraseIndex].length) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timeout = setTimeout(type, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, speed, delay]);

  return placeholder;
};

const LearningDashboard: React.FC = () => {
  const data: LearningData = useSelector(
    (state: any) => state.psychologicalProfile.analysisData
  ) || {
    hobby: {
      text: 'Explore hobbies that bring joy and fulfillment.',
      scale: 4,
      recommended_approach:
        'Experiment with hobbies that match your personality.',
    },
    learning_style: {
      text: 'Discover learning techniques that work best for you.',
      scale: 3,
      recommended_approach:
        'Try visual aids, discussion, or hands-on approaches.',
    },
    academic_confidence: {
      text: 'Build confidence with small, achievable goals.',
      scale: 2,
      recommended_approach:
        'Set achievable academic milestones and track progress.',
    },
  };

  const tempCreateRe = Object.entries(data).map(
    ([key, value]) => value.recommended_approach
  );
  const [recommendations, setRecommendations] =
    useState<string[]>(tempCreateRe);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'recommendations'>(
    'recommendations'
  );
  const [newRecommendation, setNewRecommendation] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const placeholder = useTypingPlaceholder(
    [
      'Modify your learning style',
      'Adjust focus areas',
      'Update motivational profile',
      'Refine confidence areas',
    ],
    100,
    2000
  );

  const handleAiTeacherClick = () => {
    navigate(PsychologicalProfileRoutesName.AI_CRAFTING);
  };

  const addOrUpdateRecommendation = () => {
    if (editingIndex !== null) {
      const updatedRecommendations = [...recommendations];
      updatedRecommendations[editingIndex] = newRecommendation;
      setRecommendations(updatedRecommendations);
      setEditingIndex(null);
    } else {
      setRecommendations((prev) => [...prev, newRecommendation]);
    }
    setNewRecommendation('');
  };

  const handleEditClick = (index: number) => {
    setNewRecommendation(recommendations[index]);
    setEditingIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#0a0d1e] font-sans text-white">
      <NeuralNetwork />
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            Your Profile Insights
          </h1>
          <p className="text-white/90">
            Review and update your profile to ensure the most accurate, tailored
            guidance from your AI teacher.
          </p>
        </div>

        <div className="flex space-x-4 justify-center mb-6">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'recommendations' ? 'bg-[#4361ee]' : 'bg-[#0a0d1e] border border-[#4361ee]'} text-white`}
            onClick={() => setActiveTab('recommendations')}
          >
            AI’s Understanding of You
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-[#4361ee]' : 'bg-[#0a0d1e] border border-[#4361ee]'} text-white`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Insights
          </button>
        </div>

        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {recommendations.map((recommendation, index) => (
              <div
                key={index}
                className={`bg-white/[0.03] rounded-xl p-3 md:p-6 border border-[rgba(67,97,238,0.2)] relative overflow-hidden cursor-pointer ${editingIndex === index ? 'border-[#4cc9f0]' : ''}`}
              >
                <p className="text-white/90 flex items-center gap-2">
                  {recommendation}
                  <FaEdit
                    onClick={() => handleEditClick(index)}
                    className="text-white/50 cursor-pointer"
                  />
                </p>
                {editingIndex === index && (
                  <span className="absolute top-0 right-0 px-2 py-1 text-xs bg-[#4cc9f0] text-[#0a0d1e] rounded-bl-md">
                    Editing
                  </span>
                )}
              </div>
            ))}
            <div className="flex items-center space-x-2 mt-4">
              <input
                type="text"
                value={newRecommendation}
                placeholder={placeholder}
                onChange={(e) => setNewRecommendation(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#0a0d1e] border border-[#4361ee] text-white"
              />
              <button
                onClick={addOrUpdateRecommendation}
                className="px-4 py-2 bg-[#4361ee] rounded-full text-white hover:bg-[#4cc9f0]"
              >
                {editingIndex !== null ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
              {Object.entries(data).map(([key, value]) => (
                <MetricCard
                  key={key}
                  title={TITLES[key as keyof typeof TITLES]}
                  icon={ICONS[key as keyof typeof ICONS]}
                  scale={value.scale}
                  total={10}
                  text={value.text}
                />
              ))}
            </div>
          </>
        )}

        {/* Finalize Teacher Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleAiTeacherClick}
            className="px-6 py-3 bg-[#4cc9f0] rounded-lg text-[#0a0d1e] font-semibold hover:bg-[#4361ee] transition-all duration-300"
          >
            Finalize Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
