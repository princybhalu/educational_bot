import React, { useState, useEffect } from 'react';

const useTypingPlaceholder = (
  phrases: string[],
  speed: number,
  delay: number
) => {
  const [placeholder, setPlaceholder] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      if (!isDeleting && charIndex < phrases[phraseIndex].length) {
        // Type forward
        setPlaceholder((prev) => prev + phrases[phraseIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        // Delete backward
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === phrases[phraseIndex].length) {
        // Pause after typing
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase and reset
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timeout = setTimeout(type, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases, speed, delay]);

  return placeholder;
};

export default useTypingPlaceholder;
