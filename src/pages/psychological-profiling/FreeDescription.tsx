import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import '../../style/psychological-profile-introduction.css';
import {
  CreateProfileApiCall,
  GiveDescriptionApiCall,
} from 'services/api/profiling';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Orbit from '../../components/avatar/Orbit';
import TypingAnimtionCard from '../../components/shared/TypingAnimtionCard';

const FreeDescription: React.FC = () => {
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCalledCreateProfile, setIsCalledCreateProfile] = useState(false);
  const navigate = useNavigate();
  const [orbitOpartion, setOrbitOpartion] = useState<'loading' | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleOfFeedback, setIsVisibleOfFeedback] = useState(false);

  const textContainerRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: any) => state.auth.user);

  const initialMessage =
    "Hi! I'm here to help you craft your ideal AI teacher. Tell me about your learning style, preferences, and goals so I can better support your journey! ";

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
        setIsSubmitting(false);
        setFeedback(mockFeedback);
        setIsVisibleOfFeedback(true);
        setOrbitOpartion('loading');
      }
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setOrbitOpartion(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setOrbitOpartion('loading');
    }, 2000);

    const tempApiCall = async () => {
      try {
        const res = await CreateProfileApiCall(user.id);
        console.log({ res });
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
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl space-y-8">
        {/* Avatar Section with lighter shade when typing */}
        <Orbit opration={orbitOpartion} />

        {/* Initial Message */}
        {/* Messages Container */}
        <div ref={textContainerRef}>
          <TypingAnimtionCard
            isVisible={isVisible}
            onTypingComplete={handleTypingComplete}
            className="fade-in"
            message={initialMessage}
          />
        </div>

        {showFeedback && (
          <TypingAnimtionCard
            isVisible={isVisibleOfFeedback}
            onTypingComplete={handleTypingComplete}
            className="fade-in"
            message={initialMessage}
          />
        )}

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

export default FreeDescription;
