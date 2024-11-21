import React, { useState, useEffect, useRef } from 'react';
import { X, Plus } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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

interface TaskModalProps {
  theme: {
    bg: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    hover: string;
    button: string;
    buttonHover: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ theme, isOpen, onClose }) => {
  const [message, setMessage] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
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

  const onSubmit = (data: any) => {
    console.log(data);
    onClose();
    reset();
  };

  const handleMessageSubmit = () => {
    console.log(message);
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-md ${theme.surface} rounded-xl ${theme.border} shadow-lg`}
        style={{ boxShadow: '0 10px 30px rgba(67,97,238,0.2)' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className={`text-xl font-bold ${theme.text}`}>Add Task</h2>
          <button
            onClick={onClose}
            className={`${theme.text} ${theme.buttonHover} p-2 rounded-lg`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <div>
            <label className={`block mb-2 ${theme.textSecondary}`}>Date</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
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
            <label className={`block mb-2 ${theme.textSecondary}`}>Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                  placeholder="Enter task title"
                />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message as string}
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
                  className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                >
                  <option value="test">Test</option>
                  <option value="study">Study</option>
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

          <div className="grid grid-cols-2 gap-4">
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
                    className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
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
                    className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
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
              <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>
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
                        className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                        placeholder="Enter subject"
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
                    Topic
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
                        className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                        placeholder="Enter topic (optional)"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className={`block mb-2 ${theme.textSecondary}`}>
                    Chapter
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
                        className={`w-full p-2 rounded-lg ${theme.button} ${theme.text} ${theme.border} focus:outline-none focus:ring-2 focus:ring-[#4361ee]`}
                        placeholder="Enter chapter (optional)"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg ${theme.button} ${theme.text} ${theme.buttonHover} transition-all duration-300`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white px-4 py-2 rounded-lg hover:shadow-[0_0_30px_rgba(67,97,238,0.4)] transition-all duration-300"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
