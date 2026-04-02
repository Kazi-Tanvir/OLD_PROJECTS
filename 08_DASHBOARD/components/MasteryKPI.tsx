
import React from 'react';
import { ThemeColors, ChapterData } from '../types';
import { AreaChart, Area, ResponsiveContainer, Cell } from 'recharts';

interface MasteryKPIProps {
  chapters: ChapterData[];
  theme: ThemeColors;
}

const MasteryKPI: React.FC<MasteryKPIProps> = ({ chapters, theme }) => {
  const totalSolved = chapters.reduce((acc, c) => acc + c.total, 0);
  const totalMCQ = chapters.reduce((acc, c) => acc + c.mcq, 0);
  const paper1Total = chapters.filter(c => c.paper === 1).reduce((acc, c) => acc + c.total, 0);
  const paperSplit = totalSolved > 0 ? Math.round((paper1Total / totalSolved) * 100) : 0;

  // Tiny area chart data for the main hero card
  const miniChartData = chapters.slice(0, 10).map(c => ({ val: c.total }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 font-mono">
      {/* Primary Hero Card */}
      <div className="col-span-1 lg:col-span-2 p-8 rounded-[2rem] border border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between relative overflow-hidden group hover:border-zinc-700 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <div 
          className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.1] transition-opacity duration-700"
          style={{ color: theme.highlight }}
        >
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        
        <div className="relative z-10 w-full sm:w-auto text-center sm:text-left">
          <p className="text-zinc-600 text-[10px] font-black tracking-[0.4em] uppercase mb-4">Mastery Volume</p>
          <h2 className="text-7xl font-black tracking-tighter transition-all duration-700 group-hover:scale-105 origin-left" style={{ color: theme.highlight, textShadow: `0 0 40px ${theme.highlight}33` }}>
            {totalSolved.toLocaleString()}
          </h2>
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Global Rank</span>
              <span className="text-white text-xs font-black">UNRANKED_S1</span>
            </div>
            <div className="w-[1px] h-8 bg-zinc-900" />
            <div className="flex flex-col">
              <span className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest">Efficiency</span>
              <span className="text-white text-xs font-black">89.4% AVG</span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block h-32 w-48 relative z-10 mt-8 sm:mt-0 opacity-40 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={miniChartData}>
              <defs>
                <linearGradient id="miniHeroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.highlight} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={theme.highlight} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke={theme.highlight} 
                strokeWidth={2} 
                fill="url(#miniHeroGrad)"
                animationDuration={2500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Stats Group */}
      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 rounded-[2rem] border border-zinc-900 bg-zinc-950 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-500 cursor-default">
          <div className="flex justify-between items-start">
            <p className="text-zinc-600 text-[10px] font-black tracking-widest uppercase italic group-hover:text-zinc-400 transition-colors">Primary Dist.</p>
            <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]" style={{ backgroundColor: theme.highlight, color: theme.highlight }} />
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-white group-hover:translate-x-1 transition-transform">{totalMCQ.toLocaleString()}</h3>
              <span className="text-zinc-600 text-[10px] font-black uppercase">MCQ Questions</span>
            </div>
            <div className="w-full h-1 bg-zinc-900 rounded-full mt-2 overflow-hidden">
               <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.round((totalMCQ / totalSolved) * 100)}%`, backgroundColor: theme.highlight }} />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[2rem] border border-zinc-900 bg-zinc-950 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-500 cursor-default">
           <div className="flex justify-between items-start">
            <p className="text-zinc-600 text-[10px] font-black tracking-widest uppercase italic group-hover:text-zinc-400 transition-colors">Paper Split</p>
            <span className="text-zinc-400 text-[10px] font-black mono group-hover:scale-110 transition-transform">{paperSplit}% P1</span>
          </div>
          <div className="mt-4 flex gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="h-6 flex-grow rounded-sm transition-all duration-700 hover:scale-y-125 cursor-help" 
                style={{ 
                  backgroundColor: i < (paperSplit / 8) ? theme.highlight : '#18181b',
                  opacity: i < (paperSplit / 8) ? 0.8 : 1
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasteryKPI;
