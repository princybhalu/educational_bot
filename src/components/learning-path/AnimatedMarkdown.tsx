import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'; // Assuming you're using react-markdown

interface AnimatedMarkdownProps {
  content: string;
  typingSpeed?: number;
}

const AnimatedMarkdown: React.FC<AnimatedMarkdownProps> = ({
  content,
  typingSpeed = 50, // Default typing speed (ms per character)
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedContent(''); // Reset content when new content prop is received

    let currentIndex = 0;
    const contentLength = content.length;

    const typingInterval = setInterval(() => {
      if (currentIndex < contentLength) {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [content, typingSpeed]);

  return (
    <div className="card-content relative">
      <Markdown>{displayedContent}</Markdown>
      {isTyping && (
        <span className="inline-block animate-blink absolute">|</span>
      )}
    </div>
  );
};

// Add required CSS for the blinking cursor animation
const style = document.createElement('style');
style.textContent = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }
`;
document.head.appendChild(style);

export default AnimatedMarkdown;