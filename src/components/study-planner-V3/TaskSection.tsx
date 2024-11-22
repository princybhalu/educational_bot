import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  MoreVertical,
  Book,
  FileText,
  GraduationCap,
  Clock,
  Calendar,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Timer,
  ArrowRight,
} from 'lucide-react';
import { Task } from '../../types/study-planner';
import TaskFormModal from './TaskFormModal';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusOfTasksName } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  upcoming: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
    icon: Clock,
    hover: 'hover:border-blue-500/50',
  },
  in_progress: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-500',
    icon: Timer,
    hover: 'hover:border-yellow-500/50',
  },
  completed: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-500',
    icon: CheckCircle,
    hover: 'hover:border-green-500/50',
  },
  overdue: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-500',
    icon: AlertCircle,
    hover: 'hover:border-red-500/50',
  },
};

const typeConfig = {
  study: {
    icon: Book,
    label: 'Study Session',
  },
  test: {
    icon: FileText,
    label: 'Test',
  },
  exam_preparation: {
    icon: GraduationCap,
    label: 'Exam Prep',
  },
};

const Task3Card: React.FC<{
  task: Task;
  isHighlighted: boolean;
  classes?: string;
  theme: any;
}> = ({ task, isHighlighted, classes, theme }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  //@ts-ignore
  const status = statusConfig[task.status];
  //@ts-ignore
  const type = typeConfig[task.type];
  const TypeIcon = type.icon;
  const StatusIcon = status.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      className={`
        relative mb-4 p-4 rounded-xl border transition-all duration-300
        ${theme.surface} ${status.border} ${status.bg} ${status.hover}
        ${isHighlighted ? 'scale-[1.02] shadow-lg ring-2 ring-[#4361ee]/30' : ''}
        ${classes}
      `}
      style={{
        boxShadow: isHighlighted
          ? '0 0 30px rgba(67,97,238,0.2)'
          : '0 10px 20px rgba(67,97,238,0.1)',
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className={`w-5 h-5 ${status.text}`} />
            <span className={`text-xs md:text-sm font-medium ${status.text}`}>
              {type.label}
            </span>
            <StatusIcon className={`w-4 h-4 ${status.text}`} />
          </div>

          {/* Title */}
          <h3 className={`text-md md:text-lg font-semibold mb-2 ${theme.text}`}>
            {task.title}
          </h3>

          {/* Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
              <Calendar className="w-4 h-4" />
              <span className="text-xs md:text-sm">
                {new Date(task.date).toLocaleDateString()}
              </span>
            </div>
            <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
              <Clock className="w-4 h-4" />
              <span className="text-xs md:text-sm">
                {formatTime(task.start_time_utc)}{' '}
                <ArrowRight className="w-4 h-4 inline" />{' '}
                {formatTime(task.end_time_utc)}
              </span>
            </div>
          </div>

          {/* Subject Info */}
          <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
            <span className="font-medium">{task.meta_data.subject}</span>
            <span className="mx-2">•</span>
            <span>Chapter {task.meta_data.chapter}</span>
            <span className="mx-2">•</span>
            <span>{task.meta_data.topic}</span>
          </div>
        </div>

        {/* Actions Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-2 rounded-lg ${theme.button} ${theme.buttonHover} transition-colors duration-300`}
          >
            <MoreVertical className={`w-5 h-5 ${theme.text}`} />
          </button>

          {showDropdown && (
            <div
              className={`
                absolute right-0 mt-2 w-48 rounded-lg border ${theme.surface} 
                ${theme.border} backdrop-blur-md shadow-lg z-50
              `}
              style={{
                boxShadow: '0 10px 30px rgba(67,97,238,0.2)',
              }}
            >
              <div className="py-2">
                <button
                  onClick={() => console.log('Edit task:', task.id)}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    ${theme.buttonHover} ${theme.text} transition-colors duration-300
                  `}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Task
                </button>
                <button
                  onClick={() => console.log('Delete task:', task.id)}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2 text-red-500
                    hover:bg-red-500/10 transition-colors duration-300
                  `}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Task3Timeline: React.FC<{ tasks: Task[]; theme: any }> = ({
  tasks,
  theme,
}) => {
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

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
        hasScrolled.current = true;
      }
    }
  }, [currentIndex]);

  const getMinutesFromTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const isHighlighted = (task: Task, index: number) => {
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
    <div className="relative w-full max-w-8xl mx-auto py-8">
      <div
        ref={timelineRef}
        className="h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide px-4"
        aria-label="Task timeline"
      >
        {sortedTasks.map((task, index) => (
          <Task3Card
            key={task.id}
            task={task}
            isHighlighted={isHighlighted(task, index)}
            classes="task-item"
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

const DailyTasksSection = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const theme = {
    light: {
      surface: 'bg-white/90',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-white/90',
      buttonHover: 'hover:bg-[#4361ee]/10',
    },
    dark: {
      surface: 'bg-[rgba(16,20,46,0.9)]',
      text: 'text-white',
      textSecondary: 'text-white/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-[rgba(16,20,46,1)]',
      buttonHover: 'hover:bg-[#4361ee]/15',
    },
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const tasks = [
    {
      id: '1',
      schedule_id: 'SCHD001',
      title: 'Physics: Work and Energy',
      created_by: 'AI',
      date: '2024-11-20',
      start_time_utc: '2024-11-20T10:00:00Z',
      end_time_utc: '2024-11-20T11:30:00Z',
      type: 'study', // Enums: study, test, exam_preparation
      status: 'completed', // Enums: upcoming, in_progress, completed, overdue
      meta_data: {
        chapter: '5',
        subject: 'Physics',
        topic: 'Work and Energy',
      },
    },
    {
      id: '2',
      schedule_id: 'SCHD002',
      title: 'Math: Algebra Practice Test',
      created_by: 'Human',
      date: '2024-11-21',
      start_time_utc: '2024-11-21T14:00:00Z',
      end_time_utc: '2024-11-21T15:30:00Z',
      type: 'test', // Enums: study, test, exam_preparation
      status: 'in_progress', // Enums: upcoming, in_progress, completed, overdue
      meta_data: {
        chapter: '7',
        subject: 'Math',
        topic: 'Algebra',
      },
    },
    {
      id: '3',
      schedule_id: 'SCHD003',
      title: 'Chemistry: Organic Compounds Review',
      created_by: 'AI',
      date: '2024-11-22',
      start_time_utc: '2024-11-22T16:00:00Z',
      end_time_utc: '2024-11-22T17:00:00Z',
      type: 'exam_preparation', // Enums: study, test, exam_preparation
      status: 'upcoming', // Enums: upcoming, in_progress, completed, overdue
      meta_data: {
        chapter: '12',
        subject: 'Chemistry',
        topic: 'Organic Compounds',
      },
    },
    {
      id: '4',
      schedule_id: 'SCHD004',
      title: 'History: World War II Notes',
      created_by: 'Human',
      date: '2024-11-19',
      start_time_utc: '2024-11-19T10:00:00Z',
      end_time_utc: '2024-11-19T11:30:00Z',
      type: 'study', // Enums: study, test, exam_preparation
      status: 'overdue', // Enums: upcoming, in_progress, completed, overdue
      meta_data: {
        chapter: '9',
        subject: 'History',
        topic: 'World War II',
      },
    },
  ];

  return (
    // <div
    //   className={`
    //     ${currentTheme.surface} rounded-xl border ${currentTheme.border}
    //     backdrop-blur-md transition-all duration-300
    //   `}
    //   style={{
    //     boxShadow: '0 10px 30px rgba(67,97,238,0.2)',
    //   }}
    // >
    <Task3Timeline tasks={tasks} theme={currentTheme} />
    // </div>
  );
};

const TasksSection = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isToday = currentDate.toDateString() === new Date().toDateString();
  //@ts-ignore
  const isPastDate = currentDate < new Date().setHours(0, 0, 0, 0);
  const [activeTab, setActiveTab] = useState(
    isPastDate ? StatusOfTasksName.OVERDUE : StatusOfTasksName.UPCOMING
  );

  const baseStyles = {
    light: {
      bg: 'bg-white',
      surface: 'bg-white/90',
      surface1: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-white/90',
      buttonHover: 'hover:bg-[#4361ee]/10',
      tabBackground: 'bg-blue-100',
      tabText: 'text-gray-800',
      activeTabBackground: 'bg-white',
      activeTabText: 'text-black',
    },
    dark: {
      bg: 'bg-[#0a0d1e]',
      surface: 'bg-[rgba(16,20,46,0.9)]',
      surface1: 'bg-[rgba(16,20,46)]',
      text: 'text-white',
      textSecondary: 'text-white/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-[rgba(16,20,46,1)]',
      buttonHover: 'hover:bg-[#4361ee]/15',
      tabBackground: 'bg-[#1a2456]',
      tabText: 'text-white/80',
      activeTabBackground: 'bg-white/10',
      activeTabText: 'text-white',
    },
  };

  const theme = isDarkMode ? baseStyles.dark : baseStyles.light;

  const tabVariants = {
    initial: {
      opacity: 0,
      x: activeTab === 'Upcoming' ? 50 : -50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      x: activeTab === 'Upcoming' ? -50 : 50,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className={`rounded-xl p-2 transition-all duration-300 ${theme.bg}`}>
      <div className="flex sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <DateNavigator
          theme={theme}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setActiveTab={setActiveTab}
        />
        <div className="flex items-center space-x-4">
          {isToday && (
            <div
              className={`hidden sm:flex justify-center ${theme.tabBackground} rounded-3xl ${theme.tabText} gap-2 p-1`}
              style={{
                width: 'fit-content',
              }}
            >
              <motion.div
                className={`flex justify-center rounded-3xl p-2 cursor-pointer transition-all duration-300 
                ${
                  activeTab === StatusOfTasksName.COMPLETED
                    ? `${theme.activeTabBackground} ${theme.activeTabText}`
                    : ''
                }`}
                onClick={() => setActiveTab(StatusOfTasksName.COMPLETED)}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle />
                {activeTab === 'Completed' && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    Completed
                  </motion.span>
                )}
              </motion.div>

              <motion.div
                className={`flex justify-center rounded-3xl p-2 cursor-pointer gap-1 transition-all duration-300
                ${
                  activeTab === StatusOfTasksName.UPCOMING
                    ? `${theme.activeTabBackground} ${theme.activeTabText}`
                    : ''
                }`}
                onClick={() => setActiveTab(StatusOfTasksName.UPCOMING)}
                whileTap={{ scale: 0.95 }}
              >
                <Clock />
                {activeTab === StatusOfTasksName.UPCOMING && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    Upcoming
                  </motion.span>
                )}
              </motion.div>
            </div>
          )}
          {isPastDate && (
            <div
              className={`hidden sm:flex justify-center ${theme.tabBackground} rounded-3xl ${theme.tabText} gap-2 p-1`}
              style={{
                width: 'fit-content',
              }}
            >
              <motion.div
                className={`flex justify-center rounded-3xl p-2 cursor-pointer transition-all duration-300 
                  ${
                    activeTab === StatusOfTasksName.OVERDUE
                      ? `${theme.activeTabBackground} ${theme.activeTabText}`
                      : ''
                  }`}
                onClick={() => setActiveTab(StatusOfTasksName.OVERDUE)}
                whileTap={{ scale: 0.95 }}
              >
                <AlertCircle />
                {activeTab === StatusOfTasksName.OVERDUE && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    OverDue
                  </motion.span>
                )}
              </motion.div>

              <motion.div
                className={`flex justify-center rounded-3xl p-2 cursor-pointer gap-1 transition-all duration-300
                  ${
                    activeTab === StatusOfTasksName.COMPLETED
                      ? `${theme.activeTabBackground} ${theme.activeTabText}`
                      : ''
                  }`}
                onClick={() => setActiveTab(StatusOfTasksName.COMPLETED)}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle />
                {activeTab === StatusOfTasksName.COMPLETED && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2"
                  >
                    Completed
                  </motion.span>
                )}
              </motion.div>
            </div>
          )}
          <AddTaskButton theme={theme} />
        </div>
      </div>

      {/* Mobile Tabs - Shown only on small screens and for today's date */}
      {isToday && (
        <div
          className={`sm:hidden flex justify-end ${theme.tabBackground} rounded-3xl ${theme.tabText} gap-2 p-1 mb-4`}
          style={{
            width: 'fit-content',
          }}
        >
          <motion.div
            className={`flex justify-center rounded-3xl p-2 cursor-pointer transition-all duration-300 
                ${
                  activeTab === StatusOfTasksName.COMPLETED
                    ? `${theme.activeTabBackground} ${theme.activeTabText}`
                    : ''
                }`}
            onClick={() => setActiveTab(StatusOfTasksName.COMPLETED)}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle />
            {activeTab === 'Completed' && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                Completed
              </motion.span>
            )}
          </motion.div>

          <motion.div
            className={`flex justify-center rounded-3xl p-2 cursor-pointer gap-1 transition-all duration-300
                ${
                  activeTab === StatusOfTasksName.UPCOMING
                    ? `${theme.activeTabBackground} ${theme.activeTabText}`
                    : ''
                }`}
            onClick={() => setActiveTab(StatusOfTasksName.UPCOMING)}
            whileTap={{ scale: 0.95 }}
          >
            <Clock />
            {activeTab === StatusOfTasksName.UPCOMING && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                Upcoming
              </motion.span>
            )}
          </motion.div>
        </div>
      )}
      {isPastDate && (
        <div
          className={`sm:hidden flex justify-end ${theme.tabBackground} rounded-3xl ${theme.tabText} gap-2 p-1 mb-4`}
          style={{
            width: 'fit-content',
          }}
        >
          <motion.div
            className={`flex justify-center rounded-3xl p-2 cursor-pointer transition-all duration-300 
                  ${
                    activeTab === StatusOfTasksName.OVERDUE
                      ? `${theme.activeTabBackground} ${theme.activeTabText}`
                      : ''
                  }`}
            onClick={() => setActiveTab(StatusOfTasksName.OVERDUE)}
            whileTap={{ scale: 0.95 }}
          >
            <AlertCircle />
            {activeTab === StatusOfTasksName.OVERDUE && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                OverDue
              </motion.span>
            )}
          </motion.div>

          <motion.div
            className={`flex justify-center rounded-3xl p-2 cursor-pointer gap-1 transition-all duration-300
                  ${
                    activeTab === StatusOfTasksName.COMPLETED
                      ? `${theme.activeTabBackground} ${theme.activeTabText}`
                      : ''
                  }`}
            onClick={() => setActiveTab(StatusOfTasksName.COMPLETED)}
            whileTap={{ scale: 0.95 }}
          >
            <CheckCircle />
            {activeTab === StatusOfTasksName.COMPLETED && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                Completed
              </motion.span>
            )}
          </motion.div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={tabVariants}
        >
          <DailyTasksSection />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Custom Date Picker Component
const DatePicker: React.FC<{
  theme: any;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}> = ({ theme, currentDate, onDateSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);

    const days = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    onClose();
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const days = generateCalendarDays();

  return (
    <div
      className={`absolute top-full left-0 mt-2 ${theme.surface1} ${theme.text} border ${theme.border} rounded-lg shadow-lg p-4 z-10 w-64`}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className={`p-1 ${theme.buttonHover} rounded`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-semibold">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </div>
        <button
          onClick={() => changeMonth(1)}
          className={`p-1 ${theme.buttonHover} rounded`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-xs opacity-70">
            {day}
          </div>
        ))}
        {days.map((day, index) =>
          day ? (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              className={`p-1 rounded transition-colors duration-300 ${
                day.toDateString() === currentDate.toDateString()
                  ? 'bg-[#4361ee] text-white'
                  : `${theme.buttonHover} hover:bg-[#4361ee]/10`
              }`}
            >
              {day.getDate()}
            </button>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

const DateNavigator: React.FC<{
  theme: any;
  currentDate: Date;
  setCurrentDate: (a: any) => void;
  setActiveTab: (a: string) => void;
}> = ({ theme, currentDate, setCurrentDate, setActiveTab }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const changeActiveTab = (date: Date) => {
    if (isToday(date)) {
      setActiveTab(StatusOfTasksName.UPCOMING);
    } else {
      setActiveTab(StatusOfTasksName.OVERDUE);
    }
  };

  const handlePrevDay = () => {
    setCurrentDate((prev: any) => {
      changeActiveTab(new Date(prev.getTime() - 24 * 60 * 60 * 1000));
      return new Date(prev.getTime() - 24 * 60 * 60 * 1000);
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prev: any) => {
      changeActiveTab(new Date(prev.getTime() + 24 * 60 * 60 * 1000));
      return new Date(prev.getTime() + 24 * 60 * 60 * 1000);
    });
  };

  const handleDateSelect = (date: Date) => {
    setCurrentDate(date);
    changeActiveTab(date);
  };

  return (
    <div className="flex items-center gap-4 relative">
      <button
        onClick={handlePrevDay}
        className={`${theme.button} ${theme.buttonHover} ${theme.text} p-2 rounded-lg transition-all duration-300 border ${theme.hover}`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        onClick={() => setShowDatePicker(!showDatePicker)}
        className={`text-lg font-semibold ${theme.text} cursor-pointer`}
      >
        {isToday(currentDate) ? (
          <div className="relative">
            <span className="bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
              Today
            </span>
            <span className="block mt-1 h-0.5 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-full" />
          </div>
        ) : (
          getFormattedDate(currentDate)
        )}
      </div>

      {showDatePicker && (
        <DatePicker
          theme={theme}
          currentDate={currentDate}
          onDateSelect={handleDateSelect}
          onClose={() => {
            setShowDatePicker(false);
          }}
        />
      )}

      <button
        onClick={handleNextDay}
        className={`${theme.button} ${theme.buttonHover} ${theme.text} p-2 rounded-lg transition-all duration-300 border ${theme.hover}`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const AddTaskButton: React.FC<{ theme: any }> = ({ theme }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

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
      <button
        onClick={toggleDropdown}
        className="bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_30px_rgba(67,97,238,0.4)]"
        style={{
          boxShadow: '0 0 20px rgba(67,97,238,0.2)',
        }}
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-48 ${theme.surface} rounded-lg border ${theme.border} backdrop-blur-md shadow-lg z-50`}
          style={{
            boxShadow: '0 10px 30px rgba(67,97,238,0.2)',
          }}
        >
          <ul className={`py-2 text-sm ${theme.text}`}>
            <li
              onClick={() => {
                console.log('By Prompt selected');
                setIsDropdownOpen(false);
              }}
              className={`px-4 py-2 ${theme.buttonHover} cursor-pointer transition-colors duration-300`}
            >
              By Prompt
            </li>
            <li
              onClick={() => {
                toggleModal();
                setIsDropdownOpen(false);
                navigate('/study-planner/add');
              }}
              className={`px-4 py-2 ${theme.buttonHover} cursor-pointer transition-colors duration-300`}
            >
              By Form
            </li>
          </ul>
        </div>
      )}

      <TaskFormModal
        theme={theme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TasksSection;

// const DateNavigator: React.FC<{
//   theme: any;
//   currentDate: Date;
//   setCurrentDate: (a: any) => void;
//   setActiveTab: (a: string) => void;
// }> = ({ theme, currentDate, setCurrentDate, setActiveTab }) => {
//   const isToday = (date: Date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const getFormattedDate = (date: Date) => {
//     const options: Intl.DateTimeFormatOptions = {
//       month: 'short',
//       day: 'numeric',
//     };
//     return date.toLocaleDateString('en-US', options);
//   };

//   const handlePrevDay = () => {
//     setCurrentDate(
//       (prev: any) => new Date(prev.getTime() - 24 * 60 * 60 * 1000)
//     );
//     setActiveTab(StatusOfTasksName.OVERDUE);
//   };

//   const handleNextDay = () => {
//     setCurrentDate(
//       (prev: any) => new Date(prev.getTime() + 24 * 60 * 60 * 1000)
//     );
//   };

//   return (
//     <div className="flex items-center gap-4">
//       <button
//         onClick={handlePrevDay}
//         className={`${theme.button} ${theme.buttonHover} ${theme.text} p-2 rounded-lg transition-all duration-300 border ${theme.hover}`}
//         // style={{
//         //   boxShadow: '0 0 20px rgba(67,97,238,0.2)',
//         // }}
//       >
//         <ChevronLeft className="w-4 h-4" />
//       </button>

//       <div className={`text-lg font-semibold ${theme.text}`}>
//         {isToday(currentDate) ? (
//           <div className="relative">
//             <span className="bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent">
//               Today
//             </span>
//             <span className="block mt-1 h-0.5 bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] rounded-full" />
//           </div>
//         ) : (
//           getFormattedDate(currentDate)
//         )}
//       </div>

//       <button
//         onClick={handleNextDay}
//         className={`${theme.button} ${theme.buttonHover} ${theme.text} p-2 rounded-lg transition-all duration-300 border ${theme.hover}`}
//       >
//         <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };
