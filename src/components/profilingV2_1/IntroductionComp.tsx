import React, { useState, useEffect } from 'react';
import Orbit from '../avatar/Orbit';
import Button from '../shared/Button';
import TypingAnimtionCard from '../shared/TypingAnimtionCard';
import NeuralNetwork from '../background-animations/NeuralNetwork';
import '../../style/psychological-profile-introduction.css';
import { OrbitOpration } from '../../utils/enums';

const IntroductionComp: React.FC<{
  scrollToComponent: (componentId: 'intro' | 'assessment') => void;
  setIsTypingComplete: (isTypingComplete: boolean) => void;
  isTypingComplete: boolean;
}> = ({ scrollToComponent, isTypingComplete, setIsTypingComplete }) => {
  const [orbitOpartion, setOrbitOpartion] = useState<'loading' | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const infoText =
    "These questions aren't just to help us understand you better, they are key to how our AI will train teachers to support your learning style. Answering thoroughly will provide the most tailored guidance possible! ";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setOrbitOpartion('loading');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setOrbitOpartion(null);
  };

  const redirectToAssessmentChoice = () => {
    console.log('call');
    scrollToComponent('assessment');
  };

  return (
    <>
      {/* <div className="psychological-profile-introduction-div"> */}
      <NeuralNetwork />
      <div className="container">
        <Orbit opration={orbitOpartion} />
        <h1 className="title">
          Let&rsquo;s create your perfect learning journey
        </h1>
        <TypingAnimtionCard
          text={infoText}
          isVisible={isVisible}
          onTypingComplete={handleTypingComplete}
          className="fade-in"
          message="These questions aren't just to help us understand you better, they are key to how our AI will train teachers to support your learning style. Answering thoroughly will provide the most tailored guidance possible!"
        />
        {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-50 backdrop-blur-md border border-blue-500/50 transition-all duration-300"
        onClick={redirectToAssessmentChoice}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-80" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#070e41] bg-[#ffffff] px-8 py-1 text-sm font-medium dark:text-gray-50 text-black backdrop-blur-xl">
    Continue Your Journey
  </span>
</button> */}

        <Button
          onClick={redirectToAssessmentChoice}
          isVisible={isTypingComplete}
          className="fade-in mt-8"
        >
          Continue Your Journey
        </Button>
      </div>
      {/* </div> */}
    </>
  );
};

export default IntroductionComp;
