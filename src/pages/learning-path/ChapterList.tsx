import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { GetChapterListBySubjectId } from '../../services/api/learningPath';

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

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetChapterListBySubjectId(subjectId ?? '');
        setChapters(response.data);
        console.log({ chapters: response.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Navigation function when clicking a topic
  const handleTopicClick = (
    topicId: string,
    chapterId: string,
    topicName: string
  ) => {
    navigate('/learning-path/chat-view/TOPIC/' + topicId + '/' + topicName);
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-100 to-orange-100">
      {/* Back to Chapter Navigation */}
      <button
        className="text-blue-500 mb-4"
        onClick={() => navigate('/learning-path')}
      >
        ← Back to Subject List
      </button>

      {/* Display subject name and card button */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{subjectName}</h1>
        {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Card Name
        </button> */}
      </div>

      {/* Chapter and Topics Listing */}
      {selectedChapter === null ? (
        // Display list of chapters
        <div>
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-gray-200 p-4 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-gray-300"
              onClick={() => setSelectedChapter(chapter)}
            >
              {chapter.chapter_name}
            </div>
          ))}
        </div>
      ) : (
        // Display topics of the selected chapter
        <div>
          <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
            {selectedChapter.chapter_name}
          </div>
          {selectedChapter.topic_ids.map((topic) => (
            <div
              key={topic.id}
              className="bg-white p-3 rounded-lg shadow-md mb-2 border hover:bg-blue-100 cursor-pointer"
              onClick={() =>
                handleTopicClick(topic.id, selectedChapter.id, topic.topic_name)
              }
            >
              {topic.topic_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChapterList;
