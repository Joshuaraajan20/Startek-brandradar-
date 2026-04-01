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
    <header 
      className="bg-[#0A0A0A] border-b border-white/10 px-6 py-4"
      data-testid="main-header"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left: Week Title + Navigation */}
        <div className="flex items-center gap-4">
          {/* Prev/Next Navigation */}
          <div className="flex items-center gap-1">
            <button
              onClick={onPrevWeek}
              disabled={!canGoPrev}
              className={`p-2 rounded-md transition-colors ${
                canGoPrev 
                  ? 'hover:bg-white/10 text-white/60 hover:text-white' 
                  : 'text-white/20 cursor-not-allowed'
              }`}
              data-testid="prev-week-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={onNextWeek}
              disabled={!canGoNext}
              className={`p-2 rounded-md transition-colors ${
                canGoNext 
                  ? 'hover:bg-white/10 text-white/60 hover:text-white' 
                  : 'text-white/20 cursor-not-allowed'
              }`}
              data-testid="next-week-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Week Title */}
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight font-['Manrope']">
              Week {selectedWeek?.week} — {selectedWeek?.date}
            </h2>
            <p className="text-xs text-white/40">{selectedWeek?.month}</p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Jump to Week */}
          <Select
            value={String(selectedWeek?.week)}
            onValueChange={(val) => onJumpToWeek(parseInt(val))}
          >
            <SelectTrigger 
              className="w-[220px] bg-[#121212] border-white/10 text-white text-sm"
              data-testid="jump-to-dropdown"
            >
              <SelectValue placeholder="Jump to..." />
            </SelectTrigger>
            <SelectContent className="bg-[#121212] border-white/10 min-w-[220px]">
              {weeksData.map((week) => (
                <SelectItem 
                  key={week.week} 
                  value={String(week.week)}
                  className="text-white/80 hover:bg-white/10 focus:bg-white/10"
                >
                  Week {week.week} - {week.date}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center border border-white/10 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              data-testid="view-toggle-weekly"
            >
              <Calendar className="w-4 h-4" />
              Weekly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                viewMode === 'monthly'
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              data-testid="view-toggle-monthly"
            >
              <LayoutGrid className="w-4 h-4" />
              Monthly
            </button>
          </div>

          {/* Company Filter */}
          <div className="flex items-center gap-1 border border-white/10 rounded-md p-1">
            <button
              onClick={() => setCompanyFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                companyFilter === 'all'
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
              data-testid="filter-all"
            >
              All
            </button>
            {COMPANY_ORDER.map((key) => (
              <button
                key={key}
                onClick={() => setCompanyFilter(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  companyFilter === key
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
                style={{
                  backgroundColor: companyFilter === key ? `${COMPANIES[key].color}30` : 'transparent',
                  borderColor: companyFilter === key ? COMPANIES[key].color : 'transparent'
                }}
                data-testid={`filter-${key}`}
              >
                {COMPANIES[key].shortName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
