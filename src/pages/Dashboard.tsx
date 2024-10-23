import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Learning Path Card */}
      <div
        className="flex flex-col justify-between bg-blue-500 text-white rounded-lg shadow-lg p-6 cursor-pointer hover:bg-blue-600 transition"
        onClick={() => handleNavigation('/learning-path')}
      >
        <h2 className="text-xl font-bold">Learning Path</h2>
        <p className="mt-2">
          Explore the learning path and improve your skills.
        </p>
        {/* <div className="mt-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div> */}
      </div>

      {/* Daily Study Planner Card */}
      <div
        className="flex flex-col justify-between bg-green-500 text-white rounded-lg shadow-lg p-6 cursor-pointer hover:bg-green-600 transition"
        onClick={() => handleNavigation('/study-planner')}
      >
        <h2 className="text-xl font-bold">Daily Study Planner</h2>
        <p className="mt-2">
          Plan your daily studies effectively and achieve your goals.
        </p>
        {/* <div className="mt-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8h18M3 12h18m-7 4h7"
            />
          </svg>
        </div> */}
      </div>
    </div>
  );
}
