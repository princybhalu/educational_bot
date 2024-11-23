import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../store'; // Adjust import as needed
import {
  AddTaskApiCall,
  UpdateTaskApiCall,
} from '../../services/api/study-planner';
import { useNavigate } from 'react-router-dom';
import { formatTime, getFromLocalStorage } from '../../utils/helperFunc';

// Validation schema (same as previous implementation)
const schema = yup.object().shape({
  date: yup.string().required('Date is required'),
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  type: yup
    .string()
    .oneOf(['test', 'study', 'exam_preparation'], 'Invalid task type')
    .required('Task type is required'),
  start_time_utc: yup.string().required('Start time is required'),
  end_time_utc: yup
    .string()
    .required('End time is required')
    .test(
      'is-after-start',
      'End time must be after start time',
      function (end_time) {
        const start = this.parent.start_time_utc;
        return !start || !end_time || end_time > start;
      }
    ),
  meta_data: yup.object().when('type', {
    is: (val: string) => ['test', 'study'].includes(val),
    then: () =>
      yup.object({
        subject: yup.string().required('Subject is required'),
        topic: yup.string(),
        chapter: yup.string(),
      }),
    otherwise: () => yup.object({}),
  }),
});

const AddTaskPage: React.FC = () => {
  // Theme selection
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [task, setTask] = useState(getFromLocalStorage('get-edit-task'));

  const navigate = useNavigate();

  // Theme configuration based on mode
  const theme = isDarkMode
    ? {
        bg: 'bg-[#0a0d1e]',
        surface: 'bg-[rgba(16,20,46,1)]',
        text: 'text-white',
        textSecondary: 'text-white/70',
        border: 'border-gray-700',
        button: 'bg-gray-800',
        inputBg: 'bg-gray-900',
      }
    : {
        bg: 'bg-white',
        surface: 'bg-gray-50',
        text: 'text-gray-900',
        textSecondary: 'text-gray-600',
        border: 'border-gray-300',
        button: 'bg-gray-100',
        inputBg: 'bg-white',
      };

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: task
      ? {
          date: task.date.split('T')[0],
          title: task.title,
          type: task.type,
          start_time_utc: formatTime(task.start_time_utc),
          end_time_utc: formatTime(task.end_time_utc),
          meta_data: {
            subject: task.meta_data.subject,
            topic: task.meta_data.topic,
            chapter: task.meta_data.chapter,
          },
        }
      : {
          date: '',
          title: '',
          type: 'study',
          start_time_utc: '',
          end_time_utc: '',
          meta_data: {
            subject: '',
            topic: '',
            chapter: '',
          },
        },
  });

  const taskType = watch('type');

  const onSubmit = async (updatedTask: any) => {
    console.log(updatedTask);

    try {
      let response;
      updatedTask.start_time =
        updatedTask.date + ' ' + updatedTask.start_time_utc + ':00.000';
      updatedTask.end_time =
        updatedTask.date + ' ' + updatedTask.end_time_utc + ':00.000';
      console.log({ updatedTask });
      if (task) {
        // Edit existing task
        response = await UpdateTaskApiCall(
          { ...updatedTask, id: task.id },
          null,
          task.id
        );
      } else {
        // Add new task
        response = await AddTaskApiCall(updatedTask);
      }

      if (!response.data.conflict) {
        const savedTask = response.data.task;
        navigate('/study-planner/tasks');
        reset();
      } else {
        console.error('Failed to save task');
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} flex items-center justify-center p-4`}
    >
      <div
        className={`w-full max-w-2xl ${theme.surface} rounded-2xl border ${theme.border} p-8 shadow-lg`}
      >
        <h1 className={`text-3xl font-bold mb-8`}>Create New Task</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block mb-2 ${theme.textSecondary}`}>
                Date
              </label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className={`w-full p-3 rounded-lg ${theme.inputBg} ${theme.text} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message as string}
                </p>
              )}
            </div>

            <div>
              <label className={`block mb-2 ${theme.textSecondary}`}>
                Task Type
              </label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`w-full p-3 rounded-lg ${theme.inputBg} ${theme.text} border ${theme.border} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="study">Study</option>
                    <option value="test">Test</option>
                    <option value="exam_preparation">Exam Preparation</option>
                  </select>
                )}
              />
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Rest of the form remains similar to previous implementation, 
              just replace theme classes with new theme object */}

          <div>
            <label className={`block mb-2 ${theme.textSecondary}`}>Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter task title"
                  className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={`block mb-2 ${theme.textSecondary}`}>
                Start Time
              </label>
              <Controller
                name="start_time_utc"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="time"
                    className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                  />
                )}
              />
              {errors.start_time_utc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.start_time_utc.message as string}
                </p>
              )}
            </div>

            <div>
              <label className={`block mb-2 ${theme.textSecondary}`}>
                End Time
              </label>
              <Controller
                name="end_time_utc"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="time"
                    className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                  />
                )}
              />
              {errors.end_time_utc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.end_time_utc.message as string}
                </p>
              )}
            </div>
          </div>

          {(taskType === 'test' || taskType === 'study') && (
            <div>
              <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>
                Meta Data
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 ${theme.textSecondary}`}>
                    Subject
                  </label>
                  <Controller
                    //@ts-ignore
                    name="meta_data.subject"
                    control={control}
                    render={({ field }) => (
                      //@ts-ignore
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter subject"
                        className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                      />
                    )}
                  />
                  {
                    //@ts-ignore
                    errors.meta_data?.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          //@ts-ignore
                          errors.meta_data.subject.message as string
                        }
                      </p>
                    )
                  }
                </div>

                <div>
                  <label className={`block mb-2 ${theme.textSecondary}`}>
                    Chapter (Optional)
                  </label>
                  <Controller
                    //@ts-ignore
                    name="meta_data.chapter"
                    control={control}
                    render={({ field }) => (
                      //@ts-ignore
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter chapter"
                        className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                      />
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block mb-2 ${theme.textSecondary}`}>
                      Topic (Optional)
                    </label>
                    <Controller
                      //@ts-ignore
                      name="meta_data.topic"
                      control={control}
                      render={({ field }) => (
                        //@ts-ignore
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter topic"
                          className={`w-full p-3 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className={`px-6 py-3 rounded-lg ${theme.button} ${theme.text} border ${theme.border} hover:bg-gray-200 transition-all duration-300`}
              onClick={() => navigate('/study-planner/task')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
