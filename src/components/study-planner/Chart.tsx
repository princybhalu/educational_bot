import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dummy Data for Weekly and Daily Reports
const weeklyData = [
  { name: 'Mon', Sub1: 40, Sub2: 30, Sub3: 50, Sub4: 90 },
  { name: 'Tue', Sub1: 50, Sub2: 45, Sub3: 60, Sub4: 85 },
  { name: 'Wed', Sub1: 60, Sub2: 50, Sub3: 70, Sub4: 80 },
  { name: 'Thu', Sub1: 70, Sub2: 60, Sub3: 75, Sub4: 95 },
  { name: 'Fri', Sub1: 80, Sub2: 70, Sub3: 85, Sub4: 98 },
  { name: 'Sat', Sub1: 90, Sub2: 80, Sub3: 90, Sub4: 99 },
  { name: 'Sun', Sub1: 100, Sub2: 90, Sub3: 95, Sub4: 100 },
];

const dailyData = [
  { name: '09 AM', Sub1: 20, Sub2: 15, Sub3: 25, Sub4: 40 },
  { name: '10 AM', Sub1: 25, Sub2: 20, Sub3: 30, Sub4: 45 },
  { name: '11 AM', Sub1: 30, Sub2: 25, Sub3: 35, Sub4: 50 },
  { name: '12 PM', Sub1: 40, Sub2: 30, Sub3: 50, Sub4: 65 },
  { name: '01 PM', Sub1: 50, Sub2: 35, Sub3: 55, Sub4: 75 },
  { name: '02 PM', Sub1: 60, Sub2: 45, Sub3: 65, Sub4: 85 },
  { name: '03 PM', Sub1: 70, Sub2: 50, Sub3: 70, Sub4: 90 },
];

const Chart: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'daily'>('weekly');

  const handleTabClick = (tab: 'weekly' | 'daily') => {
    setActiveTab(tab);
  };

  const renderTabButton = (tab: 'weekly' | 'daily', label: string) => (
    <button
      className={`px-4 py-2 text-sm md:text-base font-medium ${
        activeTab === tab
          ? 'bg-orange-400 text-white rounded-full border-orange-900'
          : 'text-gray-700'
      }`}
      onClick={() => handleTabClick(tab)}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full p-4">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-[#003366] mb-4 border-b p-2">
        Charts Of Progress
      </h1>

      {/* Tab Section */}
      <div className="flex mb-6 bg-gray-100 rounded-full max-w-max border">
        {renderTabButton('weekly', 'Weekly Report')}
        {renderTabButton('daily', 'Daily Report')}
      </div>

      {/* Chart */}
      <ResponsiveContainer
        width="100%"
        height={300}
        className="text-xs md:text-base"
      >
        <LineChart
          data={activeTab === 'weekly' ? weeklyData : dailyData}
          margin={{ top: 20, right: 30, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Sub1" stroke="#8884d8" />
          <Line type="monotone" dataKey="Sub2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Sub3" stroke="#FF8042" />
          <Line type="monotone" dataKey="Sub4" stroke="#FFBB28" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
