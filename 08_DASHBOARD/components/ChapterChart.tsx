
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
} from 'recharts';
import { ChapterData, ThemeColors } from '../types';

interface ChapterChartProps {
  data: ChapterData[];
  theme: ThemeColors;
}

const CustomTooltip = ({ active, payload, label, theme }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ChapterData;
    return (
      <div className="bg-zinc-950/80 border border-zinc-800 p-5 rounded-2xl shadow-2xl backdrop-blur-xl min-w-[200px]">
        <div className="flex items-center justify-between mb-3">
          <p className="font-black text-white mono text-xs">{label} Paper {data.paper}</p>
          <span className="text-[10px] font-bold text-zinc-500 uppercase">Details</span>
        </div>
        <div className="mb-4">
          <p className="text-2xl font-black text-white mono">{data.total.toLocaleString()}</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Total Problems</p>
        </div>
        <div className="space-y-2 pt-3 border-t border-zinc-900">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">MCQ</span>
            <span className="text-xs font-bold text-white mono">{data.mcq}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">CQ</span>
            <span className="text-xs font-bold text-white mono">{data.cq}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Written</span>
            <span className="text-xs font-bold text-white mono">{data.written}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-1 flex-grow rounded-full bg-zinc-900">
            <div 
              className="h-full rounded-full transition-all duration-500" 
              style={{ width: '100%', backgroundColor: theme.highlight }}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const ChapterChart: React.FC<ChapterChartProps> = ({ data, theme }) => {
  return (
    <div className="w-full h-[500px] mt-12 bg-zinc-950/50 p-8 rounded-[2.5rem] border border-zinc-900 overflow-hidden relative group">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 rounded-full" style={{ backgroundColor: theme.highlight }} />
          <div>
            <h3 className="text-xl font-bold text-white mb-0.5 tracking-tight uppercase italic">Volume Distribution</h3>
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">Spline graph for scrollable landscape</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-zinc-600 uppercase">Units: problems</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke={theme.highlight} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.highlight} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={theme.highlight} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="5 5" opacity={0.5} />
          <XAxis 
            dataKey="id" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#3f3f46', fontSize: 10, fontWeight: 700, fontFamily: 'JetBrains Mono' }}
            dy={15}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#3f3f46', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          />
          <Tooltip 
            content={<CustomTooltip theme={theme} />} 
            cursor={{ stroke: theme.highlight, strokeWidth: 1, strokeDasharray: '4 4' }}
            animationDuration={300}
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke={theme.highlight} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            dot={{ r: 4, strokeWidth: 2, fill: '#09090b', stroke: theme.highlight }}
            activeDot={{ r: 6, strokeWidth: 0, fill: theme.highlight }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChapterChart;
