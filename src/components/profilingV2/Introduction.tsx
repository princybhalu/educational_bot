import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProfileScreenNameV2 } from '../../utils/enums';

interface InfoCardProps {
  redirectTo: string;
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
  onClickONCard: (a: string) => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  redirectTo,
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
  onClickONCard,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative p-4 md:p-8 bg-[#12182a] rounded-xl backdrop-blur-sm border ${borderColor} hover:${hoverBorderColor} transition-all flex flex-col justify-between h-full`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgFromColor} ${bgToColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10 ">
        <div className="flex flex-col">
          {/* Icon and Title Container */}
          <div className="flex flex-row md:flex-col items-center mb-4 md:mb-6 space-x-2 md:space-x-0">
            <div className="flex items-center justify-center w-12 h-12 md:h-16 md:w-16 bg-[#3b82f6]/20 rounded-2xl p-2 md:p-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[#3b82f6]"
              >
                <path
                  d={iconPath}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-lg md:text-2xl font-semibold text-[#3b82f6] md:mt-4">
              {title}
            </h3>
          </div>

          <p className="text-gray-300 mb-4 md:mb-6">{description}</p>
        </div>
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 md:py-4 bg-${buttonGradientTo} rounded-lg text-white font-semibold transform transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/25`}
            onClick={() => onClickONCard(redirectTo)}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const AssessmentChoice = ({
  scrollToComponent,
  setCurrentScreen,
}: {
  scrollToComponent: (componentId: 'intro' | 'assessment') => void;
  setCurrentScreen: (a: string) => void;
}) => {
  const onClickONCard = (type: string) => {
    setCurrentScreen(type);
    console.log('set fun called : ', type);
  };
  return (
    <div className="w-full min-h-screen max-w-4xl p-6 md:p-12 flex flex-col justify-center-4">
      {/* Header Section */}
      <div className="text-center mb-6 md:mb-12">
        <h1 className="text-xl md:text-4xl font-bold text-[#60a5fa] via-[#1d4ed8] to-[#0ea5e9] animate-gradient-x mb-4">
          Choose Your Learning Path
        </h1>
        <div className="relative">
          <p className="text-gray-300 md:text-xl max-w-2xl mx-auto">
            Select the assessment style that feels most natural to you
          </p>
          {/* <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#60a5fa] via-[#1d4ed8] to-[#0ea5e9] rounded-full animate-shimmer" /> */}
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-12">
        <InfoCard
          redirectTo={ProfileScreenNameV2.QUESTIONS}
          title="Guided Questions"
          description="Take a structured approach with our carefully crafted questions designed to understand your unique learning style."
          buttonText="Start Guided Journey"
          iconPath="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"
          bgFromColor="from-[#60a5fa]/10"
          bgToColor="to-[#1d4ed8]/10"
          borderColor="border-[#60a5fa]/20"
          hoverBorderColor="hover:border-[#60a5fa]/40"
          buttonGradientFrom="from-[#60a5fa]"
          buttonGradientTo="[#3b82f6]"
          onClickONCard={onClickONCard}
        />

        <InfoCard
          redirectTo={ProfileScreenNameV2.DESCRIPTION}
          title="Free Description"
          description="Express yourself freely and tell us about your learning preferences in your own words."
          buttonText="Start Free Expression"
          iconPath="M12 5v14M5 12h14"
          bgFromColor="from-[#1d4ed8]/10"
          bgToColor="to-[#0ea5e9]/10"
          borderColor="border-[#1d4ed8]/20"
          hoverBorderColor="hover:border-[#1d4ed8]/40"
          buttonGradientFrom="from-[#1d4ed8]"
          buttonGradientTo="[#3b82f6]"
          onClickONCard={onClickONCard}
        />
      </div>

      {/* Previous Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mt-auto"
      >
        <motion.button
          onClick={() => scrollToComponent('intro')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#12182a] text-white rounded-lg border border-[#1d2235] hover:border-[#242d44] transition-all duration-300 flex items-center gap-3 group"
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
    </div>
  );
};

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

const Introduction: React.FC<{ setCurrentScreen: (a: string) => void }> = ({
  setCurrentScreen,
}) => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<
    'intro' | 'assessment'
  >('intro');

  const aiMessage =
    "These questions aren't just to help us understand you better, they are key to how our AI will train teachers to support your learning style. Answering thoroughly will provide the most tailored guidance possible! ";
  const words = aiMessage.split(' ');
  const textContainerRef = useRef<HTMLDivElement>(null);
  const assessmentRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const createDrainParticle = (): DrainParticle => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 48;
    const speed = 2 + Math.random() * 2;
    const size = 3 + Math.random() * 4;

    return {
      id: Math.random(),
      startX: Math.cos(angle) * radius,
      startY: Math.sin(angle) * radius,
      angle,
      speed,
      size,
      progress: 0,
    };
  };

  const drainColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 0; i <= 100; i += 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.min(100, particle.progress + particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const fillColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 100; i >= 0; i -= 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.max(0, particle.progress - particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const typeWord = async (word: string) => {
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord(tempWord);
      await new Promise((r) => setTimeout(r, 20));
    }
    return new Promise((r) => setTimeout(r, 50));
  };

  const scrollToComponent = (component: 'intro' | 'assessment') => {
    setCurrentComponent(component);
    const targetRef = component === 'intro' ? introRef : assessmentRef;
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const writeMessage = async () => {
    await drainColor();
    await new Promise((r) => setTimeout(r, 600));
    await new Promise((r) => setTimeout(r, 400));

    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);
      await typeWord(words[i]);
      setDisplayWords((prev) => [...prev, words[i]]);
      setCurrentWord('');
      await new Promise((r) => setTimeout(r, 50));
    }

    await new Promise((r) => setTimeout(r, 600));
    await fillColor();
    setIsTypingComplete(true);
  };

  useEffect(() => {
    setTimeout(() => {
      writeMessage();
    }, 1000);
  }, []);

  return (
    <>
      <div className="min-h-screen w-full overflow-hidden bg-black">
        <div className="h-screen overflow-y-auto snap-y snap-mandatory">
          <div
            ref={introRef}
            className="h-screen snap-start p-4 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-3xl relative">
              <div className="flex flex-col items-center mb-16">
                <div
                  className="relative w-24 h-24 mb-8"
                  style={{
                    animation: 'float 3s ease-in-out infinite',
                  }}
                >
                  {/* Base Avatar */}
                  <div
                    className="w-full h-full rounded-full"
                    style={{
                      background: '#ffffff',
                      boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                    }}
                  />

                  {/* Drain Particles */}
                  {drainParticles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute"
                      style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                        left: '50%',
                        top: '50%',
                        transform: `translate(
                      calc(-50% + ${particle.startX + Math.cos(particle.angle) * particle.progress}px),
                      calc(-50% + ${particle.startY + Math.sin(particle.angle) * particle.progress}px)
                    )`,
                        opacity: 1 - particle.progress / 100,
                        transition:
                          'transform 0.1s linear, opacity 0.1s linear',
                      }}
                    />
                  ))}

                  {/* Gradient Color Layer */}
                  <div
                    className="absolute top-0 left-0 w-full h-full rounded-full"
                    style={{
                      background:
                        'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite',
                      opacity: 1 - drainProgress / 100,
                      transform: 'scale(1)',
                      transition: 'all 0.1s ease-out',
                      zIndex: 1,
                    }}
                  />
                </div>

                {/* Added Title Section */}
                <div className="text-center relative">
                  <h1 className="text-xl md:text-3xl font-bold text-[#60a5fa] via-[#1d4ed8] to-[#0ea5e9] animate-gradient-x mb-2">
                    Let&rsquo;s create your perfect learning journey
                  </h1>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#60a5fa] via-[#1d4ed8] to-[#0ea5e9] rounded-full" />
                </div>
              </div>

              {displayWords.length > 1 && (
                <>
                  <div
                    ref={textContainerRef}
                    className="bg-[#12182a] rounded-lg p-4 md:p-8 shadow-lg border border-[#1d2235] mb-6 initDiv"
                  >
                    <p className="text-md md:text-lg text-white leading-relaxed relative">
                      {displayWords.map((word, index) => (
                        <span
                          key={index}
                          className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                            index === currentWordIndex
                              ? 'text-[#3b82f6]'
                              : 'text-white'
                          }`}
                        >
                          {word}
                        </span>
                      ))}
                      {currentWord && (
                        <span className="current-word word inline-block mx-1 text-[#3b82f6]">
                          {currentWord} <span> | </span>
                        </span>
                      )}
                    </p>
                  </div>
                </>
              )}

              {/* Next Button */}
              {isTypingComplete && (
                <div className="flex justify-center initDiv">
                  <button
                    onClick={() => scrollToComponent('assessment')}
                    className="px-4 py-2 md:px-8 md:py-4 bg-[#3b82f6] rounded-lg text-white font-semibold text-md md:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <span className="relative z-10">Continue Your Journey</span>
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa] via-[#1d4ed8] to-[#0ea5e9] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 animate-shimmer" /> */}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Message Bubble */}
          <div className="relative bg-gray-800 rounded-2xl p-4 min-w-48">
            <div className="flex gap-2 h-6 items-center px-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`
                  w-3 h-3 rounded-full
                  transition-all duration-300
                  bg-gray-600 scale-100
                `}
                />
              ))}
            </div>

            {/* Bubble Tail */}
            <div className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 bg-gray-800 transform rotate-45" />
          </div>
          {isTypingComplete && (
            <>
              {' '}
              <div
                ref={assessmentRef}
                className="h-screen snap-start p-4 flex flex-col items-center justify-center"
              >
                <AssessmentChoice
                  setCurrentScreen={setCurrentScreen}
                  scrollToComponent={scrollToComponent}
                />
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
