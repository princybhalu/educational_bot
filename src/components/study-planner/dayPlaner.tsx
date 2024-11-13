import React, { useState } from 'react';
import { Plus, Edit, Check, List, Grid } from 'lucide-react';

interface DayPlanItem {
  id: string;
  title: string;
  meta_data: {
    subject?: string;
    chapter?: string;
    topic?: string;
  };
  completed?: boolean;
  start_time_utc: string;
  end_time_utc: string;
  type: string;
}

const getTaskStyles = (type: string) => {
  switch (type) {
    case 'study':
      return {
        background: 'bg-gradient-to-br from-blue-950 to-blue-900',
        border: 'border-blue-700',
        icon: 'bg-blue-700',
        hover: 'hover:border-blue-600',
        title: 'text-blue-100',
        text: 'text-blue-200',
      };
    case 'test':
      return {
        background: 'bg-gradient-to-br from-amber-950 to-amber-900',
        border: 'border-amber-700',
        icon: 'bg-amber-700',
        hover: 'hover:border-amber-600',
        title: 'text-amber-100',
        text: 'text-amber-200',
      };
    case 'therapy':
      return {
        background: 'bg-gradient-to-br from-emerald-950 to-emerald-900',
        border: 'border-emerald-700',
        icon: 'bg-emerald-700',
        hover: 'hover:border-emerald-600',
        title: 'text-emerald-100',
        text: 'text-emerald-200',
      };
    default:
      return {
        background: 'bg-gradient-to-br from-gray-950 to-gray-900',
        border: 'border-gray-700',
        icon: 'bg-gray-700',
        hover: 'hover:border-gray-600',
        title: 'text-gray-100',
        text: 'text-gray-200',
      };
  }
};

const DayView: React.FC<{
  dayPlan: DayPlanItem[];
  setEditingTask: any;
  setIsModalOpen: (a: boolean) => void;
}> = ({ dayPlan, setEditingTask, setIsModalOpen }) => {
  const [isShortView, setIsShortView] = useState(false);

  const handleAddTask = () => {
    console.log('Add task');
    setIsModalOpen(true);
  };

  const handleEditTask = (item: DayPlanItem) => {
    console.log('Edit task', item);
    setEditingTask(item);
    setIsModalOpen(true);
  };

  const handleCompleteTask = (id: string) => {
    // setDayPlan(dayPlan.map(item =>
    //   item.id === id ? { ...item, completed: !item.completed } : item
    // ))
  };

  const formatTime = (time: string) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="p-6 bg-gray-950 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Day View
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsShortView(!isShortView)}
            className="p-2.5 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200"
          >
            {isShortView ? <Grid size={20} /> : <List size={20} />}
          </button>
          <button
            onClick={handleAddTask}
            className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {dayPlan.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dayPlan.map((task) => {
            const styles = getTaskStyles(task.type);
            return (
              <div
                key={task.id}
                className={`relative rounded-xl border ${styles.border} ${styles.background} ${styles.hover} 
                  transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}
              >
                <div className="p-4">
                  {isShortView ? (
                    <div className="flex justify-between items-center space-x-4">
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold ${styles.title} mb-1`}
                        >
                          {task.title}
                        </h3>
                        <span className={`text-sm ${styles.text}`}>
                          {formatTime(task.start_time_utc)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className={`p-2 ${styles.icon} rounded-lg hover:opacity-80 transition-opacity`}
                      >
                        <Check size={16} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3
                            className={`text-xl font-semibold ${styles.title} mb-1`}
                          >
                            {task.meta_data.subject}
                            {task.meta_data.chapter &&
                              ` - Chapter ${task.meta_data.chapter}`}
                          </h3>
                          <p className={`${styles.text} text-sm`}>
                            {task.meta_data.topic}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTask(task)}
                            className={`p-2 ${styles.icon} rounded-lg hover:opacity-80 transition-opacity`}
                          >
                            <Edit size={16} className="text-white" />
                          </button>
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            className={`p-2 ${styles.icon} rounded-lg hover:opacity-80 transition-opacity`}
                          >
                            <Check size={16} className="text-white" />
                          </button>
                        </div>
                      </div>
                      <p className={`${styles.title} text-lg mb-2`}>
                        {task.title}
                      </p>
                      <div className={`${styles.text} text-sm`}>
                        {formatTime(task.start_time_utc)} -{' '}
                        {formatTime(task.end_time_utc)}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-12 bg-gray-900/50 rounded-lg">
          No plans for today. Time to create some!
        </div>
      )}
    </div>
  );
};

export default DayView;
