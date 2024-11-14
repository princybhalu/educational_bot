import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Calendar,
  Clock,
  GraduationCap,
  CalendarIcon,
  Plus,
  Mic,
  Brain,
  ChevronRight,
  X,
  Flame,
  Sun,
  Moon,
  Trophy,
  Edit,
  Check,
} from 'lucide-react';
import {
  AddTaskApiCall,
  AddTaskByQueryApiCall,
  GetTaskBetweenRangeApiCall,
  UpdateTaskApiCall,
} from '../../services/api/study-planner';
import TaskModal from '../../components/study-planner/TaskModal';
import { DayPlanItem } from '../../types/study-planner';
import { useForm } from 'react-hook-form';
// import { cn } from '@/lib/utils';

// Mock data
const initialTasks = [
  {
    id: 'accc80a1-decf-4a20-868a-ad12d4908d8f',
    schedule_id: '23f0f3cb-a893-4261-9f57-100bd4cb6253',
    title: 'Study Maths Chapter 1',
    created_by: '5808f946-ca84-427e-b325-c5f9532614fa',
    date: '2024-10-19T00:00:00.000Z',
    start_time_utc: '09:00:00',
    end_time_utc: '11:45:00',
    type: 'study',
    status: 'completed',
    meta_data: {
      chapter: '1',
      subject: 'Mathematics',
      topic: 'Algebra',
    },
  },
  {
    id: 'cf56e9b0-5c75-4ea2-95fc-1797c6c5e32e',
    schedule_id: '75f2a9c9-1e77-4211-82ab-59bc52f2116f',
    title: 'Test on Chemistry Chapter 2',
    created_by: 'db123d46-8e87-4d06-bf5f-f0727fd3120a',
    date: '2024-10-20T00:00:00.000Z',
    start_time_utc: '10:30:00',
    end_time_utc: '11:30:00',
    type: 'test',
    status: 'pending',
    meta_data: {
      chapter: '2',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
    },
  },
  {
    id: 'f8b927a3-d6fa-4ca6-940f-b5126e45a2a2',
    schedule_id: '35a3e340-1b87-4d52-829b-f8121e67db55',
    title: 'Study English Essay Writing',
    created_by: '731f62b4-3df9-4a93-94b1-bbdff4628f3f',
    date: '2024-10-21T00:00:00.000Z',
    start_time_utc: '14:00:00',
    end_time_utc: '16:00:00',
    type: 'study',
    status: 'pending',
    meta_data: {
      chapter: '',
      subject: 'English',
      topic: 'Essay Writing',
    },
  },
  {
    id: 'a9f56b01-bd5e-46d9-b07b-3f48a0a70d67',
    schedule_id: '5c648ef1-50b0-4f4b-977d-542ec540fa32',
    title: 'cbt session',
    created_by: 'cc793283-6f96-41d4-bb1b-bf09bc62f742',
    date: '2024-10-22T00:00:00.000Z',
    start_time_utc: '08:30:00',
    end_time_utc: '09:30:00',
    type: 'theropy',
    status: 'pending',
  },
  {
    id: '43bf9303-c56e-477f-b2ad-81d622a54e72',
    schedule_id: '92c8c9d4-d2cf-4c8c-bcf7-ffb2b9b96c11',
    title: 'Study History: The Renaissance',
    created_by: '44d6279b-d3d6-4f66-9ab4-cbf9dbca9e1e',
    date: '2024-10-23T00:00:00.000Z',
    start_time_utc: '15:00:00',
    end_time_utc: '17:00:00',
    type: 'study',
    status: 'pending',
    meta_data: {
      chapter: '',
      subject: 'History',
      topic: 'The Renaissance',
    },
  },
];

const weekDays = [
  { day: 'Mon', fullDay: 'Monday', color: 'from-[#4361ee] to-[#3498db]' },
  { day: 'Tue', fullDay: 'Tuesday', color: 'from-[#3498db] to-[#2ecc71]' },
  { day: 'Wed', fullDay: 'Wednesday', color: 'from-[#2ecc71] to-[#e74c3c]' },
  { day: 'Thu', fullDay: 'Thursday', color: 'from-[#e74c3c] to-[#4361ee]' },
  { day: 'Fri', fullDay: 'Friday', color: 'from-[#4361ee] to-[#3498db]' },
  { day: 'Sat', fullDay: 'Saturday', color: 'from-[#3498db] to-[#2ecc71]' },
  { day: 'Sun', fullDay: 'Sunday', color: 'from-[#2ecc71] to-[#e74c3c]' },
];

