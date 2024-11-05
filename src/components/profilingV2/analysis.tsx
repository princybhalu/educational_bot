import React, { useState, useEffect } from 'react';

interface ProfileData {
  learning_style: string;
  strengths: string[];
  recommended_approach: string;
}

interface ProfileDataEdit {
  learning_style: boolean;
  strengths: boolean;
  recommended_approach: boolean;
}

const LearningProfile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    learning_style: '',
    strengths: [],
    recommended_approach: '',
  });

  const [editValues, setEditValues] = useState<ProfileData>({
    learning_style: '',
    strengths: [],
    recommended_approach: '',
  });

  const [isEditing, setIsEditing] = useState<ProfileDataEdit>({
    learning_style: false,
    strengths: false,
    recommended_approach: false,
  });

  // Simulate API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API data
      const data: ProfileData = {
        learning_style: 'Visual-Practical Learner with analytical approach',
        strengths: [
          'Strong problem-solving abilities',
          'Quick pattern recognition',
          'Good at practical applications',
        ],
        recommended_approach:
          'Your AI teacher will use visual examples and practical scenarios...',
      };
      setProfileData(data);
      setEditValues(data);
    };
    fetchData();
  }, []);

  const handleEdit = (key: keyof ProfileData) => {
    setIsEditing((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: keyof ProfileData, value: string | string[]) => {
    setEditValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: keyof ProfileData) => {
    setProfileData((prev) => ({ ...prev, [key]: editValues[key] }));
    handleEdit(key);
  };

  const handleCreateTeacher = () => {
    console.log('Creating teacher profile...');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Your Learning Profile
        </h2>

        {/* Learning Style Section */}
        <div className="mb-4 p-4 bg-gray-700 rounded-md">
          <h3 className="text-blue-400 font-semibold mb-2">Learning Style</h3>
          {isEditing.learning_style ? (
            <textarea
              value={editValues.learning_style}
              onChange={(e) => handleChange('learning_style', e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          ) : (
            <p className="text-gray-300">{profileData.learning_style}</p>
          )}
          <button
            onClick={() =>
              isEditing.learning_style
                ? handleSave('learning_style')
                : handleEdit('learning_style')
            }
            className="mt-2 text-sm text-blue-300"
          >
            {isEditing.learning_style ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Strengths Section */}
        <div className="mb-4 p-4 bg-gray-700 rounded-md">
          <h3 className="text-purple-400 font-semibold mb-2">Strengths</h3>
          {isEditing.strengths ? (
            <textarea
              value={editValues.strengths.join('\n')}
              onChange={(e) =>
                handleChange('strengths', e.target.value.split('\n'))
              }
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          ) : (
            <ul className="text-gray-300 list-disc pl-5">
              {profileData.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          )}
          <button
            onClick={() =>
              isEditing.strengths
                ? handleSave('strengths')
                : handleEdit('strengths')
            }
            className="mt-2 text-sm text-purple-300"
          >
            {isEditing.strengths ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Recommended Approach Section */}
        <div className="mb-4 p-4 bg-blue-700 rounded-md">
          <h3 className="text-pink-300 font-semibold mb-2">
            Recommended Approach
          </h3>
          {isEditing.recommended_approach ? (
            <textarea
              value={editValues.recommended_approach}
              onChange={(e) =>
                handleChange('recommended_approach', e.target.value)
              }
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          ) : (
            <p className="text-gray-300">{profileData.recommended_approach}</p>
          )}
          <button
            onClick={() =>
              isEditing.recommended_approach
                ? handleSave('recommended_approach')
                : handleEdit('recommended_approach')
            }
            className="mt-2 text-sm text-pink-300"
          >
            {isEditing.recommended_approach ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Create Teacher Button */}
        <button
          onClick={handleCreateTeacher}
          className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500"
        >
          Let&apos;s Create Teacher
        </button>
      </div>
    </div>
  );
};

export default LearningProfile;
