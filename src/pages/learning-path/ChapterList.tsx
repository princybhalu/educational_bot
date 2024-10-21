// import { useNavigate, useParams } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { GetChapterListBySubjectId } from '../../services/api/learningPath';

// interface Topic {
//   id: string;
//   topic_name: string;
// }

// interface Chapter {
//   id: string;
//   chapter_name: string;
//   topic_ids: Topic[];
// }

// const ChapterList: React.FC = () => {
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
//   const { subjectId, subjectName } = useParams();
//   const navigate = useNavigate();

//   // Fetching data from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await GetChapterListBySubjectId(subjectId ?? '');
//         setChapters(response.data);
//         console.log({ chapters: response.data });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Navigation function when clicking a topic
//   const handleTopicClick = (
//     topicId: string,
//     chapterId: string,
//     topicName: string
//   ) => {
//     navigate('/learning-path/chat-view/TOPIC/' + topicId + '/' + topicName);
//   };

//   return (
//     <div className="min-h-screen p-4 bg-gradient-to-b from-blue-100 to-orange-100">
//       {/* Back to Chapter Navigation */}
//       <button
//         className="text-blue-500 mb-4"
//         onClick={() => navigate('/learning-path')}
//       >
//         ← Back to Subject List
//       </button>

//       {/* Display subject name and card button */}
//       <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">{subjectName}</h1>
//         {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
//           Card Name
//         </button> */}
//       </div>

//       {/* Chapter and Topics Listing */}
//       {selectedChapter === null ? (
//         // Display list of chapters
//         <div>
//           {chapters.map((chapter) => (
//             <div
//               key={chapter.id}
//               className="bg-gray-200 p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-300"
//               onClick={() => setSelectedChapter(chapter)}
//             >
//               {chapter.chapter_name}
//             </div>
//           ))}
//         </div>
//       ) : (
//         // Display topics of the selected chapter
//         <div>
//           <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
//             {selectedChapter.chapter_name}
//           </div>
//           {selectedChapter.topic_ids.map((topic) => (
//             <div
//               key={topic.id}
//               className="bg-white p-3 rounded-lg shadow-md mb-2 border hover:bg-blue-100 cursor-pointer"
//               onClick={() =>
//                 handleTopicClick(topic.id, selectedChapter.id, topic.topic_name)
//               }
//             >
//               {topic.topic_name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChapterList;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetChapterListBySubjectId } from '../../services/api/learningPath';
import { IoChevronBack, IoBook, IoChevronForward } from 'react-icons/io5';

interface Topic {
  id: string;
  topic_name: string;
}

interface Chapter {
  id: string;
  chapter_name: string;
  topic_ids: Topic[];
}

const ChapterList: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const { subjectId, subjectName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetChapterListBySubjectId(subjectId ?? '');
        setChapters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [subjectId]);

  const handleTopicClick = (topicId: string, topicName: string) => {
    navigate(`/learning-path/chat-view/TOPIC/${topicId}/${topicName}`);
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          className="flex items-center text-[#003366] hover:text-[#004080] transition-colors duration-200 mb-4 text-sm sm:text-base"
          onClick={() => navigate('/learning-path')}
        >
          <IoChevronBack className="text-lg sm:text-xl mr-1" />
          <span>Back to Subject List</span>
        </button>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#003366]">
            {subjectName}
          </h1>
        </div>

        {selectedChapter === null ? (
          <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="bg-[#E5F3FF] rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 border-l-3 border-[#003366]"
                onClick={() => setSelectedChapter(chapter)}
              >
                <h2 className="text-base sm:text-lg font-semibold text-[#003366] mb-2">
                  {chapter.chapter_name}
                </h2>
                <p className="text-xs sm:text-sm text-[#004080]">
                  {chapter.topic_ids.length} topics
                </p>
                <div className="mt-2 text-[#003366]">
                  <IoChevronForward className="text-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="bg-[#003366] text-white rounded-lg shadow-md p-4 sm:p-5 mb-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                {selectedChapter.chapter_name}
              </h2>
              <button
                className="text-white hover:text-[#FFE2CF] transition-colors duration-200"
                onClick={() => setSelectedChapter(null)}
              >
                <IoChevronBack className="text-xl sm:text-2xl" />
              </button>
            </div>
            <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
              {selectedChapter.topic_ids.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-[#E5F3FF] rounded-lg shadow-sm p-3 sm:p-4 cursor-pointer hover:bg-[#F0F7FF] transition-all duration-200 transform hover:-translate-y-1 border-l-4 border-[#003366]"
                  onClick={() => handleTopicClick(topic.id, topic.topic_name)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <IoBook className="text-lg sm:text-xl text-[#003366]" />
                    <IoChevronForward className="text-base sm:text-lg text-[#003366]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-[#003366]">
                    {topic.topic_name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
