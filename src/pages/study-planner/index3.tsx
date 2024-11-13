'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';
// import { cn } from '@/lib/utils';

// Mock data
const initialTasks = [
  {
    id: 'task1',
    content: 'Math: Algebra',
    priority: 'high',
    completed: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: 'task2',
    content: 'Science: Chemistry',
    priority: 'medium',
    completed: false,
    timestamp: new Date().toISOString(),
  },
  {
    id: 'task3',
    content: 'English: Essay Writing',
    priority: 'low',
    completed: false,
    timestamp: new Date().toISOString(),
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

export default function Component() {
  const [tasks, setTasks] = useState(initialTasks);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [schedule, setSchedule] = useState({});
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('day');
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
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
        task.id === id ? { ...task, completed: !task.completed } : task
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

      <div className="w-full">
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
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tasks">
                    {(provided) => (
                      <ul
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                      >
                        <AnimatePresence>
                          {tasks.map((task, index) => (
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
                                    task.priority === 'high'
                                      ? 'bg-[#e74c3c]/40'
                                      : task.priority === 'medium'
                                        ? 'bg-[#3498db]/30'
                                        : 'bg-[#2ecc71]/20'
                                  } ${task.completed ? 'opacity-50' : ''}`}
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
                                    {task.completed ? (
                                      <Trophy className="w-5 h-5 text-green-500 mr-2" />
                                    ) : (
                                      <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                                    )}
                                    {task.priority === 'high' && (
                                      <Flame className="text-[#e74c3c] w-4 h-4" />
                                    )}
                                    <span
                                      className={
                                        task.completed
                                          ? 'line-through text-[#AAB2BF]'
                                          : 'text-white'
                                      }
                                    >
                                      {task.content}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span
                                      className={`text-xs px-2 py-1 rounded ${
                                        task.priority === 'high'
                                          ? 'bg-[#e74c3c] text-white'
                                          : 'bg-[#3498db] text-white'
                                      }`}
                                    >
                                      {new Date(
                                        task.timestamp
                                      ).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </span>
                                    <button
                                      onClick={() => completeTask(task.id)}
                                      className="border border-[#4361ee] text-[#4361ee] hover:bg-[#4361ee] hover:text-white transition-all duration-300 px-2 py-1 rounded text-sm"
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
                                      ) : task.completed ? (
                                        'Undo'
                                      ) : (
                                        'Complete'
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
                              schedule[fullDay]?.length || 0
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
                  <button className="w-full bg-gradient-to-r from-[#3498db] to-[#4361ee] hover:from-[#3498db]/80 hover:to-[#4361ee]/80 text-white transition-all duration-300 shadow-[0_0_15px_#3498db] p-2 rounded">
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
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <AnimatePresence>
                {
                //@ts-ignore
                schedule[selectedDay]?.map((task : any, index : number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center mb-2 p-3 bg-gray-800/50 rounded-lg"
                  >
                    <span className="text-[#AAB2BF]">{task}</span>
                    <button
                      onClick={() => {
                        const newSchedule = { ...schedule };
                        // @ts-ignore
                        newSchedule[selectedDay] = newSchedule[
                          selectedDay
                        // @ts-ignore
                        ].filter((_, i) => i !== index);
                        setSchedule(newSchedule);
                      }}
                      className="text-[#e74c3c] hover:text-[#e74c3c]/80 hover:bg-[#e74c3c]/20 p-1 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                        // @ts-ignore
                const task = e.target.task.value;
                if (task) {
                  handleAddTask(selectedDay, task);
                        // @ts-ignore
                  e.target.reset();
                }
              }}
              className="mt-4 flex gap-2"
            >
              <input
                name="task"
                placeholder="Add new task"
                className="flex-grow p-2 rounded bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-[#3498db]"
              />
              <button
                type="submit"
                className="bg-[#3498db] hover:bg-[#3498db]/80 text-white px-4 py-2 rounded flex items-center justify-center"
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
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
