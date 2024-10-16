import React, { useState } from 'react';

interface Question {
  category_key: string;
  question: string;
  sequence: number;
  isCompleted?: boolean;
}

interface Props {
  data: Question[];
  currentCategory: string;
}

const LearningGroove: React.FC<Props> = ({ data, currentCategory }) => {
  const [openCategory, setOpenCategory] = useState(currentCategory);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);

  const categories = Array.from(new Set(data.map((item) => item.category_key)));

  const handleCategoryClick = (category: string) => {
    const currentCategoryIndex = categories.indexOf(openCategory);
    const clickedCategoryIndex = categories.indexOf(category);

    if (clickedCategoryIndex <= currentCategoryIndex || completedCategories.includes(categories[clickedCategoryIndex - 1])) {
      setOpenCategory(category);
    }
  };

  const handleCompleteCategory = (category: string) => {
    setCompletedCategories([...completedCategories, category]);
    const nextCategoryIndex = categories.indexOf(category) + 1;
    if (nextCategoryIndex < categories.length) {
      setOpenCategory(categories[nextCategoryIndex]);
    }
  };

  return (
    <div className="learning-groove-container">
      {/* Horizontal timeline */}
      <div className="timeline flex items-center justify-between relative py-6">
        {categories.map((category, index) => (
          <div key={category} className="flex flex-col items-center">
            <div
              className={`icon-wrapper ${completedCategories.includes(category) ? 'bg-blue-500' : 'bg-gray-300'} ${
                openCategory === category ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="icon bg-white rounded-full p-2">
                <img
                  src={completedCategories.includes(category) ? '/completed-icon.png' : '/file-icon.png'}
                  alt="icon"
                  className="w-6 h-6"
                />
              </div>
            </div>
            <p className="text-sm mt-2">{category}</p>
            {/* Line connecting milestones */}
            {index < categories.length - 1 && (
              <div
                className={`line bg-gray-300 ${
                  completedCategories.includes(categories[index]) ? 'bg-blue-500' : ''
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Questions list */}
      <div className="questions-list">
        {data
          .filter((item) => item.category_key === openCategory)
          .map((item) => (
            <div key={item.sequence} className="question-item">
              <p>{item.question}</p>
              <button
                className={`complete-btn ${completedCategories.includes(item.category_key) ? 'hidden' : ''}`}
                onClick={() => handleCompleteCategory(item.category_key)}
              >
                Mark as Complete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LearningGroove;
