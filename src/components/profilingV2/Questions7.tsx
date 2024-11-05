import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  onPrevious: () => void;
  onSubmit: (answer: string) => void;
  isTransitioning: boolean;
  transitionDirection: 'in' | 'out';
  setAnswers: (a: string[]) => void;
  answers: string[];
  isSubmitted: boolean;
}

const BlurredCircle = () => (
  <div className="absolute blur-2xl opacity-20 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
);

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  onPrevious,
  onSubmit,
  isTransitioning,
  transitionDirection,
  setAnswers,
  answers,
  isSubmitted,
}) => {
  const [answer, setAnswer] = useState<string>(answers[questionNumber - 1]);
  const [isFocused, setIsFocused] = useState(false);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber - 1] = e.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`relative mx-auto bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl p-8 shadow-2xl w-full 
        backdrop-blur-xl border border-gray-700/50 transition-all duration-500
        ${isTransitioning ? `window-${transitionDirection}` : ''}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <BlurredCircle />
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="window-header flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-red-500"
              />
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-yellow-500"
              />
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-3 h-3 rounded-full bg-green-500"
              />
            </div>
            <div className="h-4 w-px bg-gray-700 mx-4" />
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-medium text-gray-400">
              Question {questionNumber} of {totalQuestions}
            </h2>
          </div>
          {isSubmitted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center text-green-400 text-sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Submitted
            </motion.div>
          )}
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-medium mb-6 text-gray-100"
        >
          {questionText}
        </motion.p>

        <div
          className={`relative rounded-xl transition-all duration-300 ${isFocused ? 'ring-2 ring-blue-500' : ''}`}
        >
          <textarea
            value={answer}
            onChange={handleTextAreaChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Write your answer here..."
            className="w-full p-4 rounded-xl bg-gray-800/50 text-white resize-none mb-4 
              backdrop-blur-sm border border-gray-700/50 focus:outline-none
              transition-all duration-300"
            rows={4}
            disabled={isSubmitted}
          />
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 
            transition-opacity duration-300 pointer-events-none"
            style={{ opacity: isFocused ? 1 : 0 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'in' | 'out'>(
    'out'
  );
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [feedbacks, setFeedbacks] = useState<string[]>(Array(10).fill(''));
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const questions = [
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'How do you handle challenging situations?',
    'Whats your preferred way of receiving feedback?',
    'How do you organize your thoughts when solving problems?',
  ];

  const handleTransition = (direction: 'prev' | 'next') => {
    setTransitionDirection('in');
    setIsTransitioning(true);
    setIsAvatarActive(true);

    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
      setTransitionDirection('out');
      setTimeout(() => {
        setIsTransitioning(false);
        setIsAvatarActive(false);
      }, 500);
    }, 500);
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen w-full max-w-4xl p-8">
      <div className="w-full mx-auto flex flex-col items-center space-y-8">
        {/* Avatar */}
        <motion.div
          animate={{ scale: isAvatarActive ? 1.1 : 1 }}
          className="relative w-24 h-24 mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gray-900" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-xl" />
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2 text-gray-400">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">
              {currentQuestion}/{questions.length} Questions
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion}
            questionNumber={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion - 1]}
            onPrevious={() => handleTransition('prev')}
            onSubmit={() => handleTransition('next')}
            isTransitioning={isTransitioning}
            transitionDirection={transitionDirection}
            answers={answers}
            setAnswers={setAnswers}
            isSubmitted={feedbacks[currentQuestion - 1] !== ''}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTransition('prev')}
            disabled={currentQuestion <= 1}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all
              ${
                currentQuestion <= 1
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTransition('next')}
            disabled={!answers[currentQuestion - 1]?.trim()}
            className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all
              ${
                !answers[currentQuestion - 1]?.trim()
                  ? 'bg-blue-500/30 text-blue-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
              }`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .window-in {
          animation: window-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .window-out {
          animation: window-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
