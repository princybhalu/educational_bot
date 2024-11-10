import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import IntroductionComp from '../../components/profilingV2_1/IntroductionComp';
import AssessmentChoice from '../../components/profilingV2_1/AssessmentChoice';

const Introduction: React.FC = () => {
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<
    'intro' | 'assessment'
  >('intro');

  const aiMessage =
    "These questions aren't just to help us understand you better, they are key to how our AI will train teachers to support your learning style. Answering thoroughly will provide the most tailored guidance possible! ";
  const assessmentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const scrollToComponent = (component: 'intro' | 'assessment') => {
    setCurrentComponent(component);
    const targetRef = component === 'intro' ? introRef : assessmentRef;
    console.log(targetRef);
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen w-full overflow-hidden bg-black">
        <div className="h-screen overflow-y-auto snap-y snap-mandatory">
          <div
            ref={introRef}
            className="h-screen snap-start p-4 flex flex-col items-center justify-center"
          >
            <IntroductionComp
              scrollToComponent={scrollToComponent}
              setIsTypingComplete={setIsTypingComplete}
              isTypingComplete={isTypingComplete}
            />
          </div>

          {isTypingComplete && (
            <>
              {' '}
              <div
                ref={assessmentRef}
                className="h-screen snap-start p-4 flex flex-col items-center justify-center Darker-Grotesque"
              >
                <AssessmentChoice scrollToComponent={scrollToComponent} />
              </div>
            </>
          )}
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
  
            @keyframes cursorBlink {
             0%, 70%, 100% { opacity: 1; }
             71%, 99% { opacity: 0; }
           }
  
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
  
         @keyframes shimmer {
             0% { opacity: 0.4; transform: translate(-50%, 0) scale(0.9); }
             50% { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
             100% { opacity: 0.4; transform: translate(-50%, 0) scale(0.9); }
           }
  
            .animate-shimmer {
            animation: shimmer 2s infinite;
          }
  
          .animate-gradient-x {
             background-size: 200% 200%;
             animation: gradient 3s ease infinite;
           }
  
          .word {
            position: relative;
            white-space: pre;
          }
  
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }

          .initDiv {
            animation: fadeInAnimation ease 0.5s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }

        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
       }
        }
         
        `}</style>
      </div>
    </>
  );
};

export default Introduction;
