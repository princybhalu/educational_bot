import React, { useState } from 'react';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  onPrevious: () => void;
  onSubmit: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  onPrevious,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState<string>('');

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const isPreviousDisabled = questionNumber <= 1;
  const isSubmitDisabled = answer.trim() === '';

  return (
    <div className="mx-auto bg-gray-800 text-white rounded-lg p-6 shadow-lg w-full">
      {/* Question Text */}
      <p className="text-sm font-medium mb-4">{questionText}</p>

      {/* Text Area for Additional Input */}
      <textarea
        value={answer}
        onChange={handleTextAreaChange}
        placeholder="Write your answer here..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none mb-4"
        rows={3}
      />

      {/* Previous and Submit Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={isPreviousDisabled}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isPreviousDisabled
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => onSubmit(answer)}
          disabled={isSubmitDisabled}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isSubmitDisabled
              ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<string[]>(Array(10).fill(''));

  const questions = [
    'When learning something new, how do you prefer to start?',
    'What motivates you to complete a task?',
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

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = (answer: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion - 1] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      //@ts-ignore
      setAnswers(''); // Clear answer for the next question
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
          className="relative w-24 h-24 mb-4"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
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
            className="absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              background: 'linear-gradient(45deg, #60a5fa, #c084fc, #ec4899)',
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite',
              transform: 'scale(1)',
              transition: 'all 0.1s ease-out',
              zIndex: 1,
            }}
          />
        </div>

        {/* Progress Section */}
        <div className="w-full px-4 mb-8">
          {/* Progress Title and Count */}
          <div className="flex justify-between items-center mb-2 text-white">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">
              {currentQuestion}/{questions.length} Questions
            </span>
          </div>

          {/* Question Indicators */}
          <div className="flex justify-between mb-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index + 1 === currentQuestion
                    ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white'
                    : index + 1 < currentQuestion
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-full rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(45deg, #60a5fa, #c084fc, #ec4899)',
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
        />
      </div>
    </div>
  );
};

export default Quiz;
