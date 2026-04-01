import React, { useState } from 'react';
import { weeksData } from './data/weeksData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WeeklyView } from './components/WeeklyView';
import { MonthlyView } from './components/MonthlyView';
import './App.css';

function App() {
  // Default to Week 38 (last week, most recent data)
  const [selectedWeek, setSelectedWeek] = useState(weeksData[37]); // Week 38 is index 37
  const [viewMode, setViewMode] = useState('weekly'); // 'weekly' or 'monthly'
  const [companyFilter, setCompanyFilter] = useState('all'); // 'all' or company key

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setViewMode('weekly'); // Switch to weekly view when selecting a week
  };

  const handlePrevWeek = () => {
    const currentIndex = weeksData.findIndex(w => w.week === selectedWeek.week);
    if (currentIndex > 0) {
      setSelectedWeek(weeksData[currentIndex - 1]);
    }
  };

  const handleNextWeek = () => {
    const currentIndex = weeksData.findIndex(w => w.week === selectedWeek.week);
    if (currentIndex < weeksData.length - 1) {
      setSelectedWeek(weeksData[currentIndex + 1]);
    }
  };

  const handleJumpToWeek = (weekNum) => {
    const week = weeksData.find(w => w.week === weekNum);
    if (week) {
      setSelectedWeek(week);
    }
  };

  const weekIndex = weeksData.findIndex(w => w.week === selectedWeek.week);

  return (
    <div className="flex h-screen bg-[#0A0A0A]" data-testid="brandradar-app">
      {/* Sidebar */}
      <Sidebar 
        selectedWeek={selectedWeek} 
        onWeekSelect={handleWeekSelect}
        viewMode={viewMode}
        onMonthSelect={(week) => setSelectedWeek(week)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          selectedWeek={selectedWeek}
          viewMode={viewMode}
          setViewMode={setViewMode}
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onJumpToWeek={handleJumpToWeek}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {viewMode === 'weekly' ? (
            <WeeklyView 
              weekData={selectedWeek} 
              weekIndex={weekIndex}
              companyFilter={companyFilter}
            />
          ) : (
            <MonthlyView
              currentMonth={selectedWeek.month}
              companyFilter={companyFilter}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
