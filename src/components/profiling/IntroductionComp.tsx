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
    scrollToComponent('assessment');
  };

  return (
    <>
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
        <Button
          onClick={redirectToAssessmentChoice}
          isVisible={isTypingComplete}
          className="fade-in mt-8"
        >
          Continue Your Journey
        </Button>
      </div>
    </>
  );
};

export default IntroductionComp;
