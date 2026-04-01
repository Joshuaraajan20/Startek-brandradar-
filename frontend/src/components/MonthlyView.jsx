import React from 'react';
import { ExternalLink, TrendingUp, BarChart3, FileText } from 'lucide-react';
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
  Cell
} from 'recharts';
import { COMPANIES, COMPANY_ORDER, getMonthlyAggregatedData, getMonthlyDATrend } from '../data/weeksData';

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

const MonthlyKPICard = ({ companyKey, data, startekAvgDA }) => {
  const company = COMPANIES[companyKey];
  const daGap = Math.round((data.avgDA - startekAvgDA) * 10) / 10;

  return (
    <div
      className="bg-[#121212] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors relative overflow-hidden"
      data-testid={`monthly-kpi-card-${companyKey}`}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: company.color }}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: company.color }}
          />
          <span className="text-sm font-medium text-white/80">{company.name}</span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-xs tracking-widest uppercase text-white/40 font-medium">
          Avg Domain Authority
        </span>
        <div className="flex items-baseline gap-3 mt-1">
          <span 
            className="text-3xl font-semibold tracking-tighter"
            style={{ color: company.color }}
          >
            {data.avgDA}
          </span>
          {companyKey !== 'startek' && (
            <span className={`text-sm font-medium ${daGap > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {daGap > 0 ? '+' : ''}{daGap} vs Startek
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
        <div>
          <span className="text-xs text-white/40">Posts</span>
          <p className="text-lg font-semibold text-white">{data.totalPosts}</p>
        </div>
        <div>
          <span className="text-xs text-white/40">Ads</span>
          <p className="text-lg font-semibold text-white">{data.totalAds}</p>
        </div>
        <div>
          <span className="text-xs text-white/40">Pages</span>
          <p className="text-lg font-semibold text-white">{data.totalPages}</p>
        </div>
      </div>
    </div>
  );
};

const MonthlyDATrendChart = ({ month, companyFilter }) => {
  const trendData = getMonthlyDATrend(month);
  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-da-trend-chart">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-white/40" />
        <h3 className="text-sm font-semibold text-white tracking-tight">
          Domain Authority Trend — {month}
        </h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
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
              <Line type="monotone" dataKey="startek" name="Startek" stroke={COMPANIES.startek.color} strokeWidth={2} dot={{ fill: COMPANIES.startek.color, r: 4 }} />
            )}
            {visibleCompanies.includes('tp') && (
              <Line type="monotone" dataKey="tp" name="Teleperformance" stroke={COMPANIES.tp.color} strokeWidth={2} dot={{ fill: COMPANIES.tp.color, r: 4 }} />
            )}
            {visibleCompanies.includes('ttec') && (
              <Line type="monotone" dataKey="ttec" name="TTEC" stroke={COMPANIES.ttec.color} strokeWidth={2} dot={{ fill: COMPANIES.ttec.color, r: 4 }} />
            )}
            {visibleCompanies.includes('taskus') && (
              <Line type="monotone" dataKey="taskus" name="TaskUs" stroke={COMPANIES.taskus.color} strokeWidth={2} dot={{ fill: COMPANIES.taskus.color, r: 4 }} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MonthlyTotalAdsChart = ({ aggregatedData, companyFilter }) => {
  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];
  const chartData = visibleCompanies.map(key => ({
    name: COMPANIES[key].shortName,
    value: aggregatedData.companies[key].totalAds,
    fill: COMPANIES[key].color
  }));

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-ads-chart">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-4 h-4 text-white/40" />
        <h3 className="text-sm font-semibold text-white tracking-tight">
          Total Google Ads — {aggregatedData.month}
        </h3>
      </div>
      <div className="h-56">
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
            <Bar dataKey="value" name="Ads" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MonthlyTotalPagesChart = ({ aggregatedData, companyFilter }) => {
  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];
  const chartData = visibleCompanies.map(key => ({
    name: COMPANIES[key].shortName,
    value: aggregatedData.companies[key].totalPages,
    fill: COMPANIES[key].color
  }));

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-pages-chart">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-white/40" />
        <h3 className="text-sm font-semibold text-white tracking-tight">
          Total New Pages Indexed — {aggregatedData.month}
        </h3>
      </div>
      <div className="h-56">
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
            <Bar dataKey="value" name="Pages" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MonthlyInsightsSummary = ({ aggregatedData, companyFilter }) => {
  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];
  
  // Collect all insights from visible companies
  const allInsights = [];
  visibleCompanies.forEach(key => {
    aggregatedData.companies[key].insights.forEach(item => {
      allInsights.push({
        company: COMPANIES[key].name,
        companyKey: key,
        ...item
      });
    });
  });

  // Sort by week
  allInsights.sort((a, b) => a.week - b.week);

  if (allInsights.length === 0) {
    return (
      <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-insights">
        <h3 className="text-sm font-semibold text-white mb-3 tracking-tight">
          Monthly Highlights
        </h3>
        <p className="text-sm text-white/50">No significant competitive moves recorded this month.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-insights">
      <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
        Monthly Highlights — {aggregatedData.month}
      </h3>
      <div className="space-y-3">
        {allInsights.map((item, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0 last:pb-0">
            <div 
              className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
              style={{ backgroundColor: COMPANIES[item.companyKey].color }}
            />
            <div>
              <span className="text-xs text-white/40">Week {item.week} · {item.date}</span>
              <p className="text-sm text-white/80 mt-0.5">
                <span className="font-medium" style={{ color: COMPANIES[item.companyKey].color }}>
                  {item.company}:
                </span>{' '}
                {item.insight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MonthlyDeckLinks = ({ aggregatedData, companyFilter }) => {
  if (aggregatedData.decks.length === 0) return null;

  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];

  return (
    <div className="bg-[#121212] border border-white/10 rounded-lg p-5" data-testid="monthly-deck-links">
      <h3 className="text-sm font-semibold text-white mb-4 tracking-tight">
        Slide Decks — {aggregatedData.month}
      </h3>
      <div className="space-y-4">
        {aggregatedData.decks.map((weekDecks) => (
          <div key={weekDecks.week}>
            <p className="text-xs text-white/40 mb-2">Week {weekDecks.week} · {weekDecks.date}</p>
            <div className="flex flex-wrap gap-2">
              {visibleCompanies.filter(key => weekDecks.links[key]).map((companyKey) => {
                const company = COMPANIES[companyKey];
                return (
                  <a
                    key={companyKey}
                    href={weekDecks.links[companyKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ 
                      backgroundColor: `${company.color}15`,
                      borderColor: `${company.color}40`,
                      color: company.color
                    }}
                    data-testid={`monthly-deck-link-${weekDecks.week}-${companyKey}`}
                  >
                    <span className="text-xs font-medium">{company.shortName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MonthlyView = ({ currentMonth, companyFilter }) => {
  const aggregatedData = getMonthlyAggregatedData(currentMonth);
  const startekAvgDA = aggregatedData.companies.startek.avgDA;
  
  const visibleCompanies = companyFilter === 'all' ? COMPANY_ORDER : [companyFilter];

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="monthly-view">
      {/* Month Header */}
      <div className="bg-[#121212] border border-white/10 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-white tracking-tight font-['Manrope']">
          {currentMonth} — Monthly Intelligence Report
        </h2>
        <p className="text-sm text-white/50 mt-1">
          Aggregated data from {aggregatedData.weekCount} weeks
        </p>
      </div>

      {/* Monthly KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleCompanies.map((companyKey) => (
          <MonthlyKPICard
            key={companyKey}
            companyKey={companyKey}
            data={aggregatedData.companies[companyKey]}
            startekAvgDA={startekAvgDA}
          />
        ))}
      </div>

      {/* DA Trend Chart */}
      <MonthlyDATrendChart month={currentMonth} companyFilter={companyFilter} />

      {/* Bar Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyTotalAdsChart aggregatedData={aggregatedData} companyFilter={companyFilter} />
        <MonthlyTotalPagesChart aggregatedData={aggregatedData} companyFilter={companyFilter} />
      </div>

      {/* Monthly Insights Summary */}
      <MonthlyInsightsSummary aggregatedData={aggregatedData} companyFilter={companyFilter} />

      {/* Monthly Deck Links */}
      <MonthlyDeckLinks aggregatedData={aggregatedData} companyFilter={companyFilter} />
    </div>
  );
};
