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
  const [profileData, setProfileData] = useState<ProfileData>({
    learning_style: '',
    learning_style_1: '',
    learning_style_2: '',
    learning_style_3: '',
    strength: '',
    recommended_approach: '',
  });

  const [editValues, setEditValues] = useState<string>('');
  const [recommendedApproachEdit, setRecommendedApproachEdit] =
    useState<boolean>(false);

  // Simulate API call to fetch data
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API data
      const data: ProfileData = {
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
    handleRecommendedApproachEdit();
  };

  return (
    <>
      <div className="min-h-screen w-full bg-gray-800 p-6 md:p-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Your Learning Profile
          </h2>

          {/* Dynamic Fields Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(profileData).map(([key, value]) => {
              // Ensure that value is treated as a string
              const stringValue = value as string;

              // Skip recommended_approach
              if (key === 'recommended_approach') return null;

              return (
                <div
                  key={key}
                  className="bg-gray-700 rounded-md p-6 hover:bg-gray-600 transition-colors duration-300"
                >
                  <h3 className="text-blue-400 font-semibold mb-2 text-lg">
                    {key.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-gray-300">{stringValue}</p>
                </div>
              );
            })}
          </div>

          {/* Recommended Approach Section */}
          <div className="bg-blue-700 rounded-md p-6 mt-8 hover:bg-blue-600 transition-colors duration-300">
            <h3 className="text-pink-300 font-semibold mb-2 text-lg">
              Recommended Approach
            </h3>
            {recommendedApproachEdit ? (
              <textarea
                value={editValues}
                onChange={(e) =>
                  handleRecommendedApproachChange(e.target.value)
                }
                className="w-full p-2 bg-gray-800 text-white rounded-md"
                rows={4}
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
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              {recommendedApproachEdit ? 'Save' : 'Edit'}
            </button>
          </div>

          {/* Create Teacher Button */}
          <button
            onClick={() => console.log('Creating teacher profile...')}
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors duration-300"
          >
            Let&apos;s Create Teacher
          </button>
        </div>
      </div>
    </>
  );
};

export default LearningProfile;
