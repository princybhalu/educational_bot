import React, { useState } from 'react';

interface QuestionCardProps {
  question: {
    id: number;
    question: string;
    category_key: string; // extra key that we won't display
  };
  handleAskQuetion: (a: any) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  handleAskQuetion,
}) => {
  const [answer, setAnswer] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(`Answer for Question ${question.id}:`, answer);
      await handleAskQuetion({ id: question.id, answer });
      setAnswer('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="question-card">
      <div className="card-header">
        <h2>{question.question}</h2>
      </div>
      <div className="card-body">
        <textarea
          placeholder="Please answer..."
          value={answer}
          onChange={handleChange}
          rows={3} // Initial height is 3 lines
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!answer.trim()}
        >
          Submit Answer →
        </button>
        <div className="previous-question">← Previous question</div>
      </div>
    </div>
  );
};

export default QuestionCard;
