import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Menu, X } from 'lucide-react';
import { getMonthsInOrder, getWeeksForMonth, monthHasDecks } from '../data/weeksData';

export const Sidebar = ({ selectedWeek, onWeekSelect, viewMode, onMonthSelect }) => {
  const months = getMonthsInOrder();
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedWeek) {
      setExpandedMonth(selectedWeek.month);
    }
  }, [selectedWeek]);

  const handleMonthClick = (month) => {
    const weeksInMonth = getWeeksForMonth(month);
    if (expandedMonth === month) {
      setExpandedMonth(null);
    } else {
      setExpandedMonth(month);
      if (viewMode === 'monthly' && onMonthSelect) {
        onMonthSelect(weeksInMonth[0]);
      }
    }
  };

  const handleWeekSelect = (week) => {
    onWeekSelect(week);
    setIsOpen(false);
  };

  const SidebarContent = () => (
    <aside className="w-64 h-full bg-[#0A0A0A] border-r border-white/10 flex flex-col" data-testid="sidebar">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white font-['Manrope']">BrandRadar</h1>
          <p className="text-xs text-white/40 mt-1 tracking-wide">Competitive Intelligence</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-white/50 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {months.map((month) => {
          const weeksInMonth = getWeeksForMonth(month);
          const hasDecks = monthHasDecks(month);
          const isExpanded = expandedMonth === month;

          return (
            <div key={month} className="mb-1">
              <button
                onClick={() => handleMonthClick(month)}
                className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors group ${
                  viewMode === 'monthly' && selectedWeek?.month === month ? 'bg-white/5' : ''
                }`}
                data-testid={`month-${month.replace(' ', '-').toLowerCase()}`}
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-white/40" /> : <ChevronRight className="w-4 h-4 text-white/40" />}
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{month}</span>
                </div>
                <div className="flex items-center gap-2">
                  {hasDecks && <span className="w-1.5 h-1.5 rounded-full bg-white/60" />}
                  <span className="text-xs text-white/30">{weeksInMonth.length}w</span>
                </div>
              </button>

              {isExpanded && (
                <div className="animate-slideIn">
                  {weeksInMonth.map((week) => {
                    const isSelected = selectedWeek?.week === week.week;
                    return (
                      <button
                        key={week.week}
                        onClick={() => handleWeekSelect(week)}
                        className={`w-full flex items-center justify-between pl-10 pr-4 py-2 transition-all ${
                          isSelected ? 'bg-white/10 border-l-2 border-white' : 'hover:bg-white/5 border-l-2 border-transparent'
                        }`}
                        data-testid={`week-selector-${week.week}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-white/60'}`}>Week {week.week}</span>
                          <span className={`text-xs ${isSelected ? 'text-white/60' : 'text-white/30'}`}>{week.date}</span>
                        </div>
                        {week.decks && <FileText className="w-3.5 h-3.5 text-white/40" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/10">
        <p className="text-xs text-white/30 text-center">38 weeks · Jul 2025 – Mar 2026</p>
      </div>
    </aside>
  );

  return (
    <>
      {/* Hamburger - mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#0A0A0A] border border-white/10 rounded-md text-white/70 hover:text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex h-screen">
        <SidebarContent />
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
          <div className="relative z-50 h-full">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

