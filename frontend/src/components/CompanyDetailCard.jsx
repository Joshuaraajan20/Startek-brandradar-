import React from 'react';
import { Linkedin, Globe, FileText } from 'lucide-react';
import { COMPANIES } from '../data/weeksData';

export const CompanyDetailCard = ({ companyKey, data }) => {
  const company = COMPANIES[companyKey];

  return (
    <div
      className="bg-[#121212] border border-white/10 rounded-lg p-5 hover:border-white/20 transition-colors"
      data-testid={`detail-card-${companyKey}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: company.color }}
          />
          <span className="text-base font-semibold text-white">{company.name}</span>
        </div>
        <span 
          className="text-xs font-bold px-2 py-1 rounded"
          style={{ backgroundColor: `${company.color}20`, color: company.color }}
        >
          DA {data.da}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <Linkedin className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/40">Posts</span>
          </div>
          <span className="text-xl font-semibold text-white">{data.posts}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <Globe className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/40">Ads</span>
          </div>
          <span className="text-xl font-semibold text-white">{data.ads}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <FileText className="w-3.5 h-3.5 text-white/40" />
            <span className="text-xs text-white/40">Pages</span>
          </div>
          <span className="text-xl font-semibold text-white">{data.pages}</span>
        </div>
      </div>

      {/* Insight */}
      <div className="pt-3 border-t border-white/10">
        <p className="text-sm text-white/60 leading-relaxed">
          {data.insight}
        </p>
      </div>
    </div>
  );
};
