import React from 'react';
import { FaBook, FaClipboardList } from 'react-icons/fa';

interface TaskData {
  id: string;
  title: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
}

interface TaskCardProps {
  data: TaskData;
}

const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  return (
    <div className="flex justify-between flex-col md:flex-row gap-2 bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center space-x-4">
        {/* Icon Section */}
        <div className="p-2 rounded-full bg-green-100">
          {data.is_active ? (
            <FaClipboardList className="text-green-500" size={24} />
          ) : (
            <FaBook className="text-green-500" size={24} />
          )}
        </div>

        {/* Task Info Section */}
        <div>
          <h3 className="text-lg font-bold">{data.title}</h3>
          <p className="text-gray-500">Created by: {data.created_by}</p>
          <p className="text-gray-400 text-sm">
            {new Date(data.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div>
        {data.is_active ? (
          <button className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm md:text-base">
            Add or Create
          </button>
        ) : (
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">
            Mark as Done
          </button>
        )}
      </div>
    </div>
  );
};

// Main Component
const TaskSection: React.FC = () => {
  // Sample data array (using the provided data)
  const tasks: TaskData[] = [
    {
      id: '602e6028-ab52-4fd8-963f-847644cb4d30',
      title: 'Main Task',
      created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
      created_at: '2024-10-20T05:33:08.981Z',
      is_active: true,
    },
    {
      id: '602e6028-ab52-4fd8-963f-847644cb4d32',
      title: 'Secondary Task',
      created_by: '12345c2d-a793-4f98-8f74-bf3ac576fc6f',
      created_at: '2024-10-19T04:20:08.981Z',
      is_active: false,
    },
  ];

  return (
    <div className="w-full p-4">
      <h1 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 border-b p-2">
        My Tasks
      </h1>
      {tasks.map((task) => (
        <TaskCard key={task.id} data={task} />
      ))}
    </div>
  );
};

export default TaskSection;
