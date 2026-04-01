import React from 'react';
import { COMPANIES } from '../data/weeksData';

export const KPICard = ({ companyKey, data, startekDA }) => {
  const company = COMPANIES[companyKey];
  const daGap = data.da - startekDA;
  const hasAds = data.ads > 0;

  return (
    <div
      className="bg-[#121212] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors relative overflow-hidden"
      data-testid={`kpi-card-${companyKey}`}
    >
      {/* Colored top accent bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: company.color }}
      />

      {/* Company Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: company.color }}
          />
          <span className="text-sm font-medium text-white/80">{company.name}</span>
        </div>
        {/* Ads indicator */}
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          hasAds 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-white/5 text-white/30'
        }`}>
          {hasAds ? `${data.ads} ads` : 'No ads'}
        </span>
      </div>

      {/* DA Score */}
      <div className="mb-2">
        <span className="text-xs tracking-widest uppercase text-white/40 font-medium">
          Domain Authority
        </span>
        <div className="flex items-baseline gap-3 mt-1">
          <span 
            className="text-4xl font-semibold tracking-tighter"
            style={{ color: company.color }}
          >
            {data.da}
          </span>
          {companyKey !== 'startek' && (
            <span className={`text-sm font-medium ${daGap > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {daGap > 0 ? '+' : ''}{daGap} vs Startek
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
