import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

interface IntroductionProps {
  setCurrentScreen: (screen: string) => void;
  onBack: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({
  setCurrentScreen,
  onBack,
}) => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const textContainerRef = useRef<HTMLDivElement>(null);

  const initialMessage =
    "Hi! I'm your AI assistant. To help create the perfect AI teacher for you, please tell me about your learning style, preferences, and what you hope to achieve. This will help me understand how to better support your learning journey!";
  const words = initialMessage.split(' ');

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
    setIsTyping(true);
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord(tempWord);
      await new Promise((r) => setTimeout(r, 20));
    }
    await new Promise((r) => setTimeout(r, 50));
    setIsTyping(false);
  };

  const writeMessage = async (message: string, afterComplete?: () => void) => {
    const messageWords = message.split(' ');
    await animateParticles();
    await new Promise((r) => setTimeout(r, 600));

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

  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulated API call
      await new Promise((r) => setTimeout(r, 2000));
      const mockFeedback =
        "Thank you for sharing! I understand your learning style better now. Based on your input, I'll create a personalized learning experience that matches your preferences and goals.";

      setShowFeedback(true);
      await writeMessage(mockFeedback, () => {
        setIsSubmitting(false);
        setFeedback(mockFeedback);
      });
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    writeMessage(initialMessage, () => setIsTypingComplete(true));
  }, []);

  return (
    <div className="min-h-screen w-full bg-black p-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        {/* Avatar Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div
            className={`relative w-24 h-24 mb-8 transition-all duration-500 ${
              isTyping ? 'scale-110' : 'scale-100'
            }`}
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            {/* Glow Effect */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                isTyping ? 'opacity-50' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
                transform: 'scale(1.5)',
                filter: 'blur(10px)',
              }}
            />

            {/* Base Avatar */}
            <div className="w-full h-full rounded-full bg-[#12182a] shadow-inner relative overflow-hidden">
              {/* Particle Effects */}
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
                className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ${
                  isTyping ? 'opacity-70' : 'opacity-100'
                }`}
                style={{
                  background:
                    'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 3s ease infinite',
                  opacity: isSubmitting ? 1 : 1 - drainProgress / 100,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Messages Container */}
        <div className="space-y-4">
          {/* Initial Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            ref={textContainerRef}
            className="bg-[#12182a] rounded-lg p-6 shadow-lg border border-[#1d2235]"
          >
            <p className="text-lg text-white leading-relaxed">
              {displayWords.map((word, index) => (
                <span
                  key={index}
                  className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                    index === currentWordIndex ? 'text-[#3b82f6]' : 'text-white'
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
          </motion.div>

          {/* Feedback Message */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#12182a] rounded-lg p-6 shadow-lg border border-[#1d2235]"
              >
                <p className="text-lg text-white leading-relaxed">{feedback}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Section */}
        <AnimatePresence>
          {isTypingComplete && !showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-40 p-4 bg-[#12182a] text-white rounded-lg border border-[#1d2235] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none resize-none transition-all duration-300"
                placeholder="Tell me about your learning style..."
              />
              <div className="flex justify-between">
                <motion.button
                  onClick={onBack}
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

        {/* Next Button */}
        <AnimatePresence>
          {showFeedback && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() => setCurrentScreen('next')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[#3b82f6] text-white rounded-lg font-semibold shadow-lg hover:bg-[#2563eb] transition-all duration-300"
              >
                Continue Your Journey
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #12182a;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
};

export default Introduction;
