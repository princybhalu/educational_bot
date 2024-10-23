import { ProfileScreenName } from '../../utils/enums';
import { useState } from 'react';

interface ContentCardProps {
  title?: string;
  content: string;
  setScreenName: (a: string) => void;
  //   onPrevious?: () => void;
  //   onConfirm?: () => void;
}

const TeacherDescriptionByTextArea = ({
  title = 'Final Description Of Teacher',
  content,
  setScreenName,
}: ContentCardProps) => {
  const onPrevious = () => {
    console.log('cbv');
    setScreenName(ProfileScreenName.GIVE_DESCRIPTION_OF_TEACHER);
  };

  const onConfirm = () => {
    console.log('njvkf');
    setScreenName(ProfileScreenName.CHECKING_GIVE_DESCRIPTION_OF_TEACHER);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* Title with gradient */}
      <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
        {title}
      </h2>

      {/* Main content area */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 min-h-[200px] shadow-sm">
        {content}
      </div>

      {/* Button container */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onPrevious}
          className="px-6 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-300"
        >
          Previous
        </button>

        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default TeacherDescriptionByTextArea;
