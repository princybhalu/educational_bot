/** This is by td related events divs  */
// Col drag issue
// import React, { useState } from 'react';
// import { format, parseISO, isWithinInterval, addMinutes } from 'date-fns';
// import Draggable from 'react-draggable';

// interface Event {
//   id: string;
//   title: string;
//   start_timestamp_utc: string;
//   end_timestamp_utc: string;
// }

// interface CalendarTableProps {
//   dateRange: Date[];
//   timeInterval: number; // in minutes
//   startTime: string; // format "HH:MM"
//   endTime: string; // format "HH:MM"
//   events: Event[];
//   onEventUpdate: (updatedEvent: Event) => void;
// }

// const CalendarTable: React.FC<CalendarTableProps> = ({ dateRange, timeInterval, startTime, endTime, events, onEventUpdate }) => {
//   const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);

//   const generateTimeSlots = () => {
//     const times = [];
//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);

//     let currentHour = startHour;
//     let currentMin = startMin;

//     while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
//       const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
//       times.push(timeStr);
//       currentMin += timeInterval;
//       if (currentMin >= 60) {
//         currentHour += 1;
//         currentMin = 0;
//       }
//     }
//     return times;
//   };

//   const renderEvent = (event: Event, date: Date, timeSlot: string) => {
//     const startTime = parseISO(event.start_timestamp_utc);
//     const endTime = parseISO(event.end_timestamp_utc);
//     const cellStart = new Date(date.setHours(parseInt(timeSlot.split(':')[0]), parseInt(timeSlot.split(':')[1])));
//     const cellEnd = new Date(cellStart.getTime() + timeInterval * 60000 - 1000); // Subtract 1 second

//     if (isWithinInterval(startTime, { start: cellStart, end: cellEnd })) {
//       // console.log({startTime , endTime , cellStart , cellEnd});

//       const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
//       const height = `${(durationInMinutes / timeInterval) * 100}%`;
//       const top = `${((startTime.getMinutes() % timeInterval) / timeInterval) * 100}%`;

//       return (
//         <Draggable
//           bounds=".calendar-table"
//           onStart={() => setDraggedEvent(event)}
//           onStop={(e : any, data : any) => handleDragStop(e, data, event, date, timeSlot)}
//         >
//           <div
//             className="event"
//             style={{
//               position: 'absolute',
//               top,
//               height,
//               width: '100%',
//               backgroundColor: 'lightblue',
//               border: '1px solid blue',
//               borderRadius: '4px',
//               padding: '2px',
//               overflow: 'hidden',
//               fontSize: '12px',
//               cursor: 'move',
//             }}
//           >
//             <strong>{event.title}</strong>
//             <br />
//             {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
//           </div>
//         </Draggable>
//       );
//     }
//     return null;
//   };

//   const handleDragStop = (e: any, data: any, event: Event, date: Date, timeSlot: string) => {
//     console.log({data , event , date , timeSlot});

//     const cellHeight = 50; // Assuming each cell is 50px high
//     const newStartMinutes = Math.round((data.y / cellHeight) * timeInterval);
//     const newStartTime = addMinutes(parseISO(event.start_timestamp_utc), newStartMinutes);
//     const duration = parseISO(event.end_timestamp_utc).getTime() - parseISO(event.start_timestamp_utc).getTime();
//     const newEndTime = new Date(newStartTime.getTime() + duration);

//     const updatedEvent = {
//       ...event,
//       start_timestamp_utc: newStartTime.toISOString(),
//       end_timestamp_utc: newEndTime.toISOString(),
//     };
//     console.log({updatedEvent});

//     onEventUpdate(updatedEvent);
//     setDraggedEvent(null);
//   };

