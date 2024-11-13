import Orbit from '../../components/avatar/Orbit';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  Home,
  Grid,
  Search,
  Calendar,
  Clipboard,
  Cpu,
  Edit,
  Check,
  Plus,
  BookOpen,
} from 'lucide-react';
import { DayPlanItem } from '../../types/study-planner';
import EditTaskModal from '../../components/study-planner/EditTaskModal';
import TaskModal from '../../components/study-planner/TaskModal';
import WeeklySchedule from '../../components/study-planner/WeeklySchedule';
import ExamPreparationView from '../../components/study-planner/ExamPreparation';
import DayView from '../../components/study-planner/dayPlaner';
import TabNavigation from '../../components/study-planner/TabNavigation';
import {
  AddTaskApiCall,
  AddTaskByQueryApiCall,
  GetTaskBetweenRangeApiCall,
  UpdateTaskApiCall,
} from 'services/api/study-planner';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, className }) => (
  <div className={`h-2 bg-gray-700 rounded-full ${className}`}>
    <div
      className={`h-full bg-blue-500 rounded-full`}
      style={{ width: `${(value / max) * 100}%` }}
    ></div>
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'outline' | 'filled';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  className,
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md transition-colors ${
      variant === 'outline'
        ? 'border border-gray-600 hover:bg-gray-700'
        : 'bg-blue-500 hover:bg-blue-600 text-gray-100'
    } ${className}`}
  >
    {children}
  </button>
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-sm ${className}`}>
    {children}
  </span>
);

