import React, { useState, useEffect } from 'react';
// import './Accordion.css';
import { QuestionStatus } from '../../utils/enums';
import '../../style/timeline.css';
import MascotTextComponent from './MascotTextComponent';
import {
  FaCheckCircle,
  FaCircle,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';

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
  openCategory: string | null;
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
  openCategory,
}) => {
  const isFirst = index === 0;
  const isLast = index === lengthOfData - 1;
  console.log({
    item,
    nextCompleted,
  });
  return (
    <div
      className="flex flex-col items-center justify-center flex-1"
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
          className="size-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      {openCategory === category_name ? (
        <div className="w-[2px] border-dashed bg-blue-700 h-7"></div>
      ) : (
        <div className="text-center text-sm font-medium mb-2">
          {category_name}
        </div>
      )}

      <div className={`flex items-center w-full `}>
        <div
          className={`w-1/2 border-t-2 border-dashed ${isFirst ? 'border-white' : isCategoryCompleted(item) ? 'border-blue-600' : 'border-gray-300'}`}
        />
        <div
          className={`w-4 h-4 mx-auto rounded-full ${isCategoryCompleted(item) || openCategory === category_name ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
        <div
          className={`w-1/2 ml-auto border-t-2 border-dashed ${isLast ? 'border-white' : nextCompleted ? 'border-blue-600' : 'border-gray-300'}`}
        />
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
  console.log({ groupedData }, 'this is group fljdfs');

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
                  className={`category-heading ${isDisabled ? 'text-[#919191]' : isCompleted ? 'text-green-500' : 'text-[#003366]'} border-b-2`}
                  onClick={() => toggleCategory(category, isDisabled)}
                  style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                >
                  <div className="flex  justify-between items-center">
                    <div className="flex items-center">
                      {isCompleted && (
                        <FaCheckCircle className="mr-2 text-green-500" />
                      )}

                      {isDisabled && (
                        <FaCircle className="mr-2 text-gray-400" size="0.8em" />
                      )}

                      {!isDisabled && !isCompleted && (
                        <FaCircle className="mr-2 text-blue-900" size="0.8em" />
                      )}

                      <span className="ml-2 capitalize">
                        {' '}
                        {category.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="arrow-icon">
                    {openCategory === category ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
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
                            {item.status === QuestionStatus.COMPLETED ? (
                              <FaCheckCircle className="text-green-500 mr-2" />
                            ) : item.status === QuestionStatus.DISABLE ? (
                              <FaCircle
                                className="text-gray-400 mr-2"
                                size="0.5em"
                              />
                            ) : (
                              <div className="w-2 h-2 bg-blue-900 rounded-full mr-2" />
                            )}
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
                openCategory={openCategory}
              />
            ))}
          </div>
          {/* <div className="p-5">
            <h2 className="text-2xl font-bold text-blue-900">{openCategory}</h2>
            <div className="w-16 h-1 bg-red-500 mt-1 mb-4"></div>

            <div className="space-y-4">
              {openCategory &&
                groupedData[openCategory].map((question, index) => (
                  <div key={index} className="flex items-start">
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
                    <p
                      className={`${question.status === QuestionStatus.ACTIVE ? 'text-green-500 font-semibold' : question.status === QuestionStatus.COMPLETED ? 'text-green-500' : 'text-gray-400'}`}
                    >
                      {question.question}
                    </p>
                  </div>
                ))}
            </div>
          </div> */}

          <div className="p-10 max-w-[1200px] mx-auto flex gap-10">
            <div className="w-1/2">
              {/* Title */}
              <h2 className="text-2xl font-bold text-blue-900">
                {openCategory}
              </h2>
              {/* Red underline */}
              <div className="w-16 h-1 bg-red-500 mt-1 mb-4"></div>

              {/* List of timeline items */}

              <div className="space-y-4">
                {openCategory &&
                  groupedData[openCategory].map((item, index) => (
                    <div key={index} className="flex items-start">
                      {/* Dotted line and dot */}
                      <div className="relative mr-4 my-auto">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${
                            item.status === 'ACTIVE'
                              ? 'bg-blue-900'
                              : item.status === 'COMPLETED'
                                ? 'bg-green-500'
                                : 'bg-gray-400'
                          }`}
                        ></div>

                        {index < groupedData[openCategory].length - 1 && (
                          <div
                            className={`w-px h-10 bg-blue-900 absolute top-3 left-[5px] ${
                              item.status === 'ACTIVE'
                                ? 'opacity-100'
                                : 'opacity-30'
                            }`}
                          ></div>
                        )}
                      </div>
                      {/* Item text */}
                      <p
                        className={`text-base md:text-lg ${
                          item.status === 'ACTIVE'
                            ? 'text-green-500 font-semibold'
                            : item.status === 'COMPLETED'
                              ? 'text-green-500'
                              : 'text-gray-400'
                        }`}
                      >
                        {item.question}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[45%]">
              {/* <MascotTextComponent
                text="Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text."
                direction="left"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLIneSetion;
