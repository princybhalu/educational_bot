import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber - 1] = e.target.value;
    setAnswers(updatedAnswers);
  };

  return (
    <div
      className={`mx-auto bg-[rgb(18,24,38)] text-white rounded-lg p-6 shadow-lg w-full transition-all duration-500
        ${isTransitioning ? (transitionDirection === 'in' ? 'avatar-transition-in' : 'avatar-transition-out') : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold flex">
          <Sparkles className="w-4 h-4 text-blue-400 mr-3" />
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>

      <p className="text-lg font-medium mb-4">{questionText}</p>

      <textarea
        value={answer}
        onChange={handleTextAreaChange}
        placeholder="Write your answer here..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none mb-4"
        rows={3}
        disabled={isSubmitted}
      />
    </div>
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
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const questions = [
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
  ];

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

  const writeFeedback = async (feedback: string) => {
    setDisplayWords([]);
    setCurrentWord('');
    setCurrentWordIndex(-1);
    setIsTypingComplete(false);

    await drainColor();
    await new Promise((r) => setTimeout(r, 600));

    const words = feedback.split(' ');
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

  // const handleTransition = (direction: 'prev' | 'next') => {
  //   setTransitionDirection('in');
  //   setIsTransitioning(true);
  //   setIsAvatarActive(true);

  //   setTimeout(() => {
  //     if (direction === 'prev') {
  //       setCurrentQuestion(currentQuestion - 1);
  //     } else {
  //       setCurrentQuestion(currentQuestion + 1);
  //     }
  //     setTransitionDirection('out');
  //     setDisplayWords([]);
  //     setCurrentWord('');
  //     setCurrentWordIndex(-1);
  //     setIsTypingComplete(false);

  //     setTimeout(() => {
  //       setIsTransitioning(false);
  //       setIsAvatarActive(false);
  //     }, 500);
  //   }, 500);
  // };

  const handleTransition = (direction: 'prev' | 'next') => {
    setTransitionDirection('in');
    setIsTransitioning(true);
    setIsAvatarActive(true);

    // Calculate the position of the avatar for animation
    const avatar = document.querySelector('.avatar-container');
    const card = document.querySelector('.question-card');
    if (avatar && card) {
      const avatarRect = avatar.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const translateX =
        avatarRect.left -
        cardRect.left +
        (avatarRect.width - cardRect.width) / 2;
      const translateY =
        avatarRect.top -
        cardRect.top +
        (avatarRect.height - cardRect.height) / 2;

      document.documentElement.style.setProperty(
        '--card-translate-x',
        `${translateX}px`
      );
      document.documentElement.style.setProperty(
        '--card-translate-y',
        `${translateY}px`
      );
    }

    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentQuestion(currentQuestion - 1);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
      setTransitionDirection('out');
      setDisplayWords([]);
      setCurrentWord('');
      setCurrentWordIndex(-1);
      setIsTypingComplete(false);

      setTimeout(() => {
        setIsTransitioning(false);
        setIsAvatarActive(false);
      }, 500);
    }, 500);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      handleTransition('prev');
    }
  };

  const handleSubmit = async (answer: string) => {
    try {
      // Call your API here
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     questionNumber: currentQuestion,
      //     answer: answer,
      //   }),
      // });

      // const data = await response.json();
      const data = {
        feedback: 'Thank you for your thoughtful response! Your ',
      };
      const feedback =
        data.feedback ||
        'Thank you for your thoughtful response! Your answer shows good insight into your learning preferences.';

      const updatedFeedbacks = [...feedbacks];
      updatedFeedbacks[currentQuestion - 1] = feedback;
      setFeedbacks(updatedFeedbacks);

      await writeFeedback(feedback);
    } catch (error) {
      console.error('Error submitting answer:', error);
      const errorFeedback =
        'There was an error processing your response. Please try again.';
      await writeFeedback(errorFeedback);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      handleTransition('next');
    } else {
      console.log('Quiz completed:', answers);
    }
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen bg-black w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="avatar-container relative w-24 h-24 mb-4 transition-transform duration-300">
          <div
            className={`relative w-24 h-24 mb-4 transition-transform duration-300 ${isAvatarActive ? 'avatar-active' : ''}`}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'rgb(18, 24, 38)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />

            <div
              className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300
              ${isAvatarActive ? 'avatar-glow' : ''}`}
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
                transform: 'scale(1)',
                zIndex: 1,
              }}
            />

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
          </div>
        </div>

        {/* Feedback Display */}
        {displayWords.length > 0 && (
          <div className="w-full max-w-3xl bg-[#12182a] rounded-lg p-4 mb-8 shadow-lg border border-[#1d2235]">
            <p className="text-md md:text-lg text-white leading-relaxed">
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
                <span className="current-word word inline-block mx-1 text-[#3b82f6]">
                  {currentWord} <span className="animate-pulse">|</span>
                </span>
              )}
            </p>
          </div>
        )}

        <div className="w-full px-4 mb-8">
          <div className="flex justify-between items-center mb-2 text-white">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">
              {currentQuestion}/{questions.length} Questions
            </span>
          </div>

          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-full rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
              }}
            />
          </div>
        </div>
        <div className="question-card-container w-full perspective-1000">
          <QuestionCard
            questionNumber={currentQuestion}
            totalQuestions={questions.length}
            questionText={questions[currentQuestion - 1]}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isTransitioning={isTransitioning}
            transitionDirection={transitionDirection}
            answers={answers}
            setAnswers={setAnswers}
            isSubmitted={feedbacks[currentQuestion - 1] !== ''}
          />
        </div>

        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion <= 1}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentQuestion <= 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            Previous
          </button>
          {!feedbacks[currentQuestion - 1] ? (
            <button
              onClick={() => handleSubmit(answers[currentQuestion - 1])}
              disabled={!answers[currentQuestion - 1]?.trim()}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                !answers[currentQuestion - 1]?.trim()
                  ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isTypingComplete}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isTypingComplete
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-green-500/50 text-gray-300 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <style>{`
       .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes window-in {
          0% {
            transform: translate(0, 0) scale(1) rotateX(0);
            opacity: 1;
          }
          100% {
            transform: 
              translate(var(--card-translate-x), var(--card-translate-y))
              scale(0.1)
              rotateX(45deg);
            opacity: 0;
          }
        }

        @keyframes window-out {
          0% {
            transform: 
              translate(var(--card-translate-x), var(--card-translate-y))
              scale(0.1)
              rotateX(-45deg);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1) rotateX(0);
            opacity: 1;
          }
        }

        .window-in {
          animation: window-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        .window-out {
          animation: window-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .avatar-active {
          transform: scale(1.1);
        }
          
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
            .word {
            position: relative;
            white-space: pre;
          }

           @keyframes card-to-avatar-in {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: scale(0.1) translate(0, -200px);
            opacity: 0;
          }
        }

        @keyframes card-from-avatar-out {
          0% {
            transform: scale(0.1) translate(0, -200px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
        }

        .avatar-transition-in {
          animation: card-to-avatar-in 0.5s ease-in-out forwards;
        }

        .avatar-transition-out {
          animation: card-from-avatar-out 0.5s ease-in-out forwards;
        }
   `}</style>
    </div>
  );
};

export default Quiz;
