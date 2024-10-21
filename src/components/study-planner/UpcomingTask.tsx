// import React, { useState } from 'react';
// import { FaBook, FaClipboardList } from 'react-icons/fa';
// import { IconType } from 'react-icons';
// import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
// import { addDays, format } from 'date-fns';
// import 'react-date-range/dist/styles.css'; // main css file
// import 'react-date-range/dist/theme/default.css'; // theme css file

// // Define the data structure
// interface ScheduleData {
//   id: string;
//   schedule_id: string;
//   title: string;
//   created_by: string;
//   date: string;
//   start_time_utc: string;
//   end_time_utc: string;
//   type: string;
//   meta_data: {
//     chapter?: string;
//     subject?: string;
//     topic?: string;
//   };
// }

// // Props interface for the component
// interface UpcomingExamsProps {
//   data: ScheduleData[];
// }

// // Utility function to format the time duration
// const formatDuration = (start: string, end: string) => {
//   const startTime = new Date(`1970-01-01T${start}Z`);
//   const endTime = new Date(`1970-01-01T${end}Z`);
//   const diff = Math.abs(endTime.getTime() - startTime.getTime());
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;

//   return hours > 0
//     ? `${hours} Hours ${remainingMinutes} Minutes`
//     : `${remainingMinutes} Minutes`;
// };

// // Utility function to format the date
// const formatDate = (date: string) => {
//   return format(new Date(date), 'dd MMM');
// };

// // Component for a single exam item
// const ExamItem: React.FC<{ exam: ScheduleData; icon: IconType }> = ({
//   exam,
//   icon: Icon,
// }) => (
//   <div className="flex items-start justify-between py-3">
//     <div className="flex items-start gap-2">
//       {/* Icon */}
//       <div className="mt-1">
//         <Icon className="text-blue-500" />
//       </div>
//       <div>
//         {/* Title */}
//         <h3 className="text-md font-semibold">
//           {exam.meta_data.subject || 'No Subject'} -{' '}
//           {exam.type === 'test' ? 'Exam' : 'Theory'}
//         </h3>
//         {/* Description */}
//         <p className="text-sm text-gray-500">
//           Carry out writing exams in school
//         </p>
//       </div>
//     </div>
//     {/* Date and Duration */}
//     <div className="text-right">
//       <p className="text-sm font-semibold text-orange-500">
//         {formatDate(exam.date)}
//       </p>
//       <p className="text-sm text-gray-500">
//         {formatDuration(exam.start_time_utc, exam.end_time_utc)}
//       </p>
//     </div>
//   </div>
// );

// // Main component rendering the list of exams and date range picker
// const UpcomingExams: React.FC<UpcomingExamsProps> = ({ data }) => {
//   const [dateRange, setDateRange] = useState<Range[]>([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 7),
//       key: 'selection',
//     },
//   ]);

//   // Corrected onChange handler for the date picker with type checking
//   const handleSelect = (ranges: RangeKeyDict) => {
//     const { selection } = ranges;
//     if (selection.startDate && selection.endDate) {
//       setDateRange([selection]);
//     }
//   };

//   // Filter exams based on the selected date range
//   const filteredExams = data.filter((exam) => {
//     const examDate = new Date(exam.date);
//     return (
//       examDate >= (dateRange[0].startDate || new Date()) &&
//       examDate <= (dateRange[0].endDate || new Date())
//     );
//   });

//   return (
//     <div className="w-full p-4 bg-white shadow-lg rounded-lg">
//       {/* Heading */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Upcoming</h2>
//         <span className="text-orange-500 cursor-pointer">
//           View all upcoming
//         </span>
//       </div>

//       {/* Date Range Picker */}
//       <div className="mb-6">
//         <DateRangePicker ranges={dateRange} onChange={handleSelect} />
//       </div>

//       {/* Exam Items */}
//       <div className="space-y-4">
//         {filteredExams.length > 0 ? (
//           filteredExams.map((exam) => (
//             <ExamItem
//               key={exam.id}
//               exam={exam}
//               icon={exam.type === 'test' ? FaClipboardList : FaBook}
//             />
//           ))
//         ) : (
//           <p className="text-gray-500">
//             No exams found in the selected date range.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// // Dummy data for testing the component
// const upcomingExamsData: ScheduleData[] = [
//   {
//     id: '32f5d038-cc29-4099-8327-ed112aa897e0',
//     schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
//     title: 'one',
//     created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
//     date: '2024-01-19T00:00:00.000Z',
//     start_time_utc: '09:15:00',
//     end_time_utc: '09:20:00',
//     type: 'test',
//     meta_data: {
//       chapter: 'data',
//     },
//   },
//   {
//     id: '770689a4-f498-46a1-a147-fe76729afd6b',
//     schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
//     title: 'one',
//     created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
//     date: '2024-01-20T00:00:00.000Z',
//     start_time_utc: '09:20:00',
//     end_time_utc: '09:30:00',
//     type: 'study',
//     meta_data: {
//       chapter: '1',
//       subject: 'Mathematics',
//       topic: '',
//     },
//   },
//   {
//     id: 'e0310f48-6a5c-4c03-999e-69b1ced0da92',
//     schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
//     title: 'one',
//     created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
//     date: '2024-10-19T00:00:00.000Z',
//     start_time_utc: '09:15:00',
//     end_time_utc: '09:20:00',
//     type: 'test',
//     meta_data: {
//       chapter: 'data',
//     },
//   },
// ];

