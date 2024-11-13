import { Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WeeklyTask {
  id: string;
  title: string;
  type: 'study' | 'test' | 'therapy';
  date: string;
  start_time_utc: string;
  end_time_utc: string;
  meta_data: {
    subject?: string;
    chapter?: string;
    topic?: string;
  };
}

interface DayData {
  date: Date;
  tasks: WeeklyTask[];
}

export default function Component() {
  const [weekData, setWeekData] = useState<DayData[]>([]);

  useEffect(() => {
    fetchWeeklyData();
  }, []);

  const getWeekDates = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);

    const week: DayData[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push({ date, tasks: [] });
    }
    return week;
  };

  const fetchWeeklyData = async () => {
    try {
      // Dummy data for demonstration
      const dummyTasks: WeeklyTask[] = [
        {
          id: '1',
          title: 'Mathematics Advanced Topics',
          type: 'study',
          date: '2024-01-15',
          start_time_utc: '09:00:00',
          end_time_utc: '11:00:00',
          meta_data: {
            subject: 'Mathematics',
            chapter: 'Calculus',
            topic: 'Derivatives',
          },
        },
        {
          id: '2',
          title: 'Physics Test Prep',
          type: 'test',
          date: '2024-01-16',
          start_time_utc: '14:00:00',
          end_time_utc: '15:30:00',
          meta_data: {
            subject: 'Physics',
            chapter: 'Mechanics',
          },
        },
        {
          id: '3',
          title: 'Counseling Session',
          type: 'therapy',
          date: '2024-01-17',
          start_time_utc: '13:00:00',
          end_time_utc: '14:00:00',
          meta_data: {},
        },
      ];

      const week = getWeekDates();
      dummyTasks.forEach((task) => {
        const dayIndex = new Date(task.date).getDay();
        if (dayIndex >= 0) {
          week[dayIndex].tasks.push(task);
        }
      });

      setWeekData(week);
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'study':
        return 'bg-blue-500/10 border-blue-500/20 text-blue-500';
      case 'test':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500';
      case 'therapy':
        return 'bg-green-500/10 border-green-500/20 text-green-500';
      default:
        return 'bg-gray-500/10 border-gray-500/20 text-gray-500';
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="w-full p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          Weekly Schedule
        </h2>
        <p className="text-gray-400 mb-8">
          Plan your study sessions for the entire week
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-6">
          {weekData.map((day, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-100 mb-3">
                {getDayName(day.date)}
              </h3>
              <div className="space-y-3 min-h-[200px]">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border ${getTaskColor(task.type)} transition-all duration-200 hover:scale-[1.02]`}
                  >
                    <div className="text-sm font-medium">
                      {task.type === 'therapy' ? (
                        task.title
                      ) : (
                        <>
                          {task.meta_data.chapter ||
                            task.meta_data.topic ||
                            task.title}
                        </>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatTime(task.start_time_utc)}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors">
                <Plus size={16} className="mr-2" />
                Add Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
