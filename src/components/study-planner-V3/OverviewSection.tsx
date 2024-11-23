import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Task } from '../../types/study-planner';
import {
  BookOpen,
  FileText,
  BookmarkIcon,
  ChevronLeft,
  ChevronRight,
  EyeIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  FlaskConical,
  GraduationCap,
  TestTube,
} from 'lucide-react';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GetTaskBetweenRangeApiCall } from 'services/api/study-planner';
import NoDataFound from '../../components/shared/NoDataFound';
import { useNavigate } from 'react-router-dom';

const ProgressOfDailyAndWeekly: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const themeColors = {
    background: isDarkMode ? 'bg-[#1E2541]' : 'bg-[#F5F7FA]',
    progressColors: {
      physics: isDarkMode
        ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
        : 'bg-gradient-to-r from-purple-400 to-indigo-500',
      study: isDarkMode
        ? 'bg-gradient-to-r from-green-600 to-emerald-600'
        : 'bg-gradient-to-r from-green-400 to-emerald-500',
      reading: isDarkMode
        ? 'bg-gradient-to-r from-red-600 to-orange-600'
        : 'bg-gradient-to-r from-red-400 to-orange-500',
    },
    textPrimary: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    cardBackground: isDarkMode ? 'bg-[#252D3C]' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
  };

  const moodIcons = [
    {
      emoji: '😊',
      label: 'Great',
      color: isDarkMode ? 'bg-green-700' : 'bg-green-200',
    },
    {
      emoji: '😐',
      label: 'Neutral',
      color: isDarkMode ? 'bg-blue-700' : 'bg-blue-200',
    },
    {
      emoji: '😞',
      label: 'Challenging',
      color: isDarkMode ? 'bg-red-700' : 'bg-red-200',
    },
  ];

  const weeklyGoals = [
    {
      icon: '⚡',
      title: 'Complete 3 Physics quizzes',
      progress: 2,
      total: 3,
      progressColor: themeColors.progressColors.physics,
    },
    {
      icon: '⏱',
      title: 'Study for 20 hours',
      progress: 15,
      total: 20,
      progressColor: themeColors.progressColors.study,
    },
    {
      icon: '📖',
      title: 'Read 2 chapters of Literature',
      progress: 1,
      total: 2,
      progressColor: themeColors.progressColors.reading,
    },
  ];

  return (
    <div
      className={`w-[90%] mx-auto mb-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 ${themeColors.background} rounded-2xl shadow-2xl`}
    >
      {/* Daily Progress Section */}
      <div
        className={`space-y-5 ${themeColors.cardBackground} p-6 rounded-2xl shadow-lg`}
      >
        <h2
          className={`text-xl font-bold ${themeColors.textPrimary} border-b pb-3 ${themeColors.cardBorder}`}
        >
          Daily Progress & Insights
        </h2>

        {/* Progress Overview */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-medium ${themeColors.textSecondary}`}
            >
              Daily Goal
            </span>
            <span
              className={`text-sm font-semibold ${themeColors.textPrimary}`}
            >
              30% Completed
            </span>
          </div>
          <div
            className={`h-3 w-full ${themeColors.progressColors.study} rounded-full overflow-hidden`}
          >
            <div
              className="h-full bg-opacity-50"
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>

        {/* Mood Selection */}
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-sm font-medium ${themeColors.textSecondary}`}>
              Points: 150
            </p>
            <p className={`text-sm font-medium ${themeColors.textSecondary}`}>
              Streak: 5 days
            </p>
          </div>
          <div className="flex space-x-2">
            {moodIcons.map((mood, index) => (
              <button
                key={index}
                className={`p-2 ${mood.color} rounded-full transition hover:scale-110`}
                title={mood.label}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div
          className={`p-4 border rounded-lg ${themeColors.cardBackground} ${themeColors.cardBorder}`}
        >
          <p className={`text-sm ${themeColors.textSecondary}`}>
            Your mood is balanced. Consider mixing up your study routine with
            both review and new material to maintain engagement.
          </p>
        </div>
      </div>

      {/* Weekly Goals Section */}
      <div
        className={`space-y-5 ${themeColors.cardBackground} p-6 rounded-2xl shadow-lg`}
      >
        <h2
          className={`text-xl font-bold ${themeColors.textPrimary} border-b pb-3 ${themeColors.cardBorder}`}
        >
          Weekly Goals
        </h2>

        {weeklyGoals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span
                className={`text-sm font-medium ${themeColors.textSecondary}`}
              >
                {goal.icon} {goal.title}
              </span>
              <span
                className={`text-sm font-semibold ${themeColors.textPrimary}`}
              >
                {goal.progress}/{goal.total}
              </span>
            </div>
            <div
              className={`h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}
            >
              <div
                className={`h-full ${goal.progressColor} rounded-full`}
                style={{ width: `${(goal.progress / goal.total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UpcomingTasks: React.FC<{ tasks: Task[] | null }> = ({ tasks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const navigate = useNavigate();

  if (!tasks) {
    return (
      <>
        <div
          className={`w-[90%] m-4 mb-4 rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${
            isDarkMode
              ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]'
              : 'bg-white/90 border border-gray-200'
          }`}
        >
          <div className="p-3 md:p-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center w-full mb-4">
              {/* Previous Button Skeleton */}
              <div
                className={`w-10 h-10 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                } animate-pulse`}
              ></div>

              {/* Title Skeleton */}
              <div
                className={`w-40 h-6 rounded ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                } animate-pulse`}
              ></div>

              {/* Next Button Skeleton */}
              <div
                className={`w-10 h-10 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                } animate-pulse`}
              ></div>
            </div>

            {/* Task Card Skeleton */}
            <div
              className={`flex items-center space-x-4 p-4 rounded-lg shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}
            >
              {/* Icon Skeleton */}
              <div
                className={`w-12 h-12 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                } animate-pulse`}
              ></div>

              {/* Text Content Skeleton */}
              <div className="flex-grow space-y-2">
                {/* Task Title Skeleton */}
                <div
                  className={`w-3/4 h-5 rounded ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                  } animate-pulse`}
                ></div>
                {/* Task Time Skeleton */}
                <div
                  className={`w-1/2 h-4 rounded ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  } animate-pulse`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentTask = tasks[currentIndex];

  const renderTaskIcon = (status: string, type: string) => {
    const iconClass = `w-8 h-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
    switch (type) {
      // case 'completed':
      //   return <CheckCircle className={`${iconClass} text-green-500`} />;
      // case 'in_progress':
      //   return <Clock className={`${iconClass} text-[#4361ee]`} />;
      // case 'overdue':
      //   return <AlertCircle className={`${iconClass} text-red-500`} />;
      // case 'upcoming':
      // default:
      // switch (type) {
      case 'study':
        return <BookOpen className={`${iconClass} text-[#4cc9f0]`} />;
      case 'test':
        return <FlaskConical className={`${iconClass} text-[#4361ee]`} />;
      case 'exam_preparation':
        return <GraduationCap className={`${iconClass} text-[#4cc9f0]`} />;
      default:
        return <Clock className={`${iconClass} text-[#4cc9f0]`} />;
    }
    // }
  };

  const getCardBackground = (type: string) => {
    const baseClass = `bg-gradient-to-br ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
    switch (type) {
      case 'study':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee20] to-[#4cc9f020]' : 'from-[#4361ee10] to-[#4cc9f010]'}`;
      case 'test':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee30] to-[#4cc9f030]' : 'from-[#4361ee20] to-[#4cc9f020]'}`;
      case 'exam_preparation':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee40] to-[#4cc9f040]' : 'from-[#4361ee30] to-[#4cc9f030]'}`;
      default:
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee20] to-[#4cc9f020]' : 'from-[#4361ee10] to-[#4cc9f010]'}`;
    }
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
    // else if(tasks.length-1 === currentIndex){
    //   navigate("/study-planner/tasks");
    // }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`w-[90%] m-4 mb-4 rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]' : 'bg-white/90 border border-gray-200'}`}
    >
      <div className="p-3 md:p-6">
        {/* <h2 className="text-2xl font-bold mb-6 font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
          Task View
        </h2> */}
        <div className="flex justify-between items-center w-full mb-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDarkMode
                ? 'text-white/70 hover:text-white hover:bg-[rgba(67,97,238,0.25)]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            } ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous task"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {`Task ${currentIndex + 1} of ${tasks.length}`}
          </span> */}
          <h2 className="text-2xl  font-bold font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
            Upcoming Tasks
          </h2>

          <button
            onClick={handleNext}
            disabled={currentIndex === tasks.length - 1}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDarkMode
                ? 'text-white/70 hover:text-white hover:bg-[rgba(67,97,238,0.25)]'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            } ${currentIndex === tasks.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next task"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {tasks && tasks.length === 0 && (
          <>
            <NoDataFound displayText={'No Any Tasks Found'} />
          </>
        )}

        {tasks && tasks.length > 0 && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTask.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center space-x-4 p-4 rounded-lg shadow-lg ${getCardBackground(currentTask?.type)}`}
              >
                <div>
                  {renderTaskIcon(currentTask.status, currentTask.type)}
                </div>

                <div className="flex-grow">
                  <h3
                    className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {currentTask.title}
                  </h3>
                  <p
                    className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`}
                  >
                    {new Date(currentTask.start_time_utc).toLocaleTimeString(
                      [],
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    )}{' '}
                    -{' '}
                    {new Date(currentTask.end_time_utc).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

const UpcomingExam: React.FC = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const getCardBackground = (type: string) => {
    const baseClass = `bg-gradient-to-br ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
    switch (type) {
      case 'study':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee20] to-[#4cc9f020]' : 'from-[#4361ee10] to-[#4cc9f010]'}`;
      case 'test':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee30] to-[#4cc9f030]' : 'from-[#4361ee20] to-[#4cc9f020]'}`;
      case 'exam_preparation':
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee40] to-[#4cc9f040]' : 'from-[#4361ee30] to-[#4cc9f030]'}`;
      default:
        return `${baseClass} ${isDarkMode ? 'from-[#4361ee20] to-[#4cc9f020]' : 'from-[#4361ee10] to-[#4cc9f010]'}`;
    }
  };

  return (
    <div
      className={`w-[90%]  m-4 mb-4 rounded-xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]' : 'bg-white/90 border border-gray-200'}`}
    >
      <div className="p-3 md:p-6">
        <div className="flex justify-between items-center w-full mb-4">
          {/* <span className={`text-lg font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {`Task ${currentIndex + 1} of ${tasks.length}`}
          </span> */}
          <h2 className="text-2xl  font-bold font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
            Upcoming Exams
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center space-x-4 p-4 rounded-lg shadow-lg`}
          >
            No Data Found
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const focusData = [
  { time: '9AM', focus: 85 },
  { time: '10AM', focus: 92 },
  { time: '11AM', focus: 70 },
  { time: '12PM', focus: 65 },
  { time: '1PM', focus: 75 },
  { time: '2PM', focus: 90 },
  { time: '3PM', focus: 85 },
];

const FocusChart = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-2 rounded-md shadow-md ${isDarkMode ? 'bg-[rgba(16,20,46,0.9)] text-white' : 'bg-white text-gray-900'}`}
        >
          <p className="font-semibold">{`Time: ${label}`}</p>
          <p>{`Focus Level: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`w-[90%] mx-auto rounded-xl mb-4 p-6 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[rgba(16,20,46,0.9)] border border-[rgba(67,97,238,0.2)]'
          : 'bg-white/90 border border-gray-200'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
        Focus & Productivity Trends
      </h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={focusData}
            margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
              vertical={false}
            />
            <XAxis
              dataKey="time"
              stroke={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              tick={{
                fill: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={isDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'}
              tick={{
                fill: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
              }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="focus"
              stroke={isDarkMode ? '#4cc9f0' : '#4361ee'}
              strokeWidth={2}
              dot={{
                fill: isDarkMode ? '#0a0d1e' : '#ffffff',
                stroke: isDarkMode ? '#4cc9f0' : '#4361ee',
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: isDarkMode ? '#4cc9f0' : '#4361ee',
                stroke: isDarkMode ? '#0a0d1e' : '#ffffff',
                strokeWidth: 2,
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const OverviewSection: React.FC = () => {
  const [tasks, setTasks] = useState<null | Task[]>(null);

  // const tasks = [
  //   {
  //     id: '1',
  //     schedule_id: 'SCHD001',
  //     title: 'Physics: Work and Energy',
  //     created_by: 'AI',
  //     date: '2024-11-20',
  //     start_time_utc: '2024-11-20T10:00:00Z',
  //     end_time_utc: '2024-11-20T11:30:00Z',
  //     type: 'study', // Enums: study, test, exam_preparation
  //     status: 'completed', // Enums: upcoming, in_progress, completed, overdue
  //     meta_data: {
  //       chapter: '5',
  //       subject: 'Physics',
  //       topic: 'Work and Energy',
  //     },
  //   },
  //   {
  //     id: '2',
  //     schedule_id: 'SCHD002',
  //     title: 'Math: Algebra Practice Test',
  //     created_by: 'Human',
  //     date: '2024-11-21',
  //     start_time_utc: '2024-11-21T14:00:00Z',
  //     end_time_utc: '2024-11-21T15:30:00Z',
  //     type: 'test', // Enums: study, test, exam_preparation
  //     status: 'in_progress', // Enums: upcoming, in_progress, completed, overdue
  //     meta_data: {
  //       chapter: '7',
  //       subject: 'Math',
  //       topic: 'Algebra',
  //     },
  //   },
  //   {
  //     id: '3',
  //     schedule_id: 'SCHD003',
  //     title: 'Chemistry: Organic Compounds Review',
  //     created_by: 'AI',
  //     date: '2024-11-22',
  //     start_time_utc: '2024-11-22T16:00:00Z',
  //     end_time_utc: '2024-11-22T17:00:00Z',
  //     type: 'exam_preparation', // Enums: study, test, exam_preparation
  //     status: 'upcoming', // Enums: upcoming, in_progress, completed, overdue
  //     meta_data: {
  //       chapter: '12',
  //       subject: 'Chemistry',
  //       topic: 'Organic Compounds',
  //     },
  //   },
  //   {
  //     id: '4',
  //     schedule_id: 'SCHD004',
  //     title: 'History: World War II Notes',
  //     created_by: 'Human',
  //     date: '2024-11-19',
  //     start_time_utc: '2024-11-19T10:00:00Z',
  //     end_time_utc: '2024-11-19T11:30:00Z',
  //     type: 'study', // Enums: study, test, exam_preparation
  //     status: 'overdue', // Enums: upcoming, in_progress, completed, overdue
  //     meta_data: {
  //       chapter: '9',
  //       subject: 'History',
  //       topic: 'World War II',
  //     },
  //   },
  // ];

  useEffect(() => {
    const apiCall = async () => {
      try {
        const today = new Date();
        const endDate = today.toISOString().split('T')[0];
        const res = await GetTaskBetweenRangeApiCall(null, endDate, endDate);

        // add code here
        const tasks = res.data
          .filter((item: any) => item.status === 'pending')
          .sort(
            (item: any) =>
              +new Date(item.start_time_utc) < +new Date(item.start_time_utc)
          );

        console.log(tasks, res.data);
        setTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    };

    apiCall().then();
  }, []);

  return (
    <>
      {' '}
      <div className="flex flex-col w-[90%] mx-auto md:flex-row justify-between">
        <UpcomingTasks tasks={tasks} />
        <UpcomingExam />
      </div>
      <FocusChart />
      <ProgressOfDailyAndWeekly />{' '}
    </>
  );
};

export default OverviewSection;