// const UpcomingTask: React.FC = () => {
//   return (
//     <div className="w-full p-4 ">
//       <UpcomingExams data={upcomingExamsData} />
//     </div>
//   );
// };

// export default UpcomingTask;

import React, { useState } from 'react';
import { FaBook, FaClipboardList } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

// Define the data structure
interface ScheduleData {
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

// Props interface for the component
interface UpcomingExamsProps {
  data: ScheduleData[];
}

// Utility function to format the time duration
const formatDuration = (start: string, end: string) => {
  const startTime = new Date(`1970-01-01T${start}Z`);
  const endTime = new Date(`1970-01-01T${end}Z`);
  const diff = Math.abs(endTime.getTime() - startTime.getTime());
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return hours > 0
    ? `${hours} Hours ${remainingMinutes} Minutes`
    : `${remainingMinutes} Minutes`;
};

// Utility function to format the date
const formatDate = (date: string) => {
  return format(new Date(date), 'dd MMM');
};

// Component for a single exam item
const ExamItem: React.FC<{ exam: ScheduleData; icon: IconType }> = ({
  exam,
  icon: Icon,
}) => (
  <div className="flex items-start justify-between py-3">
    <div className="flex items-start gap-2">
      {/* Icon */}
      <div className="mt-1">
        <Icon className="text-blue-500" />
      </div>
      <div>
        {/* Title */}
        <h3 className="text-md font-semibold">
          {exam.meta_data.subject || 'No Subject'} -{' '}
          {exam.type === 'test' ? 'Exam' : 'Theory'}
        </h3>
        {/* Description */}
        <p className="text-sm text-gray-500">
          Carry out writing exams in school
        </p>
      </div>
    </div>
    {/* Date and Duration */}
    <div className="text-right">
      <p className="text-sm font-semibold text-orange-500">
        {formatDate(exam.date)}
      </p>
      <p className="text-sm text-gray-500">
        {formatDuration(exam.start_time_utc, exam.end_time_utc)}
      </p>
    </div>
  </div>
);

// Main component rendering the list of exams and date range picker
const UpcomingExams: React.FC<UpcomingExamsProps> = ({ data }) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const [isDateSelected, setIsDateSelected] = useState(false);

  // Corrected onChange handler for the date picker with type checking
  const handleSelect = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    if (selection.startDate && selection.endDate) {
      setDateRange([selection]);
      setIsDateSelected(true); // Set date selected flag
    }
  };

  // Filter exams based on the selected date range
  const filteredExams = data.filter((exam) => {
    const examDate = new Date(exam.date);
    return (
      examDate >= (dateRange[0].startDate || new Date()) &&
      examDate <= (dateRange[0].endDate || new Date())
    );
  });

  // Show up to 10 exams initially if no date is selected
  const initialExams = !isDateSelected ? data.slice(0, 10) : filteredExams;

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-lg">
      {/* Heading */}
      <div className="flex justify-between items-center mb-4 border-b p-2">
        <h2 className="text-2xl font-bold text-blue-800">Upcoming</h2>
        <span className="text-orange-500 cursor-pointer">
          View all upcoming
        </span>
      </div>

      {/* Date Range Picker */}
      <div className="mb-6 overflow-auto">
        <DateRangePicker
          ranges={dateRange}
          onChange={handleSelect}
          className="w-full"
        />
      </div>

      {/* Exam Items */}
      <div className="space-y-4">
        {initialExams.length > 0 ? (
          initialExams.map((exam) => (
            <ExamItem
              key={exam.id}
              exam={exam}
              icon={exam.type === 'test' ? FaClipboardList : FaBook}
            />
          ))
        ) : (
          <p className="text-gray-500">
            No exams found in the selected date range.
          </p>
        )}
      </div>
    </div>
  );
};

// Dummy data for testing the component
const upcomingExamsData: ScheduleData[] = [
  {
    id: '32f5d038-cc29-4099-8327-ed112aa897e0',
    schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
    title: 'one',
    created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
    date: '2024-10-19T00:00:00.000Z',
    start_time_utc: '09:15:00',
    end_time_utc: '09:20:00',
    type: 'test',
    meta_data: {
      chapter: 'data',
    },
  },
  {
    id: '770689a4-f498-46a1-a147-fe76729afd6b',
    schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
    title: 'one',
    created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
    date: '2024-10-20T00:00:00.000Z',
    start_time_utc: '09:20:00',
    end_time_utc: '09:30:00',
    type: 'study',
    meta_data: {
      chapter: '1',
      subject: 'Mathematics',
      topic: '',
    },
  },
  {
    id: 'e0310f48-6a5c-4c03-999e-69b1ced0da92',
    schedule_id: 'a87ba569-12c7-431e-9806-af455ffadc3b',
    title: 'one',
    created_by: '62154c2d-a793-4f98-8f74-bf3ac576fc6f',
    date: '2024-10-19T00:00:00.000Z',
    start_time_utc: '09:15:00',
    end_time_utc: '09:20:00',
    type: 'test',
    meta_data: {
      chapter: 'data',
    },
  },
];

const UpcomingTask: React.FC = () => {
  return (
    <div className="w-full p-4 ">
      <UpcomingExams data={upcomingExamsData} />
    </div>
  );
};

export default UpcomingTask;