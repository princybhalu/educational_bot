import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const DatePicker: React.FC<{
  theme: any;
  currentDate: Date;
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}> = ({ theme, currentDate, onDateSelect, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);

    const days = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
    onClose();
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const changeMonth = (delta: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + delta);
    setSelectedDate(newDate);
  };

  const days = generateCalendarDays();

  return (
    <div
      className={`absolute top-full left-0 mt-2 ${theme.surface1} ${theme.text} border ${theme.border} rounded-lg shadow-lg p-4 z-10 w-64`}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className={`p-1 ${theme.buttonHover} rounded`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="font-semibold">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </div>
        <button
          onClick={() => changeMonth(1)}
          className={`p-1 ${theme.buttonHover} rounded`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-bold text-xs opacity-70">
            {day}
          </div>
        ))}
        {days.map((day, index) =>
          day ? (
            <button
              key={index}
              onClick={() => handleDateSelect(day)}
              className={`p-1 rounded transition-colors duration-300 ${
                day.toDateString() === currentDate.toDateString()
                  ? 'bg-[#4361ee] text-white'
                  : `${theme.buttonHover} hover:bg-[#4361ee]/10`
              }`}
            >
              {day.getDate()}
            </button>
          ) : (
            <div key={index}></div>
          )
        )}
      </div>
    </div>
  );
};

export default DatePicker;
