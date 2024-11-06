import React, { useState, useEffect } from 'react';

interface ProfileData {
  learning_style: string;
  learning_style_1: string;
  learning_style_2: string;
  learning_style_3: string;
  strength: string;
  recommended_approach: string;
}

const LearningProfile: React.FC = () => {
  const [profileData, setProfileData] = useState({});
  const [editValues, setEditValues] = useState<string>('');

  // State for recommended approach to handle separately
  const [recommendedApproachEdit, setRecommendedApproachEdit] =
    useState<boolean>(false);

  // Simulate API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API data
      const data = {
        learning_style: 'Visual-Practical Learner with analytical approach',
        learning_style_1: 'Visual-Practical Learner with analytical approach 1',
        learning_style_2: 'Visual-Practical Learner with analytical approach 2',
        learning_style_3: 'Visual-Practical Learner with analytical approach 3',
        strength:
          'Strong problem-solving abilities, Quick pattern recognition, Good at practical applications',
        recommended_approach:
          'Your AI teacher will use visual examples and practical scenarios...',
      };
      setProfileData(data);
      setEditValues(data.recommended_approach);
    };
    fetchData();
  }, []);

  const handleRecommendedApproachEdit = () => {
    setRecommendedApproachEdit((prev) => !prev);
  };

  const handleRecommendedApproachChange = (value: string) => {
    setEditValues(value);
  };

  const handleRecommendedApproachSave = () => {
    // setProfileData((prev) => ({
    //   ...prev,
    //   recommended_approach: editValues.recommended_approach,
    // }));
    handleRecommendedApproachEdit();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Your Learning Profile
        </h2>

        {/* Dynamic Fields Section */}
        {Object.entries(profileData).map(([key, value]) => {
          // Ensure that value is treated as a string
          const stringValue = value as string;

          // Skip recommended_approach
          if (key === 'recommended_approach') return null;

          return (
            <div key={key} className="mb-4 p-4 bg-gray-700 rounded-md">
              <h3 className="text-blue-400 font-semibold mb-2">
                {key.replace(/_/g, ' ')}
              </h3>
              <p className="text-gray-300">{stringValue}</p>
            </div>
          );
        })}

        {/* Recommended Approach Section */}
        <div className="mb-4 p-4 bg-blue-700 rounded-md">
          <h3 className="text-pink-300 font-semibold mb-2">
            Recommended Approach
          </h3>
          {recommendedApproachEdit ? (
            <textarea
              value={editValues}
              onChange={(e) => handleRecommendedApproachChange(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded-md"
            />
          ) : (
            <p className="text-gray-300">{editValues}</p>
          )}
          <button
            onClick={
              recommendedApproachEdit
                ? handleRecommendedApproachSave
                : handleRecommendedApproachEdit
            }
            className="mt-2 text-sm text-pink-300"
          >
            {recommendedApproachEdit ? 'Save' : 'Edit'}
          </button>
        </div>

        {/* Create Teacher Button */}
        <button
          onClick={() => console.log('Creating teacher profile...')}
          className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-500"
        >
          Let&apos;s Create Teacher
        </button>
      </div>
    </div>
  );
};

export default LearningProfile;
