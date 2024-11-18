import React, { useState, useRef, useEffect } from 'react';
import Orbit from '../../components/avatar/Orbit'; // Adjust the import path based on your project structure

const TitleSection: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAITextarea, setShowAITextarea] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState<string | null>(
    "Hi! Tell me your goals, and I'll plan tasks to help you achieve them!"
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Detect clicks outside of dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Show the textarea when clicking "Generate by AI"
  const handleGenerateAI = () => {
    setShowAITextarea(true);

    // Display avatar message after 2 seconds
    // setTimeout(() => {
    setAvatarMessage(
      "Hi! Tell me your goals, and I'll plan tasks to help you achieve them!"
    );
    // }, 2000);
  };

  // Attach event listener for outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 border-b border-gray-300">
      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Study Planner</h1>

        <div className="flex items-center space-x-4">
          {/* Generate by AI Button */}
          <button
            onClick={handleGenerateAI}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Generate by AI
          </button>

          {/* Three-Dot Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-2xl text-gray-600 hover:text-blue-600"
              onClick={toggleDropdown}
            >
              &#x22EE;
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                  Chat History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Textarea Section */}
      {showAITextarea && (
        <div className="mt-4 p-4 bg-white border border-gray-300 rounded shadow">
          {/* Title */}
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            Tell the AI what you want to accomplish, and it’ll plan tasks to
            help you reach your goals—whether it’s exam prep, assignments, or
            daily study.
          </h2>

          {/* Textarea and Send Button */}
          <div className="flex items-center space-x-2">
            <textarea
              className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={3}
              placeholder="Type your goals here..."
            ></textarea>
            <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Orbit Avatar and Message */}
      <div className="mt-6 flex items-center space-x-4">
        {/* Orbit Avatar */}
        <Orbit opration={null} size={100} />
        {avatarMessage && (
          <p className="text-gray-700 text-base bg-gray-100 p-4 rounded-lg shadow">
            {avatarMessage}
          </p>
        )}
      </div>
    </div>
  );
};

interface Tab {
  name: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  const currentTabContent = tabs.find((tab) => tab.name === activeTab)?.content;

