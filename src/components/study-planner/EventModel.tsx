import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventOFCalender } from 'types/study-planner';
import { AddTaskApiCall } from 'services/api/study-planner';
import {
  Notification,
  NOTIFICATION_TYPE_INFO,
} from '../../components/notifiction/Notifiction';

// Validation schema using yup
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startTime: yup.date().required('Start time is required'),
  endTime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('startTime'), "End time can't be before start time"),
  type: yup.string().required('Event type is required'),
  chapter: yup.string(),
  subject: yup.string(),
  topic: yup.string(),
});

const EventModal: React.FC<{
  scheduleId: string;
  event: EventOFCalender;
  onClose: () => void;
  onDelete: (id: string) => void;
  setEvents: any;
  events: EventOFCalender[] | null;
}> = ({ setEvents, events, scheduleId, event, onClose, onDelete }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: event?.title || '',
      description: event?.meta_data?.description || '',
      startTime: event ? new Date(event.start_time_utc) : new Date(),
      endTime: event ? new Date(event.end_time_utc) : new Date(),
      type: event?.type || '',
      chapter: event?.meta_data?.chapter || '',
      subject: event?.meta_data?.subject || '',
      topic: event?.meta_data?.topic || '',
    },
  });

  const onSubmit = async (data: any) => {
    console.log(event ? 'Edit event:' : 'Add new event:', data);
    // Make API call for saving the event
    // If it's a new event, create it, otherwise update the existing event
    // TODO: one case is missing if date start from diff date and end diff date then what happed
    const date = new Date(data.start_time); // Replace with your Date object
    const formattedDate =
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      date.getDate().toString().padStart(2, '0') +
      '/' +
      date.getFullYear();
    try {
      const reqBody = {
        schedule_id: scheduleId,
        title: data.title,
        date: formattedDate,
        start_time: data.startTime.toISOString(),
        end_time: data.endTime.toISOString(),
        type: data.type,
        meta_data: {
          chapter: data.chapter,
          subject: data.subject,
          topic: data.topic,
          description: data.description,
        },
      };
      const res = await AddTaskApiCall(reqBody);
      //@ts-ignore
      if (!res.data?.conflict) {
        //@ts-ignore
        setEvents([res.data.tasks, ...events]);
      } else {
        // console.log(res.data);
        Notification({
          type: NOTIFICATION_TYPE_INFO,
          message: 'Their is already one task scheduled at this time',
          timeout: 10000,
        });
      }
    } catch (err) {
      console.log(err);
    }

    onClose(); // Close the modal after submission
    reset(); // Clear form
  };

  const handleDelete = () => {
    if (event?.id) {
      // Call the delete API with the event ID
      onDelete(event.id);
      onClose(); // Close the modal after deletion
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-2xl mb-4">{event ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input {...register('title')} className="w-full p-2 border" />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register('description')}
              className="w-full p-2 border"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Start Time</label>
            <DatePicker
              {...register('startTime')}
              className="w-full p-2 border"
              selected={new Date()}
              onChange={(date: any) => setValue('startTime', date)}
              showTimeSelect
              dateFormat="Pp"
            />
            {errors.startTime && (
              <p className="text-red-500">{errors.startTime.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">End Time</label>
            <DatePicker
              {...register('endTime')}
              className="w-full p-2 border"
              selected={new Date()}
              onChange={(date: any) => setValue('endTime', date)}
              showTimeSelect
              dateFormat="Pp"
            />
            {errors.endTime && (
              <p className="text-red-500">{errors.endTime.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select {...register('type')} className="w-full p-2 border">
              <option value="test">Test</option>
              <option value="study">Study</option>
            </select>
            {errors.type && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Chapter</label>
            <input {...register('chapter')} className="w-full p-2 border" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input {...register('subject')} className="w-full p-2 border" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Topic</label>
            <input {...register('topic')} className="w-full p-2 border" />
          </div>

          <div className="flex justify-end">
            {event && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Delete Event
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {event ? 'Save Changes' : 'Add Event'}
            </button>
            <button
              onClick={onClose}
              type="button"
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
