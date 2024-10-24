// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { EventOFCalender } from 'types/study-planner';
// import { AddTaskApiCall, UpdateTaskApiCall } from 'services/api/study-planner';
// import {
//   Notification,
//   NOTIFICATION_TYPE_INFO,
// } from '../../components/notifiction/Notifiction';

// // Validation schema using yup
// const schema = yup.object().shape({
//   title: yup.string().required('Title is required'),
//   description: yup.string(),
//   startTime: yup.date().required('Start time is required'),
//   endTime: yup
//     .date()
//     .required('End time is required')
//     .min(yup.ref('startTime'), "End time can't be before start time"),
//   type: yup.string().required('Event type is required'),
//   chapter: yup.string(),
//   subject: yup.string(),
//   topic: yup.string(),
// });

// const EventModal: React.FC<{
//   scheduleId: string;
//   event: EventOFCalender;
//   onClose: () => void;
//   onDelete: (id: string) => void;
//   setEvents: any;
//   events: EventOFCalender[] | null;
// }> = ({ setEvents, events, scheduleId, event, onClose, onDelete }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     getValues,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       title: event?.title || '',
//       description: event?.meta_data?.description || '',
//       startTime: event ? new Date(event.start_time_utc) : new Date(),
//       endTime: event ? new Date(event.end_time_utc) : new Date(),
//       type: event?.type || '',
//       chapter: event?.meta_data?.chapter || '',
//       subject: event?.meta_data?.subject || '',
//       topic: event?.meta_data?.topic || '',
//     },
//   });

//   const onSubmit = async (data: any) => {
//     console.log(event ? 'Edit event:' : 'Add new event:', data);
//     // Make API call for saving the event
//     // If it's a new event, create it, otherwise update the existing event
//     // TODO: one case is missing if date start from diff date and end diff date then what happed
//     const date = new Date(data.start_time); // Replace with your Date object
//     const formattedDate =
//       (date.getMonth() + 1).toString().padStart(2, '0') +
//       '/' +
//       date.getDate().toString().padStart(2, '0') +
//       '/' +
//       date.getFullYear();
//     try {
//       const reqBody = {
//         schedule_id: scheduleId,
//         title: data.title,
//         date: formattedDate,
//         start_time: data.startTime.toISOString(),
//         end_time: data.endTime.toISOString(),
//         type: data.type,
//         meta_data: {
//           chapter: data.chapter,
//           subject: data.subject,
//           topic: data.topic,
//           description: data.description,
//         },
//       };
//       let res;
//       if (event) {
//         res = await UpdateTaskApiCall(reqBody, scheduleId);
//       } else {
//         res = await AddTaskApiCall(reqBody);
//       }
//       //@ts-ignore
//       if (!res.data?.conflict) {
//         //@ts-ignore
//         setEvents([res.data.tasks, ...events]);
//       } else {
//         // console.log(res.data);
//         Notification({
//           type: NOTIFICATION_TYPE_INFO,
//           message: 'Their is already one task scheduled at this time',
//           timeout: 10000,
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     onClose(); // Close the modal after submission
//     reset(); // Clear form
//   };

