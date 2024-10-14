import { useState } from 'react';
import CalendarTable from '../../components/calender/CalendarTable';
import {CalnederDisplayMode} from "../../utils/enums";

const StudyPlannerDashboard = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Task 1',
      start_timestamp_utc: '2023-10-12T06:30:00Z',
      end_timestamp_utc: '2023-10-12T08:30:00Z',
    },
    {
      id: '2',
      title: 'Task 3',
      start_timestamp_utc: '2023-10-11T08:00:00Z',
      end_timestamp_utc: '2023-10-11T09:15:00Z',
    },
  ]);
  const handleEventUpdate = (updatedEvent: any) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };
  return (
    <>
      <div>StudyPlannerDashboard</div>{' '}
      <div>
        <CalendarTable
          dateRange={[
            new Date(2023, 9, 11),
            new Date(2023, 9, 12),
            new Date(2023, 9, 13),
            new Date(2023, 9, 14),
            new Date(2023, 9, 15),
            new Date(2023, 9, 16) 
          ]}
          displayMode={CalnederDisplayMode.DAY}
          timeInterval={60}
          startTime="00:00"
          endTime="23:00"
          events={events}
          onEventUpdate={handleEventUpdate}
        />
      </div>
    </>
  );
};

export default StudyPlannerDashboard;
