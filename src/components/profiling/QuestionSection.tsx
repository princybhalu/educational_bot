import React, { useState } from 'react';
import stressLady from '../../assets/image/stressLady.png';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { QuestionStatus } from '../../utils/enums';

interface Question {
  question_id: string;
  category_key: string;
  question: string;
  sequence: number;
  status: string;
  answer: string;
  generated_question?: string;
}

interface QuestionSectionProps {
  handleAskQuetion: (body: any, a: number, c: string | null) => any;
  questions: Question[];
  displayQuestionIndex: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  handleAskQuetion,
  questions,
  displayQuestionIndex,
}) => {
  console.log('in q', { displayQuestionIndex, questions });
  const [currentIndex, setCurrentIndex] =
    useState<number>(displayQuestionIndex);
  const [answer, setAnswer] = useState<string>('');
  const [isMoving, setIsMoving] = useState<boolean>(false);
  console.log({ questions });
  const handleNext = () => {
    console.log('out  : ', questions, currentIndex);
    if (currentIndex < 5 && !isMoving) {
      console.log('inner ');
      setIsMoving(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setIsMoving(false);
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && !isMoving) {
      setIsMoving(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
        setIsMoving(false);
      }, 500);
    }
  };

  const handleSubmit = async (question: Question) => {
    console.log(
      `Submitted answer for question ${currentIndex + 1}:`,
      answer,
      question
    );
    if (question.status === QuestionStatus.COMPLETED) {
      console.log('completed ques');
      await handleAskQuetion(
        {
          question_id: question.question_id,
          sequence: question.sequence,
          answer,
        },
        currentIndex,
        question.status
      );
    } else {
      await handleAskQuetion(
        {
          question_id: question.question_id,
          sequence: question.sequence,
          answer,
        },
        currentIndex,
        ''
      );
    }
    handleNext();
    setAnswer('');
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  return (
    <div className="w-full h-full flex items-start justify-center px-4 py-8 overflow-hidden">
      <div className="w-full h-[300px] sm:h-[400px] my-10 sm:my-20 mx-6 max-w-md sm:max-w-3xl relative">
        {questions.map((question, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index < currentIndex;
          const isNext = index > currentIndex;

          const cardStyle = {
            transition: 'all 0.5s ease-in-out',
            position: 'absolute',
            left: '4%',
            transform: isActive
              ? 'rotate(0deg)'
              : `rotate(${(index - currentIndex) * 5}deg)`,
            opacity: isActive ? 1 : 0.7,
            pointerEvents: isActive ? 'auto' : 'none',
            zIndex: questions.length - Math.abs(index - currentIndex),
          };

          if (isMoving) {
            if (isPrevious) {
              cardStyle.transform = 'translate(-150%, -50%) rotate(-10deg)';
            } else if (isNext) {
              cardStyle.transform = 'translate(50%, -50%) rotate(10deg)';
            }
          }

          return (
            <div
              key={question.question_id}
              className={`w-full max-w-[90%] sm:max-w-[700px] px-2 rounded-3xl border-2 shadow-lg ${index % 2 ? 'bg-[#F0F8FF] border-blue-700' : 'bg-[#CEE6FF] border-blue-700'} `}
              //@ts-ignore
              style={cardStyle}
            >
              <div className="text-white bg-blue-900 py-1 px-3 text-xs rounded-2xl ml-auto mt-3 max-w-max font-semibold">
                {question.category_key}
              </div>
              <div className="flex flex-col gap-6 flex-1 px-4 max-w-[90%] md:max-w-[80%]">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-900">
                  {question.generated_question ?? question.question}
                </h1>
                <textarea
                  className={`border-b-2 border-[#405E7F] outline-none p-2 resize-none rounded-md h-12 text-xs sm:h-16 md:h-20 md:text-base ${index % 2 ? 'bg-[#F0F8FF]' : 'bg-[#CEE6FF]'}`}
                  value={answer || question.answer}
                  onChange={handleAnswerChange}
                  placeholder="Type your answer here..."
                  disabled={
                    !isActive || question.status === QuestionStatus.COMPLETED
                  }
                ></textarea>
                <button
                  onClick={() => handleSubmit(question)}
                  disabled={
                    !(question.status === QuestionStatus.COMPLETED) &&
                    (isMoving || answer.length === 0)
                  }
                  className={`text-xs sm:text-sm outline-none text-[#405E7F] max-w-max flex gap-2 hover:underline ${!(question.status === QuestionStatus.COMPLETED) && (isMoving || answer.length === 0) ? 'text-[#919191]' : ''} `}
                >
                  {currentIndex === questions.length - 1
                    ? 'Finish'
                    : question.status === QuestionStatus.COMPLETED
                      ? 'Next Question'
                      : 'Submit answer'}
                  <FaArrowRightLong size={18} />
                </button>
              </div>
              <div className="flex justify-between items-end">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0 || isMoving}
                  className="text-xs sm:text-sm outline-none text-[#405E7F] max-w-max mb-5 flex px-4 hover:underline"
                >
                  {currentIndex !== 0 && (
                    <>
                      <FaArrowLeftLong className="w-5 sm:w-6" /> Previous
                      question{' '}
                    </>
                  )}
                </button>
                <img
                  src={stressLady}
                  alt="stress lady"
                  loading="lazy"
                  className="w-1/3 sm:w-1/4 mix-blend-multiply"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionSection;
