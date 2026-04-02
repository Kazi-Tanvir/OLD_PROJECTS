
import React, { useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ARCHIVED_EXAMS } from '../data/archivedExams';
import { WarMode } from '../types';
import { WAR_THEMES } from '../constants';
import { Activity, Target, PieChart as PieIcon, ShieldAlert, Zap } from 'lucide-react';

type Phase = 'SSC' | 'HSC';

const TheRuins: React.FC = () => {
  const [activePhase, setActivePhase] = useState<Phase>('HSC');
  const [activeProfile, setActiveProfile] = useState<WarMode>('comparison');
  const [showChronicles, setShowChronicles] = useState(false);
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);

  const activeTheme = useMemo(() => WAR_THEMES[activeProfile], [activeProfile]);

  const filteredExams = useMemo(() => {
    return ARCHIVED_EXAMS.filter(exam => 
      exam.tags.phase === activePhase && 
      (exam.results.TAMIM.percentage !== null || exam.results.TANVIR.percentage !== null)
    ).sort((a, b) => new Date(a.date || '').getTime() - new Date(b.date || '').getTime());
  }, [activePhase]);

  const stats = useMemo(() => {
    const tamimValid = filteredExams.filter(e => e.results.TAMIM.percentage !== null);
    const tanvirValid = filteredExams.filter(e => e.results.TANVIR.percentage !== null);
    
    const tamimAvg = tamimValid.length ? (tamimValid.reduce((a, b) => a + (b.results.TAMIM.percentage || 0), 0) / tamimValid.length).toFixed(1) : "0.0";
    const tanvirAvg = tanvirValid.length ? (tanvirValid.reduce((a, b) => a + (b.results.TANVIR.percentage || 0), 0) / tanvirValid.length).toFixed(1) : "0.0";

    const subjects: string[] = Array.from(new Set(filteredExams.map(e => e.tags.subject as string)));
    
    const subjectBreakdown = subjects.map(s => {
      const exams = filteredExams.filter(e => e.tags.subject === s);
      const tA = exams.filter(e => e.results.TAMIM.percentage !== null);
      const vA = exams.filter(e => e.results.TANVIR.percentage !== null);
      return {
        subject: s.substring(0, 10),
        tamim: tA.length ? (tA.reduce((acc, e) => acc + (e.results.TAMIM.percentage || 0), 0) / tA.length) : 0,
        tanvir: vA.length ? (vA.reduce((acc, e) => acc + (e.results.TANVIR.percentage || 0), 0) / vA.length) : 0,
        count: exams.length
      };
    });

    const deltaData = filteredExams.map(e => ({
      date: e.date,
      name: e.exam_name,
      margin: Math.abs((e.results.TAMIM.percentage || 0) - (e.results.TANVIR.percentage || 0))
    }));

    return {
      tamimAvg,
      tanvirAvg,
      totalCount: filteredExams.length,
      subjectBreakdown,
      deltaData
    };
  }, [filteredExams]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-4 rounded-xl shadow-2xl font-mono">
          <p className="text-[10px] text-zinc-500 uppercase mb-2 italic">Recovered_Data // {label}</p>
          {payload.map((p: any) => {
            const isTamim = p.name === 'Tamim' || p.dataKey?.includes('TAMIM');
            const signatureColor = isTamim ? WAR_THEMES.tamim.highlight : WAR_THEMES.tanvir.highlight;
            return (
              <div key={p.name} className="flex items-center justify-between gap-8 mt-1.5 group/ttp">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_5px_currentColor] group-hover/ttp:scale-150 transition-transform" style={{ backgroundColor: signatureColor, color: signatureColor }} />
                  <span className="text-[10px] font-black text-zinc-400 uppercase group-hover/ttp:text-white transition-colors">{p.name}</span>
                </div>
                <span className="text-xs font-black text-white">{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}%</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 font-mono selection:bg-zinc-100 selection:text-black pb-32">
      
      {/* Header Artifact Controls */}
      <div className="flex flex-col gap-8 border-b border-zinc-900 pb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-800">
             <span className="text-[10px] font-black tracking-[0.4em] uppercase hover:text-white transition-colors duration-1000">Status: Archival_Stream_Active</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,1)] group">
            THE RUINS <span className="text-zinc-800 font-normal group-hover:text-zinc-600 transition-colors duration-500">/</span> <span style={{ color: activeProfile === 'comparison' ? '#52525b' : activeTheme.highlight }} className="transition-colors duration-700">ARCHIVES</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.6em] uppercase">Historical Efficiency Records Level_0.1</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-3">
             <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Temporal_Era</span>
             <div className="bg-zinc-900/40 p-1 rounded-2xl flex border border-zinc-900/50 backdrop-blur-sm self-start">
               {(['SSC', 'HSC'] as Phase[]).map((phase) => (
                 <button
                   key={phase}
                   onClick={() => setActivePhase(phase)}
                   className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                     activePhase === phase ? 'bg-zinc-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'text-zinc-600 hover:text-zinc-300'
                   }`}
                 >
                   {phase}
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-3 md:text-right">
             <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mr-1">Active_Operand</span>
             <div className="bg-zinc-900/40 p-1 rounded-2xl flex border border-zinc-900/50 backdrop-blur-sm self-start md:self-end">
               {(['tamim', 'tanvir', 'comparison'] as WarMode[]).map((mode) => (
                 <button
                   key={mode}
                   onClick={() => setActiveProfile(mode)}
                   className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                     activeProfile === mode 
                       ? 'text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                       : 'text-zinc-600 hover:text-zinc-400'
                   }`}
                   style={{
                     backgroundColor: activeProfile === mode ? WAR_THEMES[mode].secondary : 'transparent'
                   }}
                 >
                   {mode === 'comparison' ? 'ALL' : mode}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Header HUD - 3 Column Info Graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`p-10 rounded-[3rem] bg-zinc-950 border transition-all duration-700 relative overflow-hidden group border-zinc-900 hover:border-zinc-100/20 shadow-[0_0_30px_rgba(255,255,255,0.02)] hover:shadow-[0_0_50px_rgba(255,255,255,0.05)]`}>
          <div className="absolute top-0 right-0 p-8 text-zinc-900 group-hover:text-zinc-700 group-hover:scale-110 transition-all duration-1000">
             <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
             </svg>
          </div>
          <div className="relative z-10 space-y-8">
            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic group-hover:text-zinc-400 transition-colors">Era_Aggregate_Avg</h4>
            <div className="flex items-baseline gap-4">
               {(activeProfile === 'tamim' || activeProfile === 'comparison') && (
                 <div className="flex flex-col group/t" onMouseEnter={() => setHoveredPlayer('tamim')} onMouseLeave={() => setHoveredPlayer(null)}>
                    <span className="text-5xl font-black italic leading-none group-hover/t:not-italic transition-all" 
                          style={{ color: activeProfile === 'tamim' || hoveredPlayer === 'tamim' ? WAR_THEMES.tamim.highlight : '#fafafa' }}>
                      {stats.tamimAvg}
                    </span>
                    <span className="text-[7px] text-zinc-700 font-black mt-2 uppercase tracking-widest group-hover/t:text-zinc-400 transition-colors">Tamim_Efficiency</span>
                 </div>
               )}
               {activeProfile === 'comparison' && <div className="h-10 w-[1px] bg-zinc-900 mx-2" />}
               {(activeProfile === 'tanvir' || activeProfile === 'comparison') && (
                 <div className="flex flex-col group/v" onMouseEnter={() => setHoveredPlayer('tanvir')} onMouseLeave={() => setHoveredPlayer(null)}>
                    <span className="text-5xl font-black italic leading-none group-hover/v:not-italic transition-all"
                          style={{ color: activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' ? WAR_THEMES.tanvir.highlight : '#71717a' }}>
                      {stats.tanvirAvg}
                    </span>
                    <span className="text-[7px] text-zinc-700 font-black mt-2 uppercase tracking-widest group-hover/v:text-zinc-400 transition-colors">Tanvir_Efficiency</span>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[3rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden flex flex-col items-center justify-center group hover:border-zinc-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.02)] transition-all duration-700">
           <div className="absolute top-8 left-8">
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-zinc-300">Archival_Spread</h4>
           </div>
           <div className="w-full h-48 mt-4 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stats.subjectBreakdown}>
                  <PolarGrid stroke="#18181b" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#3f3f46', fontSize: 7, fontWeight: 800 }} />
                  {(activeProfile === 'comparison' || activeProfile === 'tamim') && (
                    <Radar
                      name="Tamim"
                      dataKey="tamim"
                      stroke={activeProfile === 'tamim' || hoveredPlayer === 'tamim' ? WAR_THEMES.tamim.highlight : (activeProfile === 'comparison' ? '#ffffff' : WAR_THEMES.tamim.highlight)}
                      fill={activeProfile === 'tamim' || hoveredPlayer === 'tamim' ? WAR_THEMES.tamim.highlight : (activeProfile === 'comparison' ? '#ffffff' : WAR_THEMES.tamim.highlight)}
                      fillOpacity={0.1}
                      onMouseEnter={() => setHoveredPlayer('tamim')}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      className="cursor-pointer transition-all duration-300"
                    />
                  )}
                  {(activeProfile === 'comparison' || activeProfile === 'tanvir') && (
                    <Radar
                      name="Tanvir"
                      dataKey="tanvir"
                      stroke={activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' ? WAR_THEMES.tanvir.highlight : (activeProfile === 'comparison' ? '#71717a' : WAR_THEMES.tanvir.highlight)}
                      fill={activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' ? WAR_THEMES.tanvir.highlight : (activeProfile === 'comparison' ? '#71717a' : WAR_THEMES.tanvir.highlight)}
                      fillOpacity={0.1}
                      onMouseEnter={() => setHoveredPlayer('tanvir')}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      className="cursor-pointer transition-all duration-300"
                    />
                  )}
                </RadarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="p-10 rounded-[3rem] bg-zinc-950 border border-zinc-900 relative overflow-hidden group hover:border-zinc-700 transition-all duration-700 flex flex-col justify-between hover:shadow-[0_0_50px_rgba(255,255,255,0.02)]">
           <div>
              <h4 className="text-zinc-600 text-[9px] font-black tracking-[0.3em] uppercase mb-6 italic group-hover:text-zinc-400">Era_Intelligence</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-bold uppercase mb-4 transition-colors group-hover:text-zinc-100">
                 Successfully mapped <span className="text-white italic" style={{ color: activeProfile !== 'comparison' ? activeTheme.highlight : undefined }}>{stats.totalCount}</span> historical artifacts from the <span className="text-zinc-100 font-black">{activePhase}</span> temporal sector. Encryption level: STABLE.
              </p>
           </div>
           <div className="pt-6 border-t border-zinc-900 flex justify-between items-center transition-colors group-hover:border-zinc-100/10">
              <div className="flex items-center gap-2">
                 <ShieldAlert size={14} className="text-zinc-800" style={{ color: activeProfile !== 'comparison' ? activeTheme.secondary : undefined }} />
                 <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Record Integrity</span>
              </div>
              <span className="text-[8px] font-black text-zinc-100 uppercase tracking-widest px-2 py-0.5 rounded bg-zinc-800" style={{ backgroundColor: activeProfile !== 'comparison' ? activeTheme.primary : undefined }}>VERIFIED</span>
           </div>
        </div>
      </div>
      
      {/* Archival Trajectory HUD */}
      <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 overflow-hidden relative group hover:border-zinc-700 hover:shadow-[0_0_50px_rgba(255,255,255,0.02)] transition-all duration-700">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-zinc-800 rounded-full group-hover:bg-zinc-100 transition-all" style={{ backgroundColor: activeProfile !== 'comparison' ? activeTheme.accent : undefined }} />
             <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter group-hover:not-italic transition-all">Archival Efficiency Trajectory</h3>
                <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-zinc-400 transition-colors">Historical spline reconstruction over temporal axis</p>
             </div>
          </div>
          <Target className="text-zinc-900 group-hover:text-white transition-all duration-700" size={32} />
        </div>
        
        <div className="h-[450px] w-full opacity-60 group-hover:opacity-100 transition-opacity">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredExams} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                 <defs>
                    <linearGradient id="colorTamimArch" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={WAR_THEMES.tamim.highlight} stopOpacity={0.1}/>
                       <stop offset="95%" stopColor={WAR_THEMES.tamim.highlight} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTanvirArch" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor={WAR_THEMES.tanvir.highlight} stopOpacity={0.1}/>
                       <stop offset="95%" stopColor={WAR_THEMES.tanvir.highlight} stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="5 5" opacity={0.3} />
                 <Tooltip content={<CustomTooltip />} />
                 {(activeProfile === 'comparison' || activeProfile === 'tamim') && (
                   <Area 
                      type="monotone" 
                      name="Tamim"
                      dataKey="results.TAMIM.percentage" 
                      stroke={activeProfile === 'tamim' || hoveredPlayer === 'tamim' ? WAR_THEMES.tamim.highlight : (activeProfile === 'comparison' ? '#ffffff' : WAR_THEMES.tamim.highlight)} 
                      strokeWidth={4} 
                      fillOpacity={1}
                      fill="url(#colorTamimArch)"
                      dot={{ r: 4, fill: '#09090b', stroke: activeProfile === 'tamim' || hoveredPlayer === 'tamim' ? WAR_THEMES.tamim.highlight : (activeProfile === 'comparison' ? '#ffffff' : WAR_THEMES.tamim.highlight), strokeWidth: 2 }}
                      onMouseEnter={() => setHoveredPlayer('tamim')}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      className="cursor-pointer transition-all duration-300"
                   />
                 )}
                 {(activeProfile === 'comparison' || activeProfile === 'tanvir') && (
                   <Area 
                      type="monotone" 
                      name="Tanvir"
                      dataKey="results.TANVIR.percentage" 
                      stroke={activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' ? WAR_THEMES.tanvir.highlight : (activeProfile === 'comparison' ? '#71717a' : WAR_THEMES.tanvir.highlight)} 
                      strokeWidth={4} 
                      fillOpacity={1}
                      fill="url(#colorTanvirArch)"
                      dot={{ r: 4, fill: '#09090b', stroke: activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' ? WAR_THEMES.tanvir.highlight : (activeProfile === 'comparison' ? '#71717a' : WAR_THEMES.tanvir.highlight), strokeWidth: 2 }}
                      onMouseEnter={() => setHoveredPlayer('tanvir')}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      className="cursor-pointer transition-all duration-300"
                   />
                 )}
              </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 group overflow-hidden relative hover:border-zinc-700 transition-all">
           <div className="flex items-center gap-3 mb-8">
              <Activity className="text-zinc-600" size={20} />
              <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Archival_Delta_Volatility</h4>
           </div>
           <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={stats.deltaData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                    <defs>
                      <linearGradient id="ruinsDeltaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={activeProfile === 'comparison' ? '#ffffff' : activeTheme.highlight} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={activeProfile === 'comparison' ? '#ffffff' : activeTheme.highlight} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="5 5" opacity={0.3} />
                    <Area 
                      type="monotone" 
                      dataKey="margin" 
                      stroke={activeProfile === 'comparison' ? '#71717a' : activeTheme.highlight} 
                      strokeWidth={3} 
                      fill="url(#ruinsDeltaGrad)" 
                      animationDuration={3000}
                      className="cursor-pointer transition-all duration-300 hover:stroke-white"
                    />
                    <XAxis hide />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 group flex items-center justify-between hover:border-zinc-700 transition-all">
           <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                 <PieIcon className="text-zinc-600" size={20} />
                 <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Era_Sector_Exposure</h4>
              </div>
              {stats.subjectBreakdown.slice(0, 4).map((cat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProfile === 'comparison' ? (i === 0 ? '#ffffff' : i === 1 ? '#71717a' : i === 2 ? '#3f3f46' : '#18181b') : (i === 0 ? activeTheme.highlight : i === 1 ? activeTheme.secondary : i === 2 ? activeTheme.accent : '#18181b') }} />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{cat.subject}</span>
                  <span className="text-xs font-black text-white">{cat.count} ARTIFACTS</span>
                </div>
              ))}
           </div>
           <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={stats.subjectBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="count"
                      stroke="none"
                    >
                       {stats.subjectBreakdown.map((_, i) => (
                         <Cell key={i} fill={activeProfile === 'comparison' ? (i === 0 ? '#ffffff' : i === 1 ? '#71717a' : i === 2 ? '#3f3f46' : '#18181b') : (i === 0 ? activeTheme.highlight : i === 1 ? activeTheme.secondary : i === 2 ? activeTheme.accent : '#18181b')} 
                               className="hover:opacity-80 cursor-pointer transition-opacity" />
                       ))}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="bg-zinc-950 rounded-[3rem] border border-zinc-900 overflow-hidden transition-all duration-700 hover:border-zinc-700">
        <button 
           onClick={() => setShowChronicles(!showChronicles)}
           className="w-full p-10 flex items-center justify-between hover:bg-zinc-900/10 transition-colors group"
        >
           <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${showChronicles ? 'bg-zinc-100 rotate-180' : 'bg-zinc-900 group-hover:bg-zinc-800'}`} style={{ backgroundColor: (showChronicles && activeProfile !== 'comparison') ? activeTheme.highlight : undefined }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={(showChronicles || activeProfile !== 'comparison') ? 'black' : 'white'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                 </svg>
              </div>
              <div className="text-left">
                 <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">The Chronicles</h3>
                 <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest group-hover:text-zinc-400 transition-colors">Fragmented Terminal Logs // {activePhase}_ERA</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <span className="text-xs font-black text-zinc-600 uppercase tracking-widest">{showChronicles ? 'CLOSE_TERMINAL' : 'DECRYPT_LEGER'}</span>
              <div className={`w-3 h-3 rounded-full ${showChronicles ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]' : 'bg-zinc-800 animate-pulse'}`} style={{ backgroundColor: (showChronicles && activeProfile !== 'comparison') ? activeTheme.highlight : undefined }} />
           </div>
        </button>
        
        {showChronicles && (activeProfile === 'comparison' || activeProfile === 'tamim' || activeProfile === 'tanvir') && (
          <div className="overflow-x-auto animate-in slide-in-from-top duration-700 border-t border-zinc-900">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/30 text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                  <th className="px-10 py-6">LOG_TIMESTAMP</th>
                  <th className="px-10 py-6">ARTIFACT_IDENTIFIER</th>
                  {(activeProfile === 'tamim' || activeProfile === 'comparison') && <th className="px-10 py-6 text-center">TAMIM_UNIT</th>}
                  {(activeProfile === 'tanvir' || activeProfile === 'comparison') && <th className="px-10 py-6 text-center">TANVIR_UNIT</th>}
                  <th className="px-10 py-6 text-right">VOL_BIT</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.slice().reverse().map((exam) => {
                  const tamimPct = exam.results.TAMIM.percentage || 0;
                  const tanvirPct = exam.results.TANVIR.percentage || 0;
                  const tamimWon = tamimPct > tanvirPct;
                  const tanvirWon = tanvirPct > tamimPct;
                  
                  return (
                    <tr key={exam.exam_id} className="border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-all duration-300 group">
                      <td className="px-10 py-8 text-[11px] text-zinc-700 font-black italic">{exam.date || 'DAT_NUL'}</td>
                      <td className="px-10 py-8">
                        <p className="text-sm font-bold text-zinc-200 leading-tight group-hover:text-white transition-colors">{exam.exam_name}</p>
                        <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-700 mt-2 inline-block uppercase tracking-widest" style={{ borderColor: activeProfile !== 'comparison' ? activeTheme.secondary : undefined }}>{exam.tags.subject}</span>
                      </td>
                      
                      {(activeProfile === 'tamim' || activeProfile === 'comparison') && (
                        <td className={`px-10 py-8 text-center transition-all duration-500 ${activeProfile === 'comparison' && tamimWon ? 'bg-zinc-800/20' : ''}`} onMouseEnter={() => setHoveredPlayer('tamim')} onMouseLeave={() => setHoveredPlayer(null)}>
                          <div className="flex flex-col items-center">
                            <span className={`text-base font-black mono transition-colors`} style={{ color: (activeProfile === 'tamim' || hoveredPlayer === 'tamim' || (activeProfile === 'comparison' && tamimWon)) ? WAR_THEMES.tamim.highlight : '#71717a' }}>
                               {tamimPct.toFixed(1)}%
                            </span>
                            <span className="text-[7px] text-zinc-800 font-black mt-1 uppercase tracking-tighter">BIT: {exam.results.TAMIM.obtained}</span>
                          </div>
                        </td>
                      )}

                      {(activeProfile === 'tanvir' || activeProfile === 'comparison') && (
                        <td className={`px-10 py-8 text-center transition-all duration-500 ${activeProfile === 'comparison' && tanvirWon ? 'bg-zinc-800/10' : ''}`} onMouseEnter={() => setHoveredPlayer('tanvir')} onMouseLeave={() => setHoveredPlayer(null)}>
                          <div className="flex flex-col items-center">
                            <span className={`text-base font-black mono transition-colors`} style={{ color: (activeProfile === 'tanvir' || hoveredPlayer === 'tanvir' || (activeProfile === 'comparison' && tanvirWon)) ? WAR_THEMES.tanvir.highlight : '#71717a' }}>
                               {tanvirPct.toFixed(1)}%
                            </span>
                            <span className="text-[7px] text-zinc-800 font-black mt-1 uppercase tracking-tighter">BIT: {exam.results.TANVIR.obtained}</span>
                          </div>
                        </td>
                      )}

                      <td className="px-10 py-8 text-right">
                         <span className="text-xs text-zinc-600 font-black mono">{exam.total_marks}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheRuins;
