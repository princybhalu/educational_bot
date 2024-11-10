import React, { useEffect, useRef } from 'react';

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;

    function resize() {
      if (canvas && ctx) {
        canvas.width = window.innerWidth * devicePixelRatio;
        canvas.height = window.innerHeight * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150,
    };

    window.addEventListener('mousemove', (event: MouseEvent) => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      //@ts-ignore
      x: number;
      //@ts-ignore
      y: number;
      //@ts-ignore
      vx: number;
      //@ts-ignore
      vy: number;
      size: number;
      baseSize: number;
      color: string;
      pulseAngle: number;
      connections: any[] = [];

      constructor() {
        this.reset();
        this.size = Math.random() * 2 + 1;
        this.baseSize = this.size;
        this.color = this.getRandomColor();
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      reset() {
        if (canvas) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = (Math.random() - 0.5) * 0.8;
          this.connections = [];
        }
      }

      getRandomColor() {
        const colors = ['#4361ee', '#3498db', '#2ecc71', '#4cc9f0'];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (this && canvas) {
          if (mouse.x !== undefined && mouse.y !== undefined) {
            //@ts-ignore
            const dx = mouse.x - this.x;
            //@ts-ignore
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
              const force = (mouse.radius - distance) / mouse.radius;
              //@ts-ignore
              this.vx -= (dx / distance) * force * 0.05;
              //@ts-ignore
              this.vy -= (dy / distance) * force * 0.05;
            }
          }

          //@ts-ignore
          this.x += this.vx;
          //@ts-ignore
          this.y += this.vy;

          //@ts-ignore
          if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
          //@ts-ignore
          if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

          this.pulseAngle += 0.02;
          this.size = this.baseSize + Math.sin(this.pulseAngle) * 0.5;
        }
      }

      draw() {
        if (ctx) {
          ctx.beginPath();
          ctx.fillStyle = this.color;
          //@ts-ignore
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const particles = Array.from({ length: 50 }, () => new Particle());

    function animate() {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        particles.forEach((particle1, i) => {
          for (let j = i + 1; j < particles.length; j++) {
            const particle2 = particles[j];
            const dx = particle1.x - particle2.x;
            const dy = particle1.y - particle2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
              const opacity = 1 - distance / 150;
              const gradient = ctx.createLinearGradient(
                particle1.x,
                particle1.y,
                particle2.x,
                particle2.y
              );
              gradient.addColorStop(
                0,
                particle1.color.replace(')', `, ${opacity})`)
              );
              gradient.addColorStop(
                1,
                particle2.color.replace(')', `, ${opacity})`)
              );

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = opacity * 2;
              ctx.moveTo(particle1.x, particle1.y);
              ctx.lineTo(particle2.x, particle2.y);
              ctx.shadowBlur = 10;
              ctx.shadowColor = particle1.color;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        });

        if (Math.random() < 0.03) {
          createEnergyBurst();
        }

        requestAnimationFrame(animate);
      }

      function createEnergyBurst() {
        if (canvas && ctx) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 50 + 30;

          ctx.beginPath();
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, 'rgba(67, 97, 238, 0.3)');
          gradient.addColorStop(1, 'rgba(67, 97, 238, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    window.addEventListener('resize', () => {
      resize();
      particles.forEach((particle) => particle.reset());
    });

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-network" />;
};

export default NeuralNetwork;
