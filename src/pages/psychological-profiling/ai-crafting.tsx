import React, { useEffect, useState } from 'react';
import Oribt from '../../components/avatar/orbit';
import '../../style/psychological-profile-introduction.css';

const AiTeacherSetup = () => {
  const [configProgress, setConfigProgress] = useState(0);
  const [neuralProgress, setNeuralProgress] = useState(0);
  const [optimizeProgress, setOptimizeProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [setupComplete, setSetupComplete] = useState(false);

  // Generate grid cells
  const gridCells = Array.from({ length: 48 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 2,
  }));

  // Handle mouse move for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--x', `${x}%`);
    e.currentTarget.style.setProperty('--y', `${y}%`);
  };

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConfigProgress((prev) => {
        if (prev < 100) return prev + 1;
        if (activeStep === 0) setActiveStep(1);
        return prev;
      });

      if (configProgress === 100) {
        setNeuralProgress((prev) => {
          if (prev < 100) return prev + 0.5;
          if (activeStep === 1) setActiveStep(2);
          return prev;
        });
      }

      if (neuralProgress === 100) {
        setOptimizeProgress((prev) => {
          if (prev < 100) return prev + 0.25;
          if (activeStep === 2 && !setupComplete) setSetupComplete(true);
          return prev;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [configProgress, neuralProgress, optimizeProgress, activeStep]);

  // Card components
  const ConfigurationCard = () => (
    <div
      className="relative bg-slate-950/95 rounded-2xl p-4 md:p-8 border border-sky-500/20 overflow-hidden hover:border-sky-500 transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="h-8 w-8 md:w-10 md:h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-lg md:text-xl">
            ⚙️
          </div>
          <span className=" text-md md:text-xl font-semibold text-sky-400">
            Configuring Preferences
          </span>
        </div>
        <div className="px-4 py-2 bg-sky-500/10 rounded-full text-sm text-sky-300">
          {Math.round(configProgress)}%
        </div>
      </div>

      <div className="h-40 relative bg-slate-950/50 rounded-xl overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0.5 p-2.5">
          {gridCells.map((cell) => (
            <div
              key={cell.id}
              className="bg-sky-500 rounded-sm grid-cell"
              style={{ animationDelay: `${cell.delay}s` }}
            />
          ))}
        </div>

        {[20, 40, 60, 80].map((top, i) => (
          <div
            key={i}
            className="absolute w-full h-0.5 data-line"
            style={{
              top: `${top}%`,
              background:
                'linear-gradient(90deg, transparent, #7dd3fc, transparent)',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(14, 165, 233, 0.15), transparent 50%)',
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500/10 overflow-hidden">
        <div
          className="h-full bg-sky-500 process-fill"
          style={{ width: `${configProgress}%` }}
        />
      </div>
    </div>
  );

  const NeuralNetworkCard = () => (
    <div
      className="relative bg-slate-950/95 rounded-2xl p-4 md:p-8 border border-sky-500/20 overflow-hidden hover:border-sky-500 transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="h-8 w-8 md:w-10 md:h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-lg md:text-xl">
            🧠
          </div>
          <span className="text-md md:text-xl font-semibold text-sky-400">
            Training Neural Networks
          </span>
        </div>
        <div className="px-4 py-2 bg-sky-500/10 rounded-full text-sm text-sky-300">
          {Math.round(neuralProgress)}%
        </div>
      </div>

      <div className="h-40 relative">
        {[
          { top: 30, left: 10 },
          { top: 70, left: 30 },
          { top: 20, left: 50 },
          { top: 60, left: 70 },
          { top: 40, left: 90 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-sky-300 rounded-full shadow-lg shadow-sky-300 neuron"
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          />
        ))}

        {[
          { top: 35, left: 12, rotate: 15 },
          { top: 45, left: 32, rotate: -15 },
          { top: 30, left: 52, rotate: 15 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-sky-500 opacity-40"
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              width: '38%',
              transform: `rotate(${pos.rotate}deg)`,
            }}
          >
            <div className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300 data-particle" />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(14, 165, 233, 0.15), transparent 50%)',
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500/10 overflow-hidden">
        <div
          className="h-full bg-sky-500 process-fill"
          style={{ width: `${neuralProgress}%` }}
        />
      </div>
    </div>
  );

  const OptimizationCard = () => (
    <div
      className="relative bg-slate-950/95 rounded-2xl p-4 md:p-8 border border-sky-500/20 overflow-hidden hover:border-sky-500 transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-lg md:text-xl">
            ⚡
          </div>
          <span className="text-md md:text-xl font-semibold text-sky-400">
            Optimizing Responses
          </span>
        </div>
        <div className="px-4 py-2 bg-sky-500/10 rounded-full text-sm text-sky-300">
          {Math.round(optimizeProgress)}%
        </div>
      </div>

      <div className="h-40 relative">
        <div className="absolute inset-0 flex flex-col justify-around py-5">
          {[0, 1, 0.5, 1.5].map((delay, i) => (
            <div
              key={i}
              className="relative h-0.5 w-full bg-sky-500 opacity-30"
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 w-8 h-8 wave-pulse"
                style={{
                  animationDelay: `${delay}s`,
                  background:
                    'radial-gradient(circle, #7dd3fc 0%, transparent 70%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(14, 165, 233, 0.15), transparent 50%)',
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500/10 overflow-hidden">
        <div
          className="h-full bg-sky-500 process-fill"
          style={{ width: `${optimizeProgress}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4">
      <style>
        {`
          @keyframes configPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          @keyframes dataStream {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }

          @keyframes neuronPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
          }

          @keyframes particleFlow {
            0% { transform: translateX(0) scale(1); opacity: 1; }
            100% { transform: translateX(100%) scale(0.5); opacity: 0; }
          }

          @keyframes wavePulse {
            0% { left: 0; opacity: 0; }
            50% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }

          @keyframes fillProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .grid-cell {
            animation: configPulse 2s infinite;
          }

          .data-line {
            animation: dataStream 3s linear infinite;
          }

          .neuron {
            animation: neuronPulse 2s infinite;
          }

          .data-particle {
            animation: particleFlow 2s linear infinite;
          }

          .wave-pulse {
            animation: wavePulse 3s linear infinite;
          }

          .process-fill {
            animation: fillProgress 3s linear infinite;
          }
        `}
      </style>

      <div className="w-full max-w-3xl p-8">
        <div className="bg-slate-950/85 backdrop-blur-lg rounded-3xl p-8 border border-sky-500/20 shadow-lg shadow-sky-500/10">
          {/* Header */}
          <div className="text-center mb-12">
            <Oribt operation={null} />
            <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent">
              Crafting Your AI Teacher
            </h1>

            {setupComplete && (
              <a
                href="/start-learning"
                className="inline-block mt-4 px-6 py-3 bg-sky-500 text-white rounded-full font-semibold hover:bg-sky-600 transition-colors duration-300"
              >
                Start Learning →
              </a>
            )}
          </div>

          {/* Display current active card */}
          <div className="space-y-8">
            {activeStep === 0 && <ConfigurationCard />}
            {activeStep === 1 && <NeuralNetworkCard />}
            {activeStep === 2 && <OptimizationCard />}

            {setupComplete && (
              <div className="text-center text-sky-300 animate-fade-in">
                <p>Setup complete! Your AI teacher is ready.</p>
                <div className="flex justify-center gap-2 mt-4">
                  {[0, 1, 2].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${'bg-sky-500'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiTeacherSetup;
