import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [displayWords, setDisplayWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [avatarState, setAvatarState] = useState('full');
  const [blobState, setBlobState] = useState('hidden');
  const [linePosition, setLinePosition] = useState({ x: 0, y: 0 });
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [drainProgress, setDrainProgress] = useState(0);

  const aiMessage =
    'The transcriptions API takes as input the audio file you want to transcribe and the desired output file format for the transcription of the audio. We currently support multiple input and output file formats';
  const words = aiMessage.split(' ');
  const textContainerRef = useRef(null);
  const blobRef = useRef(null);

  const drainColor = async () => {
    for (let i = 0; i <= 100; i += 2) {
      setDrainProgress(i);
      await new Promise((r) => setTimeout(r, 10));
    }
  };

  const fillColor = async () => {
    for (let i = 100; i >= 0; i -= 2) {
      setDrainProgress(i);
      await new Promise((r) => setTimeout(r, 10));
    }
  };

  const typeWord = async (word: string) => {
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord(tempWord);
      setCurrentLetterIndex(i);

      if (textContainerRef.current) {
        const currentWordSpan =
          //@ts-ignore
          textContainerRef.current.querySelector('.current-word');
        if (currentWordSpan) {
          const rect = currentWordSpan.getBoundingClientRect();
          //@ts-ignore
          const containerRect =
            //@ts-ignore
            textContainerRef.current.getBoundingClientRect();
          const letterWidth = rect.width / word.length;
          setLinePosition({
            x: rect.left - containerRect.left + letterWidth * i,
            y: rect.top - containerRect.top + 80,
          });
        }
      }
      await new Promise((r) => setTimeout(r, 50));
    }
    return new Promise((r) => setTimeout(r, 100));
  };

  const writeMessage = async () => {
    setBlobState('emerging');
    await drainColor();
    setAvatarState('empty');

    setBlobState('dropping');
    await new Promise((r) => setTimeout(r, 600));

    setBlobState('morphing');
    await new Promise((r) => setTimeout(r, 400));

    setBlobState('writing');

    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);
      await typeWord(words[i]);
      //@ts-ignore
      setDisplayWords((prev) => [...prev, words[i]]);
      setCurrentWord('');
      await new Promise((r) => setTimeout(r, 50));
    }

    setBlobState('returning');
    await new Promise((r) => setTimeout(r, 600));

    setAvatarState('filling');
    setBlobState('hidden');
    await fillColor();

    setAvatarState('full');
    setIsTyping(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true);
      writeMessage();
    }, 1000);
  }, []);

  const getBlobStyles = () => {
    const baseStyle = {
      position: 'absolute',
      background: 'linear-gradient(45deg, #60a5fa, #c084fc, #ec4899)',
      backgroundSize: '200% 200%',
      animation: 'gradient 3s ease infinite',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 15px rgba(168, 85, 247, 0.6)',
      zIndex: 2,
    };

    const dropStyle = {
      ...baseStyle,
      width: '20px',
      height: '20px',
      borderRadius: '20px',
      animation:
        'gradient 3s ease infinite, drip 2s cubic-bezier(1,0,.91,.19) infinite',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '30px solid currentColor',
        top: '-22px',
      },
    };

    switch (blobState) {
      case 'emerging':
        return {
          ...dropStyle,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        };
      case 'dropping':
        return {
          ...dropStyle,
          top: '180%',
          left: '0%',
          transform: 'translate(-50%, 0)',
        };
      case 'morphing':
        return {
          ...dropStyle,
          width: '3px',
          height: '24px',
          borderRadius: '3px',
          top: '180%',
          left: '0%',
          transform: 'translate(-50%, 0)',
        };
      case 'writing':
        return {
          ...baseStyle,
          width: '3px',
          height: '24px',
          borderRadius: '3px',
          transform: `translate(${linePosition.x}px, ${linePosition.y}px)`,
          transition: 'transform 0.05s linear',
        };
      case 'returning':
        return {
          ...baseStyle,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
        };
      default:
        return { ...baseStyle, opacity: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl relative">
        <div className="flex justify-center mb-16">
          <div
            className="relative w-24 h-24"
            style={{
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: '#1a1a1a',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />

            <div
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background: 'white',
                opacity: drainProgress / 100,
                transition: 'opacity 0.1s ease-out',
              }}
            />

            <div
              className="absolute top-0 left-0 w-full h-full rounded-full"
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #c084fc, #ec4899)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
                opacity: 1 - drainProgress / 100,
                transform: 'scale(1)',
                transition: 'all 0.1s ease-out',
                zIndex: 1,
              }}
            />

            <div
              ref={blobRef}
              //@ts-ignore
              style={getBlobStyles()}
            />
          </div>
        </div>

        <div
          ref={textContainerRef}
          className="bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-800"
        >
          <p className="text-lg text-white leading-relaxed">
            {displayWords.map((word, index) => (
              <span
                key={index}
                className={`
                  word inline-block mx-1
                  transition-all duration-200 ease-out
                  ${index === currentWordIndex ? 'text-purple-400' : 'text-white'}
                `}
              >
                {word}
              </span>
            ))}
            {currentWord && (
              <span className="current-word word inline-block mx-1 text-purple-400">
                {currentWord} <span>|</span>
              </span>
            )}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes drip {
          0% { transform: translateY(0); }
          70% { transform: translateY(100px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
