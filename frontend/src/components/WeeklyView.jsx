import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { COMPANY_ORDER, SUMMARY_CALLOUT } from '../data/weeksData';
import { KPICard } from './KPICard';
import { CompanyDetailCard } from './CompanyDetailCard';
import { DATrendChart, AdsBarChart } from './Charts';
import { DeckLinks } from './DeckLinks';

export const WeeklyView = ({ weekData, weekIndex, companyFilter }) => {
  const startekDA = weekData.companies.startek.da;
  
  // Filter companies if needed
  const visibleCompanies = companyFilter === 'all' 
    ? COMPANY_ORDER 
    : [companyFilter];

  return (
    <div className="space-y-6 animate-fadeIn" data-testid="weekly-view">
      {/* Summary Callout */}
      <div 
        className="bg-[#1a1520] border border-[#534AB7]/30 rounded-lg p-4 flex items-start gap-3"
        data-testid="summary-callout"
      >
        <AlertTriangle className="w-5 h-5 text-[#534AB7] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-white/80 leading-relaxed">
          {SUMMARY_CALLOUT}
        </p>
      </div>

      {/* Week Summary */}
      <div className="bg-[#121212] border border-white/10 rounded-lg p-4">
        <p className="text-white/60 text-sm">
          <span className="text-white font-medium">Week {weekData.week}</span> · {weekData.date} — 
          {weekData.companies.tp.insight.length > 30 
            ? ` ${weekData.companies.tp.insight.substring(0, 50)}...` 
            : ` Tracking ${visibleCompanies.length} companies across DA, ads, and content.`}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleCompanies.map((companyKey) => (
          <KPICard
            key={companyKey}
            companyKey={companyKey}
            data={weekData.companies[companyKey]}
            startekDA={startekDA}
          />
        ))}
      </div>

      {/* Company Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleCompanies.map((companyKey) => (
          <CompanyDetailCard
            key={companyKey}
            companyKey={companyKey}
            data={weekData.companies[companyKey]}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DATrendChart selectedWeekIndex={weekIndex} companyFilter={companyFilter} />
        <AdsBarChart weekData={weekData} companyFilter={companyFilter} />
      </div>

      {/* Deck Links */}
      <DeckLinks decks={weekData.decks} companyFilter={companyFilter} />
    </div>
  );
};