  return (
    <div className="mt-6">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 text-gray-700 ${
              activeTab === tab.name
                ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
                : 'hover:text-blue-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 bg-white border border-gray-300 rounded shadow p-4">
        {currentTabContent}
      </div>
    </div>
  );
};

interface TaskMetaData {
  chapter: string;
  subject: string;
  topic: string;
}

interface Task {
  id: string;
  schedule_id: string;
  title: string;
  created_by: string;
  date: string;
  start_time_utc: string;
  end_time_utc: string;
  type: string;
  meta_data: TaskMetaData;
}

interface TaskCardProps {
  task: Task;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  color: string;
}

const colors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-pink-100',
  'bg-purple-100',
  'bg-indigo-100',
  'bg-red-100',
  'bg-orange-100',
];

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  total,
  onPrev,
  onNext,
  isFirst,
  isLast,
  color,
}) => {
  return (
    <div
      className={`absolute w-full rounded-lg shadow-lg transition-all duration-300 ease-in-out ${color} ${
        index === 0
          ? 'z-30 scale-100 opacity-100 translate-x-0 translate-y-0'
          : index === 1
            ? 'z-20 scale-95 opacity-70 translate-x-4 translate-y-4'
            : index === 2
              ? 'z-10 scale-90 opacity-50 translate-x-8 translate-y-8'
              : 'z-0 scale-85 opacity-0 translate-x-12 translate-y-12'
      }`}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{task.title}</h3>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Date:</span>{' '}
          {new Date(task.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Time:</span> {task.start_time_utc} -{' '}
          {task.end_time_utc}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Subject:</span> {task.meta_data.subject}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Chapter:</span> {task.meta_data.chapter}
        </p>
        {task.meta_data.topic && (
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Topic:</span> {task.meta_data.topic}
          </p>
        )}
        <div className="flex justify-between mt-4">
          {!isFirst && (
            <button
              onClick={onPrev}
              className="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              &#8592; Prev
            </button>
          )}
          {!isLast && (
            <button
              onClick={onNext}
              className="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out ml-auto"
            >
              Next &#8594;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TaskCarousel: React.FC = () => {
  const tasks: Task[] = [
    {
      id: '770689a4-f498-46a1-a147-fe76729afd6b',
      schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
      title: 'Mathematics Study Session',
      created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
      date: '2024-01-20T00:00:00.000Z',
      start_time_utc: '09:20:00',
      end_time_utc: '09:30:00',
      type: 'study',
      meta_data: {
        chapter: '1',
        subject: 'Mathematics',
        topic: 'Algebra Basics',
      },
    },
    {
      id: '2b1e74f7-bd56-4b33-a485-bf42a697b038',
      schedule_id: 'b23fb7f6-8f9d-473e-a278-2c073b59c060',
      title: 'Physics Kinematics Review',
      created_by: 'b1a2c3d4-e5f6-4c72-b7d9-c2a9d4db6230',
      date: '2024-02-20T00:00:00.000Z',
      start_time_utc: '10:00:00',
      end_time_utc: '10:30:00',
      type: 'study',
      meta_data: {
        chapter: '2',
        subject: 'Physics',
        topic: 'Kinematics',
      },
    },
    {
      id: '34987b7c-2a32-493f-b576-e4a8d96338ae',
      schedule_id: 'a21b34cd-f576-44f4-a23a-3cb083edec72',
      title: 'Organic Chemistry Lab Prep',
      created_by: '5b9131d8-dc49-437f-b855-5a1b1b3501d2',
      date: '2024-03-10T00:00:00.000Z',
      start_time_utc: '11:00:00',
      end_time_utc: '11:30:00',
      type: 'study',
      meta_data: {
        chapter: '3',
        subject: 'Chemistry',
        topic: 'Organic Chemistry',
      },
    },
    {
      id: '8fd2c5cd-f572-44a6-8997-8bfae8901f56',
      schedule_id: 'd986cb09-4970-40fe-bb9a-d1b8b10a2fa4',
      title: 'Human Anatomy Quiz Preparation',
      created_by: 'b238e40a-6749-4d9b-b407-e31d30f89709',
      date: '2024-04-05T00:00:00.000Z',
      start_time_utc: '14:00:00',
      end_time_utc: '14:30:00',
      type: 'study',
      meta_data: {
        chapter: '4',
        subject: 'Biology',
        topic: 'Human Anatomy',
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardColors, setCardColors] = useState<string[]>([]);

  useEffect(() => {
    // Initialize card colors
    setCardColors(
      tasks.map(() => colors[Math.floor(Math.random() * colors.length)])
    );
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tasks.length);
    setCardColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[currentIndex] =
        colors[Math.floor(Math.random() * colors.length)];
      return newColors;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tasks.length) % tasks.length);
    setCardColors((prevColors) => {
      const newColors = [...prevColors];
      const prevIndex = (currentIndex - 1 + tasks.length) % tasks.length;
      newColors[prevIndex] = colors[Math.floor(Math.random() * colors.length)];
      return newColors;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Task Schedule</h2>
      <div className="relative h-[400px]">
        {tasks.map((task, index) => {
          const taskIndex = (currentIndex + index) % tasks.length;
          return (
            <TaskCard
              key={task.id}
              task={tasks[taskIndex]}
              index={index}
              total={tasks.length}
              onPrev={handlePrev}
              onNext={handleNext}
              isFirst={taskIndex === 0}
              isLast={taskIndex === tasks.length - 1}
              color={cardColors[taskIndex]}
            />
          );
        })}
      </div>
    </div>
  );
};
const Overview: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* Current and Upcoming Tasks */}
      {/* <div className="bg-white p-4 rounded shadow"> */}
      <TaskCarousel />
      {/* </div> */}

      {/* Daily Progress Metrics */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">
          Daily Progress Metrics
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 p-2 bg-blue-50 rounded">
            <p className="text-gray-700">Tasks Completed: 5</p>
          </div>
          <div className="flex-1 p-2 bg-green-50 rounded">
            <p className="text-gray-700">Study Hours: 4 hours</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress Metrics */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold text-gray-800">
          Weekly Progress Metrics
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 p-2 bg-yellow-50 rounded">
            <p className="text-gray-700">Tasks Completed: 25</p>
          </div>
          <div className="flex-1 p-2 bg-orange-50 rounded">
            <p className="text-gray-700">Study Hours: 30 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Task section
const DateNavigator: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getFormattedDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handlePrevDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() - 24 * 60 * 60 * 1000));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.getTime() + 24 * 60 * 60 * 1000));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handlePrevDay}
        className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-200 rounded-md shadow-sm hover:shadow-md transition duration-300"
      >
        Prev
      </button>
      <div className="text-lg font-semibold">
        {isToday(currentDate) ? (
          <span className="text-purple-700">
            Today
            <span className="block mt-1 h-1 bg-purple-500 rounded-full"></span>
          </span>
        ) : (
          getFormattedDate(currentDate)
        )}
      </div>
      <button
        onClick={handleNextDay}
        className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1 bg-gray-200 rounded-md shadow-sm hover:shadow-md transition duration-300"
      >
        Next
      </button>
    </div>
  );
};

