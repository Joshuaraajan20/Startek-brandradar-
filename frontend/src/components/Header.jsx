import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, LayoutGrid } from 'lucide-react';
import { COMPANIES, COMPANY_ORDER, weeksData } from '../data/weeksData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const Header = ({
  selectedWeek,
  viewMode,
  setViewMode,
  companyFilter,
  setCompanyFilter,
  onPrevWeek,
  onNextWeek,
  onJumpToWeek
}) => {
  const currentWeekIndex = weeksData.findIndex(w => w.week === selectedWeek?.week);
  const canGoPrev = currentWeekIndex > 0;
  const canGoNext = currentWeekIndex < weeksData.length - 1;

  return (
    <header className="bg-[#0A0A0A] border-b border-white/10 px-4 md:px-6 py-3 md:py-4" data-testid="main-header">
      
      {/* Row 1: Nav + Title */}
      <div className="flex items-center gap-3 pl-10 md:pl-0">
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevWeek}
            disabled={!canGoPrev}
            className={`p-1.5 rounded-md transition-colors ${canGoPrev ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'text-white/20 cursor-not-allowed'}`}
            data-testid="prev-week-btn"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={onNextWeek}
            disabled={!canGoNext}
            className={`p-1.5 rounded-md transition-colors ${canGoNext ? 'hover:bg-white/10 text-white/60 hover:text-white' : 'text-white/20 cursor-not-allowed'}`}
            data-testid="next-week-btn"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-base md:text-lg font-semibold text-white tracking-tight font-['Manrope']">
            Week {selectedWeek?.week} — {selectedWeek?.date}
          </h2>
          <p className="text-xs text-white/40">{selectedWeek?.month}</p>
        </div>
      </div>

      {/* Row 2: Controls */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        {/* Jump to Week */}
        <Select value={String(selectedWeek?.week)} onValueChange={(val) => onJumpToWeek(parseInt(val))}>
          <SelectTrigger className="w-full sm:w-[180px] bg-[#121212] border-white/10 text-white text-xs" data-testid="jump-to-dropdown">
            <SelectValue placeholder="Jump to..." />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] border-white/10">
            {weeksData.map((week) => (
              <SelectItem key={week.week} value={String(week.week)} className="text-white/80 hover:bg-white/10 focus:bg-white/10 text-xs">
                Week {week.week} - {week.date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex items-center border border-white/10 rounded-md overflow-hidden">
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-2 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${viewMode === 'weekly' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            data-testid="view-toggle-weekly"
          >
            <Calendar className="w-3.5 h-3.5" />
            Weekly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`px-2 py-1.5 text-xs flex items-center gap-1.5 transition-colors ${viewMode === 'monthly' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            data-testid="view-toggle-monthly"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Monthly
          </button>
        </div>

        {/* Company Filter */}
        <div className="flex items-center gap-1 border border-white/10 rounded-md p-1 flex-wrap">
          <button
            onClick={() => setCompanyFilter('all')}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${companyFilter === 'all' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            data-testid="filter-all"
          >
            All
          </button>
          {COMPANY_ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setCompanyFilter(key)}
              className={`px-2 py-1 text-xs font-medium rounded transition-colors ${companyFilter === key ? 'text-white' : 'text-white/50 hover:text-white'}`}
              style={{
                backgroundColor: companyFilter === key ? `${COMPANIES[key].color}30` : 'transparent',
              }}
              data-testid={`filter-${key}`}
            >
              {COMPANIES[key].shortName}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

