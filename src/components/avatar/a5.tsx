import React, { useState, useEffect, useRef, CSSProperties } from 'react';

interface WaterDropProps {
  className?: string;
  style?: CSSProperties;
}

const WaterDrop: React.FC<WaterDropProps> = ({ className, style }) => (
  <svg viewBox="0 0 100 120" className={className} style={style}>
    <defs>
      <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.9 }} />
        <stop offset="50%" style={{ stopColor: '#818cf8', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: '#c084fc', stopOpacity: 0.9 }} />
      </linearGradient>
      <filter id="dropShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
        <feOffset dx="2" dy="2" result="offsetblur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path
      d="M50,0 C50,0 90,50 90,80 C90,110 70,120 50,120 C30,120 10,110 10,80 C10,50 50,0 50,0 Z"
      fill="url(#dropGradient)"
      filter="url(#dropShadow)"
    />
    <ellipse
      cx="35"
      cy="45"
      rx="15"
      ry="10"
      fill="rgba(255, 255, 255, 0.3)"
      transform="rotate(-30, 35, 45)"
    />
  </svg>
);

const ChatInterface: React.FC = () => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [avatarState, setAvatarState] = useState<'full' | 'empty' | 'filling'>('full');
  const [blobState, setBlobState] = useState<'hidden' | 'emerging' | 'dropping' | 'morphing' | 'writing' | 'returning'>('hidden');
  const [linePosition, setLinePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);

  const aiMessage =
    'The transcriptions API takes as input the audio file you want to transcribe and the desired output file format for the transcription of the audio. We currently support multiple input and output file formats';
  const words = aiMessage.split(' ');
  const textContainerRef = useRef<HTMLDivElement>(null);

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
        const currentWordSpan = textContainerRef.current.querySelector('.current-word') as HTMLElement;
        if (currentWordSpan) {
          const rect = currentWordSpan.getBoundingClientRect();
          const containerRect = textContainerRef.current.getBoundingClientRect();
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

  const getBlobStyles = (): CSSProperties => {
    const baseStyle: CSSProperties = {
      position: 'absolute',
      width: '32px',
      height: '40px',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 2,
    };

    switch (blobState) {
      case 'emerging':
        return { ...baseStyle, top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)', opacity: 1 };
      case 'dropping':
        return { ...baseStyle, top: '180%', left: '0%', transform: 'translate(-50%, 0) scale(1)', animation: 'dropBounce 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' };
      case 'morphing':
        return { ...baseStyle, width: '3px', height: '24px', top: '180%', left: '0%', transform: 'translate(-50%, 0) scale(1)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' };
      case 'writing':
        return { ...baseStyle, width: '3px', height: '24px', transform: `translate(${linePosition.x}px, ${linePosition.y}px)`, transition: 'transform 0.05s linear' };
      case 'returning':
        return { ...baseStyle, width: '32px', height: '40px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0 };
      default:
        return { ...baseStyle, opacity: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl relative">
        <div className="flex justify-center mb-16">
          <div className="relative w-24 h-24" style={{ animation: 'float 3s ease-in-out infinite' }}>
            <WaterDrop style={getBlobStyles()} />
          </div>
        </div>

        {/* Message text container */}
        <div ref={textContainerRef} className="text-center text-white">
          {displayWords.map((word, index) => (
            <span key={index} className="mr-1">
              {word}
            </span>
          ))}
          <span className="current-word">{currentWord}</span>
        </div>

        <style>{`
          @keyframes dropBounce {
            0% { transform: translate(-50%, -50%); }
            70% { transform: translate(-50%, 100px); }
            85% { transform: translate(-50%, 90px); }
            100% { transform: translate(-50%, 100px); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ChatInterface;
