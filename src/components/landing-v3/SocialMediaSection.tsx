import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const SocialMediaSection = () => {
  // Animation states for hover effects
  const [hoveredIcon, setHoveredIcon] = React.useState(null);

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', delay: '0ms' },
    { icon: Twitter, name: 'Twitter', delay: '100ms' },
    { icon: Instagram, name: 'Instagram', delay: '200ms' },
    { icon: Linkedin, name: 'LinkedIn', delay: '300ms' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Glass container with orbital effect */}
      <div className="relative overflow-hidden rounded-2xl bg-[rgba(16,20,46,0.9)] p-12 border border-[rgba(67,97,238,0.2)] shadow-[0_10px_30px_rgba(67,97,238,0.2)]">
        {/* Orbital background effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-[spin_20s_linear_infinite] opacity-10"
            style={{
              background:
                'conic-gradient(from 0deg, #4361ee, #4cc9f0, #4361ee, #4cc9f0, #4361ee)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Heading with gradient text */}
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-[#4cc9f0] bg-clip-text text-transparent">
            Stay Connected
          </h2>

          {/* Social media icons grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {socialLinks.map((social) => (
              <div
                key={social.name}
                className="group flex flex-col items-center"
                style={{ animationDelay: social.delay }}
              >
                <button
                   //@ts-ignore
                  onMouseEnter={() => setHoveredIcon(social.name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="relative p-4 rounded-xl bg-[rgba(67,97,238,0.1)] border border-transparent 
                           transition-all duration-300 hover:border-[#4361ee] hover:shadow-[0_0_30px_rgba(67,97,238,0.4)]
                           hover:-translate-y-1"
                >
                  <social.icon
                    size={32}
                    className={`transition-all duration-300 ${
                      hoveredIcon === social.name
                        ? 'text-[#4cc9f0]'
                        : 'text-white'
                    }`}
                  />
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      hoveredIcon === social.name ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute inset-0 bg-[#4361ee] opacity-20 blur-xl" />
                  </div>
                </button>
                <span className="mt-2 text-white/70 group-hover:text-white transition-colors duration-300">
                  {social.name}
                </span>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <p className="text-center text-white/70 text-lg">
            Follow us for the latest updates and insights
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaSection;
