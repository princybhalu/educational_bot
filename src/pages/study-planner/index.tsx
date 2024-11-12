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
} from 'lucide-react';
import { DayPlanItem } from '../../types/study-planner';
import EditTaskModal from '../../components/study-planner/EditTaskModal';
import TaskModal from '../../components/study-planner/TaskModal';
import WeeklySchedule from '../../components/study-planner/WeeklySchedule';

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

const AIEnhancedStudyPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [progress, setProgress] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);
  const [activeTab, setActiveTab] = useState<
    'plan-day' | 'plan-week' | 'plan-exam'
  >('plan-day');
  const [dayPlan, setDayPlan] = useState<DayPlanItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DayPlanItem | null>(null);

  useEffect(() => {
    // Fetch day plan data when component mounts or when activeTab changes to 'plan-day'
    if (activeTab === 'plan-day') {
      fetchDayPlan();
    }
  }, [activeTab]);

  const fetchDayPlan = async () => {
    try {
      // In a real application, replace this with an actual API call
      const data = {
        Status: 'Success',
        data: [
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
              topic: '',
            },
          },
        ],
      };
      if (data.Status === 'Success') {
        setDayPlan(data.data);
      }
    } catch (error) {
      console.error('Error fetching day plan:', error);
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
        response = await fetch(`/api/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
      } else {
        // Add new task
        response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
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
      const response = await fetch('/api/tasks/by-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        const newTask = await response.json();
        setDayPlan((prevPlan) => [...prevPlan, newTask]);
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

      {/* tabs sections  */}
      <div className="w-full mt-6">
        <div className="flex justify-center bg-gray-800 border-b border-gray-700 py-3">
          <button
            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
              activeTab === 'plan-day'
                ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('plan-day')}
          >
            <Home size={20} />
            <span className="ml-2">Plan Your Day</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
              activeTab === 'plan-week'
                ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('plan-week')}
          >
            <Grid size={20} />
            <span className="ml-2">Plan Your Week</span>
          </button>
          <button
            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors ${
              activeTab === 'plan-exam'
                ? 'bg-gray-700 text-blue-400 hover:bg-gray-600'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab('plan-exam')}
          >
            <Search size={20} />
            <span className="ml-2">Plan for Exam</span>
          </button>
        </div>
        {/* display active tabs content */}
        {activeTab === 'plan-day' && (
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-400">Day View</h2>
              <button
                onClick={handleAddTask}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <Plus size={24} />
              </button>
            </div>
            {dayPlan.length > 0 ? (
              <ul className="space-y-4">
                {dayPlan.map((item) => (
                  <li
                    key={item.id}
                    className={`bg-gray-700 p-4 rounded-lg ${item.completed ? 'opacity-50' : ''}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-blue-300">
                        {item.meta_data.subject} - {item.meta_data.chapter} -{' '}
                        {item.meta_data.topic}
                      </h3>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEditTask(item)}
                          className="p-2 bg-yellow-500 text-gray-900 rounded-md hover:bg-yellow-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleCompleteTask(item.id)}
                          className={`p-2 ${item.completed ? 'bg-green-500' : 'bg-gray-500'} text-gray-900 rounded-md hover:bg-green-600`}
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 mt-2">{item.title}</p>
                    <p className="text-gray-400">
                      Time: {item.start_time_utc} - {item.end_time_utc}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No plans for today. Time to create some!
              </p>
            )}
          </div>
        )}
        {activeTab === 'plan-week' && (
          <div className="p-4">
            <WeeklySchedule />
          </div>
        )}
        {activeTab === 'plan-exam' && (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-blue-400">Exam Prep View</h2>
            {/* exam prep view content */}
          </div>
        )}
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