const AddTaskButton: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the dropdown
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Add Task Button */}
      <button
        onClick={toggleDropdown}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
      >
        Add Task
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li
              onClick={() => {
                console.log('By Prompt selected');
                setIsDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              By Prompt
            </li>
            <li
              onClick={() => {
                console.log('By Form selected');
                setIsDropdownOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              By Form
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

import { ChevronUp, ChevronDown } from 'lucide-react';

type Task3Status = 'pending' | 'complete' | 'inprogress';

interface Task3MetaData {
  chapter: string;
  subject: string;
  topic: string;
}

interface Task3 {
  id: string;
  title: string;
  start_time_utc: string;
  end_time_utc: string;
  type: string;
  meta_data: Task3MetaData;
  status: Task3Status;
}

const Task3Card: React.FC<{
  task: Task3;
  isHighlighted: boolean;
  classes: string;
}> = ({ task, isHighlighted, classes }) => {
  const getBorderColor = (status: Task3Status) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-500';
      case 'complete':
        return 'border-green-500';
      case 'inprogress':
        return 'border-blue-500';
      default:
        return 'border-gray-500';
    }
  };

  const getStatusBadge = (status: Task3Status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </span>
        );
      case 'complete':
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
            Complete
          </span>
        );
      case 'inprogress':
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            In Progress
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${
        isHighlighted ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      } ${classes}`}
    >
      <div className={`p-4 border-l-4 ${getBorderColor(task.status)}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {task.title}
          </h3>
          {getStatusBadge(task.status)}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {task.start_time_utc} - {task.end_time_utc}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Subject: {task.meta_data.subject} | Chapter: {task.meta_data.chapter}
        </p>
        {task.meta_data.topic && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Topic: {task.meta_data.topic}
          </p>
        )}
      </div>
    </div>
  );
};

// const Task3Timeline: React.FC<{ tasks: Task3[] }> = ({ tasks }) => {
//   const [sortedTasks, setSortedTasks] = useState<Task3[]>([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timelineRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const now = new Date();
//     const currentTime = now.getHours() * 60 + now.getMinutes();

//     setSortedTasks(tasks);
//     const currIndex = tasks.findIndex(
//       (item) =>
//         getMinutesFromTime(item.start_time_utc) <= currentTime &&
//         getMinutesFromTime(item.end_time_utc) >= currentTime
//     );
//     setCurrentIndex(currIndex);
//   }, [tasks]);

//   useEffect(() => {
//     if (timelineRef.current && currentIndex === 0) {
//       timelineRef.current.scrollTop = 0; // Scroll to top only when currentIndex is 0 (initial load)
//     }
//   }, [currentIndex]);

