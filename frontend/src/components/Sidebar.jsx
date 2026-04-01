import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText } from 'lucide-react';
import { getMonthsInOrder, getWeeksForMonth, monthHasDecks } from '../data/weeksData';

export const Sidebar = ({ selectedWeek, onWeekSelect, viewMode, onMonthSelect }) => {
  const months = getMonthsInOrder();
  const [expandedMonth, setExpandedMonth] = useState(null);

  // Auto-expand the month containing the selected week
  useEffect(() => {
    if (selectedWeek) {
      setExpandedMonth(selectedWeek.month);
    }
  }, [selectedWeek]);

  const handleMonthClick = (month) => {
    const weeksInMonth = getWeeksForMonth(month);
    if (expandedMonth === month) {
      // Toggle collapse if already expanded
      setExpandedMonth(null);
    } else {
      // Expand and optionally select first week of month for monthly view
      setExpandedMonth(month);
      if (viewMode === 'monthly' && onMonthSelect) {
        // Select first week of this month to update the monthly view
        onMonthSelect(weeksInMonth[0]);
      }
    }
  };

  return (
    <aside 
      className="w-64 h-screen bg-[#0A0A0A] border-r border-white/10 flex flex-col"
      data-testid="sidebar"
    >
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-xl font-semibold tracking-tight text-white font-['Manrope']">
          BrandRadar
        </h1>
        <p className="text-xs text-white/40 mt-1 tracking-wide">
          Competitive Intelligence
        </p>
      </div>

      {/* Month/Week Navigation */}
      <div className="flex-1 overflow-y-auto py-3">
        {months.map((month) => {
          const weeksInMonth = getWeeksForMonth(month);
          const hasDecks = monthHasDecks(month);
          const isExpanded = expandedMonth === month;

          return (
            <div key={month} className="mb-1">
              {/* Month Header */}
              <button
                onClick={() => handleMonthClick(month)}
                className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors group ${
                  viewMode === 'monthly' && selectedWeek?.month === month ? 'bg-white/5' : ''
                }`}
                data-testid={`month-${month.replace(' ', '-').toLowerCase()}`}
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-white/40" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/40" />
                  )}
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {month}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasDecks && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" title="Has decks" />
                  )}
                  <span className="text-xs text-white/30">
                    {weeksInMonth.length}w
                  </span>
                </div>
              </button>

              {/* Weeks List (Expanded) */}
              {isExpanded && (
                <div className="animate-slideIn">
                  {weeksInMonth.map((week) => {
                    const isSelected = selectedWeek?.week === week.week;
                    return (
                      <button
                        key={week.week}
                        onClick={() => onWeekSelect(week)}
                        className={`w-full flex items-center justify-between pl-10 pr-4 py-2 transition-all ${
                          isSelected
                            ? 'bg-white/10 border-l-2 border-white'
                            : 'hover:bg-white/5 border-l-2 border-transparent'
                        }`}
                        data-testid={`week-selector-${week.week}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-white/60'}`}>
                            Week {week.week}
                          </span>
                          <span className={`text-xs ${isSelected ? 'text-white/60' : 'text-white/30'}`}>
                            {week.date}
                          </span>
                        </div>
                        {week.decks && (
                          <FileText className="w-3.5 h-3.5 text-white/40" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/30 text-center">
          38 weeks · Jul 2025 – Mar 2026
        </p>
      </div>
    </aside>
  );
};
