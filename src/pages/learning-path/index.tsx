import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaChevronRight } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md';
import { GetAllSubjects } from '../../services/api/learningPath';

interface Subject {
  id: string;
  subject_name: string;
  chapter_ids: string[];
}

const LearningPathDashboard: React.FC = () => {
  const [subjectList, setSubjectList] = useState<Subject[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await GetAllSubjects();
        setSubjectList(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const handleNavigateToChaptersList = (
    subjectId: string,
    name: string
  ): void => {
    navigate(`/learning-path/chapter-list/${subjectId}/${name}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!subjectList) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
        <MdOutlineError className="text-5xl mb-4 text-red-600" />
        <p className="text-xl font-semibold">
          An error occurred while loading the dashboard.
        </p>
        <p className="mt-2">Please try again later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Learning Path Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjectList.map((subject: Subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg cursor-pointer"
              onClick={() =>
                handleNavigateToChaptersList(subject.id, subject.subject_name)
              }
            >
              <div className="bg-[#D4EBFF] p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {subject.subject_name}
                </h2>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">
                  Explore the comprehensive curriculum of {subject.subject_name}{' '}
                  and enhance your expertise.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#003366]">
                    <FaBook className="mr-2" />
                    <span className="font-medium">
                      {subject.chapter_ids.length} Chapters
                    </span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningPathDashboard;
