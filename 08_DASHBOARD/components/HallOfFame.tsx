
import React, { useState, useMemo } from 'react';
import { HALL_OF_FAME } from '../data/hallOfFame';
import { WarMode } from '../types';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid
} from 'recharts';
import { Trophy, GraduationCap, Building2, Medal, Star, ShieldCheck } from 'lucide-react';

const HofCard: React.FC<{
  title: string;
  rank: string | number | null;
  peerRank?: string | number | null;
  subject?: string | null;
  icon: any;
  isCompare: boolean;
  type: 'varsity' | 'board';
}> = ({ title, rank, peerRank, subject, icon: Icon, isCompare, type }) => {
  const hasRank = rank !== null;
  const hasPeer = peerRank !== null;

  return (
    <div className={`bg-zinc-950 border border-zinc-900 p-8 rounded-3xl transition-all duration-700 group relative overflow-hidden flex flex-col justify-between h-[240px] hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.08)] ${!hasRank && !isCompare ? 'opacity-20 grayscale' : ''}`}>
      {/* Background Decor */}
      <div className="absolute -bottom-8 -left-8 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000">
        <Icon size={160} />
      </div>

      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <h4 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] group-hover:text-amber-500 transition-colors">
            {title}
          </h4>
          {subject && <p className="text-[9px] font-bold text-zinc-700 uppercase group-hover:text-amber-700 transition-colors">{subject}</p>}
        </div>
        <div className="text-zinc-800 group-hover:text-amber-500 transition-colors">
          <Icon size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-[9px] font-black text-zinc-700 uppercase tracking-widest mb-1 group-hover:text-zinc-500 transition-colors">
          {type === 'varsity' ? 'YOUR_MERIT_RANK' : 'GPA_COEFFICIENT'}
        </p>
        <h3 className="text-5xl font-black text-white italic tracking-tighter group-hover:text-amber-100 transition-all duration-500 group-hover:scale-105 origin-left">
          {hasRank ? (type === 'varsity' ? `#${rank}` : rank) : '---'}
        </h3>
      </div>

      {isCompare && (
        <div className="absolute bottom-8 right-8 text-right group-hover:translate-y-[-4px] transition-transform duration-500">
          <p className="text-[8px] font-black text-zinc-800 uppercase tracking-widest mb-1 group-hover:text-amber-900/60">vs_Peer</p>
          <div className="flex items-center justify-end gap-2">
            <span className="text-xl font-black text-zinc-800 mono group-hover:text-emerald-500 transition-colors">
              {hasPeer ? (type === 'varsity' ? `#${peerRank}` : peerRank) : 'N/A'}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 group-hover:bg-emerald-500 animate-pulse shadow-[0_0_8px_currentColor]" />
          </div>
        </div>
      )}
    </div>
  );
};

