// import React, { useEffect, useRef, useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { useNavigate, useParams } from 'react-router-dom';
// import '../../style/calendar-view.css';
// import EventModal from '../../components/study-planner/EventModel';
// import {
//   AddTaskByQueryApiCall,
//   GetTaskBetweenRangeApiCall,
//   RemoveTaskApiCall,
// } from 'services/api/study-planner';
// import { EventOFCalender } from '../../types/study-planner';
// import {
//   Notification,
//   NOTIFICATION_TYPE_INFO,
// } from '../../components/notifiction/Notifiction';

// const CalendarView: React.FC = () => {
//   // const { scheduleId } = useParams<{ scheduleId: string }>();
//   const scheduleId = '9f2c77ec-c42a-44d4-bc8e-3d92bf9087c6';
//   const calendarRef = useRef<FullCalendar>(null);
//   const date = new Date();
//   const navigate = useNavigate();

//   // Format the date to 'October 19, 2024'
//   const formattedDate = date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   const [currentTitle, setCurrentTitle] = useState(formattedDate); // Title state
//   const [currentViewOfCalendar, setCurrentViewOfCalendar] = useState('Day'); // View state
//   const [events, setEvents] = useState<EventOFCalender[] | null>(null);
//   const [inputValue, setInputValue] = useState(''); // Input value state
//   const [buttonText, setButtonText] = useState('Add'); // Button text state

//   const [showModal, setShowModal] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<null | EventOFCalender>(
//     null
//   );

//   const handleEventClick = (eventData: any) => {
//     setSelectedEvent(eventData);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedEvent(null);
//   };

//   // Function to change view programmatically
//   const changeView = (viewName: string, title: string) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.changeView(viewName);
//       setCurrentViewOfCalendar(title);
//     }
//   };

//   // Navigate to specific date
//   const goToDate = (date: string) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       calendarApi.gotoDate(date); // Navigate to a specific date
//     }
//   };

//   // Update title based on visible range
//   const updateTitle = async (info: any) => {
//     const calendarApi = calendarRef.current?.getApi();
//     if (calendarApi) {
//       const view = calendarApi.view;
//       setCurrentTitle(view.title); // Update the title with the current view range
//     }

//     const startDate = info.start; // Start of the current view
//     const endDate = info.end; // End of the current view
//     await GetEventBetweenRange(startDate, endDate);
//   };

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setInputValue(value);
//     setButtonText(value ? 'Send' : 'Add');
//   };

//   // Function to handle API call
//   const handleButtonClick = async () => {
//     if (buttonText === 'Add') {
//       handleEventClick(null);
//       // Call the API for adding an event
//       console.log('API call to add event:', inputValue);
//     } else {
//       // Call the API for sending chat message
//       console.log('API call to send chat:', inputValue);
//       await GetResOfQuery(inputValue);
//     }
//     setInputValue(''); // Clear input after action
//     setButtonText('Add'); // Reset button to "Add"
//   };

//   const handleEventDrop = (info: any) => {
//     const updatedEvent = {
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start.toISOString(),
//       end: info.event.end ? info.event.end.toISOString() : null,
//     };

//     // Call your API to update the event in the database
//     console.log('Event dropped:', updatedEvent);
//     // Example: API call here
//     // axios.put(`/api/events/${updatedEvent.id}`, updatedEvent)
//     //   .then(response => {
//     //     console.log('Event updated successfully:', response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error('Error updating event:', error);
//     //   });
//   };

//   const handleEventResize = (info: any) => {
//     const resizedEvent = {
//       id: info.event.id,
//       title: info.event.title,
//       start: info.event.start.toISOString(),
//       end: info.event.end ? info.event.end.toISOString() : null,
//     };

//     // Call your API to update the resized event in the database
//     console.log('Event resized:', resizedEvent);
//     // Example: API call here
//     // axios.put(`/api/events/${resizedEvent.id}`, resizedEvent)
//     //   .then(response => {
//     //     console.log('Event resized successfully:', response.data);
//     //   })
//     //   .catch(error => {
//     //     console.error('Error resizing event:', error);
//     //   });
//   };

//   /** Api Calls */
//   const onDeleteOfTask = async () => {
//     try {
//       if (selectedEvent && selectedEvent.id && events) {
//         await RemoveTaskApiCall(selectedEvent.id);
//         setEvents(events.filter((event) => event.id !== selectedEvent.id));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const GetEventBetweenRange = async (startDate: any, endDate: any) => {
//     if (!startDate && !endDate) {
//       const currentDate = new Date();
//       // Get the first day of the current month
//       startDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       // Get the last day of the current month
//       endDate = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() + 1,
//         0
//       );
//     }
//     try {
//       const res = await GetTaskBetweenRangeApiCall(
//         scheduleId,
//         startDate,
//         endDate
//       );
//       setEvents(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const GetResOfQuery = async (query: string) => {
//     try {
//       const res = await AddTaskByQueryApiCall({
//         schedule_id: scheduleId,
//         query,
//       });
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
//   };