//   return (
//     <div className="calendar-table" style={{ overflowX: 'auto' }}>
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '10px', border: '1px solid #ccc' }}>Time</th>
//             {dateRange.map((date, idx) => (
//               <th key={idx} style={{ padding: '10px', border: '1px solid #ccc' }}>
//                 {format(date, 'EEE, MMM d')}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {generateTimeSlots().map((time, idx) => (
//             <tr key={idx}>
//               <td style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>{time}</td>
//               {dateRange.map((date, colIdx) => (
//                 <td className={'col'} key={colIdx} style={{ padding: '', border: '1px solid #ccc', position: 'relative', height: '50px' }}>
//                   {events.map((event, eventIdx) => (
//                     <React.Fragment key={eventIdx}>
//                       {renderEvent(event, new Date(date), time)}
//                     </React.Fragment>
//                   ))}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CalendarTable;

// Normal Date with events
// import React from 'react';
// import { format, parseISO, isWithinInterval } from 'date-fns';

// interface Event {
//   title: string;
//   start_timestamp_utc: string;
//   end_timestamp_utc: string;
// }

// interface CalendarTableProps {
//   dateRange: Date[];
//   timeInterval: number; // in minutes
//   startTime: string; // format "HH:MM"
//   endTime: string; // format "HH:MM"
//   events: Event[];
// }

// const CalendarTable: React.FC<CalendarTableProps> = ({ dateRange, timeInterval, startTime, endTime, events }) => {
//   const generateTimeSlots = () => {
//     const times = [];
//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);

//     let currentHour = startHour;
//     let currentMin = startMin;

//     while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
//       const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
//       times.push(timeStr);
//       currentMin += timeInterval;
//       if (currentMin >= 60) {
//         currentHour += 1;
//         currentMin = 0;
//       }
//     }
//     return times;
//   };

//   const displayTask = false;
//   const renderEvent = (event: Event, date: Date, timeSlot: string) => {
//     const startTime = parseISO(event.start_timestamp_utc);
//     const endTime = parseISO(event.end_timestamp_utc);
//     const cellStart = new Date(date.setHours(parseInt(timeSlot.split(':')[0]), parseInt(timeSlot.split(':')[1])));
//     const cellEnd = new Date(cellStart.getTime() + timeInterval * 60000);
//     cellStart.setSeconds(59);

//     if (!displayTask && isWithinInterval(startTime, { start: cellStart, end: cellEnd })) {
//       const durationInMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
//       const height = `${(durationInMinutes / timeInterval) * 100}%`;
//       const top = `${((startTime.getMinutes() % timeInterval) / timeInterval) * 100}%`;
//       // displayTask = true;
//       return (
//         <div
//           className="event"
//           style={{
//             position: 'absolute',
//             top,
//             height,
//             width: '90%',
//             backgroundColor: 'lightblue',
//             border: '1px solid blue',
//             borderRadius: '4px',
//             padding: '2px',
//             overflow: 'hidden',
//             fontSize: '12px'
//           }}
//         >
//           <strong>{event.title}</strong>
//           <br />
//           {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="calendar-table" style={{ overflowX: 'auto' }}>
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <thead>
//           <tr>
//             <th style={{ padding: '10px', border: '1px solid #ccc' }}>Time</th>
//             {dateRange.map((date, idx) => (
//               <th key={idx} style={{ padding: '10px', border: '1px solid #ccc' }}>
//                 {format(date, 'EEE, MMM d')}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {generateTimeSlots().map((time, idx) => (
//             <tr key={idx}>
//               <td style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>{time}</td>
//               {dateRange.map((date, colIdx) => (
//                 <td key={colIdx} style={{ padding: '', border: '1px solid #ccc', position: 'relative', height: '50px' }}>
//                   {events.map((event, eventIdx) => (
//                     <React.Fragment key={eventIdx}>
//                       {renderEvent(event, new Date(date), time)}
//                     </React.Fragment>
//                   ))}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CalendarTable;

// expand time of div
// import React, { useState, useRef, useEffect } from 'react';
// import { format, parseISO, isWithinInterval, addMinutes } from 'date-fns';

// interface Event {
//   id: string;
//   title: string;
//   start_timestamp_utc: string;
//   end_timestamp_utc: string;
// }

// interface CalendarTableProps {
//   dateRange: Date[];
//   timeInterval: number; // in minutes
//   startTime: string; // format "HH:MM"
//   endTime: string; // format "HH:MM"
//   events: Event[];
// }

