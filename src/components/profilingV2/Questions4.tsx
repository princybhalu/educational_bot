import React, { useState } from 'react';

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
}) => {
  const [answer, setAnswer] = useState<string>(answers[questionNumber - 1]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    const updatedAnswers = [...answers];
    updatedAnswers[questionNumber - 1] = answer;
    setAnswers(updatedAnswers);
  };

  const isPreviousDisabled = questionNumber <= 1;
  const isSubmitDisabled = answer.trim() === '';

  return (
    <div
      className={`mx-auto bg-[rgb(18,24,38)] text-white rounded-lg p-6 shadow-lg w-full transition-all duration-500
        ${isTransitioning ? (transitionDirection === 'in' ? 'avatar-transition-in' : 'avatar-transition-out') : ''}`}
    >
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold">
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>

      {/* Question Text */}
      <p className="text-lg font-medium mb-4">{questionText}</p>

      {/* Text Area for Additional Input */}
      <textarea
        value={answer}
        onChange={handleTextAreaChange}
        placeholder="Write your answer here..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none mb-4"
        rows={3}
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

  const questions = [
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
    // Add more questions as needed
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
        // setAnswers('');
      }

      setTransitionDirection('out');

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

  const handleSubmit = (answer: string) => {
    // const updatedAnswers = [...answers];
    // updatedAnswers[currentQuestion - 1] = answer;
    // setAnswers(updatedAnswers);

    if (currentQuestion < questions.length) {
      handleTransition('next');
    } else {
      console.log('Quiz completed:', answers);
    }
  };

  // Calculate progress percentage
  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="min-h-screen w-full max-w-4xl items-center justify-center">
      <div className="w-full mx-auto flex flex-col items-center">
        <div
          className={`relative w-24 h-24 mb-4 transition-transform duration-300 ${isAvatarActive ? 'avatar-active' : ''}`}
        >
          {/* Base Avatar */}
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'rgb(18, 24, 38)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
            }}
          />

          {/* Gradient Color Layer */}
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
        </div>

        {/* Progress Section */}
        <div className="w-full px-4 mb-8">
          <div className="flex justify-between items-center mb-2 text-white">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">
              {currentQuestion}/{questions.length} Questions
            </span>
          </div>

          {/* <div className="flex justify-between mb-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index + 1 === currentQuestion
                    ? 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white'
                    : index + 1 < currentQuestion
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div> */}

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
        />

        {/* Previous and Submit Buttons Outside the Card */}
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
          <button
            onClick={() => handleSubmit(answers[currentQuestion - 1])}
            disabled={answers[currentQuestion - 1]?.trim() === ''}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              answers[currentQuestion - 1]?.trim() === ''
                ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Submit
          </button>
        </div>
      </div>

      <style>{`
        @keyframes avatar-glow {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.1); filter: brightness(1.2); }
          100% { transform: scale(1); filter: brightness(1); }
        }

        .avatar-active {
          transform: scale(1.2);
        }

        .avatar-glow {
          animation: avatar-glow 1s ease-in-out;
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