//   useEffect(() => {
//     const currentDate = new Date();
//     const startOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     const endOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     );
//     // TODO: check that above data is working or not
//     GetEventBetweenRange(startOfMonth, endOfMonth).then(); // Fetch initial events on load
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-white">
//         <div className="p-4 flex justify-between items-center flex-wrap">
//           <div className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
//             <a
//               className="text-gray-400"
//               onClick={() => navigate('/study-planner')}
//             >
//               Dashboard
//             </a>{' '}
//             /<span className="text-gray-600">Calendar</span>
//           </div>
//         </div>

//         {/* Calendar title with navigation */}
//         <div className="pl-4 flex justify-between items-center flex-wrap">
//           <div className="flex items-center space-x-2">
//             <button
//               className="text-gray-600"
//               onClick={() => calendarRef.current?.getApi().prev()}
//             >
//               &lt;
//             </button>
//             <h2 className="text-xl font-semibold text-gray-800">
//               {currentTitle}
//             </h2>
//             <button
//               className="text-gray-600"
//               onClick={() => calendarRef.current?.getApi().next()}
//             >
//               &gt;
//             </button>
//           </div>
//           <div className="flex mt-2 sm:mt-0 flex-wrap">
//             <button
//               className="text-sm text-white bg-blue-500 mr-3 px-2 py-1 rounded"
//               onClick={() => goToDate(new Date().toISOString())}
//             >
//               Today
//             </button>
//             <div className="rounded-lg border">
//               <button
//                 className={`px-4 py-2 ${currentViewOfCalendar === 'Day' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
//                 onClick={() => changeView('timeGridDay', 'Day')}
//               >
//                 Day
//               </button>
//               <button
//                 className={`px-4 py-2 ${currentViewOfCalendar === 'Week' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
//                 onClick={() => changeView('timeGridWeek', 'Week')}
//               >
//                 Week
//               </button>
//               <button
//                 className={`px-4 py-2 ${currentViewOfCalendar === 'Month' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
//                 onClick={() => changeView('dayGridMonth', 'Month')}
//               >
//                 Month
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FullCalendar */}
//       <div className="p-4 flex-grow">
//         <FullCalendar
//           ref={calendarRef}
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="timeGridDay"
//           headerToolbar={false}
//           editable={true}
//           droppable={true}
//           //@ts-ignore
//           events={events}
//           eventContent={(eventInfo: any) => (
//             <div className="bg-white border-white-300">
//               <div className="p-2 border-l-4 border-orange-500 rounded-lg bg-orange-100 text-black">
//                 <strong>{eventInfo.event.title}</strong>
//                 <div>{eventInfo.event.extendedProps.description}</div>
//                 <div className="text-right text-xs">{eventInfo.timeText}</div>
//               </div>
//             </div>
//           )}
//           datesSet={updateTitle} // Update title on view change
//           height="auto" // Responsive height
//           allDaySlot={false}
//           // Call API when event is dragged
//           eventDrop={(info: any) => handleEventDrop(info)}
//           // Call API when event is resized
//           eventResize={(info: any) => handleEventResize(info)}
//           eventClick={(eventInfo: any) => handleEventClick(eventInfo.event)}
//         />
//       </div>

//       {/* Open modal if the event is clicked or Add Event is clicked */}
//       {showModal && (
//         <EventModal
//           //@ts-ignore
//           event={selectedEvent}
//           onClose={handleCloseModal}
//           onDelete={onDeleteOfTask}
//           scheduleId={scheduleId}
//           setEvents={setEvents}
//           events={events}
//         />
//       )}

//       {/* Input box at the bottom */}
//       <div className="p-4 bg-gray-200 sticky bottom-0 w-full z-10">
//         <div className="flex items-center space-x-4">
//           <input
//             type="text"
//             className="border border-gray-400 rounded-lg p-2 flex-grow"
//             placeholder="Enter event details..."
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={handleButtonClick}
//           >
//             {buttonText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;

