import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
  const data = [
    { name: 'Home Loan', value: 1, color: '#22D3EE' },
    { name: 'Agri Loan', value: 0, color: '#EF4444' },
    { name: 'Bima Loan', value: 0, color: '#F59E0B' },
    { name: 'Business Loan', value: 0, color: '#84CC16' },
    { name: 'Cash Credit', value: 0, color: '#10B981' },
    { name: 'Education Loan', value: 0, color: '#06B6D4' },
    { name: 'Loan Against Property', value: 0, color: '#3B82F6' },
    { name: 'Overdraft', value: 0, color: '#8B5CF6' },
    { name: 'Personal Loan', value: 0, color: '#A855F7' },
    { name: 'Vehicle Loan', value: 0, color: '#EC4899' }
  ];

  const legend = [
    { name: 'Agri Loan', color: '#EF4444' },
    { name: 'Bima Loan', color: '#F59E0B' },
    { name: 'Business Loan', color: '#84CC16' },
    { name: 'Cash Credit', color: '#10B981' },
    { name: 'Education Loan', color: '#06B6D4' },
    { name: 'Home Loan', color: '#22D3EE' },
    { name: 'Loan Against Property', color: '#3B82F6' },
    { name: 'Overdraft', color: '#8B5CF6' },
    { name: 'Personal Loan', color: '#A855F7' },
    { name: 'Vehicle Loan', color: '#EC4899' }
  ];

  const CustomLabel = ({ cx, cy, value }) => {
    if (value > 0) {
      return (
        <text 
          x={cx} 
          y={cy} 
          fill="white" 
          textAnchor="middle" 
          dominantBaseline="central"
          fontSize="16"
          fontWeight="500"
        >
          {value}
        </text>
      );
    }
    return null;
  };

  return (
    <div className=" w-full lg:w-1/2 rounded-lg p-2">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Product wise Sales</h2>
      
      {/* Chart Container */}
      <div className="flex bg-white flex-col items-center">
        <div className="w-80 h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={CustomLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-sm p-2">
          {legend.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-gray-600 text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;