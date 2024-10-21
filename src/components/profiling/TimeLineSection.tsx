import React, { useState, useEffect } from 'react';
// import './Accordion.css';
import { QuestionStatus } from '../../utils/enums';
import '../../style/timeline.css';

interface Question {
  category_key: string;
  question: string;
  sequence: number;
  status: string;
}

interface TimeLineProps {
  questionList: Question[];
}

interface TimelineItemProps {
  item: Question[];
  index: number;
  nextCompleted: boolean;
  lengthOfData: number;
  category_name: string;
  isCategoryCompleted: (a: Question[]) => boolean;
  toggleCategory: (a: string, b: boolean) => void;
  isDisabled: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  nextCompleted,
  lengthOfData,
  category_name,
  isCategoryCompleted,
  isDisabled,
  toggleCategory,
}) => {
  const isFirst = index === 0;
  const isLast = index === lengthOfData - 1;
  console.log({
    item,
    nextCompleted,
  });
  return (
    <div
      className="flex flex-col items-center flex-1"
      onClick={() => toggleCategory(category_name, isDisabled)}
    >
      <div
        className={`mb-2 ${isCategoryCompleted(item) ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <div className="text-center text-sm font-medium mb-2">
        {category_name}
      </div>
      <div className={`flex items-center w-full `}>
        {!isFirst && (
          <div
            className={`flex-1 border-t-2 border-dashed ${isCategoryCompleted(item) ? 'border-blue-600' : 'border-gray-300'}`}
          />
        )}
        <div
          className={`w-3 h-3 rounded-full ${isCategoryCompleted(item) ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
        {!isLast && (
          <div
            className={`flex-1 border-t-2 border-dashed ${nextCompleted ? 'border-blue-600' : 'border-gray-300'}`}
          />
        )}
      </div>
    </div>
  );
};

const TimeLIneSetion: React.FC<TimeLineProps> = ({ questionList }) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string, isDisabled: boolean) => {
    if (!isDisabled) {
      console.log(
        { isDisabled, openCategory, category },
        ' isDisabled inside func'
      );

      setOpenCategory(openCategory === category ? null : category);
    }
  };

  // Group the data by category
  const groupedData = questionList.reduce<Record<string, Question[]>>(
    (acc, curr) => {
      if (!acc[curr.category_key]) {
        acc[curr.category_key] = [];
      }
      acc[curr.category_key].push(curr);
      return acc;
    },
    {}
  );
  console.log({ groupedData });

  // Determine if a category should be disabled or green
  const isCategoryDisabled = (questions: Question[]) =>
    questions.every((q) => q.status === QuestionStatus.DISABLE);

  const isCategoryCompleted = (questions: Question[]) =>
    questions.every((q) => q.status === QuestionStatus.COMPLETED);

  const isCategoryActive = (questions: Question[]) =>
    questions.some((q) => q.status === QuestionStatus.ACTIVE);

  // Open the first active category by default
  useEffect(() => {
    const firstActiveCategory = Object.keys(groupedData).find((category) =>
      isCategoryActive(groupedData[category])
    );
    if (firstActiveCategory) {
      console.log({ firstActiveCategory, groupedData });
      setOpenCategory(firstActiveCategory);
    }
  }, []);

  return (
    <>
      <div className="accordion-container block lg:hidden">
        {Object.keys(groupedData).map((category, index) => {
          const questions = groupedData[category];
          const isDisabled = isCategoryDisabled(questions);
          const isCompleted = isCategoryCompleted(questions);
          const isActive = isCategoryActive(questions);
          // console.log({
          //   isActive , isDisabled , isCompleted
          // })
          return (
            <>
              {/* tab & mobile view */}
              <div key={index} className="category-section">
                <div
                  className={`category-heading ${isDisabled ? 'text-[#919191]' : isCompleted ? 'text-green-500' : 'text-[#003366]'}`}
                  onClick={() => toggleCategory(category, isDisabled)}
                  style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                >
                  <div className="flex  justify-between items-center">
                    <div className="flex">
                      {isCompleted && (
                        <>
                          {' '}
                          <svg
                            width="20"
                            height="24"
                            viewBox="0 0 20 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.91807 1.65283C7.95647 1.65283 6.03891 2.23452 4.40789 3.32433C2.77687 4.41414 1.50565 5.96313 0.754973 7.77542C0.00429735 9.58771 -0.192114 11.5819 0.190577 13.5058C0.573268 15.4297 1.51787 17.197 2.90494 18.584C4.29201 19.9711 6.05924 20.9157 7.98316 21.2984C9.90707 21.6811 11.9013 21.4847 13.7136 20.734C15.5258 19.9833 17.0748 18.7121 18.1646 17.0811C19.2545 15.4501 19.8361 13.5325 19.8361 11.5709C19.8334 8.94132 18.7875 6.42023 16.9281 4.56083C15.0687 2.70144 12.5477 1.65561 9.91807 1.65283ZM14.2725 9.82189L8.93199 15.1624C8.86113 15.2333 8.77699 15.2896 8.68437 15.328C8.59176 15.3664 8.49248 15.3861 8.39222 15.3861C8.29196 15.3861 8.19268 15.3664 8.10006 15.328C8.00744 15.2896 7.9233 15.2333 7.85245 15.1624L5.56366 12.8736C5.4205 12.7304 5.34008 12.5363 5.34008 12.3338C5.34008 12.1314 5.4205 11.9372 5.56366 11.7941C5.70682 11.6509 5.90098 11.5705 6.10343 11.5705C6.30589 11.5705 6.50005 11.6509 6.6432 11.7941L8.39222 13.544L13.1929 8.74234C13.2638 8.67146 13.348 8.61523 13.4406 8.57687C13.5332 8.53851 13.6325 8.51876 13.7327 8.51876C13.833 8.51876 13.9322 8.53851 14.0248 8.57687C14.1175 8.61523 14.2016 8.67146 14.2725 8.74234C14.3434 8.81323 14.3996 8.89738 14.438 8.98999C14.4763 9.08261 14.4961 9.18187 14.4961 9.28212C14.4961 9.38236 14.4763 9.48163 14.438 9.57424C14.3996 9.66685 14.3434 9.75101 14.2725 9.82189Z"
                              fill="#19B500"
                            />
                          </svg>
                        </>
                      )}

                      {isDisabled && (
                        <>
                          <svg
                            width="12"
                            height="13"
                            viewBox="0 0 12 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="my-auto"
                          >
                            <circle
                              cx="5.91778"
                              cy="6.57085"
                              r="4.95904"
                              fill="#919191"
                              stroke="#919191"
                              strokeWidth="1.65301"
                            />
                          </svg>
                        </>
                      )}

                      {!isDisabled && !isCompleted && (
                        <>
                          <svg
                            width="12"
                            height="24"
                            viewBox="0 0 12 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="5.91778"
                              cy="11.5709"
                              r="4.95904"
                              fill="#003366"
                              stroke="#003366"
                              strokeWidth="1.65301"
                            />
                          </svg>
                        </>
                      )}

                      <span className="ml-2">
                        {' '}
                        {category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="arrow-icon">
                    {openCategory === category ? (
                      <>
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 7L7 1L13 7"
                            stroke="#003366"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L7 7L13 1"
                            stroke="#003366"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </div>

                {openCategory === category && (
                  <div className="questions-list">
                    {questions.map((item) => {
                      const isCompletedQuestion =
                        item.status === QuestionStatus.COMPLETED;
                      const isActiveQuestion =
                        item.status === QuestionStatus.ACTIVE;
                      const isDisabledQuestion =
                        item.status === QuestionStatus.DISABLE;

                      return (
                        <div
                          key={item.sequence}
                          className={`question-item ${item.status === QuestionStatus.COMPLETED ? 'completed' : item.status === QuestionStatus.ACTIVE ? 'active' : 'disable'}`}
                        >
                          <span className="bullet-icon">
                            {item.status === QuestionStatus.COMPLETED
                              ? '✔'
                              : item.status === QuestionStatus.DISABLE
                                ? '✘'
                                : '•'}
                          </span>
                          <span className="question-text">{item.question}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
      {/* Web view */}
      <div className="questions-list-web hidden lg:block">
        <div className="w-full p-8">
          <div className="flex justify-between items-start">
            {Object.keys(groupedData).map((item, index) => (
              <TimelineItem
                key={index}
                category_name={item}
                item={groupedData[item]}
                index={index}
                nextCompleted={isCategoryCompleted(groupedData[item])}
                lengthOfData={Object.keys(groupedData).length}
                isCategoryCompleted={isCategoryCompleted}
                toggleCategory={toggleCategory}
                isDisabled={isCategoryDisabled(groupedData[item])}
              />
            ))}
          </div>
          <div className="p-5">
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-900">{openCategory}</h2>
            {/* Red underline */}
            <div className="w-16 h-1 bg-red-500 mt-1 mb-4"></div>

            {/* List of questions */}
            <div className="space-y-4">
              {openCategory &&
                groupedData[openCategory].map((question, index) => (
                  <div key={index} className="flex items-start">
                    {/* Dotted line and dot */}
                    <div className="relative mr-4 my-auto">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${question.status === QuestionStatus.ACTIVE ? 'bg-blue-900' : question.status === QuestionStatus.COMPLETED ? 'bg-green-500' : 'bg-gray-400'}`}
                      ></div>
                      {index < groupedData[openCategory].length - 1 && (
                        <div
                          className={`w-px h-10 bg-blue-900 absolute top-3 left-1.5 ${question.status === QuestionStatus.ACTIVE ? 'opacity-100' : 'opacity-30'}`}
                        ></div>
                      )}
                    </div>
                    {/* Question text */}
                    <p
                      className={`${question.status === QuestionStatus.ACTIVE ? 'text-green-500 font-semibold' : question.status === QuestionStatus.COMPLETED ? 'text-green-500' : 'text-gray-400'}`}
                    >
                      {question.question}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLIneSetion;
