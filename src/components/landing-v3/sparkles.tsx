/* eslint-disable react/prop-types */
// @ts-nocheck
import { useEffect, useId, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface SparklesProps {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  direction?: string;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  mousemove?: boolean;
  hover?: boolean;
  background?: string;
  options?: Record<string, any>; // Adjust type as needed based on `options` structure
}

// export default function Sparkles({
//   className,
//   size = 1.2,
//   minSize = null,
//   density = 800,
//   speed = 1.5,
//   minSpeed = null,
//   opacity = 1,
//   direction = '',
//   opacitySpeed = 3,
//   minOpacity = null,
//   color = '#ffffff',
//   mousemove = false,
//   hover = false,
//   background = 'transparent',
//   options = {},
// }: SparklesProps) {
//   const [isReady, setIsReady] = useState(true);

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setIsReady(true);
//     });
//   }, []);

//   const id = useId();
//   const defaultOptions = {
//     background: {
//       color: {
//         value: background,
//       },
//     },
//     fullScreen: {
//       enable: false,
//       zIndex: 1,
//     },
//     fpsLimit: 300,

//     interactivity: {
//       events: {
//         onClick: {
//           enable: true,
//           mode: 'push',
//         },
//         onHover: {
//           enable: hover,
//           mode: 'grab',
//           parallax: {
//             enable: mousemove,
//             force: 60,
//             smooth: 10,
//           },
//         },
//         resize: true as any,
//       },
//       modes: {
//         push: {
//           quantity: 4,
//         },
//         repulse: {
//           distance: 200,
//           duration: 0.4,
//         },
//       },
//     },
//     particles: {
//       color: {
//         value: color,
//       },
//       move: {
//         enable: true,
//         direction,
//         speed: {
//           min: minSpeed || speed / 130,
//           max: speed,
//         },
//         straight: true,
//       },
//       collisions: {
//         absorb: {
//           speed: 2,
//         },
//         bounce: {
//           horizontal: {
//             value: 1,
//           },
//           vertical: {
//             value: 1,
//           },
//         },
//         enable: false,
//         maxSpeed: 50,
//         mode: 'bounce',
//         overlap: {
//           enable: true,
//           retries: 0,
//         },
//       },
//       number: {
//         value: density,
//       },
//       opacity: {
//         value: {
//           min: minOpacity || opacity / 10,
//           max: opacity,
//         },
//         animation: {
//           enable: true,
//           sync: false,
//           speed: opacitySpeed,
//         },
//       },
//       size: {
//         value: {
//           min: minSize || size / 1.5,
//           max: size,
//         },
//       },
//     },
//     detectRetina: true,
//   };
//   return (
//     // isReady && (
//       <Particles id={id} options={defaultOptions} className={className} />
//     // )
//   );
// }

const SparklesComp: React.FC<SparklesProps> = ({
  className,
  size = 1.2,
  minSize = null,
  density = 800,
  speed = 1.5,
  minSpeed = null,
  opacity = 1,
  direction = '',
  opacitySpeed = 3,
  minOpacity = null,
  color = '#4cc9f0', // Updated to match theme color
  mousemove = false,
  hover = false,
  background = 'transparent',
  options = {},
}) => {
  const [isReady, setIsReady] = useState(true);
  const id = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const defaultOptions = {
    background: {
      color: {
        value: background,
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'grab',
          parallax: {
            enable: mousemove,
            force: 60,
            smooth: 10,
          },
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: [
          '#4361ee', // Primary blue
          '#4cc9f0', // Secondary blue
          '#ffffff', // White for contrast
        ],
      },
      links: {
        color: '#4361ee',
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        direction: direction,
        speed: {
          min: minSpeed || speed / 2,
          max: speed,
        },
        straight: false,
        outModes: {
          default: 'bounce',
        },
      },
      number: {
        value: density,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: {
          min: minOpacity || opacity / 2,
          max: opacity,
        },
        animation: {
          enable: true,
          speed: opacitySpeed,
          sync: false,
        },
      },
      size: {
        value: {
          min: minSize || size / 1.5,
          max: size,
        },
      },
    },
    detectRetina: true,
  };

  return <Particles id={id} options={defaultOptions} className={className} />;
};

export default SparklesComp;