const HallOfFame: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<WarMode>('comparison');

  const meritChartData = useMemo(() => {
    return HALL_OF_FAME.varsity_results
      .filter(v => v.tamim_merit || v.tanvir_merit)
      .map(v => ({
        name: v.university.split(' ')[0],
        tamim: v.tamim_merit || 0,
        tanvir: v.tanvir_merit || 0
      }));
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-48 font-mono">
      {/* Standardized Tactical Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-zinc-700" />
            <span className="text-[10px] font-black text-zinc-700 tracking-[0.5em] uppercase">Hall_of_Fame_Archive_Active</span>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none group transition-all duration-500">
            HALL OF <span className="text-zinc-900 group-hover:text-amber-500 transition-colors">FAME</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase">Permanent Archival Records & Merits</p>
        </div>

        {/* Standardized Switcher */}
        <div className="bg-zinc-900/30 p-1 rounded-2xl flex border border-zinc-900 backdrop-blur-sm self-start md:self-end">
          {(['tamim', 'tanvir', 'comparison'] as WarMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveProfile(mode)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                activeProfile === mode 
                  ? 'bg-zinc-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                  : 'text-zinc-600 hover:text-zinc-300'
              }`}
            >
              {mode === 'comparison' ? 'Global' : mode}
            </button>
          ))}
        </div>
      </header>

      {/* University Pedestals */}
      <section className="space-y-12">
        <div className="flex items-center justify-between border-b border-zinc-900/50 pb-8 px-4">
           <div className="flex items-center gap-4">
             <div className="w-1.5 h-10 bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
             <div>
               <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">University_Pedestals</h2>
               <p className="text-zinc-600 text-[9px] font-black uppercase mt-1 tracking-widest">Post-Secondary Command Center</p>
             </div>
           </div>
        </div>

        {/* Visualization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
          {HALL_OF_FAME.varsity_results.map((v, i) => (
            <HofCard
              key={i}
              type="varsity"
              title={v.university}
              rank={activeProfile === 'tamim' ? v.tamim_merit : activeProfile === 'tanvir' ? v.tanvir_merit : v.tamim_merit}
              peerRank={activeProfile === 'comparison' ? v.tanvir_merit : null}
              subject={activeProfile === 'tamim' ? v.subject_tamim : activeProfile === 'tanvir' ? v.subject_tanvir : (v.subject_tamim || v.subject_tanvir)}
              icon={v.university === 'Medical Admission Test' ? GraduationCap : Building2}
              isCompare={activeProfile === 'comparison'}
            />
          ))}
        </div>
      </section>

      {/* Infographics Bridge - Convergent Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch px-4">
        <div className="lg:col-span-2 bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 relative overflow-hidden group hover:border-amber-500/20 transition-all duration-500">
           <div className="flex justify-between mb-12 relative z-10">
              <div className="space-y-1">
                <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Merit_Convergence_Profile</h4>
                <p className="text-[8px] text-zinc-800 uppercase font-black">Historical Merit Density Spline</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Tamim</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Tanvir</span>
                </div>
              </div>
           </div>
           <div className="h-[280px] w-full grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={meritChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradTamim" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="gradTanvir" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#18181b" strokeDasharray="3 3" opacity={0.5} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#3f3f46', fontSize: 8, fontWeight: 900 }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    hide
                    domain={[0, 'dataMax + 500']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #18181b', borderRadius: '16px' }}
                    itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tamim" 
                    stroke="#ffffff" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#gradTamim)" 
                    animationDuration={2000}
                    dot={{ r: 2, fill: '#ffffff', strokeWidth: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tanvir" 
                    stroke="#fbbf24" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#gradTanvir)" 
                    animationDuration={2500}
                    dot={{ r: 2, fill: '#fbbf24', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-zinc-950 p-10 rounded-[3rem] border border-zinc-900 flex flex-col justify-between group hover:border-amber-500/20 transition-all duration-500">
           <div>
              <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic mb-8">Efficiency_Verdict</h4>
              <p className="text-sm text-zinc-500 leading-relaxed italic font-bold group-hover:text-amber-100 transition-colors uppercase">
                "Records indicate an unprecedented level of synchronization in Academic_Yield. Both units demonstrate top-tier resilience coefficients."
              </p>
           </div>
           <div className="space-y-4 pt-10 border-t border-zinc-900">
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-zinc-800 uppercase">Unit_Tamim_Grade</span>
                 <span className="text-xs font-black text-white">S+</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-[9px] font-black text-zinc-800 uppercase">Unit_Tanvir_Grade</span>
                 <span className="text-xs font-black text-white">S+</span>
              </div>
           </div>
        </div>
      </div>

      {/* Board Monoliths */}
      <section className="space-y-12">
        <div className="flex items-center gap-6 px-4">
           <div className="h-[1px] flex-grow bg-zinc-900" />
           <h2 className="text-3xl font-black text-zinc-500 uppercase italic leading-none">Board_Archives</h2>
           <div className="h-[1px] flex-grow bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {HALL_OF_FAME.board_results.map((exam, idx) => (
            <HofCard
              key={idx}
              type="board"
              title={exam.exam_name}
              rank={activeProfile === 'tamim' ? exam.results.TAMIM.gpa : activeProfile === 'tanvir' ? exam.results.TANVIR.gpa : exam.results.TAMIM.gpa}
              peerRank={activeProfile === 'comparison' ? exam.results.TANVIR.gpa : null}
              subject={`${exam.board} BOARD // ${exam.group}`}
              icon={Medal}
              isCompare={activeProfile === 'comparison'}
            />
          ))}
        </div>
      </section>

      {/* The Artifact Gallery (Prizes) */}
      <section className="space-y-12 px-4">
        <div className="flex items-center gap-4 border-b border-zinc-900 pb-8">
           <h2 className="text-3xl font-black text-white uppercase italic leading-none">Artifact_Gallery</h2>
           <div className="h-[1px] flex-grow bg-zinc-900" />
           <Star className="text-zinc-800 group-hover:text-amber-500 transition-colors" size={24} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {(activeProfile === 'tamim' || activeProfile === 'comparison') && (
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" /> Tamim_Achievements
              </h4>
              <div className="space-y-2">
                {HALL_OF_FAME.prizes.tamim.map((prize, i) => (
                  <div key={i} className="group p-6 bg-black border border-zinc-900 hover:border-amber-500/30 flex items-center justify-between transition-all duration-500 cursor-default">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-tight">{prize.event}</p>
                      <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{prize.subject}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`text-xl font-black italic tracking-tighter ${
                         prize.position === '1st' ? 'text-zinc-600 group-hover:text-amber-400' : 
                         prize.position === '2nd' ? 'text-zinc-700 group-hover:text-zinc-200' : 'text-zinc-800 group-hover:text-zinc-500'
                       }`}>
                         {prize.position}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeProfile === 'tanvir' || activeProfile === 'comparison') && (
            <div className="space-y-8">
              <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-amber-500 transition-colors" /> Tanvir_Achievements
              </h4>
              <div className="space-y-2">
                {HALL_OF_FAME.prizes.tanvir.map((prize, i) => (
                  <div key={i} className="group p-6 bg-black border border-zinc-900 hover:border-amber-500/30 flex items-center justify-between transition-all duration-500 cursor-default">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors uppercase tracking-tight">{prize.event}</p>
                      <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">{prize.subject}</p>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={`text-xl font-black italic tracking-tighter ${
                         prize.position === '1st' ? 'text-zinc-600 group-hover:text-amber-400' : 
                         prize.position === '2nd' ? 'text-zinc-700 group-hover:text-zinc-200' : 'text-zinc-800 group-hover:text-zinc-500'
                       }`}>
                         {prize.position}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Signature */}
      <div className="pt-20 border-t border-zinc-900 text-center opacity-30">
        <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[1.5em]">Seal of Absolute Mastery</p>
      </div>
    </div>
  );
};

export default HallOfFame;