// const CalendarTable: React.FC<CalendarTableProps> = ({
//   dateRange,
//   timeInterval,
//   startTime,
//   endTime,
//   events,
// }) => {
//   const [expandedEvents, setExpandedEvents] = useState<Record<string, Event>>(
//     {}
//   );
//   const [isDragging, setIsDragging] = useState(false);
//   const draggedEventRef = useRef<string | null>(null);
//   const initialClientYRef = useRef<number | null>(null);
//   const cellHeightRef = useRef<number>(0);

//   const generateTimeSlots = () => {
//     const times = [];
//     const [startHour, startMin] = startTime.split(':').map(Number);
//     const [endHour, endMin] = endTime.split(':').map(Number);

//     let currentHour = startHour;
//     let currentMin = startMin;

//     while (
//       currentHour < endHour ||
//       (currentHour === endHour && currentMin < endMin)
//     ) {
//       const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
//       times.push(timeStr);
//       currentMin += timeInterval;
//       if (currentMin >= 60) {
//         currentHour += 1;
//         currentMin = 0;
//       }
//     }
//     return times;
//   };

//   const renderEvent = (event: Event, date: Date, timeSlot: string) => {
//     const startTime = parseISO(event.start_timestamp_utc);
//     const endTime = parseISO(
//       expandedEvents[event.id]?.end_timestamp_utc || event.end_timestamp_utc
//     );
//     const cellStart = new Date(
//       date.setHours(
//         parseInt(timeSlot.split(':')[0]),
//         parseInt(timeSlot.split(':')[1])
//       )
//     );
//     const cellEnd = new Date(cellStart.getTime() + timeInterval * 60000);
//     cellStart.setSeconds(0);

//     if (isWithinInterval(startTime, { start: cellStart, end: cellEnd })) {
//       const durationInMinutes =
//         (endTime.getTime() - startTime.getTime()) / 60000;
//       const height = `${(durationInMinutes / timeInterval) * 100}%`;
//       const top = `${((startTime.getMinutes() % timeInterval) / timeInterval) * 100}%`;

//       return (
//         <div
//           className="absolute left-0 right-0 bg-blue-200 border border-blue-300 rounded p-1 overflow-hidden"
//           style={{ top, height, minHeight: '25px' }}
//         >
//           <div className="font-bold text-sm">{event.title}</div>
//           <div className="text-xs">
//             {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
//           </div>
//           <div
//             // className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
//             style={{ resize: 'vertical' , border: '1px solid black', overflow:'auto' }}
//             // onMouseDown={(e) => handleResizeStart(e, event.id)}
//           ></div>
//         </div>
//       );
//     }
//     return null;
//   };

//   const handleResizeStart = (e: React.MouseEvent, eventId: string) => {
//     e.preventDefault();
//     setIsDragging(true);
//     draggedEventRef.current = eventId;
//     initialClientYRef.current = e.clientY;
//   };

//   const handleResizeMove = (e: MouseEvent) => {
//     if (
//       !isDragging ||
//       !draggedEventRef.current ||
//       initialClientYRef.current === null
//     )
//       return;

//     const deltaY = e.clientY - initialClientYRef.current;
//     const deltaMinutes =
//       Math.round(deltaY / (cellHeightRef.current / timeInterval)) *
//       timeInterval;

//     setExpandedEvents((prev) => {
//       const event = events.find((ev) => ev.id === draggedEventRef.current);
//       if (!event) return prev;

//       const newEndTime = addMinutes(
//         parseISO(event.end_timestamp_utc),
//         deltaMinutes
//       );
//       return {
//         ...prev,
//         [event.id]: {
//           ...event,
//           end_timestamp_utc: newEndTime.toISOString(),
//         },
//       };
//     });
//   };

//   const handleResizeEnd = () => {
//     setIsDragging(false);
//     draggedEventRef.current = null;
//     initialClientYRef.current = null;
//   };

//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleResizeMove);
//       window.addEventListener('mouseup', handleResizeEnd);
//     }
//     return () => {
//       window.removeEventListener('mousemove', handleResizeMove);
//       window.removeEventListener('mouseup', handleResizeEnd);
//     };
//   }, [isDragging]);

