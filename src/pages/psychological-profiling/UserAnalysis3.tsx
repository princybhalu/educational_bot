import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NeuralNetwork from '../../components/background-animations/NeuralNetwork';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import {
  FaEdit,
  FaArrowRight,
  FaSyncAlt,
  FaSave,
  FaPlus,
} from 'react-icons/fa';
import '../../style/psychological-profile-introduction.css';
import SparkleButton from '../../components/shared/b1';
import useTypingPlaceholder from '../../components/shared/useTypingPlaceholder';
import { AskQuetionApiCall } from 'services/api/profiling';

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
  icon: React.ReactNode;
  scale: number;
  total: number;
  text: string;
}> = ({ title, icon, scale, text }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[200px] group fadeIn">
      <div
        className={`absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-[rgba(16,20,46,1)] rounded-2xl p-6 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white/90">{title}</h3>
            <div className="w-10 h-10 flex items-center justify-center bg-[rgba(67,97,238,0.15)] rounded-lg text-xl">
              {icon}
            </div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-full transition-all duration-1000"
              style={{ width: `${(scale / 10) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/60">Score</p>
              <p className="text-[#4cc9f0] font-medium">
                {((scale / 10) * 100).toFixed(0)}%
              </p>
            </div>
            <button
              onClick={() => setIsFlipped(true)}
              className="flex items-center gap-2 text-[#4cc9f0] hover:text-white transition-colors duration-300"
            >
              Details <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[rgba(16,20,46,0.6)] rounded-2xl p-6 border border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
          <div className="h-full flex flex-col">
            <p className="text-white/90 flex-grow">{text}</p>
            <button
              onClick={() => setIsFlipped(false)}
              className="flex items-center gap-2 text-[#4cc9f0] hover:text-white transition-colors duration-300 mt-4"
            >
              <FaSyncAlt /> Flip Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

type TabType = 'profile' | 'recommendations';

interface TabToggleProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const RecommendationCard: React.FC<{
  recommendation: string;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
}> = ({ recommendation, index, isEditing, onEdit }) => (
  <div
    className={`bg-white/[0.03] rounded-xl p-3 md:p-6 border border-[rgba(67,97,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(67,97,238,0.15)] hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)] relative overflow-hidden animate-[float_3s_infinite] before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-[#4361ee] before:opacity-50 hover:before:opacity-100 cursor-pointer
    `}
    style={{
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div className="flex justify-between items-start gap-4">
      <p className="text-white/90 flex-grow">{recommendation}</p>
      <button
        onClick={onEdit}
        className="text-[#4cc9f0] hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-[rgba(67,97,238,0.2)]"
      >
        <FaEdit size={18} />
      </button>
    </div>
    {isEditing && (
      <span className="absolute top-0 right-0 px-2 py-1 text-xs bg-[#4cc9f0] text-[#0a0d1e] rounded-bl-md">
        Editing
      </span>
    )}
  </div>
);

const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'recommendations'>(
    'recommendations'
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newRecommendation, setNewRecommendation] = useState('');

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

  const [recommendations, setRecommendations] = useState<string[]>(
    Object.values(data).map((value) => value.recommended_approach)
  );

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

  const addOrUpdateRecommendation = () => {
    if (newRecommendation.trim()) {
      if (editingIndex !== null) {
        const updatedRecommendations = [...recommendations];
        updatedRecommendations[editingIndex] = newRecommendation;
        setRecommendations(updatedRecommendations);
        setEditingIndex(null);
      } else {
        setRecommendations((prev) => [...prev, newRecommendation]);
      }
      setNewRecommendation('');
    }
  };

  const renderTabButton = (
    tab: 'profile' | 'recommendations',
    label: string
  ) => (
    <button
      className={`px-4 py-2 text-sm md:text-base font-medium ${
        activeTab === tab
          ? 'bg-blue-700 text-white rounded-full border-blue-600'
          : 'text-white/70 hover:text-white/90'
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );

  const handleConfirm = async () => {
    try {
      const req = {
        answer: recommendations.map((item) => item).join(' '),
      };
      console.log({ req });
      const res = await AskQuetionApiCall(req);
      navigate(PsychologicalProfileRoutesName.AI_CRAFTING);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d1e] text-white overflow-x-hidden">
      <style>
        {`
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
`}
      </style>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(67, 97, 238, 0.2); }
          50% { box-shadow: 0 0 30px rgba(67, 97, 238, 0.4); }
        }
        .perspective {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .title-border-bottom {
          position: relative;
          padding-bottom: 0.5rem;
        }
        .title-border-bottom::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #4361ee, #4cc9f0);
          border-radius: 2px;
        }
        .btn-glow:hover {
          animation: button-glow 1.5s infinite;
        }
        @keyframes button-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(67, 97, 238, 0.4); }
          50% { box-shadow: 0 0 20px rgba(67, 97, 238, 0.8); }
        }
      `}</style>
      <NeuralNetwork />
      <div className=" z-10 max-w-7xl mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-6xl Darker-Grotesque font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            Your Learning Profile
          </h1>
          <p className="text-sm md:text-lg text-white/70">
            Review and update your profile to ensure the most accurate, tailored
            guidance from your AI teacher.
          </p>
        </div>

        {/* <TabToggle activeTab={activeTab} onChange={setActiveTab} /> */}
        <div className="flex justify-center w-full">
          {renderTabButton('recommendations', 'AI Recommendations')}
          {renderTabButton('profile', 'Profile Insights')}
        </div>

        <div className="mt-8 transition-opacity duration-300 flex justify-center">
          <div className="w-full max-w-6xl">
            {activeTab === 'profile' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recommendations.map((recommendation, index) => (
                    <RecommendationCard
                      key={index}
                      recommendation={recommendation}
                      index={index}
                      isEditing={editingIndex === index}
                      onEdit={() => {
                        setNewRecommendation(recommendation);
                        setEditingIndex(index);
                      }}
                    />
                  ))}
                </div>

                {/* Sticky input container */}
                {/* <div className="sticky bottom-4 backdrop-blur-md bg-[rgba(10,13,30,0.8)] p-4 rounded-xl border border-[rgba(67,97,238,0.2)] mt-8"> */}
                <div className="flex gap-4 max-w-3xl mx-auto">
                  <input
                    type="text"
                    value={newRecommendation}
                    onChange={(e) => setNewRecommendation(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow px-4 py-3 rounded-lg bg-white/[0.03] border border-[#4361ee] text-white placeholder-white/50 focus:outline-none focus:border-[#4cc9f0]"
                  />
                  <button
                    onClick={addOrUpdateRecommendation}
                    className="p-3 bg-[#4361ee] rounded-lg text-white hover:bg-[#4cc9f0] transition-all duration-300 flex items-center justify-center w-12"
                  >
                    {editingIndex !== null ? (
                      <FaSave size={20} />
                    ) : (
                      <FaPlus size={20} />
                    )}
                  </button>
                </div>
                {/* </div> */}
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer for Finalize button */}
        <div className="sticky bottom-4 mt-8 text-center z-20">
          {/* <button
            onClick={() => navigate(PsychologicalProfileRoutesName.AI_CRAFTING)}
            className="px-8 py-4 bg-[#4cc9f0] rounded-lg text-[#0a0d1e] font-semibold hover:bg-[#4361ee] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4361ee]/20 max-w-md w-full"
          >
            Finalize Your AI Teacher
          </button> */}
          {/* <SparkleButton 
  onNavigate={() => navigate(PsychologicalProfileRoutesName.AI_CRAFTING)}
  buttonText="Finalize Your AI Teacher"
/> */}
          <button
            className={`
              relative inline-flex h-12 overflow-hidden rounded-full p-[2px]
              focus:outline-none focus:ring-2 focus:ring-blue-400
              focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-300 transform hover:scale-105
            `}
            onClick={() => handleConfirm()}
          >
            {/* Animated gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4361ee_0%,#4cc9f0_50%,#4361ee_100%)]" />

            {/* Button content with glass effect */}
            <span
              className="
              inline-flex h-full w-full cursor-pointer items-center justify-center
              rounded-full bg-slate-950/90 px-8 py-1 text-sm font-medium
              text-blue-200 backdrop-blur-3xl
              transition-all duration-300
              hover:bg-slate-950/70 hover:text-blue-100
              group relative overflow-hidden
            "
            >
              {/* Subtle gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">
                {' '}
                Let&rsquo;s Create AI Teacher
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
