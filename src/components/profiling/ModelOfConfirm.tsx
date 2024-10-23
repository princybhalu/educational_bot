import React from 'react';
import TeacherReady from '../../assets/image/teacherReady.gif';
import { ProfileScreenName } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';

const AITeacherPrompt = ({ setScreenName }: { setScreenName: any }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        {/* Robot Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12">
            <img src={TeacherReady} />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 text-[#003366]">
          <h2 className="text-lg font-medium">
            Shall We Embark On{' '}
            <span className="text-[#003366] font-bold">
              Creating The AI Teacher You&rsquo;ve Envisioned
            </span>
          </h2>
          <p className="text-lg font-medium">Tailored Just For You?</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            className="w-full bg-[#003366] text-white py-2 px-4 rounded-md transition-colors"
            onClick={() => {
              // setScreenName(ProfileScreenName.LOADING_TEACHER_SCREEN);
              navigate('/dashboard');
            }}
          >
            Craft My AI Teacher
          </button>
          <button className="w-full text-[#003366] py-2 px-4 hover:underline">
            Hold Off for Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITeacherPrompt;