//   const handleDelete = () => {
//     if (event?.id) {
//       // Call the delete API with the event ID
//       onDelete(event.id);
//       onClose(); // Close the modal after deletion
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
//       <div className="bg-white p-6 rounded-lg max-w-lg w-full max-h-[600px] overflow-auto">
//         <h2 className="text-2xl mb-4 ">{event ? 'Edit Event' : 'Add Event'}</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Title</label>
//             <input {...register('title')} className="w-full p-2 border" />
//             {errors.title && (
//               <p className="text-red-500">{errors.title.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Description</label>
//             <textarea
//               {...register('description')}
//               className="w-full p-2 border"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Start Time</label>
//             <DatePicker
//               {...register('startTime')}
//               className="w-full p-2 border"
//               selected={getValues("startTime")}
//               // value={getValues("startTime")}
//               onChange={(date: any) => {
//                 console.log("onchange");
//                 setValue('startTime', date);}}
//               showTimeSelect
//               dateFormat="Pp"
//             />
//             {errors.startTime && (
//               <p className="text-red-500">{errors.startTime.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">End Time</label>
//             <DatePicker
//               {...register('endTime')}
//               className="w-full p-2 border"
//               selected={getValues('endTime')}
//               onChange={(date: any) => setValue('endTime', date)}
//               showTimeSelect
//               dateFormat="Pp"
//             />
//             {errors.endTime && (
//               <p className="text-red-500">{errors.endTime.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Type</label>
//             <select {...register('type')} className="w-full p-2 border">
//               <option value="test">Test</option>
//               <option value="study">Study</option>
//             </select>
//             {errors.type && (
//               <p className="text-red-500">{errors.type.message}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Chapter</label>
//             <input {...register('chapter')} className="w-full p-2 border" />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Subject</label>
//             <input {...register('subject')} className="w-full p-2 border" />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Topic</label>
//             <input {...register('topic')} className="w-full p-2 border" />
//           </div>

//           <div className="flex justify-end">
//             {event && (
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//               >
//                 Delete Event
//               </button>
//             )}
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               {event ? 'Save Changes' : 'Add Event'}
//             </button>
//             <button
//               onClick={onClose}
//               type="button"
//               className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EventModal;

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { EventOFCalender } from 'types/study-planner';
import { AddTaskApiCall, UpdateTaskApiCall } from 'services/api/study-planner';
import {
  Notification,
  NOTIFICATION_TYPE_INFO,
} from '../../components/notifiction/Notifiction';
import moment from 'moment-timezone';
/*
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
*/
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string(),
  startTime: yup.date().required('Start time is required'),
  endTime: yup
    .date()
    .required('End time is required')
    .min(yup.ref('startTime'), "End time can't be before start time")
    .test('duration', 'Duration cannot exceed 4 hours', function (endTime) {
      const startTime = this.parent.startTime;
      if (!startTime || !endTime) return true; // Skip validation if either date is missing

      // Calculate duration in milliseconds
      const duration = endTime.getTime() - startTime.getTime();
      const fourHoursInMs = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

      return duration <= fourHoursInMs;
    }),
  type: yup.string().required('Event type is required'),
  chapter: yup.string(),
  subject: yup.string(),
  topic: yup.string(),
});
interface EventModalProps {
  taskId: string;
  scheduleId: string;
  event?: EventOFCalender;
  onClose: () => void;
  onDelete?: (id: string) => void;
  setEvents: (events: EventOFCalender[]) => void;
  events: EventOFCalender[] | null;
}