import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdChevronLeft,
  MdChevronRight,
  MdAdd,
  MdSend,
  MdToday,
  MdEvent,
  MdAccessTime,
  MdDateRange,
  MdHome,
  MdArrowForward,
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import '../../style/calendar-view.css';
import EventModal from '../../components/study-planner/EventModel';
import {
  AddTaskByQueryApiCall,
  GetTaskBetweenRangeApiCall,
  RemoveTaskApiCall,
  UpdateTaskApiCall,
} from 'services/api/study-planner';
import { EventOFCalender } from '../../types/study-planner';
import {
  Notification,
  NOTIFICATION_TYPE_INFO,
} from '../../components/notifiction/Notifiction';

const convertEventTimes = (eventsArray: EventOFCalender[]) => {
  return eventsArray.map((event) => {
    const eventDate = new Date(event.date);

    // Combine date and time
    const startDateTimeUtc = new Date(
      `${event.date.split('T')[0]}T${event.start_time_utc}Z`
    );
    const endDateTimeUtc = new Date(
      `${event.date.split('T')[0]}T${event.end_time_utc}Z`
    );

    console.log(endDateTimeUtc, startDateTimeUtc);
    // Convert to local timezone
    // const startLocal = new Date(startDateTimeUtc.toLocaleString());
    // const endLocal = new Date(endDateTimeUtc.toLocaleString());
    // console.log(startLocal , endLocal);
    console.log(startDateTimeUtc.toISOString(), endDateTimeUtc.toISOString());
    return {
      ...event,
      start: startDateTimeUtc, // Add start in ISO format
      end: endDateTimeUtc, // Add end in ISO format
    };
  });
};

