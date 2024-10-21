import React from 'react';

interface TimelineItemProps {
  item: { id: number; title: string; completed: boolean };
  index: number;
  nextCompleted: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  nextCompleted,
}) => {
  const isFirst = index === 0;
  const isLast = index === timelineData.length - 1;

  return (
    <div className="flex flex-col items-center flex-1">
      <div
        className={`mb-2 ${item.completed ? 'text-blue-600' : 'text-gray-400'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <div className="text-center text-sm font-medium mb-2">{item.title}</div>
      <div className="flex items-center w-full">
        {!isFirst && (
          <div
            className={`flex-1 border-t-2 border-dashed ${item.completed ? 'border-blue-600' : 'border-gray-300'}`}
          />
        )}
        <div
          className={`w-3 h-3 rounded-full ${item.completed ? 'bg-blue-600' : 'bg-gray-300'}`}
        />
        {!isLast && (
          <div
            className={`flex-1 border-t-2 border-dashed ${nextCompleted ? 'border-blue-600' : 'border-gray-300'}`}
          />
        )}
      </div>
    </div>
  );
};

interface TimelineDataItem {
  id: number;
  title: string;
  completed: boolean;
}

const timelineData: TimelineDataItem[] = [
  { id: 1, title: 'Understanding Mindset', completed: true },
  { id: 2, title: 'Lorem Ipsum', completed: true },
  { id: 3, title: 'Lorem Ipsum', completed: true },
  { id: 4, title: 'Lorem Ipsum', completed: false },
  { id: 5, title: 'Lorem Ipsum', completed: false },
];

const HorizontalTimeline: React.FC = () => {
  return (
    <div className="w-full p-8">
      <div className="flex justify-between items-start">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            nextCompleted={
              index < timelineData.length - 1
                ? timelineData[index + 1].completed
                : false
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalTimeline;
