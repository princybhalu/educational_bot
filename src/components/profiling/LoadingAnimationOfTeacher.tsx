import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingAnimation = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            navigate('/dashboard');
          }, 5000);
          return 100;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F1F1F1] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[600px] aspect-square relative flex flex-col justify-center items-center">
        {/* SVG Animation - Scaled based on viewport */}
        <div className="w-full max-w-[500px] aspect-square scale-75 sm:scale-90 md:scale-100 mb-8">
          <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
            {/* Adjusted Y coordinates to move design upward */}
            <circle className=" fill-[#003366] stroke-[#003366]" cx="150" cy="190" r="5" />
            <circle className=" fill-[#003366] stroke-[#003366]" cx="250" cy="170" r="5" />
            <circle className=" fill-[#003366] stroke-[#003366]" cx="300" cy="140" r="5" />
            <circle className=" fill-[#003366] stroke-[#003366]" cx="380" cy="40" r="5" />
            <circle className=" fill-[#003366] stroke-[#003366]" cx="340" cy="275" r="5" />
            <circle className=" fill-[#003366] stroke-[#003366]" cx="210" cy="340" r="5" />
            
            <line 
              className="animate-drawLine1 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="150" y1="190" x2="250" y2="170" 
            />
            <line 
              className="animate-drawLine2 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="250" y1="170" x2="300" y2="140" 
            />
            <line 
              className="animate-drawLine3 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="300" y1="140" x2="380" y2="40" 
            />
            <line 
              className="animate-drawLine4 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="300" y1="140" x2="340" y2="275" 
            />
            <line 
              className="animate-drawLine5 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="210" y1="340" x2="340" y2="275" 
            />
            <line 
              className="animate-drawLine6 stroke-[#003366] stroke-2 stroke-round opacity-0" 
              x1="210" y1="340" x2="250" y2="170" 
            />
          </svg>
        </div>

        {/* Loading Content Container - Centered and responsive */}
        <div className="w-full max-w-[400px] px-4 flex flex-col items-center gap-6">
          {/* Loading Text - Responsive font sizes */}
          <p className="text-base sm:text-lg md:text-xl text-[#003366] animate-pulse text-center">
            According to Your Choice Your Teacher is being prepared
          </p>
          
          {/* Progress Bar - Responsive width */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#003366] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Percentage - Responsive font size */}
          <p className="text-sm sm:text-base text-[#003366] font-medium">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;