const CalendarView: React.FC = () => {
  const scheduleId = '9f2c77ec-c42a-44d4-bc8e-3d92bf9087c6';
  const calendarRef = useRef<FullCalendar>(null);
  const date = new Date();
  const navigate = useNavigate();

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const [currentTitle, setCurrentTitle] = useState(formattedDate);
  const [currentViewOfCalendar, setCurrentViewOfCalendar] = useState('Day');
  const [events, setEvents] = useState<EventOFCalender[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [buttonText, setButtonText] = useState('Add');
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | EventOFCalender>(
    null
  );

  const handleEventClick = (eventData: any) => {
    setSelectedEvent(eventData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const changeView = (viewName: string, title: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewName);
      setCurrentViewOfCalendar(title);
    }
  };

  const goToDate = (date: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(date);
    }
  };

  const updateTitle = async (info: any) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const view = calendarApi.view;
      setCurrentTitle(view.title);
    }

    const startDate = info.start;
    const endDate = info.end;
    await GetEventBetweenRange(startDate, endDate);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setButtonText(value ? 'Send' : 'Add');
  };

  const handleButtonClick = async () => {
    if (buttonText === 'Add') {
      handleEventClick(null);
      setShowModal(true);
      setSelectedEvent(null);
    } else {
      await GetResOfQuery(inputValue);
    }
    setInputValue('');
    setButtonText('Add');
  };

  const handleEventDrop = (info: any) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    };
    console.log('Event dropped:', updatedEvent);

    //api call
    UpdateTask({
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    });
  };

  const handleEventResize = (info: any) => {
    const resizedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    };
    console.log('Event resized:', resizedEvent);
    //api call
    UpdateTask({
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    });
  };

  const onDeleteOfTask = async () => {
    try {
      if (selectedEvent && selectedEvent.id && events) {
        await RemoveTaskApiCall(selectedEvent.id);
        setEvents(events.filter((event) => event.id !== selectedEvent.id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetEventBetweenRange = async (startDate: any, endDate: any) => {
    if (!startDate && !endDate) {
      const currentDate = new Date();
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
    }
    try {
      const res = await GetTaskBetweenRangeApiCall(
        scheduleId,
        startDate,
        endDate
      );
      setEvents(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const GetResOfQuery = async (query: string) => {
    try {
      const res = await AddTaskByQueryApiCall({
        schedule_id: scheduleId,
        query,
      });
      if (!res.data?.conflict) {
        //@ts-ignore
        setEvents((prev) => [...prev, res.data.tasks]);
        // setEvents((prevEvents) => [...(res.data.tasks || {}), ...prevEvents]);
      } else {
        Notification({
          type: NOTIFICATION_TYPE_INFO,
          message: 'There is already one task scheduled at this time',
          timeout: 10000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateTask = async (body: any) => {
    try {
      const reqBody = { ...body };
      const res = await UpdateTaskApiCall(reqBody, scheduleId);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    GetEventBetweenRange(startOfMonth, endOfMonth);
  }, []);

  console.log({ events });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="w-full">
          {/* Breadcrumb */}
          <div className="px-6 py-4 flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/study-planner')}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <MdHome className="w-4 h-4" />
              <span>Study Planner</span>
            </button>
            <MdArrowForward className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 flex items-center space-x-1">
              <MdEvent className="w-4 h-4" />
              <span>Calendar</span>
            </span>
          </div>

          {/* Calendar Controls */}
          <div className="px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Title and Navigation */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => calendarRef.current?.getApi().prev()}
                >
                  <MdChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {currentTitle}
                </h2>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => calendarRef.current?.getApi().next()}
                >
                  <MdChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <button
                className="px-2 md:px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-2"
                onClick={() => goToDate(new Date().toISOString())}
              >
                <MdToday className="w-5 h-5" />
                <span>Today</span>
              </button>

              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  className={`px-2 md:px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                    currentViewOfCalendar === 'Day'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => changeView('timeGridDay', 'Day')}
                >
                  <MdAccessTime className="w-4 h-4" />
                  <span>Day</span>
                </button>
                <button
                  className={`px-2 md:px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                    currentViewOfCalendar === 'Week'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => changeView('timeGridWeek', 'Week')}
                >
                  <MdEvent className="w-4 h-4" />
                  <span>Week</span>
                </button>
                <button
                  className={`px-2 md:px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center space-x-2 ${
                    currentViewOfCalendar === 'Month'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => changeView('dayGridMonth', 'Month')}
                >
                  <MdDateRange className="w-4 h-4" />
                  <span>Month</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-grow p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={false}
            editable={true}
            droppable={true}
            //@ts-ignore
            events={events}
            eventContent={(eventInfo: any) => (
              <>
                {(currentViewOfCalendar === 'Day' ||
                  currentViewOfCalendar === 'Week') && (
                  <>
                    <div className="ml-4">
                      <div className="font-medium flex items-center justify-between text-black">
                        <span>{eventInfo.event.title}</span>
                        <div className="flex space-x-1">
                          <button className="p-1 rounded">
                            <MdEdit className="w-4 h-4 text-black" />
                          </button>
                          <button
                            className="p-1 rounded"
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await RemoveTaskApiCall(eventInfo.event.id);
                                setEvents(
                                  //@ts-ignore
                                  events.filter(
                                    (event) => event.id !== eventInfo.event.id
                                  )
                                );
                              } catch (err) {
                                console.log(err);
                              }
                            }}
                          >
                            <MdDelete className="w-4 h-4 text-black" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-black">
                        {eventInfo.event.extendedProps.description ??
                          'hbdvjhbj'}
                      </div>
                    </div>

                    <div className="text-right text-md mt-1 mr-4 flex items-center justify-end text-black">
                      <MdAccessTime className="w-4 h-4 mr-1" />
                      {eventInfo.timeText}
                    </div>
                  </>
                )}

                {currentViewOfCalendar === 'Month' && (
                  <>
                    <div className="font-medium flex items-center justify-between text-black">
                      {/* <span>{eventInfo.event.title}</span> */}
                      {eventInfo.event.title &&
                        eventInfo.event.title.length > 10 &&
                        `${eventInfo.event.title.substring(0, 10)}...`}
                    </div>
                  </>
                )}
              </>
            )}
            datesSet={updateTitle}
            height="auto"
            allDaySlot={false}
            eventDrop={(info: any) => handleEventDrop(info)}
            eventResize={(info: any) => handleEventResize(info)}
            eventClick={(eventInfo: any) => handleEventClick(eventInfo.event)}
            dayCellClassNames="hover:bg-blue-50"
            slotLabelClassNames="text-gray-500 font-medium"
            dayHeaderClassNames="text-gray-700 font-semibold"
            nowIndicatorClassNames="bg-blue-500"
            slotEventOverlap={false}
            slotMinTime="06:00:00"
            slotMaxTime="22:00:00"
          />
        </div>
      </div>

      {showModal && (
        <EventModal
          //@ts-ignore
          event={selectedEvent}
          onClose={handleCloseModal}
          onDelete={onDeleteOfTask}
          scheduleId={scheduleId}
          setEvents={setEvents}
          events={events}
        />
      )}

      {/* Quick Add Input */}
      <div className="sticky bottom-0 w-full z-10 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-grow relative">
              <input
                type="text"
                className="w-full px-4 py-3 pr-10  bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Quick add event or type a command..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MdEvent className="w-5 h-5" />
              </div>
            </div>
            <button
              className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors ${
                buttonText === 'Add'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              onClick={handleButtonClick}
            >
              {buttonText === 'Add' ? (
                <>
                  <MdAdd className="w-5 h-5" />
                  <span>{buttonText}</span>
                </>
              ) : (
                <>
                  <MdSend className="w-5 h-5" />
                  <span>{buttonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
