import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NeuralNetwork from '../../components/background-animations/NeuralNetwork';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import { FaEdit, FaArrowRight, FaSyncAlt } from 'react-icons/fa';
import '../../style/psychological-profile-introduction.css';

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
    <div className="relative h-[200px] group">
      <div
        className={`absolute w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full [backface-visibility:hidden] bg-[rgba(16,20,46,0.6)] rounded-2xl p-6 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
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

const RecommendationCard: React.FC<{
  recommendation: string;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
}> = ({ recommendation, index, isEditing, onEdit }) => (
  <div className="bg-white/[0.03] rounded-xl p-6 border border-[rgba(67,97,238,0.2)] hover:border-[#4361ee] transition-all duration-300 relative group">
    <p className="text-white/90">{recommendation}</p>
    <button
      onClick={onEdit}
      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <FaEdit className="text-[#4cc9f0] hover:text-white transition-colors duration-300" />
    </button>
    {isEditing && (
      <span className="absolute top-0 right-0 px-2 py-1 text-xs bg-[#4cc9f0] text-[#0a0d1e] rounded-bl-md">
        Editing
      </span>
    )}
  </div>
);

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg transition-all duration-300 ${
      active
        ? 'bg-[#4361ee] text-white shadow-lg shadow-[#4361ee]/20'
        : 'bg-[#0a0d1e] border border-[#4361ee] text-white/70 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'recommendations'>(
    'profile'
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

  return (
    <div className="min-h-screen bg-[#0a0d1e] font-sans text-white">
      <NeuralNetwork />
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            Your Learning Profile
          </h1>
          <p className="text-lg text-white/70">
            Understand your learning style and get personalized recommendations
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <TabButton
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          >
            Profile Insights
          </TabButton>
          <TabButton
            active={activeTab === 'recommendations'}
            onClick={() => setActiveTab('recommendations')}
          >
            AI Recommendations
          </TabButton>
        </div>

        <div className="transition-opacity duration-300">
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
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  placeholder="Add a new recommendation..."
                  className="flex-grow px-4 py-3 rounded-lg bg-white/[0.03] border border-[#4361ee] text-white placeholder-white/50 focus:outline-none focus:border-[#4cc9f0]"
                />
                <button
                  onClick={addOrUpdateRecommendation}
                  className="px-6 py-3 bg-[#4361ee] rounded-lg text-white font-semibold hover:bg-[#4cc9f0] transition-all duration-300"
                >
                  {editingIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate(PsychologicalProfileRoutesName.AI_CRAFTING)}
            className="px-8 py-4 bg-[#4cc9f0] rounded-lg text-[#0a0d1e] font-semibold hover:bg-[#4361ee] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4361ee]/20"
          >
            Finalize Your AI Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