const BackgroundAnimation = () => (
  <div className="fixed inset-0 z-[-1] opacity-30">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4361ee">
            <animate
              attributeName="stop-color"
              values="#4361ee; #3498db; #2ecc71; #4361ee"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#3498db">
            <animate
              attributeName="stop-color"
              values="#3498db; #2ecc71; #4361ee; #3498db"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#a)">
        <animate
          attributeName="opacity"
          values="0.3;0.5;0.3"
          dur="5s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
);

const subjectOptions = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Literature',
  'History',
  'Geography',
];

interface ExamFormData {
  title: string;
  examDate: string;
  subjects: string[];
}

// Function to generate schedule for the current week
function getWeekSchedule(tasks: any) {
  const schedule = {};
  weekDays.forEach((day) => {
    //@ts-ignore
    schedule[day.fullDay] = [];
  });

  const today = new Date();
  const endDate = today.toISOString().split('T')[0];
  today.setDate(today.getDate() - 1); // Subtract one day
  const startDate = today.toISOString().split('T')[0];

  // Assuming res is the response from API call
  const res = tasks; // Replace this with your API response as needed

  res.forEach((task: { date: string | number | Date }) => {
    const taskDate = new Date(task.date);
    const dayName = taskDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Check if the task day is within the current week's range
    //@ts-ignore
    if (schedule[dayName]) {
      //@ts-ignore
      schedule[dayName].push(task);
    }
  });

  console.log({ schedule });
  return schedule;
}

function extractTime(isoString: string) {
  const date = new Date(isoString);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getMondayAndSundayOfCurrentWeek() {
  const today = new Date();

  // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const dayOfWeek = today.getDay();

  // Calculate the difference from today to the previous Monday
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);

  // Calculate the difference from today to the upcoming Sunday
  const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diffToSunday);

  // Helper function to format the date as "YYYY-MM-DD HH:mm:ss.sss"
  function formatDate(date: any) {
    return (
      date.getFullYear() +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(date.getDate()).padStart(2, '0') +
      ' ' +
      String(date.getHours()).padStart(2, '0') +
      ':' +
      String(date.getMinutes()).padStart(2, '0') +
      ':' +
      String(date.getSeconds()).padStart(2, '0') +
      '.' +
      String(date.getMilliseconds()).padStart(3, '0')
    );
  }

  return {
    monday: formatDate(monday),
    sunday: formatDate(sunday),
  };
}

function divideTasksByDay(tasks: any) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Get Monday and Sunday of the current week
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // Initialize an object with keys for each day of the week
  const weekDays = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // Helper function to get the day of the week from a date
  function getDayOfWeek(date: any) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  // Iterate over tasks and add them to the correct day
  tasks.forEach((task: { date: string | number | Date }) => {
    const taskDate = new Date(task.date);
    taskDate.setHours(0, 0, 0, 0); // Set to start of the day for comparison

    if (taskDate >= monday && taskDate <= sunday) {
      const dayName = getDayOfWeek(taskDate);
      //@ts-ignore
      if (weekDays[dayName]) {
        //@ts-ignore
        weekDays[dayName].push(task);
      }
    }
  });

  return weekDays;
}

