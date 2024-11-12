import React from 'react';
import { X } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface EditTaskModalProps {
  task: DayPlanItem;
  onClose: () => void;
  onSave: (updatedTask: DayPlanItem) => void;
}

interface DayPlanItem {
  id: string;
  schedule_id: string;
  title: string;
  created_by: string;
  date: string;
  start_time_utc: string;
  end_time_utc: string;
  type: string;
  meta_data: {
    chapter?: string;
    subject?: string;
    topic?: string;
  };
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  type: yup
    .string()
    .oneOf(['test', 'study', 'therapy'], 'Invalid task type')
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
    //@ts-ignore
    is: (type: string) => ['test', 'study'].includes(type),
    then: yup
      .object()
      .shape({
        subject: yup.string().required('Subject is required'),
        topic: yup.string(),
        chapter: yup.string(),
      })
      .test(
        'topic-or-chapter',
        'Either topic or chapter must be filled',
        //@ts-ignore
        function (meta_data) {
          return meta_data.topic || meta_data.chapter;
        }
      ),
    otherwise: yup.object().strip(),
  }),
});

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...task,
      //@ts-ignore
      type: task.type || 'study',
      meta_data: task.meta_data || {},
    },
  });

  const taskType = watch('type');

  const onSubmit = (data: DayPlanItem) => {
    const startDate = new Date(`2000-01-01T${data.start_time_utc}`);
    data.date = startDate.toISOString().split('T')[0];
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg w-full max-w-md mx-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-blue-400">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={
            //@ts-ignore
            handleSubmit(onSubmit)
          }
          className="p-4 space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Task Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="test">Test</option>
                  <option value="study">Study</option>
                  <option value="therapy">Therapy</option>
                </select>
              )}
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_time_utc"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Start Time
              </label>
              <Controller
                name="start_time_utc"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="time"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
              {errors.start_time_utc && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.start_time_utc.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="end_time_utc"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                End Time
              </label>
              <Controller
                name="end_time_utc"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="time"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              />
              {errors.end_time_utc && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.end_time_utc.message}
                </p>
              )}
            </div>
          </div>

          {['test', 'study'].includes(taskType) && (
            <>
              <div>
                <label
                  htmlFor="meta_data.subject"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
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
                      className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                />
                {
                  //@ts-ignore
                  errors.meta_data?.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {
                        //@ts-ignore
                        errors.meta_data.subject.message
                      }
                    </p>
                  )
                }
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="meta_data.topic"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
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
                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="meta_data.chapter"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
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
                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    )}
                  />
                </div>
              </div>
              {errors.meta_data && (
                <p className="mt-1 text-sm text-red-500">
                  Either topic or chapter must be filled
                </p>
              )}
            </>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
