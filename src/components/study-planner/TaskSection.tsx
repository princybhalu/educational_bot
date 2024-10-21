import React, { useEffect, useState } from 'react';
import { FaBook, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  GetSchedulerListForUserApiCall,
  UpdateStatusOfSchedulerApiCall,
} from 'services/api/study-planner';

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
  const navigate = useNavigate();

  const changeStatus = async (isActive: boolean) => {
    try {
      const res = await UpdateStatusOfSchedulerApiCall(
        {
          is_active: isActive,
        },
        data.id
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between flex-col md:flex-row gap-2 bg-white p-4 rounded-lg shadow-md mb-4">
      <div
        className="flex items-center space-x-4"
        onClick={() => navigate('/study-planner/calendar/' + data.id)}
      >
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
          <p className="text-gray-500">
            Created At: {new Date(data.created_at).toLocaleDateString()}
          </p>
          {/* <p className="text-gray-400 text-sm">    
          </p> */}
        </div>
      </div>

      {/* Button Section */}
      <div>
        {data.is_active ? (
          <button
            className="bg-orange-400 text-white px-4 py-2 rounded-full text-sm md:text-base"
            onClick={() => changeStatus(false)}
          >
            Deactive
          </button>
        ) : (
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
            onClick={() => changeStatus(true)}
          >
            Active
          </button>
        )}
      </div>
    </div>
  );
};

// Main Component
const TaskSection: React.FC<{ setActiveScheduledId: any }> = ({
  setActiveScheduledId,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskData[] | null>(null);

  const navigate = useNavigate();

  const GetTaskList = async () => {
    try {
      const res = await GetSchedulerListForUserApiCall();
      const tempActiveId = res.data.find(
        ({ is_active }: TaskData) => is_active === true
      );
      setActiveScheduledId(tempActiveId.id);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetTaskList().then();
  }, []);

  return (
    <>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4 border-b p-2">
          <h2 className="text-2xl font-bold text-blue-800">Scheduled List</h2>
          <span
            className="text-orange-500 cursor-pointer"
            onClick={() => navigate('/study-planner/calendar/new')}
          >
            Add Scheduled
          </span>
        </div>

        {/* TODO : css chnages */}
        {isLoading && (
          <>
            {' '}
            <div> Loading </div>{' '}
          </>
        )}

        {/* TODO : css chnages */}
        {!isLoading && tasks === null && (
          <>
            {' '}
            <div> Some things goes wrong </div>{' '}
          </>
        )}

        {!isLoading && tasks && tasks.length > 0 && (
          <>
            {tasks.map((task) => (
              <TaskCard key={task.id} data={task} />
            ))}
          </>
        )}

        {/* TODO : css chnages */}
        {!isLoading && tasks && tasks.length === 0 && <>No Data</>}
      </div>
    </>
  );
};

export default TaskSection;
