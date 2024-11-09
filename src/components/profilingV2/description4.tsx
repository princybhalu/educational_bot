import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import {
  CreateProfileApiCall,
  GiveDescriptionApiCall,
} from 'services/api/profiling';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

const Introduction: React.FC = () => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [displayWords1, setDisplayWords1] = useState<string[]>([]);
  const [currentWordIndex1, setCurrentWordIndex1] = useState<number>(-1);
  const [currentWord1, setCurrentWord1] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCalledCreateProfile, setIsCalledCreateProfile] = useState(false);
  const navigate = useNavigate();

  const textContainerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: any) => state.auth.user);

  const initialMessage =
    "Hi! I'm here to help you craft your ideal AI teacher. Tell me about your learning style, preferences, and goals so I can better support your journey! ";
  // const words = initialMessage.split(' ');

  // Rest of the existing helper functions remain the same
  const createDrainParticle = (): DrainParticle => ({
    id: Math.random(),
    startX: Math.cos(Math.random() * Math.PI * 2) * 48,
    startY: Math.sin(Math.random() * Math.PI * 2) * 48,
    angle: Math.random() * Math.PI * 2,
    speed: 2 + Math.random() * 2,
    size: 3 + Math.random() * 4,
    progress: 0,
  });

  const animateParticles = async (isReverse = false) => {
    const particles = Array.from({ length: 20 }, createDrainParticle);
    setDrainParticles(particles);

    for (
      let i = isReverse ? 100 : 0;
      isReverse ? i >= 0 : i <= 100;
      isReverse ? (i -= 2) : (i += 2)
    ) {
      setDrainProgress(i);
      setDrainParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          progress: isReverse
            ? Math.max(0, particle.progress - particle.speed)
            : Math.min(100, particle.progress + particle.speed),
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

  const typeWord1 = async (word: string) => {
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord1(tempWord);
      await new Promise((r) => setTimeout(r, 20));
    }
    return new Promise((r) => setTimeout(r, 50));
  };

  const writeMessage = async (message: string, afterComplete?: () => void) => {
    const messageWords = message.split(' ');
    await animateParticles();
    await new Promise((r) => setTimeout(r, 600));

    setDisplayWords([]);
    for (let i = 0; i < messageWords.length; i++) {
      setCurrentWordIndex(i);
      await typeWord(messageWords[i]);
      setDisplayWords((prev) => [...prev, messageWords[i]]);
      setCurrentWord('');
      await new Promise((r) => setTimeout(r, 50));
    }

    await new Promise((r) => setTimeout(r, 600));
    await animateParticles(true);
    afterComplete?.();
  };

  const writeMessage1 = async (message: string, afterComplete?: () => void) => {
    const messageWords = message.split(' ');
    await animateParticles();
    await new Promise((r) => setTimeout(r, 600));

    setDisplayWords1([]);
    for (let i = 0; i < messageWords.length; i++) {
      setCurrentWordIndex1(i);
      await typeWord1(messageWords[i]);
      setDisplayWords1((prev) => [...prev, messageWords[i]]);
      setCurrentWord1('');
      await new Promise((r) => setTimeout(r, 50));
    }

    await new Promise((r) => setTimeout(r, 600));
    await animateParticles(true);
    afterComplete?.();
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));

      if (isCalledCreateProfile) {
        const res = await GiveDescriptionApiCall({
          description: userInput,
        });
        if (res.data.is_profile_completed) {
          navigate(PsychologicalProfileRoutesName.ANALYSIS);
          return;
        }

        if (textContainerRef.current) {
          textContainerRef.current.classList.add('initDiv1');
          setTimeout(() => {
            if (textContainerRef.current) {
              textContainerRef.current.style.display = 'none';
            }
          }, 100);
        }
        const mockFeedback = res.data.feedback + ' ';
        setShowFeedback(true);
        await writeMessage1(mockFeedback, () => {
          setIsSubmitting(false);
          setFeedback(mockFeedback);
        });
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    writeMessage(initialMessage, () => setIsTypingComplete(true));

    const tempApiCall = async () => {
      try {
        const res = await CreateProfileApiCall(user.id);
        if (res.data.is_profile_completed) {
          navigate(PsychologicalProfileRoutesName.ANALYSIS);
          return;
        }
        setIsCalledCreateProfile(true);
      } catch (err) {
        console.log('err in get profile : ', err);
      }
    };

    tempApiCall().then();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Avatar Section with lighter shade when typing */}
        <div className="flex flex-col items-center">
          <div
            className="relative w-24 h-24 mb-8"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <div className="w-full h-full rounded-full bg-[#ffffff] shadow-inner">
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
                    transition: 'transform 0.1s linear, opacity 0.1s linear',
                  }}
                />
              ))}

              <div
                className="absolute top-0 left-0 w-full h-full rounded-full"
                style={{
                  background: currentWord
                    ? 'linear-gradient(45deg, #ffffff, #e5e7eb, #f3f4f6)'
                    : 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                  opacity: isSubmitting ? 1 : 1 - drainProgress / 100,
                  transition: 'all 0.3s ease-out',
                  zIndex: 1,
                }}
              />
            </div>
          </div>
        </div>

        {/* Initial Message */}
        {/* Messages Container */}
        <div className="space-y-4">
          {displayWords.length > 1 && (
            <>
              <div
                ref={textContainerRef}
                className="bg-[#12182a] rounded-lg px-2 py-4 md:p-6 shadow-lg border border-[#1d2235]"
              >
                <p className="text-sm md:text-lg text-white leading-relaxed">
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
                    <span className="word inline-block mx-1 text-[#3b82f6]">
                      {currentWord}
                      <span className="animate-pulse">|</span>
                    </span>
                  )}
                </p>
              </div>
            </>
          )}

          {/* Feedback Message */}
          {/* <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a2942] rounded-lg p-6 shadow-lg border border-[#2a3958]"
              >
                <p className="text-lg text-emerald-300 leading-relaxed">
                  {feedback}
                </p>
              </motion.div>
            )}
          </AnimatePresence> */}
          {showFeedback && (
            <>
              <div
                // ref={textContainerRef1/}
                className="bg-[#12182a] rounded-lg px-2 py-4 md:p-6 shadow-lg border border-[#1d2235] initDiv"
              >
                <p className="text-sm md:text-lg text-white leading-relaxed">
                  {displayWords1.map((word, index) => (
                    <span
                      key={index}
                      className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                        index === currentWordIndex1
                          ? 'text-[#3b82f6]'
                          : 'text-white'
                      }`}
                    >
                      {word}
                    </span>
                  ))}
                  {currentWord1 && (
                    <span className="word inline-block mx-1 text-[#3b82f6]">
                      {currentWord1}
                      <span className="animate-pulse">|</span>
                    </span>
                  )}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Input Section with transitions */}
        <AnimatePresence>
          {isTypingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-40 p-2 md:p-4 bg-[#12182a] text-white rounded-lg border border-[#1d2235] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none resize-none transition-all duration-300"
                placeholder="Tell me about your learning style..."
              />
              <div className="flex justify-between">
                <motion.button
                  onClick={() =>
                    navigate(PsychologicalProfileRoutesName.INTRODUCTION)
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-[#12182a] text-white rounded-lg border border-[#1d2235] hover:border-[#3b82f6] transition-all duration-300"
                >
                  Back
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#3b82f6] text-white rounded-lg font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#2563eb]'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Submit'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {/* <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => navigate(PsychologicalProfileRoutesName.ANALYSIS)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#3b82f6] text-white rounded-lg font-semibold shadow-lg hover:bg-[#2563eb] transition-all duration-300"
              >
                Continue Your Journey
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .word {
          position: relative;
          white-space: pre;
        }
      `}</style>
    </div>
  );
};

export default Introduction;
