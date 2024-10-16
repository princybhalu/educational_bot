import React, { useState } from 'react';
// import './Accordion.css';

interface Question {
  category_key: string;
  question: string;
  sequence: number;
}

interface TimeLineProps {
  data: Question[];
  currentCategoryKey: string;
  //   TODO: set question type here
  currentQuestion: any;
}

const TimeLIneSetion: React.FC<TimeLineProps> = ({
  data,
  currentCategoryKey,
  currentQuestion,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const markAsCompleted = (question: string) => {
    if (!completedQuestions.includes(question)) {
      setCompletedQuestions((prevCompleted) => [...prevCompleted, question]);
    }
  };

  // Group the data by category
  const groupedData = data.reduce<Record<string, Question[]>>((acc, curr) => {
    if (!acc[curr.category_key]) {
      acc[curr.category_key] = [];
    }
    acc[curr.category_key].push(curr);
    return acc;
  }, {});
  
  return (
    <div className="accordion-container">
      {Object.keys(groupedData).map((category, index) => (
        <div key={index} className="category-section">
          <div
            className="category-heading"
            onClick={() => toggleCategory(category)}
          >
            <span>{category.replace('_', ' ').toUpperCase()}</span>
            <span className="arrow-icon">
              {openCategory === category ? '▲' : '▼'}
            </span>
          </div>

          {openCategory === category && (
            <div className="questions-list">
              {groupedData[category].map((item) => (
                <div
                  key={item.sequence}
                  className={`question-item ${completedQuestions.includes(item.question) ? 'completed' : ''}`}
                  onClick={() => markAsCompleted(item.question)}
                >
                  <span className="bullet-icon">
                    {completedQuestions.includes(item.question) ? '✔' : '•'}
                  </span>
                  <span className="question-text">{item.question}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeLIneSetion;
