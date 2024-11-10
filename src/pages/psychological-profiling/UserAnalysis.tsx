import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NeuralNetwork from '../../components/background-animations/NeuralNetwork';
import '../../style/psychological-profile-introduction.css';
import { PsychologicalProfileRoutesName } from '../../utils/enums';

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

const LearningDashboard: React.FC = () => {
  const navigate = useNavigate();
  const data: LearningData = useSelector((state: any) => {
    console.log(state);
    return state.psychologicalProfile.analysisData;
    
  }) || {
    hobby: {
      text: 'User appears to engage in hobbies that are unclear but may indicate a lack of clarity or confidence in choosing activities they enjoy.',
      scale: 4,
      recommended_approach:
        'Experiment with different hobbies to discover what truly interests you.',
    },
    learning_style: {
      text: 'User seems to indicate a preference for vague learning styles, suggesting they may struggle with identifying effective methods for understanding concepts.',
      scale: 3,
      recommended_approach:
        'Try various study techniques, such as visual aids or group discussions, to find what resonates best with you.',
    },
    academic_confidence: {
      text: "User's lack of defined academic confidence suggests feelings of uncertainty in their abilities, which may hinder their learning experience.",
      scale: 2,
      recommended_approach:
        'Set small academic goals to gradually build your confidence and seek feedback when needed.',
    },
  };

  const handleAiTeacherClick = () => {
    navigate(PsychologicalProfileRoutesName.AI_CRAFTING);
  };

  return (
    <>
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
      <div className="min-h-screen bg-[#0a0d1e] font-sans text-white">
        <NeuralNetwork />
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent relative inline-block title-border-bottom">
              Your Learning Journey
            </h1>
          </div>

          <div className="bg-[rgba(16,20,46,0.6)] rounded-3xl p-8 mb-12 border border-[rgba(67,97,238,0.2)] backdrop-blur-md relative overflow-hidden animate-[glow_3s_infinite]">
            <div className="flex items-center gap-2 md:gap-4 mb-8 pb-4 border-b border-[rgba(67,97,238,0.2)]">
              <div className="w-5 h-5 md:w-10 md:h-10 flex items-center justify-center bg-[rgba(67,97,238,0.15)] rounded-xl text-xl">
                💡
              </div>
              <div className="text-md md:text-2xl text-white">
                Personalized Recommendations
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(data).map(([key, value], index) => (
                <div
                  key={key}
                  className="bg-white/[0.03] rounded-xl p-3 md:p-6 border border-[rgba(67,97,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(67,97,238,0.15)] hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)] relative overflow-hidden animate-[float_3s_infinite] before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-[#4361ee] before:opacity-50 hover:before:opacity-100 cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative z-10 text-white/90">
                    {value.recommended_approach}
                  </div>
                </div>
              ))}
            </div>
          </div>

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

          <div className="flex justify-center mt-12 mb-4">
          <button
            className={`
              relative inline-flex h-12 overflow-hidden rounded-full p-[2px]
              focus:outline-none focus:ring-2 focus:ring-blue-400
              focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-300 transform hover:scale-105
            `}
            onClick={handleAiTeacherClick}
          >
            {/* Animated gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4361ee_0%,#4cc9f0_50%,#4361ee_100%)]" />
            
            {/* Button content with glass effect */}
            <span className="
              inline-flex h-full w-full cursor-pointer items-center justify-center
              rounded-full bg-slate-950/90 px-8 py-1 text-sm font-medium
              text-blue-200 backdrop-blur-3xl
              transition-all duration-300
              hover:bg-slate-950/70 hover:text-blue-100
              group relative overflow-hidden
            ">
              {/* Subtle gradient overlay */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10"> Let&rsquo;s Create AI Teacher</span>
            </span>
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningDashboard;
