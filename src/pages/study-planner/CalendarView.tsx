import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useParams } from 'react-router-dom';
import '../../style/calendar-view.css';
import EventModal from '../../components/study-planner/EventModel';
import {
  AddTaskByQueryApiCall,
  GetTaskBetweenRangeApiCall,
  RemoveTaskApiCall,
} from 'services/api/study-planner';
import { EventOFCalender } from '../../types/study-planner';
import {
  Notification,
  NOTIFICATION_TYPE_INFO,
} from '../../components/notifiction/Notifiction';

const CalendarView: React.FC = () => {
  // const { scheduleId } = useParams<{ scheduleId: string }>();
  const scheduleId = '9f2c77ec-c42a-44d4-bc8e-3d92bf9087c6';
  const calendarRef = useRef<FullCalendar>(null);
  const date = new Date();

  // Format the date to 'October 19, 2024'
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const [currentTitle, setCurrentTitle] = useState(formattedDate); // Title state
  const [currentViewOfCalendar, setCurrentViewOfCalendar] = useState('Day'); // View state
  const [events, setEvents] = useState<EventOFCalender[] | null>(null);
  const [inputValue, setInputValue] = useState(''); // Input value state
  const [buttonText, setButtonText] = useState('Add'); // Button text state

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

  // Function to change view programmatically
  const changeView = (viewName: string, title: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(viewName);
      setCurrentViewOfCalendar(title);
    }
  };

  // Navigate to specific date
  const goToDate = (date: string) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.gotoDate(date); // Navigate to a specific date
    }
  };

  // Update title based on visible range
  const updateTitle = async (info: any) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const view = calendarApi.view;
      setCurrentTitle(view.title); // Update the title with the current view range
    }

    const startDate = info.start; // Start of the current view
    const endDate = info.end; // End of the current view
    await GetEventBetweenRange(startDate, endDate);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setButtonText(value ? 'Send' : 'Add');
  };

  // Function to handle API call
  const handleButtonClick = async () => {
    if (buttonText === 'Add') {
      handleEventClick(null);
      // Call the API for adding an event
      console.log('API call to add event:', inputValue);
    } else {
      // Call the API for sending chat message
      console.log('API call to send chat:', inputValue);
      await GetResOfQuery(inputValue);
    }
    setInputValue(''); // Clear input after action
    setButtonText('Add'); // Reset button to "Add"
  };

  const handleEventDrop = (info: any) => {
    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    };

    // Call your API to update the event in the database
    console.log('Event dropped:', updatedEvent);
    // Example: API call here
    // axios.put(`/api/events/${updatedEvent.id}`, updatedEvent)
    //   .then(response => {
    //     console.log('Event updated successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error updating event:', error);
    //   });
  };

  const handleEventResize = (info: any) => {
    const resizedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end ? info.event.end.toISOString() : null,
    };

    // Call your API to update the resized event in the database
    console.log('Event resized:', resizedEvent);
    // Example: API call here
    // axios.put(`/api/events/${resizedEvent.id}`, resizedEvent)
    //   .then(response => {
    //     console.log('Event resized successfully:', response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error resizing event:', error);
    //   });
  };

  /** Api Calls */
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
      // Get the first day of the current month
      startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      // Get the last day of the current month
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
      setEvents(res.data);
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
    // TODO: check that above data is working or not
    GetEventBetweenRange(startOfMonth, endOfMonth).then(); // Fetch initial events on load
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="p-4 flex justify-between items-center flex-wrap">
          <div className="flex items-center space-x-2 text-sm text-gray-500 flex-wrap">
            <a href="/" className="text-gray-400">
              Dashboard
            </a>{' '}
            /<span className="text-gray-600">Calendar</span>
          </div>
        </div>

        {/* Calendar title with navigation */}
        <div className="pl-4 flex justify-between items-center flex-wrap">
          <div className="flex items-center space-x-2">
            <button
              className="text-gray-600"
              onClick={() => calendarRef.current?.getApi().prev()}
            >
              &lt;
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {currentTitle}
            </h2>
            <button
              className="text-gray-600"
              onClick={() => calendarRef.current?.getApi().next()}
            >
              &gt;
            </button>
          </div>
          <div className="flex mt-2 sm:mt-0 flex-wrap">
            <button
              className="text-sm text-white bg-blue-500 mr-3 px-2 py-1 rounded"
              onClick={() => goToDate(new Date().toISOString())}
            >
              Today
            </button>
            <div className="rounded-lg border">
              <button
                className={`px-4 py-2 ${currentViewOfCalendar === 'Day' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => changeView('timeGridDay', 'Day')}
              >
                Day
              </button>
              <button
                className={`px-4 py-2 ${currentViewOfCalendar === 'Week' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => changeView('timeGridWeek', 'Week')}
              >
                Week
              </button>
              <button
                className={`px-4 py-2 ${currentViewOfCalendar === 'Month' ? 'bg-white text-[#003366]  rounded-lg' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => changeView('dayGridMonth', 'Month')}
              >
                Month
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FullCalendar */}
      <div className="p-4 flex-grow">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridDay"
          headerToolbar={false}
          editable={true}
          droppable={true}
          //@ts-ignore
          events={events}
          eventContent={(eventInfo) => (
            <div className="bg-white border-white-300">
              <div className="p-2 border-l-4 border-orange-500 rounded-lg bg-orange-100 text-black">
                <strong>{eventInfo.event.title}</strong>
                <div>{eventInfo.event.extendedProps.description}</div>
                <div className="text-right text-xs">{eventInfo.timeText}</div>
              </div>
            </div>
          )}
          datesSet={updateTitle} // Update title on view change
          height="auto" // Responsive height
          allDaySlot={false}
          // Call API when event is dragged
          eventDrop={(info) => handleEventDrop(info)}
          // Call API when event is resized
          eventResize={(info) => handleEventResize(info)}
          eventClick={(eventInfo) => handleEventClick(eventInfo.event)}
        />
      </div>

      {/* Open modal if the event is clicked or Add Event is clicked */}
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

      {/* Input box at the bottom */}
      <div className="p-4 bg-gray-200 sticky bottom-0 w-full z-10">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="border border-gray-400 rounded-lg p-2 flex-grow"
            placeholder="Enter event details..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
