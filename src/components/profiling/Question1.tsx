import React, { useState } from 'react';
import './sty.css';

interface QuestionCardProps {
  questions: { id: number; question: string; category_key?: string }[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill('')
  );
  const [submitted, setSubmitted] = useState<boolean[]>(
    Array(questions.length).fill(false)
  ); // New state for animation

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (index: number) => {
    console.log(`Answer for Question ${index + 1}:`, answers[index]);

    // Set the submitted state to true to trigger the animation
    const newSubmitted = [...submitted];
    newSubmitted[index] = true;
    setSubmitted(newSubmitted);

    // Optional: Reset the submitted state after the animation
    setTimeout(() => {
      newSubmitted[index] = false;
      setSubmitted(newSubmitted);
    }, 1000); // Set the duration of the animation
  };

  return (
    <div className="question-card-container">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`question-card ${submitted[index] ? 'submitted' : ''}`}
        >
          {' '}
          {/* Add class conditionally */}
          <div className="card-header">
            <h2>{question.question}</h2>
          </div>
          <div className="card-body">
            <input
              type="text"
              placeholder="Please answer..."
              value={answers[index]}
              onChange={(e) => handleChange(e, index)}
            />
            <button
              className="submit-btn"
              onClick={() => handleSubmit(index)}
              disabled={!answers[index].trim()}
            >
              Submit Answer →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