const formatTime = (time: string) => {
  return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export default function Component() {
  const [tasks, setTasks] = useState(initialTasks);
  const [loadingTasks, setloadingTasks] = useState(true);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [schedule, setSchedule] = useState({});
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('day');
  const [selectedDay, setSelectedDay] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DayPlanItem | null>(null);

  const [isModalOpenOfExam, setIsModalOpenOfExam] = useState(false);

  const { register, handleSubmit, control, reset } = useForm<ExamFormData>();

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTaskInDay = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (updatedTask: DayPlanItem) => {
    try {
      let response;
      console.log({ updatedTask });
      if (updatedTask.id) {
        // Edit existing task
        response = await UpdateTaskApiCall(updatedTask, null, updatedTask.id);
      } else {
        // Add new task
        response = await AddTaskApiCall(updatedTask);
      }

      if (response.ok) {
        const savedTask = await response.json();
        setTasks((prevPlan) =>
          updatedTask.id
            ? prevPlan.map((task) =>
                task.id === savedTask.id ? savedTask : task
              )
            : [...prevPlan, savedTask]
        );
        setIsModalOpen(false);
      } else {
        console.error('Failed to save task');
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleAddByMessage = async (message: string) => {
    try {
      const response = await AddTaskByQueryApiCall({
        query: message,
      });
      console.log({ response });
      if (response.data && !response.data.conflict) {
        setTasks((prevPlan) => [...prevPlan, response.data.task]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add task by message');
      }
    } catch (error) {
      console.error('Error adding task by message:', error);
    }
  };

  const fetchApiDataOfPlanDay = async () => {
    try {
      const today = new Date();
      const endDate = today.toISOString().split('T')[0];
      today.setDate(today.getDate() - 1); // Subtract one day
      const startDate = today.toISOString().split('T')[0];
      const res = await GetTaskBetweenRangeApiCall(null, startDate, endDate);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setloadingTasks(false);
    }
  };

  const fetchApiDataOfPlanWeek = async () => {
    try {
      const dates = getMondayAndSundayOfCurrentWeek();
      const res = await GetTaskBetweenRangeApiCall(
        null,
        dates.monday,
        dates.sunday
      );
      console.log({ res });
      const currentWeekSchedule = divideTasksByDay(res.data);
      setSchedule(currentWeekSchedule);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }

    fetchApiDataOfPlanDay().then();
    fetchApiDataOfPlanWeek().then();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    let count = currentPoints;
    const interval = setInterval(() => {
      if (count < points) {
        count += 1;
        setCurrentPoints(count);
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [points]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(newTasks);
  };

  const completeTask = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      );
      setTasks(newTasks);
      setProgress(Math.min(100, progress + 20));
      setPoints(points + 10);
      setLoading(false);
    }, 500);
  };

  const handleAddTask = (day: number, task: any) => {
    setLoading(true);
    setTimeout(() => {
      setSchedule((prev) => ({
        ...prev,
        // @ts-ignore
        [day]: [...(prev[day] || []), task],
      }));
      setLoading(false);
    }, 500);
  };

  const addNewTask = (newTask: any) => {
    setLoading(true);
    setTimeout(() => {
      setTasks([
        ...tasks,
        {
          ...newTask,
          id: `task${tasks.length + 1}`,
          completed: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <motion.div
      animate={{
        background:
          theme === 'dark'
            ? 'linear-gradient(to bottom right, #1a202c, #2d3748)'
            : 'linear-gradient(to bottom right, #f7fafc, #edf2f7)',
      }}
      transition={{ duration: 1 }}
      className={`mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-xl shadow-lg font-['Poppins', sans-serif] relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-br from-gray-100 to-white text-gray-900' : ''}`}
    >
      <BackgroundAnimation />
      <div className="flex justify-between items-center">
        <motion.h1
          className="text-3xl font-bold text-[#E1F5FE]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Futuristic Study Planner
        </motion.h1>
        <div className="flex items-center space-x-4">
          {/* <select className="w-[180px] bg-black/50 text-[#00E5FF] border-[#00E5FF] hover:bg-black/70 transition-all duration-300 p-2 rounded">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select> */}
          <div className="relative group">
            <motion.button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full bg-gray-800 text-[#00E5FF] hover:bg-gray-700 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>
            <div className="absolute bottom-full mb-1 hidden group-hover:block p-1 rounded bg-gray-700 text-xs text-white">
              Toggle Theme
            </div>
          </div>
        </div>
      </div>
      {/* 1st div */}
      <motion.div
        className="flex items-center space-x-4 bg-black/60 p-4 rounded-lg shadow-[0_0_20px_#3498db] border border-[#3498db] transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02, rotate: 1 }}
      >
        <div className="h-16 w-16 ring-2 ring-[#2ecc71] ring-offset-2 ring-offset-black/50 rounded-full flex items-center justify-center">
          <Brain className="h-8 w-8 text-[#2ecc71]" />
        </div>
        <div className="flex-1">
          <p className="text-lg font-medium text-[#AAB2BF] tracking-wide">
            Need help optimizing your study plan?
          </p>
          <button className="mt-2 border border-[#2ecc71] text-[#2ecc71] hover:bg-[#2ecc71] hover:text-black transition-all duration-300 shadow-[0_0_10px_#2ecc71] hover:shadow-[0_0_20px_#2ecc71] px-4 py-2 rounded">
            Ask AI for personalized advice
          </button>
        </div>
      </motion.div>

      {/* 2nd div */}
      <motion.div
        className="flex justify-between items-center bg-black/60 p-4 rounded-lg shadow-[0_0_20px_#3498db] border border-[#3498db] transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.02, rotateY: 5 }}
      >
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-[#E1F5FE]">
            Today&#39;s Progress
          </h2>
          <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-[#4361ee] to-[#2ecc71] shadow-[0_0_10px_#4361ee] ${progress === 100 ? 'animate-pulse' : ''}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Trophy className="w-6 h-6 text-yellow-400" />
            </motion.div>
          )}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-[#e74c3c]">
            {currentPoints} pts
          </p>
          <p className="text-sm text-[#AAB2BF] italic">Total Points</p>
        </div>
        <div className="text-lg py-2 px-4 border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-black transition-all duration-300 rounded">
          <Calendar className="inline-block mr-2 h-4 w-4" />
          Weekly Goal: 70%
        </div>
      </motion.div>

      {/* tabs*/}
      <div className="w-full">
        {/* tabs btn */}
        <div className="grid w-full grid-cols-3 bg-black/50 rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('day')}
            className={`${activeTab === 'day' ? 'bg-[#4361ee] text-white' : ''} transition-all duration-300 text-[#00E5FF] p-2`}
          >
            <Clock className="inline-block mr-2 h-4 w-4" />
            Plan Your Day
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`${activeTab === 'week' ? 'bg-[#3498db] text-white' : ''} transition-all duration-300 text-[#00E5FF] p-2`}
          >
            <CalendarIcon className="inline-block mr-2 h-4 w-4" />
            Plan Your Week
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`${activeTab === 'exam' ? 'bg-[#2ecc71] text-white' : ''} transition-all duration-300 text-[#00E5FF] p-2`}
          >
            <GraduationCap className="inline-block mr-2 h-4 w-4" />
            Plan for Exam
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'day' && (
            <div className="bg-black/60 border-[#4361ee] rounded-lg shadow-[0_0_20px_#4361ee] transition-all duration-300">
              <div className="border-b border-gradient-to-r from-[#4361ee] to-[#2ecc71] p-4">
                <h2 className="text-[#E1F5FE] font-semibold text-xl">
                  Today&#39;s Tasks
                </h2>
                <p className="text-[#AAB2BF] italic tracking-wide">
                  Drag and drop to reorder your tasks
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-b-lg">
                <button
                  onClick={handleAddTaskInDay}
                  className="mb-4 py-2 w-full bg-[#4361ee] hover:bg-[#3651d1] text-white"
                >
                  <div className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Task
                  </div>
                </button>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        <AnimatePresence>
                          {!loadingTasks &&
                            tasks.map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  //@ts-ignore
                                  <motion.li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`p-4 rounded-lg shadow-md flex justify-between items-center transition-all duration-300 ${
                                      task.type === 'test'
                                        ? 'bg-[#ff6347]/40'
                                        : task.type === 'study'
                                          ? 'bg-[#3498db]/30'
                                          : 'bg-[#32cd32]/20'
                                    } ${task.status === 'completed' ? 'opacity-50' : ''}`}
                                    whileHover={{
                                      scale: 1.02,
                                      boxShadow:
                                        '0 0 15px rgba(52, 152, 219, 0.5)',
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="flex items-center space-x-2">
                                      {task.status === 'completed' ? (
                                        <Trophy className="w-5 h-5 text-green-500 mr-2" />
                                      ) : (
                                        <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                                      )}
                                      <span
                                        className={
                                          task.status === 'completed'
                                            ? 'line-through text-[#AAB2BF]'
                                            : 'text-white'
                                        }
                                      >
                                        {task.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span
                                        className={`text-xs px-2 py-1 rounded`}
                                      >
                                        {extractTime(task.start_time_utc)}
                                      </span>
                                      <button
                                        onClick={() => handleEditTask(task)}
                                        className="text-[#4361ee] hover:text-[#3651d1] transition-colors duration-300"
                                      >
                                        <Edit className="w-5 h-5" />
                                      </button>
                                      <button
                                        onClick={() => completeTask(task.id)}
                                        className={`border border-[#2a9d8f] text-[#2a9d8f] hover:bg-[#2a9d8f] hover:text-white 
                                         transition-all duration-300 px-4 py-2 rounded-lg shadow-md transform 
                                         hover:scale-105 active:scale-95 flex items-center gap-2 ${
                                           loading
                                             ? 'cursor-wait'
                                             : 'cursor-pointer'
                                         }`}
                                        disabled={loading}
                                      >
                                        {loading ? (
                                          <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                              duration: 1,
                                              repeat: Infinity,
                                              ease: 'linear',
                                            }}
                                          >
                                            <svg
                                              className="h-5 w-5 text-[#2a9d8f]"
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                            >
                                              <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                              ></circle>
                                              <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                              ></path>
                                            </svg>
                                          </motion.div>
                                        ) : task.status === 'completed' ? (
                                          <>
                                            <span className="text-lg">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                />
                                              </svg>
                                            </span>{' '}
                                          </>
                                        ) : (
                                          <>
                                            <span className="text-lg">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M5 13l4 4L19 7"
                                                />
                                              </svg>
                                            </span>{' '}
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </motion.li>
                                )}
                              </Draggable>
                            ))}
                        </AnimatePresence>
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          )}
          {activeTab === 'week' && (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-black/60 border border-[#3498db] p-4 rounded-lg shadow-[0_0_20px_#3498db] overflow-hidden transition-all duration-300">
                <div className="border-b border-[#3498db] pb-4 mb-4">
                  <h2 className="text-[#E1F5FE] text-2xl font-bold">
                    Weekly Schedule
                  </h2>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="grid grid-cols-7 gap-3">
                    {weekDays.map(({ day, fullDay, color }) => (
                      <motion.div
                        key={day}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`cursor-pointer h-32 sm:h-40 overflow-hidden rounded-lg bg-gradient-to-br ${color}`}
                        //@ts-ignore
                        onClick={() => setSelectedDay(fullDay)}
                      >
                        <div className="p-3">
                          <h3 className="text-white text-lg sm:text-xl font-bold">
                            {day}
                          </h3>
                        </div>
                        <div className="p-3 flex flex-col justify-between h-full">
                          <div className="text-white text-xs sm:text-sm opacity-80">
                            {
                              //@ts-ignore
                              (!loadingSchedule && schedule[fullDay]?.length) ||
                                0
                            }{' '}
                            tasks
                          </div>
                          <button className="w-full bg-white/20 text-white hover:bg-white/30 text-xs sm:text-sm py-1 mt-2 rounded flex items-center justify-center">
                            View <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'exam' && (
            <div className="bg-black/60 border-[#2ecc71] rounded-lg shadow-[0_0_20px_#2ecc71] transition-all duration-300">
              <div className="border-b border-gradient-to-r from-[#2ecc71] to-[#e74c3c] p-4">
                <h2 className="text-[#E1F5FE]">Exam Preparation</h2>
                <p className="text-[#AAB2BF] italic tracking-wide">
                  Create a focused study plan for your upcoming exams
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-b-lg">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-[#e74c3c]"
                  >
                    <h3 className="font-semibold mb-2 text-[#e74c3c]">
                      Math Exam (in 2 weeks)
                    </h3>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-[#e74c3c] to-[#4361ee] shadow-[0_0_10px_#e74c3c]"
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                    <p className="text-sm text-[#AAB2BF] italic">
                      Focus areas: Algebra, Geometry, Trigonometry
                    </p>
                    <button className="mt-2 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 shadow-[0_0_10px_#e74c3c] hover:shadow-[0_0_20px_#e74c3c] px-2 py-1 rounded text-sm">
                      View Detailed Plan
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="bg-gray-800/50 p-4 rounded-lg shadow-lg border border-[#3498db]"
                  >
                    <h3 className="font-semibold mb-2 text-[#3498db]">
                      Science Exam (in 3 weeks)
                    </h3>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-[#3498db] to-[#2ecc71] shadow-[0_0_10px_#3498db]"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                    <p className="text-sm text-[#AAB2BF] italic">
                      Focus areas: Chemistry, Physics, Biology
                    </p>
                    <button className="mt-2 border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white transition-all duration-300 shadow-[0_0_10px_#3498db] hover:shadow-[0_0_20px_#3498db] px-2 py-1 rounded text-sm">
                      View Detailed Plan
                    </button>
                  </motion.div>
                  <button
                    className="w-full bg-gradient-to-r from-[#3498db] to-[#4361ee] hover:from-[#3498db]/80 hover:to-[#4361ee]/80 text-white transition-all duration-300 shadow-[0_0_15px_#3498db] p-2 rounded"
                    onClick={() => setIsModalOpenOfExam(true)}
                  >
                    <Plus className="inline-block h-4 w-4 mr-2" /> Add New Exam
                    Plan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button className="animate-pulse bg-[#2ecc71]/20 hover:bg-[#2ecc71]/40 text-[#2ecc71] border border-[#2ecc71] transition-all duration-300 shadow-[0_0_10px_#2ecc71] hover:shadow-[0_0_20px_#2ecc71] px-4 py-2 rounded">
            Take a 5-minute break!
          </button>
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button className="bg-[#4361ee]/20 hover:bg-[#4361ee]/40 text-[#4361ee] border border-[#4361ee] transition-all duration-300 shadow-[0_0_10px_#4361ee] hover:shadow-[0_0_20px_#4361ee] px-4 py-2 rounded">
            <Mic className="inline-block h-4 w-4 mr-2" /> Voice Command
          </button>
        </motion.div>
      </div>

      {selectedDay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-black/80 border-2 border-[#3498db] max-w-md w-full rounded-lg shadow-[0_0_30px_#3498db] p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#E1F5FE] text-2xl font-bold">
                {selectedDay} s Schedule
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <AnimatePresence>
                {//@ts-ignore
                schedule[selectedDay]?.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="mb-4 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#E1F5FE] mb-1">
                          {task.meta_data.subject}
                          {task.meta_data.chapter && (
                            <span className="text-[#3498db]">
                              {' '}
                              - Chapter {task.meta_data.chapter}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {task.meta_data.topic}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          <Edit size={16} className="text-[#3498db]" />
                        </button>
                        <button
                          //@ts-ignore
                          onClick={() => handleCompleteTask(task.id)}
                          className="p-2 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          <Check size={16} className="text-green-500" />
                        </button>
                        <button
                          onClick={() => {
                            const newSchedule = { ...schedule };
                            //@ts-ignore
                            newSchedule[selectedDay] = newSchedule[
                              selectedDay
                              //@ts-ignore
                            ].filter((_, i) => i !== index);
                            setSchedule(newSchedule);
                          }}
                          className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-white mb-2">
                      {task.title}
                    </p>
                    <div className="text-sm text-gray-400 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {formatTime(task.start_time_utc)} -{' '}
                      {formatTime(task.end_time_utc)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <form className="mt-4 flex gap-2">
              {/* <input
                name="task"
                placeholder="Add new task"
                className="flex-grow p-2 rounded bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3498db] transition-all"
              /> */}
              <button
                className="bg-[#3498db] hover:bg-[#3498db]/80 text-white px-4 py-2 rounded flex items-center justify-center transition-colors"
                // disabled={loading}
                onClick={() => {
                  setSelectedDay(null);
                  handleAddTaskInDay();
                }}
              >
                {/* {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </motion.div>
                ) : (
                  <Plus className="h-5 w-5" />
                )} */}
                Add New Task
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          onAddByMessage={handleAddByMessage}
          onAddByForm={handleSaveTask}
        />
      )}

      {/* Add Exam Modal */}
    </motion.div>
  );
}
