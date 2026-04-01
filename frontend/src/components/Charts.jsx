import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { COMPANIES, COMPANY_ORDER, getDATrendData } from '../data/weeksData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121212] border border-white/10 rounded-md p-3 shadow-lg">
        <p className="text-white text-sm font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-white/60">{entry.name}:</span>
            <span className="text-white font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const DATrendChart = ({ selectedWeekIndex, companyFilter }) => {
  const trendData = getDATrendData(selectedWeekIndex, 8);
  
  // Filter companies if needed
  const visibleCompanies = companyFilter === 'all' 
    ? COMPANY_ORDER 
    : [companyFilter];

  return (
    <div 
      className="bg-[#121212] border border-white/10 rounded-lg p-5"
      data-testid="da-trend-chart"
    >
      <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
        Domain Authority Trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              domain={[50, 80]}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {visibleCompanies.includes('startek') && (
              <Line
                type="monotone"
                dataKey="startek"
                name="Startek"
                stroke={COMPANIES.startek.color}
                strokeWidth={2}
                dot={{ fill: COMPANIES.startek.color, r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {visibleCompanies.includes('tp') && (
              <Line
                type="monotone"
                dataKey="tp"
                name="Teleperformance"
                stroke={COMPANIES.tp.color}
                strokeWidth={2}
                dot={{ fill: COMPANIES.tp.color, r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {visibleCompanies.includes('ttec') && (
              <Line
                type="monotone"
                dataKey="ttec"
                name="TTEC"
                stroke={COMPANIES.ttec.color}
                strokeWidth={2}
                dot={{ fill: COMPANIES.ttec.color, r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
            {visibleCompanies.includes('taskus') && (
              <Line
                type="monotone"
                dataKey="taskus"
                name="TaskUs"
                stroke={COMPANIES.taskus.color}
                strokeWidth={2}
                dot={{ fill: COMPANIES.taskus.color, r: 3 }}
                activeDot={{ r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const AdsBarChart = ({ weekData, companyFilter }) => {
  // Filter companies if needed
  const visibleCompanies = companyFilter === 'all' 
    ? COMPANY_ORDER 
    : [companyFilter];

  const chartData = visibleCompanies.map(key => ({
    name: COMPANIES[key].shortName,
    ads: weekData.companies[key].ads,
    fill: COMPANIES[key].color
  }));

  return (
    <div 
      className="bg-[#121212] border border-white/10 rounded-lg p-5"
      data-testid="ads-bar-chart"
    >
      <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
        Google Ads This Week
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="ads" 
              name="Ads"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <rect key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