//   const getMinutesFromTime = (time: string) => {
//     const [hours, minutes] = time.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const isHighlighted = (task: Task3, index: number) => {
//     const now = new Date();
//     const currentTime = now.getHours() * 60 + now.getMinutes();
//     const taskStartTime = getMinutesFromTime(task.start_time_utc);
//     const taskEndTime = getMinutesFromTime(task.end_time_utc);

//     return (
//       (currentTime >= taskStartTime && currentTime < taskEndTime) ||
//       (currentTime < taskStartTime && index === 0)
//     );
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto py-8">
//       <div
//         ref={timelineRef}
//         className="h-[450px] overflow-y-auto scrollbar-hide"
//         aria-label="Task timeline"
//       >
//         {sortedTasks.map((task, index) => (
//           <Task3Card
//             key={task.id}
//             task={task}
//             isHighlighted={isHighlighted(task, index)}
//           />
//         ))}
//       </div>
//       <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
//         <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
//         <p className="text-xs text-gray-400 mt-1">Earlier</p>
//       </div>
//       <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
//         <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
//         <p className="text-xs text-gray-400 mt-1">Later</p>
//       </div>
//     </div>
//   );
// };

const Task3Timeline: React.FC<{ tasks: Task3[] }> = ({ tasks }) => {
  const [sortedTasks, setSortedTasks] = useState<Task3[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false); // Add a flag to track scrolling

  useEffect(() => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    setSortedTasks(tasks);
    const currIndex = tasks.findIndex(
      (item) =>
        getMinutesFromTime(item.start_time_utc) <= currentTime &&
        getMinutesFromTime(item.end_time_utc) >= currentTime
    );
    setCurrentIndex(currIndex);
  }, [tasks]);

  useEffect(() => {
    if (timelineRef.current && !hasScrolled.current && currentIndex !== -1) {
      const taskElements =
        timelineRef.current.querySelectorAll<HTMLElement>('.task-item');
      const currentTaskElement = taskElements[currentIndex];
      if (currentTaskElement) {
        currentTaskElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        hasScrolled.current = true; // Prevent further scrolling
      }
    }
  }, [currentIndex]); // Scroll to the current index only once

  const getMinutesFromTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isHighlighted = (task: Task3, index: number) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const taskStartTime = getMinutesFromTime(task.start_time_utc);
    const taskEndTime = getMinutesFromTime(task.end_time_utc);

    return (
      (currentTime >= taskStartTime && currentTime < taskEndTime) ||
      (currentTime < taskStartTime && index === 0)
    );
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-8">
      <div
        ref={timelineRef}
        className="h-[450px] overflow-y-auto scrollbar-hide"
        aria-label="Task timeline"
      >
        {sortedTasks.map((task, index) => (
          <Task3Card
            key={task.id}
            task={task}
            isHighlighted={isHighlighted(task, index)}
            classes="task-item"
          />
        ))}
      </div>
      <div className="absolute top-1/2 -left-8 transform -translate-y-1/2">
        <ChevronUp className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <p className="text-xs text-gray-400 mt-1">Earlier</p>
      </div>
      <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
        <ChevronDown className="w-6 h-6 text-gray-400" aria-hidden="true" />
        <p className="text-xs text-gray-400 mt-1">Later</p>
      </div>
    </div>
  );
};