const cn = (input: string) => {
  // Split the date and time
  const [date, timeWithPeriod] = input.split(', ');
  const [time, period] = timeWithPeriod.split(' ');

  // Reformat the date from MM/DD/YYYY to YYYY-MM-DD
  const [month, day, year] = date.split('/');

  // Convert 12-hour time to 24-hour time
  /* eslint-disable */
  let [hours, minutes, seconds] = time.split(':');
  if (period === 'PM' && hours !== '12') {
    hours = (parseInt(hours, 10) + 12).toString();
  } else if (period === 'AM' && hours === '12') {
    hours = '00';
  }

  // Combine into ISO format
  const result = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}Z`;

  console.log(result);

  return result;
};

const convertEventTimes = (eventsArray: EventOFCalender[]) => {
  return eventsArray.map((event) => {
    const eventDate = new Date(event.date);

    // Combine date and time
    const startDateTimeUtc = moment.tz(new Date(event.start_time_utc), 'Asia/Kolkata').toISOString(true);
    const endDateTimeUtc = moment.tz(new Date(event.end_time_utc), 'Asia/Kolkata').toISOString(true);

    console.log(
      event.title,
      event,
      // endDateTimeUtc,
      // startDateTimeUtc,
      // new Date(startDateTimeUtc).toISOString().slice(0, 19) + 'Z',
      // new Date(endDateTimeUtc).toISOString().slice(0, 19) + 'Z'
    );
    // Convert to local timezone
    // const startLocal = new Date(startDateTimeUtc.toLocaleString());
    // const endLocal = new Date(endDateTimeUtc.toLocaleString());
    // console.log(startLocal , endLocal);
    // console.log(startDateTimeUtc.toISOString(), endDateTimeUtc.toISOString());
    return {
      ...event,
      start: startDateTimeUtc, // Add start in ISO format
      end: endDateTimeUtc, // Add end in ISO format
    };
  });
};

const EventModal: React.FC<EventModalProps> = ({
  scheduleId,
  taskId,
  event,
  onClose,
  onDelete,
  setEvents,
  events,
}) => {
  console.log(event);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: event?.title || '',
      description: event?.meta_data?.description || '',
      //@ts-ignore
      startTime: event ? new Date(event.start) : new Date(),
      //@ts-ignore
      endTime: event ? new Date(event.end) : new Date(),
      //@ts-ignore
      type: event?._def?.extendedProps.type || '',
      //@ts-ignore
      chapter: event?._def.extendedProps.meta_data?.chapter || '',
      //@ts-ignore
      subject: event?._def.extendedProps.meta_data?.subject || '',
      //@ts-ignore
      topic: event?._def.extendedProps?.meta_data?.topic || '',
    },
  });
  const onSubmit = async (data: any) => {
    try {
      const formattedDate = moment.tz(new Date(data.startTime), 'Asia/Kolkata').toISOString(true);

      const reqBody = {
        schedule_id: scheduleId,
        title: data.title,
        date: formattedDate,
        // ========================== TODO ==========================
        // startTime and endTime is not matching with the input i give in date picker
        start_time: moment.tz(new Date(data.startTime), 'Asia/Kolkata').toISOString(true),
        end_time: moment.tz(new Date(data.endTime), 'Asia/Kolkata').toISOString(true),
        type: data.type,
        meta_data: {
          chapter: data.chapter,
          subject: data.subject,
          topic: data.topic,
          description: data.description,
        },
      };

      console.log("222222222222222222222222", reqBody)

      const res = event
        ? await UpdateTaskApiCall(reqBody, scheduleId, taskId)
        : await AddTaskApiCall(reqBody);

      if (event) {
        const tempbody = convertEventTimes([
          {
            ...reqBody,
            start_time_utc: data.startTime,
            end_time_utc: data.endTime,
            //@ts-ignore
            id: event?._def.publicId,
            created_by: '',
          },
        ]);
        if (events)
          setEvents(
            events.map((e) => {
              //@ts-ignore
              if (e.id === event?._def.publicId) return { ...e, ...tempbody };
              return e;
            })
          );
        onClose();
        return;
      }

      console.log({ res });

      if (!res.data?.conflict) {
        const temp = convertEventTimes([res.data.tasks]);
        console.log({ temp });
        setEvents([...temp, ...(events || [])]);
        onClose();
      } else {
        Notification({
          type: NOTIFICATION_TYPE_INFO,
          message: 'There is already one task scheduled at this time',
          timeout: 10000,
        });
      }
    } catch (err) {
      console.error(err);
      Notification({
        type: NOTIFICATION_TYPE_INFO,
        message: 'Somethings  went wrong... Add Later',
        timeout: 10000,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 flex flex-col h-[90vh]">
        {/* Fixed Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {event ? 'Edit Event' : 'Add Event'}
          </h2>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                {...register('title')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Event title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                placeholder="Event description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <Controller
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value}
                      onChange={field.onChange}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      showTimeSelect
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                {...register('type')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="test">Test</option>
                <option value="study">Study</option>
              </select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Chapter
                </label>
                <input
                  {...register('chapter')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Chapter"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  {...register('subject')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <input
                  {...register('topic')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Topic"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-2">
            {event && onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(event.id);
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete Event
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {event ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