//   useEffect(() => {
//     const cellElement = document.querySelector('.time-cell');
//     if (cellElement) {
//       cellHeightRef.current = cellElement.clientHeight;
//     }
//   }, []);

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border p-2">Time</th>
//             {dateRange.map((date, idx) => (
//               <th key={idx} className="border p-2">
//                 {format(date, 'EEE, MMM d')}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {generateTimeSlots().map((time, idx) => (
//             <tr key={idx}>
//               <td className="border p-2 text-center">{time}</td>
//               {dateRange.map((date, colIdx) => (
//                 <td
//                   key={colIdx}
//                   className="border p-2 relative time-cell"
//                   style={{ height: '60px' }}
//                 >
//                   {events.map((event, eventIdx) => (
//                     <React.Fragment key={eventIdx}>
//                       {renderEvent(event, new Date(date), time)}
//                     </React.Fragment>
//                   ))}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CalendarTable;

import React, { useState, useRef } from 'react';
import {
  format,
  parseISO,
  isWithinInterval,
  addMinutes,
  addDays,
  startOfDay,
} from 'date-fns';
import Draggable from 'react-draggable';
import { CalnederDisplayMode } from '../../utils/enums';

interface Event {
  id: string;
  title: string;
  start_timestamp_utc: string;
  end_timestamp_utc: string;
}

interface CalendarTableProps {
  dateRange: Date[];
  timeInterval: number; // in minutes
  startTime: string; // format "HH:MM"
  endTime: string; // format "HH:MM"
  events: Event[];
  onEventUpdate: (updatedEvent: Event) => void;
  displayMode: string;
}