interface Task {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface AIPlan {
  dailyTasks: Task[];
  weeklyFocus: string;
  examPrep: string;
}

const initialTasks: Task[] = [
  { id: 'task1', content: 'Math: Algebra', priority: 'high', completed: false },
  {
    id: 'task2',
    content: 'Science: Chemistry',
    priority: 'medium',
    completed: false,
  },
  {
    id: 'task3',
    content: 'English: Essay Writing',
    priority: 'low',
    completed: false,
  },
];

type Tab = {
  id: 'plan-day' | 'plan-week' | 'plan-exam';
  label: string;
  icon: React.ComponentType<React.ComponentProps<typeof Home>>;
};

const AIEnhancedStudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [progress, setProgress] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);
  const [activeTab, setActiveTab] = useState<
    'plan-day' | 'plan-week' | 'plan-exam'
  >('plan-day');
  const [dayPlan, setDayPlan] = useState<DayPlanItem[]>([]);
  const [loadingDay, setLoadingDay] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DayPlanItem | null>(null);
  const tabs: Tab[] = [
    {
      id: 'plan-day',
      label: 'Plan Your Day',
      icon: Home,
    },
    {
      id: 'plan-week',
      label: 'Plan Your Week',
      icon: Calendar,
    },
    {
      id: 'plan-exam',
      label: 'Plan for Exam',
      icon: BookOpen,
    },
  ];

  useEffect(() => {
    // Fetch day plan data when component mounts or when activeTab changes to 'plan-day'
    if (activeTab === 'plan-day') {
      fetchDayPlan();
    }
  }, [activeTab]);

  const fetchDayPlan = async () => {
    try {
      // const today = new Date();
      // const endDate = today.toISOString().split('T')[0];
      // today.setDate(today.getDate() - 1); // Subtract one day
      // const startDate = today.toISOString().split('T')[0];
      // const res = await GetTaskBetweenRangeApiCall(null , startDate + " 23:00:00.000" , endDate + " 23:00:00.000");
      // console.log({res})
      // if (res.data.Status === 'Success') {
      //   setDayPlan(res.data.data);
      // }
      const data = [
        {
          id: 'accc80a1-decf-4a20-868a-ad12d4908d8f',
          schedule_id: '23f0f3cb-a893-4261-9f57-100bd4cb6253',
          title: 'Study Maths Chapter 1',
          created_by: '5808f946-ca84-427e-b325-c5f9532614fa',
          date: '2024-10-19T00:00:00.000Z',
          start_time_utc: '09:00:00',
          end_time_utc: '11:45:00',
          type: 'study',
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
          meta_data: {
            chapter: '',
            subject: 'English',
            topic: 'Essay Writing',
          },
        },
        {
          id: 'a9f56b01-bd5e-46d9-b07b-3f48a0a70d67',
          schedule_id: '5c648ef1-50b0-4f4b-977d-542ec540fa32',
          title: 'Test on Physics Mechanics',
          created_by: 'cc793283-6f96-41d4-bb1b-bf09bc62f742',
          date: '2024-10-22T00:00:00.000Z',
          start_time_utc: '08:30:00',
          end_time_utc: '09:30:00',
          type: 'test',
          meta_data: {
            chapter: '',
            subject: 'Physics',
            topic: 'Mechanics',
          },
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
          meta_data: {
            chapter: '',
            subject: 'History',
            topic: 'The Renaissance',
          },
        },
      ];
      setDayPlan(data);
    } catch (error) {
      console.error('Error fetching day plan:', error);
    } finally {
      setLoadingDay(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedItem);
    setTasks(newTasks);
  };

  const completeTask = (id: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    setProgress(Math.min(100, progress + 20));
    setPoints(points + 10);
  };

  const generateAIPlan = () => {
    const generatedPlan: AIPlan = {
      dailyTasks: [
        {
          id: 'ai1',
          content: 'Review Math: Quadratic Equations',
          priority: 'high',
          completed: false,
        },
        {
          id: 'ai2',
          content: 'Practice Science: Chemical Reactions',
          priority: 'medium',
          completed: false,
        },
        {
          id: 'ai3',
          content: 'Read English Literature: Shakespeare',
          priority: 'low',
          completed: false,
        },
      ],
      weeklyFocus: 'Algebra and Chemistry',
      examPrep: 'Start preparing for upcoming Math exam in 3 weeks',
    };
    setAiPlan(generatedPlan);
    setTasks([...tasks, ...generatedPlan.dailyTasks]);
  };

  const handleEditTask = (task: DayPlanItem) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCompleteTask = (taskId: string) => {
    setDayPlan((prevPlan) =>
      prevPlan.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSaveTask = async (updatedTask: DayPlanItem) => {
    try {
      let response;
      if (updatedTask.id) {
        // Edit existing task
        console.log({ updatedTask });
        response = await UpdateTaskApiCall(updatedTask, null, updatedTask.id);
      } else {
        // Add new task
        response = await AddTaskApiCall(updatedTask);
      }

      if (response.ok) {
        const savedTask = await response.json();
        setDayPlan((prevPlan) =>
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
      if (response.data) {
        setDayPlan((prevPlan) => [...prevPlan, response.data]);
        setIsModalOpen(false);
      } else {
        console.error('Failed to add task by message');
      }
    } catch (error) {
      console.error('Error adding task by message:', error);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-bold text-blue-400 Darker-Grotesque">
          AI-Powered Study Hub
        </h1>
        <div className="flex items-center">
          <button
            className="mt-2 text-gray-200 border-gray-600 flex items-center"
            onClick={() => setActiveTab('plan-day')}
          >
            <Home size={24} className="mr-2" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
        <div className="h-full my-auto flex flex-col justify-center">
          <Orbit opration={null} size={60} />
        </div>
        <div className="flex-1">
          <p className="text-lg font-medium">
            Hello! Need help with your study plan?
          </p>
          <Button
            variant="outline"
            className="mt-2 text-gray-200 border-gray-600"
            onClick={generateAIPlan}
          >
            Generate AI Study Plan
          </Button>
        </div>
      </div>

      {aiPlan && (
        <div className="bg-gray-800 text-gray-100 mt-6 w-full">
          <div className="p-4">
            <h2 className="text-2xl text-blue-400 font-bold">
              AI-Generated Study Plan
            </h2>
            <p className="text-gray-300">
              Personalized plan based on your progress and goals
            </p>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-blue-300">
                Weekly Focus:
              </h3>
              <p className="text-gray-300">{aiPlan.weeklyFocus}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-300">
                Exam Preparation:
              </h3>
              <p className="text-gray-300">{aiPlan.examPrep}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-300">
                Suggested Daily Tasks:
              </h3>
              <ul className="list-disc list-inside text-gray-300">
                {aiPlan.dailyTasks.map((task) => (
                  <li key={task.id}>{task.content}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg mt-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Today&rsquo;s Progress</h2>
          <ProgressBar value={progress} max={100} className="w-64" />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">{points} pts</p>
          <p className="text-sm text-gray-500">Total Points</p>
        </div>
        <Badge className="text-lg text-gray-300 bg-gray-700 border-gray-600">
          Weekly Goal: 70%
        </Badge>
      </div>

      {/* <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} dayPlan={dayPlan} /> */}

      <div className="w-full">
        <div className="relative bg-gray-950 border-b border-gray-800">
          {/* Background Glow Effect for Active Tab */}
          <div
            className="absolute h-1 bottom-0 bg-blue-500/20 blur-sm transition-all duration-300"
            style={{
              left: `${(tabs.findIndex((tab) => tab.id === activeTab) * 100) / tabs.length}%`,
              width: `${100 / tabs.length}%`,
            }}
          />

          {/* Tabs Container */}
          <div className="flex items-center justify-start overflow-x-auto scrollbar-hide max-w-screen-xl mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                relative group flex-shrink-0 flex items-center justify-center
                transition-all duration-200
                
                /* Mobile Styles */
                px-3 py-3 min-w-[100px]
                
                /* Tablet Styles */
                sm:px-4 sm:py-3 sm:min-w-[130px]
                
                /* Desktop Styles */
                md:px-6 md:py-4 md:min-w-[160px]
                
                ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-400 hover:text-gray-200'}
              `}
              >
                {/* Active Tab Indicator */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500" />
                )}

                {/* Icon and Label Container */}
                <div className="flex items-center space-x-2">
                  <tab.icon
                    size={18}
                    className={`transition-transform duration-200 
                    ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-500'}
                    group-hover:scale-110`}
                  />
                  <span
                    className={`
                    font-medium tracking-wide whitespace-nowrap
                    text-xs sm:text-sm
                    ${activeTab === tab.id ? 'text-blue-400' : ''}
                  `}
                  >
                    {/* Show shortened labels on mobile */}
                    <span className="block sm:hidden">
                      {tab.label
                        .replace('Plan Your ', '')
                        .replace('Plan for ', '')}
                    </span>
                    {/* Show full labels on larger screens */}
                    <span className="hidden sm:block">{tab.label}</span>
                  </span>
                </div>

                {/* Hover Indicator */}
                <div
                  className={`
                  absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 pointer-events-none
                  ${activeTab === tab.id ? 'bg-blue-500/5' : 'bg-gray-700/10'}
                `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="bg-gray-950 min-h-screen">
          <div className="p-0 sm:p-2 md:p-4">
            {activeTab === 'plan-day' && !loadingDay && (
              <DayView
                dayPlan={dayPlan}
                setIsModalOpen={setIsModalOpen}
                setEditingTask={setEditingTask}
              />
            )}
            {activeTab === 'plan-week' && <WeeklySchedule />}
            {activeTab === 'plan-exam' && <ExamPreparationView />}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          onAddByMessage={handleAddByMessage}
          onAddByForm={handleSaveTask}
        />
      )}
    </div>
  );
};

export default AIEnhancedStudyPlanner;
