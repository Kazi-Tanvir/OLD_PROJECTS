
import React, { useState, useMemo, useEffect } from 'react';
import { SubjectId, ChapterData } from './types';
import { THEMES, WAR_THEMES } from './constants';
import { PRACTICE_DATA } from './data/practiceData';
import SubjectTabs from './components/SubjectTabs';
import MasteryKPI from './components/MasteryKPI';
import ChapterChart from './components/ChapterChart';
import ChapterLedger from './components/ChapterLedger';
import PaperSummary from './components/PaperSummary';
import TypeComparison from './components/TypeComparison';
import Sidebar, { PageId } from './components/Sidebar';
import TheWar from './components/TheWar';
import TheRuins from './components/TheRuins';
import HallOfFame from './components/HallOfFame';
import TheGladiators from './components/TheGladiators';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('profile');
  const [activeSubject, setActiveSubject] = useState<SubjectId>('all');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeTheme = useMemo(() => THEMES[activeSubject], [activeSubject]);
  
  const activeStats = useMemo(() => {
    if (activeSubject === 'all') {
      const allChapters: ChapterData[] = PRACTICE_DATA.flatMap(s => s.chapters);
      return {
        id: 'all' as SubjectId,
        name: 'All Subjects',
        chapters: allChapters
      };
    }
    return PRACTICE_DATA.find(s => s.id === activeSubject)!;
  }, [activeSubject]);

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <TheGladiators />;
      case 'war':
        return <TheWar />;
      case 'ruins':
        return <TheRuins />;
      case 'hall':
        return <HallOfFame />;
      case 'dojo':
      default:
        return (
          <div key={activeSubject} className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col gap-6">
            <MasteryKPI chapters={activeStats.chapters} theme={activeTheme} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TypeComparison chapters={activeStats.chapters} theme={activeTheme} />
              </div>
              
              <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-colors">
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700" style={{ backgroundColor: activeTheme.highlight }} />
                  
                  <div>
                    <h4 className="text-zinc-600 text-[10px] font-black tracking-[0.3em] uppercase mb-8 italic flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-700" /> System Intelligence
                    </h4>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center group/item cursor-help">
                        <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest group-hover/item:text-zinc-300 transition-colors">Consistency</span>
                        <span className="text-xs font-black text-white px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 group-hover/item:border-zinc-600 transition-colors">ALPHA_STABLE</span>
                      </div>
                      <div className="flex justify-between items-center group/item cursor-help">
                        <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest group-hover/item:text-zinc-300 transition-colors">Active Chapters</span>
                        <span className="text-xs font-black text-white mono group-hover/item:scale-110 transition-transform">{activeStats.chapters.length}</span>
                      </div>
                      <div className="flex justify-between items-center group/item cursor-help">
                        <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest group-hover/item:text-zinc-300 transition-colors">Mastery Level</span>
                        <span className="text-xs font-black transition-all" style={{ color: activeTheme.highlight, textShadow: `0 0 10px ${activeTheme.highlight}44` }}>TIER_V</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-zinc-900">
                    <p className="text-[10px] text-zinc-600 leading-relaxed font-bold uppercase tracking-tight group-hover:text-zinc-500 transition-colors">
                      Analytics engine suggests maintaining <span className="text-zinc-400">Written_Practice</span> volume to sustain long-term mastery coefficients.
                    </p>
                  </div>
              </div>
            </div>

            <ChapterChart data={activeStats.chapters} theme={activeTheme} />
            <div className="mt-8">
              <ChapterLedger chapters={activeStats.chapters} theme={activeTheme} />
            </div>
            <PaperSummary chapters={activeStats.chapters} theme={activeTheme} />
          </div>
        );
    }
  };

  const currentHighlighter = activePage === 'dojo' ? activeTheme.highlight : activePage === 'war' ? '#ffffff' : activePage === 'ruins' ? '#ffffff' : activePage === 'hall' ? '#fbbf24' : '#ffffff';

  return (
    <div className="min-h-screen pb-24 pr-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden font-mono selection:bg-white selection:text-black scroll-smooth">
      <div 
        className="fixed top-0 left-0 h-1 z-[300] transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%`, backgroundColor: currentHighlighter, boxShadow: `0 0 10px ${currentHighlighter}` }}
      />

      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 opacity-[0.1] blur-[150px]"
        style={{
          background: activePage === 'hall'
            ? `radial-gradient(circle at 50% -10%, #fbbf24, transparent)`
            : `radial-gradient(circle at 50% -10%, #ffffff, transparent)`
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        {activePage === 'dojo' && (
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-zinc-900 pb-12">
            <div className="group">
               <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1.5">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-100 animate-pulse shadow-[0_0_8px_#ffffff]" />
                     <span className="text-[10px] font-black tracking-[0.5em] text-zinc-700 uppercase">SYSTEM_LIVE</span>
                  </div>
                  <div className="h-[1px] w-12 bg-zinc-900 group-hover:w-24 transition-all duration-700" />
                  <span className="text-[10px] font-black tracking-[0.5em] text-zinc-700 uppercase">V4.4</span>
               </div>
               <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none transition-all duration-500 group">
                 THE DOJO <span className="text-zinc-800 font-normal group-hover:text-zinc-600 transition-colors duration-500">/</span> <span style={{ color: activeTheme.highlight }} className="transition-colors duration-500">STATS</span>
               </h1>
            </div>
            
            <div className="flex flex-col items-end">
               <SubjectTabs 
                  activeId={activeSubject} 
                  onSelect={setActiveSubject} 
                  themes={THEMES} 
                />
            </div>
          </header>
        )}

        <div key={activePage}>
          {renderContent()}
        </div>

        <footer className="mt-32 text-center py-16 border-t border-zinc-900 flex flex-col items-center">
          <div className="w-12 h-[1px] bg-zinc-800 mb-8" />
          <p className="text-zinc-800 text-[9px] font-black uppercase tracking-[0.8em] mb-8">
            QUANTUM_PRACTICE_ANALYTICS &bull; TRAINING_GROUNDS_S4
          </p>
          <div className="flex items-center gap-12 grayscale opacity-10 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             {['PHY', 'CHE', 'MAT'].map((label, i) => (
               <div key={label} className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-10 rounded-2xl bg-zinc-800 flex items-center justify-center text-[10px] font-black text-white shadow-2xl group-hover:scale-110 transition-transform duration-500 border border-zinc-700`}>
                    {label[0]}
                  </div>
                  <span className="text-[9px] font-black text-zinc-800 tracking-widest group-hover:text-zinc-600 transition-colors">{label}</span>
               </div>
             ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