const CalendarTable: React.FC<CalendarTableProps> = ({
  displayMode,
  dateRange,
  timeInterval,
  startTime,
  endTime,
  events,
  onEventUpdate,
}) => {
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const generateTimeSlots = () => {
    const times = [];
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (
      currentHour < endHour ||
      (currentHour === endHour && currentMin < endMin)
    ) {
      const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
      times.push(timeStr);
      currentMin += timeInterval;
      if (currentMin >= 60) {
        currentHour += 1;
        currentMin = 0;
      }
    }
    return times;
  };

  const renderEvent = (event: Event, date: Date, timeSlot: string) => {
    const startTime = parseISO(event.start_timestamp_utc);
    const endTime = parseISO(event.end_timestamp_utc);
    const cellStart = new Date(
      date.setHours(
        parseInt(timeSlot.split(':')[0]),
        parseInt(timeSlot.split(':')[1])
      )
    );
    const cellEnd = new Date(cellStart.getTime() + timeInterval * 60000 - 1000); // Subtract 1 second

    if (isWithinInterval(startTime, { start: cellStart, end: cellEnd })) {
      const durationInMinutes =
        (endTime.getTime() - startTime.getTime()) / 60000;
      const height = `${(durationInMinutes / timeInterval) * 100}%`;
      const top = `${((startTime.getMinutes() % timeInterval) / timeInterval) * 100}%`;
      console.log({ top });

      return (
        <Draggable
          bounds=".calendar-table"
          onStart={(e: any) => { handleDrag(e); setDraggedEvent(event);}}
          onStop={(e: any, data: any) => handleDragStop(e, data, event)}
          // onDrag={(e :any) => handleDrag(e)}
        >
          <div
            className="event"
            style={{
              position: 'absolute',
              top,
              // left: '50%',
              height,
              width: 'calc(85% - 4px)', // Subtract border width
              backgroundColor: 'lightblue',
              border: '1px solid blue',
              borderRadius: '4px',
              padding: '2px',
              overflow: 'hidden',
              fontSize: '12px',
              cursor: 'move',
              // transition: 'top 0.2s ease'
            }}
          >
            <strong>{event.title}</strong>
            <br />
            {format(startTime, 'HH:mm')} - {format(endTime, 'HH:mm')}
          </div>
        </Draggable>
      );
    }
    return null;
  };

  const handleDrag = (e: any) => {
    /** when i am adding this fun then i create issue of time slot or display timing */
    const parentNode = e.target.parentNode;
    const parentNode1 = parentNode.parentNode;
    console.log({e});
    
    if (parentNode1.style) {
      parentNode1.style.position = 'static';
      console.log('in handle position : ' , parentNode1);
    }
  };

  const handleDragStop = (e: any, data: any, event: Event) => {
    if (!tableRef.current) return;

    let newStartTime, newEndTime;
    // Week Setup
    if (displayMode === CalnederDisplayMode.WEEK) {
      const tableRect = tableRef.current.getBoundingClientRect();
      const cellWidth = (tableRect.width - 100) / dateRange.length; // +1 for time column
      const cellHeight = 50; // Assuming each cell is 50px high
      console.log({ cellWidth, cellHeight, data, event });

      console.log({
        x: data.x,
        cal: (data.x + cellWidth / 2) / cellWidth,
        y: data.y,
      });

      const newColumnIndex = Math.floor((data.x + cellWidth / 2) / cellWidth);
      const newRowIndex = Math.floor(data.y / cellHeight);
      console.log({ newRowIndex, newColumnIndex });

      const newDate = addDays(startOfDay(dateRange[0]), newColumnIndex + 1);

      // Parse the start timestamp to get the hour and minute
      const startTime = parseISO(event.start_timestamp_utc);
      const newHour = startTime.getHours();
      const newMinute = startTime.getMinutes();

      // Create a new Date object with the updated date but with the hour and minute from the original event
      const updatedDateTime = new Date(newDate);
      updatedDateTime.setHours(newHour, newMinute);

      // Calculate the start minutes based on the drag position
      const newStartMinutes = Math.round((data.y / cellHeight) * timeInterval);

      // Add the minutes to the updated date time
      newStartTime = addMinutes(updatedDateTime, newStartMinutes);

      console.log({ newDate: updatedDateTime, startTime: newStartTime });

      const duration =
        parseISO(event.end_timestamp_utc).getTime() -
        parseISO(event.start_timestamp_utc).getTime();
      newEndTime = new Date(newStartTime.getTime() + duration);
      console.log({
        newStartTime,
        newEndTime,
        cs: newStartTime.toISOString(),
        ce: newEndTime.toISOString(),
      });
    }
    // Day Setup
    else if (displayMode === CalnederDisplayMode.DAY) {
      const cellHeight = 50; // Assuming each cell is 50px high
      const newStartMinutes = Math.round((data.y / cellHeight) * timeInterval);
      newStartTime = addMinutes(
        parseISO(event.start_timestamp_utc),
        newStartMinutes
      );
      const duration =
        parseISO(event.end_timestamp_utc).getTime() -
        parseISO(event.start_timestamp_utc).getTime();
      newEndTime = new Date(newStartTime.getTime() + duration);
    }
    if (newStartTime && newEndTime) {
      const updatedEvent = {
        ...event,
        start_timestamp_utc: newStartTime.toISOString(),
        end_timestamp_utc: newEndTime.toISOString(),
      };
      console.log({ updatedEvent });

      onEventUpdate(updatedEvent);
      setDraggedEvent(null);
    }
  };

  return (
    <div
      className="calendar-table"
      style={{ overflowX: 'auto' }}
      ref={tableRef}
    >
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ccc' }}>Time</th>
            {dateRange.map((date, idx) => (
              <th
                key={idx}
                style={{ padding: '10px', border: '1px solid #ccc' }}
              >
                {format(date, 'EEE, MMM d')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="calendar-tbody">
          {generateTimeSlots().map((time, idx) => (
            <tr key={idx}>
              <td
                style={{
                  width: '100px',
                  padding: '10px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f0f0f0',
                  fontWeight: 'bold',
                }}
              >
                {time}
              </td>
              {dateRange.map((date, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    border: '1px solid #ccc',
                    position: 'relative',
                    height: '50px',
                  }}
                >
                  {events.map((event, eventIdx) => (
                    <React.Fragment key={eventIdx}>
                      {renderEvent(event, new Date(date), time)}
                    </React.Fragment>
                  ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
