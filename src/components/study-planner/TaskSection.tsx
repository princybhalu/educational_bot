import DropletAnimation from '../avatar';
import NoDataFound from '../shared/NoDataFound';
import React, { useEffect, useState } from 'react';
import { FaBook, FaClipboardList } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {
  CreateSchedulerApiCall,
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
    <div
      className="flex justify-between flex-col md:flex-row gap-2 bg-white p-4 rounded-lg shadow-md mb-4"
      onClick={() => navigate('/study-planner/calendar/' + data.id)}
    >
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
            onClick={(e) => {
              e.stopPropagation();
              changeStatus(false);
            }}
          >
            Deactive
          </button>
        ) : (
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              changeStatus(true);
            }}
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
      if (tempActiveId) setActiveScheduledId(tempActiveId.id);
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

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    isActive: true, // Default value for the active status
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle toggle change for active status
  const handleToggleChange = () => {
    setFormData({
      ...formData,
      isActive: !formData.isActive, // Toggle the value
    });
  };

  // Handle form submission (add scheduled)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form logic here (e.g., make API call)
    try {
      const res = await CreateSchedulerApiCall({
        schedule_title: formData.title,
        is_active: formData.isActive,
      });
      console.log(res.data);
      navigate('/study-planner/calendar/' + res.data.id);
    } catch (err) {
      console.log(err);
    }

    console.log('Form submitted');
    closeModal(); // Close modal after submission
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="flex justify-between items-center mb-4 border-b p-2">
          <h2 className="text-2xl font-bold text-[#003366] ">Scheduled List</h2>
          <span className="text-orange-500 cursor-pointer" onClick={openModal}>
            Add Scheduled
          </span>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-xl font-bold">Add New Schedule</h3>
                <button
                  className="text-sm text-gray-400 hover:text-gray-600 ml-auto"
                  onClick={closeModal}
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Active/Inactive Toggle */}
                <div className="flex items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700 mr-2">
                    Status:
                  </label>
                  <button
                    type="button"
                    onClick={handleToggleChange}
                    className={`${
                      formData.isActive ? 'bg-green-500' : 'bg-red-500'
                    } text-white py-1 px-4 rounded-full focus:outline-none`}
                  >
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </button>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#003366] text-white py-2 rounded-md"
                  >
                    Add Schedule
                  </button>
                </div>
              </form>

              {/* Close Modal Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* TODO : css chnages */}
        {isLoading && (
          <>
            <DropletAnimation />
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
