import React, { useEffect, useState, useRef } from 'react';

interface TypingAnimationCardProps {
  text?: string;
  isVisible: boolean;
  onTypingComplete: () => void;
  className?: string;
  message: string;
}

const TypingAnimationCard: React.FC<TypingAnimationCardProps> = ({
  text,
  isVisible,
  onTypingComplete,
  className = '',
  message = '',
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [fadeStates, setFadeStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (isVisible && !isTyping) {
      setIsTyping(true);
      setFadeStates({});
      const words = message.split(' ').filter((word) => word.length > 0);

      const typeWord = async (word: string) => {
        let tempWord = '';
        for (let i = 0; i <= word.length; i++) {
          tempWord = word.slice(0, i);
          setCurrentWord(tempWord);
          await new Promise((r) => setTimeout(r, 10));
        }
        await new Promise((r) => setTimeout(r, 10));
      };

      const writeMessage = async () => {
        for (let i = 0; i < words.length; i++) {
          setCurrentWordIndex(i);
          await typeWord(words[i]);
          setDisplayWords((prev) => [...prev, words[i]]);

          // Start fade out after a delay
          setTimeout(() => {
            setFadeStates((prev) => ({
              ...prev,
              [i]: true,
            }));
          }, 800); // Delay before starting fade

          setCurrentWord('');
          await new Promise((r) => setTimeout(r, 30));
        }
        setIsTyping(false);
        onTypingComplete();
      };

      timeoutRef.current = setTimeout(writeMessage, 500);

      return () => {
        if (timeoutRef.current) {
          setDisplayWords([]);
          setFadeStates({});
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isVisible, message]);

  if (!isVisible) return null;

  return (
    <div className={`info-card ${className}`}>
      <p className="info-text">
        {displayWords.map((word, index) => (
          <React.Fragment key={index}>
            {index > 0 && ' '}
            <span
              style={{
                transition: 'color 1s ease-out',
                color: fadeStates[index] ? '#ffffff' : '#3b82f6',
              }}
            >
              {word}
            </span>
          </React.Fragment>
        ))}
        {currentWord && (
          <span
            className="current-word word inline-block mx-1"
            style={{ color: '#3b82f6' }}
          >
            {currentWord}
            <span className="animate-pulse">|</span>
          </span>
        )}
      </p>
    </div>
  );
};

export default TypingAnimationCard;
