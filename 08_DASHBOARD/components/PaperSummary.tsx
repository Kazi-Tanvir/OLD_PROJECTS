
import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { ChapterData, ThemeColors } from '../types';

interface PaperSummaryProps {
  chapters: ChapterData[];
  theme: ThemeColors;
}

const PaperSummary: React.FC<PaperSummaryProps> = ({ chapters, theme }) => {
  const paper1Total = chapters.filter(c => c.paper === 1).reduce((acc, c) => acc + c.total, 0);
  const paper2Total = chapters.filter(c => c.paper === 2).reduce((acc, c) => acc + c.total, 0);
  const total = paper1Total + paper2Total;

  const data = [
    { name: '1st Paper', value: paper1Total, color: theme.secondary },
    { name: '2nd Paper', value: paper2Total, color: theme.primary }
  ];

  return (
    <div className="mt-20 mb-20 p-12 rounded-[3rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden">
      <div 
        className="absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20"
        style={{ backgroundColor: theme.highlight }}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 italic">Final Stats</h2>
          <p className="text-zinc-500 mb-8 max-w-md">Detailed distribution of training volume between paper milestones. The ultimate balance of mastery.</p>
          
          <div className="space-y-6">
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">1st Paper Vol.</p>
                <p className="text-2xl font-black mono text-white">{paper1Total.toLocaleString()}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.secondary}22` }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
              </div>
            </div>
            
            <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 flex items-center justify-between">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">2nd Paper Vol.</p>
                <p className="text-2xl font-black mono text-white">{paper2Total.toLocaleString()}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}22` }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">Overall</span>
              <span className="text-3xl font-black mono" style={{ color: theme.highlight }}>
                {Math.round((paper1Total / total) * 100)}%
              </span>
              <span className="text-zinc-600 text-[8px] font-bold">1st Paper</span>
            </div>
          </div>
          
          <div className="flex gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.secondary }} />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">1st Paper</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">2nd Paper</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperSummary;
