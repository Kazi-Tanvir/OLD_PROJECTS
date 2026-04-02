
import React, { useMemo, useState } from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { ADMISSION_EXAMS } from '../data/admissionExams';
import { WAR_THEMES } from '../constants';
import { WarMode } from '../types';
import WarTabs from './WarTabs';
import { Target, Zap, ShieldAlert, Activity, PieChart as PieIcon } from 'lucide-react';

const TheWar: React.FC = () => {
  const [activeMode, setActiveMode] = useState<WarMode>('comparison');
  const [showLedger, setShowLedger] = useState(false);

  const activeTheme = useMemo(() => WAR_THEMES[activeMode], [activeMode]);

  const battleData = useMemo(() => {
    return ADMISSION_EXAMS
      .filter(exam => exam.results.TAMIM.obtained > 0 || exam.results.TANVIR.obtained > 0)
      .map(exam => ({
        id: exam.exam_id,
        name: exam.exam_name,
        date: exam.date,
        tamim: exam.results.TAMIM.percentage,
        tanvir: exam.results.TANVIR.percentage,
        tamimScore: exam.results.TAMIM.obtained,
        tanvirScore: exam.results.TANVIR.obtained,
        tamimMerit: exam.results.TAMIM.central_merit,
        tanvirMerit: exam.results.TANVIR.central_merit,
        total: exam.total_marks,
        type: exam.tags.type,
        margin: Math.abs(exam.results.TAMIM.percentage - exam.results.TANVIR.percentage)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, []);

  const meritData = useMemo(() => {
    return battleData.filter(d => d.tamimMerit !== null || d.tanvirMerit !== null);
  }, [battleData]);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    battleData.forEach(d => {
      counts[d.type] = (counts[d.type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [battleData]);

  const stats = useMemo(() => {
    const tamimValid = battleData.filter(d => d.tamim > 0);
    const tanvirValid = battleData.filter(d => d.tanvir > 0);
    
    const tamimWins = battleData.filter(d => d.tamim > d.tanvir).length;
    const tanvirWins = battleData.filter(d => d.tanvir > d.tamim).length;

    return {
      tamimAvg: tamimValid.length ? (tamimValid.reduce((acc, d) => acc + d.tamim, 0) / tamimValid.length).toFixed(1) : 0,
      tanvirAvg: tanvirValid.length ? (tanvirValid.reduce((acc, d) => acc + d.tanvir, 0) / tanvirValid.length).toFixed(1) : 0,
      tamimBestMerit: Math.min(...tamimValid.map(d => d.tamimMerit || 99999)),
      tanvirBestMerit: Math.min(...tanvirValid.map(d => d.tanvirMerit || 99999)),
      tamimWins,
      tanvirWins,
      totalBattles: battleData.length
    };
  }, [battleData]);

  const radarData = [
    { subject: 'Consistency', A: 85, B: 72, fullMark: 100 },
    { subject: 'Efficiency', A: 92, B: 88, fullMark: 100 },
    { subject: 'Volume', A: 78, B: 85, fullMark: 100 },
    { subject: 'Peak Rank', A: 95, B: 80, fullMark: 100 },
    { subject: 'Win Rate', A: 60, B: 40, fullMark: 100 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-950/90 border border-zinc-800 p-4 rounded-xl backdrop-blur-xl shadow-2xl min-w-[280px]">
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{data.date}</p>
          <p className="text-xs font-bold text-white mb-4 leading-tight">{data.name}</p>
          <div className="space-y-3 pt-3 border-t border-zinc-900">
            {(activeMode === 'comparison' || activeMode === 'tamim') && (
              <div className="flex items-center justify-between group/ttamim">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white group-hover/ttamim:bg-indigo-400 shadow-[0_0_5px_currentColor] transition-colors" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase group-hover/ttamim:text-indigo-200 transition-colors">TAMIM</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white group-hover/ttamim:text-indigo-100 transition-colors">{data.tamim ?? 'N/A'}%</span>
                  {data.tamimMerit && <p className="text-[8px] text-zinc-600 font-black uppercase group-hover/ttamim:text-indigo-900 transition-colors">Rank: {data.tamimMerit}</p>}
                </div>
              </div>
            )}
            {(activeMode === 'comparison' || activeMode === 'tanvir') && (
              <div className="flex items-center justify-between group/ttanvir">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover/ttanvir:bg-teal-400 shadow-[0_0_5px_currentColor] transition-colors" />
                  <span className="text-[10px] font-black text-zinc-400 uppercase group-hover/ttanvir:text-teal-200 transition-colors">TANVIR</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-white group-hover/ttanvir:text-teal-100 transition-colors">{data.tanvir ?? 'N/A'}%</span>
                  {data.tanvirMerit && <p className="text-[8px] text-zinc-600 font-black uppercase group-hover/ttanvir:text-teal-900 transition-colors">Rank: {data.tanvirMerit}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div key={activeMode} className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 font-mono selection:bg-white selection:text-black">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-zinc-100 animate-pulse shadow-[0_0_8px_#ffffff]" />
             <span className="text-[10px] font-black text-zinc-700 tracking-[0.5em] uppercase">Tactical_Override_Active</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none group">
            THE WAR <span className="text-zinc-800 font-normal group-hover:text-zinc-600 transition-colors duration-500">/</span> <span style={{ color: activeTheme.highlight }} className="transition-colors duration-500">{activeMode}</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase">Logging {stats.totalBattles} Admission Engagements</p>
        </div>
        <WarTabs activeId={activeMode} onSelect={setActiveMode} themes={WAR_THEMES} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden group hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(99,102,241,0.05)] transition-all duration-500 h-full flex flex-col justify-between">
           <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-4 rounded-full group-hover:bg-indigo-400 transition-colors" style={{ backgroundColor: activeTheme.highlight }} />
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-indigo-300 transition-colors">Combatant HUD</h4>
           </div>
           
           <div className="space-y-8">
              <div className="flex justify-between items-end group/avg">
                 <div>
                    <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1 group-hover/avg:text-indigo-600">AGGREGATE_AVG</p>
                    <p className="text-4xl font-black text-white mono group-hover/avg:scale-105 transition-transform origin-left">
                       {activeMode === 'tamim' ? stats.tamimAvg : activeMode === 'tanvir' ? stats.tanvirAvg : <><span className="hover:text-indigo-400 transition-colors">{stats.tamimAvg}%</span><span className="text-zinc-800 text-2xl mx-1">|</span><span className="hover:text-teal-400 transition-colors">{stats.tanvirAvg}%</span></>}
                    </p>
                 </div>
                 {activeMode === 'comparison' && (
                    <div className="flex gap-1 mb-1">
                       <div className="w-1.5 h-4 bg-white rounded-full animate-bounce delay-0" />
                       <div className="w-1.5 h-4 bg-zinc-700 rounded-full animate-bounce delay-150" />
                    </div>
                 )}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-900/50">
                 <div className="group/vict">
                    <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1 group-hover/vict:text-indigo-400">VICTORIES</p>
                    <p className="text-2xl font-black text-white mono group-hover/vict:scale-110 transition-transform origin-left">
                       {activeMode === 'tamim' ? stats.tamimWins : activeMode === 'tanvir' ? stats.tanvirWins : stats.tamimWins + stats.tanvirWins}
                    </p>
                 </div>
                 <div className="group/peak">
                    <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1 group-hover/peak:text-indigo-400">PEAK_RANK</p>
                    <p className="text-2xl font-black text-white mono transition-all duration-300 group-hover/peak:scale-110 origin-left" style={{ color: activeTheme.highlight }}>
                       #{activeMode === 'tamim' ? stats.tamimBestMerit : activeMode === 'tanvir' ? stats.tamimBestMerit : Math.min(stats.tamimBestMerit, stats.tanvirBestMerit)}
                    </p>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden flex flex-col items-center justify-center group hover:border-zinc-700 transition-all duration-500">
           <div className="absolute top-8 left-8">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-zinc-300">Tactical_Spread</h4>
           </div>
           <div className="w-full h-48 mt-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#18181b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#3f3f46', fontSize: 7, fontWeight: 800 }} />
                  {(activeMode === 'comparison' || activeMode === 'tamim') && (
                    <Radar
                      name="Tamim"
                      dataKey="A"
                      stroke="#818cf8"
                      fill="#818cf8"
                      fillOpacity={0.1}
                    />
                  )}
                  {(activeMode === 'comparison' || activeMode === 'tanvir') && (
                    <Radar
                      name="Tanvir"
                      dataKey="B"
                      stroke="#2dd4bf"
                      fill="#2dd4bf"
                      fillOpacity={0.1}
                    />
                  )}
                </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden group hover:border-zinc-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-500 flex flex-col justify-between">
           <div>
              <h4 className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-6 italic group-hover:text-zinc-400">Battle_Intelligence</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-bold uppercase mb-4 transition-colors group-hover:text-zinc-200">
                 {activeMode === 'comparison' ? (
                   <>Currently tracking <span className="text-white italic group-hover:text-indigo-400 transition-colors">Unit_Tamim</span> and <span className="text-zinc-500 italic group-hover:text-teal-400 transition-colors">Unit_Tanvir</span> convergence. Stability: 98.4%.</>
                 ) : activeMode === 'tamim' ? (
                   <>Analyzing <span className="text-white italic group-hover:text-indigo-400 transition-colors">Unit_Tamim</span> primary output. High consistency detected in Central_Merit sectors.</>
                 ) : (
                   <>Synthesizing <span className="text-zinc-500 italic group-hover:text-teal-400 transition-colors">Unit_Tanvir</span> tactical logs. Noted significant efficiency gains in recent timestamps.</>
                 )}
              </p>
           </div>
           <div className="pt-6 border-t border-zinc-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <ShieldAlert size={14} className="text-zinc-800 group-hover:text-indigo-900 transition-colors" />
                 <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest group-hover:text-indigo-800 transition-colors">System Status</span>
              </div>
              <span className="text-[8px] font-black text-zinc-100 uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-800 group-hover:bg-indigo-950 transition-colors">READY</span>
           </div>
        </div>
      </div>

      <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 overflow-hidden relative group hover:border-zinc-700 hover:shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-zinc-900 rounded-full group-hover:bg-indigo-500 transition-all" />
             <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:not-italic transition-all">Efficiency Trajectory</h3>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">Percentage analysis over battle timeline</p>
             </div>
          </div>
          <Target className="text-zinc-900 group-hover:text-indigo-950 transition-colors" size={32} />
        </div>

        <div className="h-[450px] w-full group-hover:opacity-100 opacity-60 transition-opacity">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={battleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="trajTamim" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="trajTanvir" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" opacity={0.5} />
                 <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#3f3f46', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }} 
                 />
                 <YAxis 
                    domain={[0, 100]} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#3f3f46', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }} 
                 />
                 <Tooltip content={<CustomTooltip />} />
                 {(activeMode === 'comparison' || activeMode === 'tamim') && (
                   <Area 
                      type="monotone" 
                      dataKey="tamim" 
                      stroke="#818cf8" 
                      strokeWidth={activeMode === 'tamim' ? 5 : 3} 
                      fill="url(#trajTamim)"
                      dot={{ r: 4, fill: '#09090b', stroke: '#818cf8', strokeWidth: 2 }}
                      activeDot={{ r: 7, fill: '#818cf8', stroke: 'black', strokeWidth: 2 }}
                      animationDuration={1500}
                   />
                 )}
                 {(activeMode === 'comparison' || activeMode === 'tanvir') && (
                   <Area 
                      type="monotone" 
                      dataKey="tanvir" 
                      stroke="#2dd4bf" 
                      strokeWidth={activeMode === 'tanvir' ? 5 : 3} 
                      fill="url(#trajTanvir)"
                      dot={{ r: 4, fill: '#09090b', stroke: '#2dd4bf', strokeWidth: 2 }}
                      activeDot={{ r: 7, fill: '#2dd4bf', stroke: 'white', strokeWidth: 2 }}
                      animationDuration={1800}
                   />
                 )}
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>
      
      {/* Rest of the component remains largely the same with similar subtle hover enhancements... */}
      <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 overflow-hidden relative group hover:border-zinc-700 transition-all duration-700">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-white group-hover:bg-amber-400 transition-all" />
             <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:not-italic transition-all">Merit Rank Hierarchy</h3>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-zinc-400 transition-colors">Central merit distribution (Lower value is superior)</p>
             </div>
          </div>
          <Zap className="text-zinc-900 group-hover:text-amber-950 transition-colors" size={32} />
        </div>

        <div className="h-[450px] w-full group-hover:opacity-100 opacity-60 transition-opacity">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={meritData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorTamim" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorTanvir" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" opacity={0.3} />
                 <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#3f3f46', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }} 
                 />
                 <YAxis 
                    reversed
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#3f3f46', fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 700 }} 
                 />
                 <Tooltip content={<CustomTooltip />} />
                 {(activeMode === 'comparison' || activeMode === 'tamim') && (
                   <Area 
                      type="stepAfter" 
                      dataKey="tamimMerit" 
                      stroke="#818cf8" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorTamim)" 
                      animationDuration={2000}
                   />
                 )}
                 {(activeMode === 'comparison' || activeMode === 'tanvir') && (
                   <Area 
                      type="stepAfter" 
                      dataKey="tanvirMerit" 
                      stroke="#2dd4bf" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorTanvir)" 
                      animationDuration={2500}
                   />
                 )}
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TheWar;
