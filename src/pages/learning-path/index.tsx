import React, { useEffect, useState } from 'react';
import { GetAllSubjects } from '../../services/api/learningPath';
import { useNavigate } from 'react-router-dom';

export default function LearningPathDashboard() {
  const [subjectList, setSubjectList] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const GetAllSubjectsByApiCall = async () => {
    try {
      const res = await GetAllSubjects();
      console.log({ res });
      setSubjectList(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleNavigateToChaptersList = (subjectId: string, name: string) => {
    console.log('navigation called');
    navigate('/learning-path/chapter-list/' + subjectId + '/' + name);
  };

  useEffect(() => {
    GetAllSubjectsByApiCall().then();
  }, []);

  return (
    <>
      <div>
        {isLoading && (
          <>
            <div> Loading .......... </div>
          </>
        )}

        {!isLoading && subjectList === null && (
          <>
            <div> Some things goes wrong </div>
          </>
        )}

        {!isLoading &&
          subjectList &&
          subjectList.length > 0 &&
          subjectList.map((subject, index) => (
            <>
              <div
                key={index}
                className="flex flex-col md:flex-row justify-center items-center p-4 gap-6"
                onClick={() =>
                  handleNavigateToChaptersList(subject.id, subject.subject_name)
                }
              >
                <div className="relative w-80 p-6 bg-gradient-to-br from-white to-[#00336640] shadow-lg rounded-lg">
                  {/* Radial Gradient Circle */}
                  {/* <div
          className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,55,102,0.4038) 30%, rgba(255,255,255,1) 100%)',
          }}
        ></div> */}

                  <h2 className="text-xl font-bold text-[#003366]">
                    {subject.subject_name}
                  </h2>
                  <p className="text-gray-700">Enter your views here</p>
                  <p className="text-gray-700">Enter your views here</p>
                  <p className="mt-4 text-lg font-semibold text-[#003366] text-right">
                    {subject.chapter_ids.length}{' '}
                    <span className="text-sm text-gray-500">Chapter Stats</span>
                  </p>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