const DailyTasksSection = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  const tasks: Task3[] = [
    {
      id: '1',
      title: 'Morning Yoga',
      start_time_utc: '06:00:00',
      end_time_utc: '07:00:00',
      type: 'exercise',
      meta_data: {
        chapter: 'N/A',
        subject: 'Fitness',
        topic: 'Yoga',
      },
      status: 'complete',
    },
    {
      id: '2',
      title: 'Breakfast',
      start_time_utc: '07:15:00',
      end_time_utc: '07:45:00',
      type: 'personal',
      meta_data: {
        chapter: 'N/A',
        subject: 'Nutrition',
        topic: 'Meal',
      },
      status: 'complete',
    },
    {
      id: '3',
      title: 'Check Emails',
      start_time_utc: '08:00:00',
      end_time_utc: '08:30:00',
      type: 'work',
      meta_data: {
        chapter: 'N/A',
        subject: 'Communication',
        topic: 'Email Management',
      },
      status: 'complete',
    },
    {
      id: '4',
      title: 'Team Meeting',
      start_time_utc: '09:00:00',
      end_time_utc: '10:00:00',
      type: 'work',
      meta_data: {
        chapter: 'N/A',
        subject: 'Project Management',
        topic: 'Sprint Planning',
      },
      status: 'inprogress',
    },
    {
      id: '5',
      title: 'Code Review',
      start_time_utc: '10:30:00',
      end_time_utc: '11:30:00',
      type: 'work',
      meta_data: {
        chapter: 'N/A',
        subject: 'Software Development',
        topic: 'Quality Assurance',
      },
      status: 'pending',
    },
    {
      id: '6',
      title: 'Lunch Break',
      start_time_utc: '12:00:00',
      end_time_utc: '13:00:00',
      type: 'break',
      meta_data: {
        chapter: 'N/A',
        subject: 'Personal',
        topic: 'Nutrition',
      },
      status: 'pending',
    },
    {
      id: '7',
      title: 'Project Work',
      start_time_utc: '13:30:00',
      end_time_utc: '15:30:00',
      type: 'work',
      meta_data: {
        chapter: 'N/A',
        subject: 'Software Development',
        topic: 'Feature Implementation',
      },
      status: 'pending',
    },
    {
      id: '8',
      title: 'Coffee Break',
      start_time_utc: '15:45:00',
      end_time_utc: '16:00:00',
      type: 'break',
      meta_data: {
        chapter: 'N/A',
        subject: 'Personal',
        topic: 'Refreshment',
      },
      status: 'pending',
    },
    {
      id: '9',
      title: 'Team Sync-up',
      start_time_utc: '16:30:00',
      end_time_utc: '17:00:00',
      type: 'work',
      meta_data: {
        chapter: 'N/A',
        subject: 'Project Management',
        topic: 'Progress Update',
      },
      status: 'pending',
    },
    {
      id: '10',
      title: 'Evening Run',
      start_time_utc: '18:00:00',
      end_time_utc: '19:00:00',
      type: 'exercise',
      meta_data: {
        chapter: 'N/A',
        subject: 'Fitness',
        topic: 'Cardio',
      },
      status: 'pending',
    },
    {
      id: '11',
      title: 'Dinner',
      start_time_utc: '19:30:00',
      end_time_utc: '20:30:00',
      type: 'personal',
      meta_data: {
        chapter: 'N/A',
        subject: 'Nutrition',
        topic: 'Meal',
      },
      status: 'pending',
    },
    {
      id: '12',
      title: 'Read a Book',
      start_time_utc: '21:00:00',
      end_time_utc: '22:00:00',
      type: 'personal',
      meta_data: {
        chapter: '5',
        subject: 'Literature',
        topic: 'Fiction',
      },
      status: 'pending',
    },
    {
      id: '13',
      title: 'Meditation',
      start_time_utc: '22:15:00',
      end_time_utc: '22:45:00',
      type: 'personal',
      meta_data: {
        chapter: 'N/A',
        subject: 'Mindfulness',
        topic: 'Relaxation',
      },
      status: 'pending',
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      {/* <div className="text-center text-gray-500 dark:text-gray-400"> */}
        <Task3Timeline tasks={tasks} />
      {/* </div> */}
    </div>
  );
};

const TasksSection: React.FC = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <DateNavigator />
        <AddTaskButton />
      </div>
      {/* Add your tasks or additional content here */}
      <DailyTasksSection />
    </div>
  );
};

const MainPage: React.FC = () => {
  const tabs = [
    { name: 'Overview', content: <Overview /> },
    { name: 'Tasks', content: <TasksSection /> },
    { name: 'Progress', content: <div>This is the Progress content.</div> },
    { name: 'Exam', content: <div>This is the Exam content.</div> },
  ];

  return (
    <div className="p-4 bg-white">
      <TitleSection />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default MainPage;
