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

  useEffect(() => {
    if (isVisible && !isTyping) {
      setIsTyping(true);
      // Split message into words and add extra space at end
      const words = message.split(' ').filter((word) => word.length > 0);

      const typeWord = async (word: string) => {
        let tempWord = '';
        // Type each character with a smoother animation
        for (let i = 0; i <= word.length; i++) {
          tempWord = word.slice(0, i);
          setCurrentWord(tempWord);
          // Randomize typing speed slightly for more natural feel
          await new Promise((r) => setTimeout(r, Math.random() * 15 + 25));
        }
        // Pause briefly after completing each word
        await new Promise((r) => setTimeout(r, 100));
      };

      const writeMessage = async () => {
        for (let i = 0; i < words.length; i++) {
          setCurrentWordIndex(i);
          await typeWord(words[i]);
          setDisplayWords((prev) => [...prev, words[i]]);
          setCurrentWord('');
          // Add slight pause between words
          await new Promise((r) => setTimeout(r, 80));
        }
        setIsTyping(false);
        onTypingComplete();
      };

      // Start typing after a short initial delay
      timeoutRef.current = setTimeout(writeMessage, 500);

      // Cleanup function
      return () => {
        if (timeoutRef.current) {
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
            {word}
          </React.Fragment>
        ))}
        {currentWord && (
          <span className="current-word word inline-block mx-1 text-[#3b82f6]">
            {currentWord}
            <span className="animate-pulse">|</span>
          </span>
        )}
      </p>
    </div>
  );
};

export default TypingAnimationCard;
