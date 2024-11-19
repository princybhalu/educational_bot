import { useState } from 'react';
import { Mail, User, Sparkles } from 'lucide-react';

const SubscriptionForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !email) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0d1e] p-6">
      {/* Orbital Animation Background */}
      <div className="absolute">
        <div
          className="w-[600px] h-[600px] rounded-full animate-spin-slow 
          bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] opacity-10 blur-3xl"
        />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Glow Effects */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] opacity-20 blur-xl 
          rounded-lg transform -rotate-6 scale-105"
        />

        {/* Glass Card */}
        <div
          className="relative backdrop-blur-xl bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]
          rounded-lg shadow-lg overflow-hidden transition-all duration-300
          hover:border-[#4361ee] hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]"
        >
          {/* Content Container */}
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2
                className="text-3xl font-bold bg-gradient-to-r from-white to-[#4cc9f0] 
                bg-clip-text text-transparent"
              >
                Be the First to Know!
              </h2>
              <p className="text-[rgba(255,255,255,0.7)]">
                Enter your name and email to get early access and exclusive
                updates.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative group">
                  <User className="absolute left-3 top-3 h-5 w-5 text-[#4cc9f0]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 bg-[rgba(16,20,46,1)] border border-[rgba(67,97,238,0.2)]
                      rounded-lg text-white placeholder-[rgba(255,255,255,0.5)]
                      focus:outline-none focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee]/20
                      transition-all duration-300"
                  />
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-[#4cc9f0]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full pl-10 pr-4 py-3 bg-[rgba(16,20,46,1)] border border-[rgba(67,97,238,0.2)]
                      rounded-lg text-white placeholder-[rgba(255,255,255,0.5)]
                      focus:outline-none focus:border-[#4361ee] focus:ring-2 focus:ring-[#4361ee]/20
                      transition-all duration-300"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full relative group overflow-hidden rounded-lg"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] 
                  opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative px-6 py-3 flex items-center justify-center space-x-2">
                  <span className="text-white font-semibold">
                    Subscribe Now
                  </span>
                  <Sparkles
                    className={`h-5 w-5 text-white transition-transform duration-300
                    ${isHovered ? 'scale-125' : 'scale-100'}`}
                  />
                </div>
              </button>
            </form>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="text-[#4cc9f0] text-center animate-fade-in">
                Thanks for subscribing! We&apos;ll be in touch soon.
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-400 text-center animate-fade-in">
                Please fill in all fields.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
