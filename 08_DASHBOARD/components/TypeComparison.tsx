
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChapterData, ThemeColors } from '../types';

interface TypeComparisonProps {
  chapters: ChapterData[];
  theme: ThemeColors;
}

const TypeComparison: React.FC<TypeComparisonProps> = ({ chapters, theme }) => {
  const mcq = chapters.reduce((acc, c) => acc + c.mcq, 0);
  const cq = chapters.reduce((acc, c) => acc + c.cq, 0);
  const written = chapters.reduce((acc, c) => acc + c.written, 0);
  const total = mcq + cq + written;

  const data = [
    { name: 'MCQ_UNIT', value: mcq, color: theme.highlight },
    { name: 'CQ_UNIT', value: cq, color: theme.secondary },
    { name: 'WRT_UNIT', value: written, color: theme.primary }
  ];

  return (
    <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 opacity-20" style={{ background: `linear-gradient(90deg, transparent, ${theme.highlight}, transparent)` }} />
      
      <div>
        <div className="flex items-center gap-2 mb-4">
           <div className="w-1 h-4 rounded-full" style={{ backgroundColor: theme.highlight }} />
           <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">Category Analysis</h3>
        </div>
        <p className="text-zinc-600 text-[10px] font-bold mb-8 leading-relaxed uppercase">Distribution of problem types determines the tactical focus of training rounds.</p>
        
        <div className="space-y-4">
          {data.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">{item.name}</span>
                <span className="text-white text-[10px] font-black mono">{item.value.toLocaleString()}</span>
              </div>
              <div className="w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden">
                 <div className="h-full transition-all duration-1000" style={{ width: `${Math.round((item.value/total)*100)}%`, backgroundColor: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[220px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
              ))}
            </Pie>
            <Tooltip 
               contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '12px', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
               itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] font-black text-zinc-700 uppercase tracking-tighter">SUM_VOL</span>
          <span className="text-2xl font-black text-white mono">{Math.round(total/1000)}K</span>
        </div>
      </div>
    </div>
  );
};

export default TypeComparison;
