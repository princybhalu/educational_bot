import React, { useState, useEffect, useRef } from 'react';

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

const ChatInterface: React.FC = () => {
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [avatarState, setAvatarState] = useState<string>('full');
  const [blobState, setBlobState] = useState<string>('hidden');
  const [linePosition, setLinePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);

  const aiMessage =
    'The transcriptions API takes as input the audio file you want to transcribe and the desired output file format for the transcription of the audio. We currently support multiple input and output file formats';
  const words = aiMessage.split(' ');
  const textContainerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const createDrainParticle = (): DrainParticle => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 48;
    const speed = 2 + Math.random() * 2;
    const size = 3 + Math.random() * 4;

    return {
      id: Math.random(),
      startX: Math.cos(angle) * radius,
      startY: Math.sin(angle) * radius,
      angle,
      speed,
      size,
      progress: 0,
    };
  };

  const drainColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 0; i <= 100; i += 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.min(100, particle.progress + particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const fillColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 100; i >= 0; i -= 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.max(0, particle.progress - particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const updateCursorPosition = (
    wordElement: HTMLSpanElement | null,
    letterIndex: number,
    word: string
  ) => {
    if (wordElement && cursorRef.current) {
      const rect = wordElement.getBoundingClientRect();
      const containerRect = textContainerRef.current!.getBoundingClientRect();

      // Calculate the position of the current letter
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.fontSize = window.getComputedStyle(wordElement).fontSize;
      tempSpan.style.fontFamily =
        window.getComputedStyle(wordElement).fontFamily;
      tempSpan.textContent = word.substring(0, letterIndex);
      wordElement.appendChild(tempSpan);

      const letterOffset = tempSpan.offsetWidth;
      wordElement.removeChild(tempSpan);

      const newX = rect.left - containerRect.left + letterOffset;
      const newY = rect.top - containerRect.top;

      //   cursorRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      cursorRef.current.style.height = `${rect.height}px`;

      // Add transition for smooth movement
      //   cursorRef.current.style.transition = 'transform 0.05s cubic-bezier(0.4, 0.0, 0.2, 1)';
    }
  };

  const typeWord = async (word: string) => {
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord(tempWord);
      setCurrentLetterIndex(i);

      if (textContainerRef.current) {
        const currentWordSpan = textContainerRef.current.querySelector(
          '.current-word'
        ) as HTMLSpanElement;
        if (currentWordSpan) {
          updateCursorPosition(currentWordSpan, i, word);
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

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl relative">
        <div className="flex justify-center mb-16">
          <div className="relative w-24 h-24 avatar">
            {/* Base Avatar */}
            <div
              className="w-full h-full rounded-full pulse-glow"
              style={{
                background: '#1a1a1a',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            />

            {/* Rotating Gradient Overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full rotating-gradient"
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #c084fc, #ec4899)',
                backgroundSize: '200% 200%',
              }}
            />

            {/* Inner Floating Particles */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full floating-particles"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          ref={textContainerRef}
          className="bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-800"
        >
          <p className="text-lg text-white leading-relaxed relative">
            {displayWords.map((word, index) => (
              <span
                key={index}
                className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                  index === currentWordIndex ? 'text-purple-400' : 'text-white'
                }`}
              >
                {word}
              </span>
            ))}
            {currentWord && (
              <span className="current-word word inline-block mx-1 text-purple-400">
                {currentWord} <span> | </span>
              </span>
            )}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes rotate-gradient {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .pulse-glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .rotating-gradient {
          animation: rotate-gradient 10s linear infinite;
          mix-blend-mode: screen;
        }
        .floating-particles {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
