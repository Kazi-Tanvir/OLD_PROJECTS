
import React, { useState, useEffect } from 'react';
import { 
  RadialBarChart, RadialBar, 
  LineChart, Line, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer 
} from 'recharts';
import { Trophy, Clock, Shield, Zap, Target, Activity, X, Fingerprint, ZapOff, Cpu, Crosshair, Flame, History, BarChart3, Binary, AlertCircle } from 'lucide-react';
import { PROFILES } from '../data/profiles';
import { HALL_OF_FAME } from '../data/hallOfFame';

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options).toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 px-6 py-2 rounded-full backdrop-blur-md flex items-center gap-4">
      <Clock size={14} className="text-zinc-500" />
      <div className="flex flex-col items-end leading-none">
        <span className="text-[10px] font-black text-zinc-500 tracking-widest">{formatDate(time)}</span>
        <span className="text-xl font-mono font-black text-zinc-100 drop-shadow-[0_0_8px_rgba(212,212,216,0.3)] tracking-tighter mt-0.5">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue.toString().padStart(2, '0')}</>;
};

const PlayerDetailModal = ({ player, onClose, isTamim }: { player: any, onClose: () => void, isTamim: boolean }) => {
  const accentColor = isTamim ? 'text-indigo-400' : 'text-teal-400';
  const borderColor = isTamim ? 'border-indigo-500/30' : 'border-teal-500/30';
  const glowColor = isTamim ? 'shadow-indigo-500/20' : 'shadow-teal-500/20';
  const prizes = isTamim ? HALL_OF_FAME.prizes.tamim : HALL_OF_FAME.prizes.tanvir;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-4xl bg-zinc-950 rounded-[3rem] border ${borderColor} ${glowColor} shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-500 flex flex-col lg:flex-row h-auto lg:h-[700px]`}>
        
        {/* Left Side: Identity Hud */}
        <div className={`w-full lg:w-80 bg-zinc-900/50 p-10 border-b lg:border-b-0 lg:border-r ${borderColor} flex flex-col items-center justify-between`}>
          <div className="text-center w-full">
            <div className={`w-32 h-32 rounded-3xl mx-auto bg-gradient-to-br ${isTamim ? 'from-indigo-600 to-indigo-900' : 'from-teal-600 to-teal-900'} flex items-center justify-center shadow-2xl mb-8`}>
              <span className="text-5xl font-black text-white tracking-tighter">{player.initials}</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">{player.name}</h2>
            <div className={`inline-block px-3 py-1 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-widest ${accentColor}`}>
              {player.rank_tier}
            </div>
            <p className="text-zinc-500 text-xs mt-6 italic font-bold">"{player.motto}"</p>
          </div>

          <div className="w-full space-y-4 mt-12">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
               <span>Access_Level</span>
               <span className="text-white">Alpha_Clearance</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
               <span>Encryption</span>
               <span className="text-white">Active_Pulse</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
              <div className={`h-full animate-pulse ${isTamim ? 'bg-indigo-500' : 'bg-teal-500'}`} style={{ width: '85%' }} />
            </div>
          </div>
        </div>

        {/* Right Side: Data Modules */}
        <div className="flex-grow p-10 lg:p-12 overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Fingerprint size={20} className={accentColor} />
              <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Tactical Archive</h3>
            </div>
            <button onClick={onClose} className="p-3 rounded-full hover:bg-zinc-900 text-zinc-500 hover:text-white transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Bio Info Module */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-widest border-b border-zinc-900 pb-2">Identification_Metrics</h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: 'Udvash_Node', val: player.udvash_id },
                  { label: 'Institution_Proxy', val: player.institution },
                  { label: 'Board_Identity', val: player.board_reg },
                  { label: 'Timeline_Session', val: player.session }
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1 tracking-tighter">{item.label}</p>
                    <p className="text-sm font-mono font-black text-zinc-300">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Module */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-zinc-700 uppercase tracking-widest border-b border-zinc-900 pb-2">Merit_Artifacts</h4>
              <div className="space-y-3">
                {prizes.slice(0, 4).map((prize, i) => (
                  <div key={i} className="flex items-center justify-between group/prize cursor-default">
                    <div className="max-w-[70%]">
                       <p className="text-[10px] font-bold text-zinc-300 group-hover/prize:text-white transition-colors truncate">{prize.event}</p>
                       <p className="text-[8px] font-black text-zinc-600 uppercase group-hover/prize:text-zinc-500 transition-colors">{prize.subject}</p>
                    </div>
                    <span className={`text-sm font-black italic ${prize.position === '1st' ? accentColor : 'text-zinc-700'}`}>
                      {prize.position}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Performance Status */}
          <div className="p-8 rounded-[2rem] bg-zinc-900/30 border border-zinc-900 relative overflow-hidden group">
            <Cpu size={120} className="absolute -right-8 -bottom-8 text-zinc-900/50 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
              <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6 italic">Neural_Network_Verdict</h4>
              <p className="text-xs text-zinc-400 font-bold leading-relaxed uppercase">
                The unit exhibits high consistency across <span className="text-zinc-100">written_analytical</span> sectors. Neural weight distribution suggests peak performance during high-pressure temporal windows. System status: <span className={accentColor}>OPTIMIZED</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerCard = ({ profile, isTamim, onClick }: { profile: any, isTamim: boolean, onClick: () => void }) => {
  const glowHover = isTamim ? 'hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]' : 'hover:shadow-[0_0_50px_rgba(20,184,166,0.15)]';
  const borderHover = isTamim ? 'hover:border-indigo-500/40' : 'hover:border-teal-500/40';
  const gradClass = isTamim ? 'from-zinc-100 to-zinc-400 group-hover:from-indigo-400 group-hover:to-indigo-600' : 'from-zinc-700 to-zinc-900 group-hover:from-teal-600 group-hover:to-teal-800';
  const initialsClass = isTamim ? 'text-black group-hover:text-white' : 'text-zinc-400 group-hover:text-white';

  return (
    <div 
      onClick={onClick}
      className={`bg-zinc-950 p-8 rounded-[3rem] border border-zinc-900 relative overflow-hidden group transition-all duration-700 shadow-[0_0_40px_rgba(255,255,255,0.02)] cursor-pointer ${borderHover} ${glowHover}`}
    >
      <div className="absolute top-4 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
         <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">ACCESS_DETAIL</span>
         <div className={`w-1 h-1 rounded-full animate-ping ${isTamim ? 'bg-indigo-400' : 'bg-teal-400'}`} />
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
        <div className="relative">
          <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${gradClass} flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-500 shadow-2xl`}>
            <span className={`text-4xl font-black ${initialsClass} -rotate-3 group-hover:rotate-0 transition-all duration-500 tracking-tighter`}>
              {profile.initials}
            </span>
          </div>
          <div className={`absolute -inset-2 border-2 border-zinc-900/50 rounded-3xl -z-10 rotate-6 group-hover:rotate-3 group-hover:border-white/10 transition-all duration-500`} />
        </div>

        <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter group-hover:not-italic transition-all">{profile.name}</h2>
            <div className={`px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors`}>
              {profile.rank_tier}
            </div>
          </div>
          <p className="text-zinc-500 text-xs font-bold italic mb-6 transition-colors group-hover:text-zinc-400">"{profile.motto}"</p>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-left">
            <div>
              <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1 group-hover:text-zinc-500">UDVASH_IDENTIFIER</p>
              <p className="text-xs font-mono font-black text-zinc-300 group-hover:text-white">{profile.udvash_id}</p>
            </div>
            <div>
              <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest mb-1 group-hover:text-zinc-500">INSTITUTION_NODE</p>
              <p className="text-xs font-mono font-black text-zinc-300 group-hover:text-white">{profile.institution}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-[-20px] right-[-20px] text-zinc-900/40 text-9xl font-black italic pointer-events-none select-none group-hover:text-zinc-800/40 transition-colors">
        {profile.board_roll.slice(-2)}
      </div>
    </div>
  );
};

const MissionCard = ({ title, status, progress, icon: Icon, colorClass, highlightClass }: { title: string, status: string, progress: number, icon: any, colorClass: string, highlightClass: string }) => (
  <div className="bg-zinc-950 p-6 rounded-[2rem] border border-zinc-900 hover:border-zinc-700 transition-all group flex flex-col justify-between h-48 relative overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]">
    <div className={`absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 ${colorClass}`}>
      <Icon size={120} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div className="space-y-1">
        <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-zinc-100 transition-colors">{title}</h4>
        <div className="flex items-center gap-2">
           <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${highlightClass}`} />
           <span className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter">{status}</span>
        </div>
      </div>
      <Icon size={16} className="text-zinc-800 group-hover:text-zinc-100 transition-colors" />
    </div>
    
    <div className="relative z-10">
       <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black text-zinc-700 uppercase">Sync_Level</span>
          <span className="text-xs font-black text-white">{progress}%</span>
       </div>
       <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${highlightClass}`} style={{ width: `${progress}%` }} />
       </div>
    </div>
  </div>
);

const TheGladiators = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<{ profile: any, isTamim: boolean } | null>(null);
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const dojoData = [
    { name: 'Tamim', value: 19495, fill: '#818cf8' },
    { name: 'Tanvir', value: 18200, fill: '#2dd4bf' },
  ];

  const momentumData = [
    { name: 'E1', t: 65, v: 62 },
    { name: 'E2', t: 78, v: 75 },
    { name: 'E3', t: 72, v: 81 },
    { name: 'E4', t: 89, v: 76 },
    { name: 'E5', t: 85, v: 88 },
  ];

  const masteryData = [
    { subject: 'PHYSICS', A: 95, B: 88, fullMark: 100 },
    { subject: 'CHEMISTRY', A: 89, B: 92, fullMark: 100 },
    { subject: 'MATH', A: 98, B: 85, fullMark: 100 },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-12 pb-32 relative">
      {/* 1. Command Header */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-zinc-700" />
            <span className="text-[10px] font-black text-zinc-700 tracking-[0.5em] uppercase">Security_Clearance_Alpha</span>
          </div>
          <h1 className="text-7xl font-black text-white tracking-tighter uppercase italic leading-none">
            THE GLADIATORS
          </h1>
          <p className="text-zinc-500 text-[10px] font-black tracking-[0.4em] uppercase">Player Overview & Overarching Stats Archive</p>
        </div>
        <RealTimeClock />
      </header>

      {/* 2. Player Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlayerCard profile={PROFILES.tamim} isTamim={true} onClick={() => setSelectedPlayer({ profile: PROFILES.tamim, isTamim: true })} />
        {/* Fixed: isTanvir prop corrected to isTamim={false} */}
        <PlayerCard profile={PROFILES.tanvir} isTamim={false} onClick={() => setSelectedPlayer({ profile: PROFILES.tanvir, isTamim: false })} />
      </div>

      {/* 3. Squad Mission Briefing (NEW CARDS SECTION) */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 border-b border-zinc-900/50 pb-6">
           <Crosshair size={18} className="text-zinc-700" />
           <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Squad_Mission_Briefing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MissionCard 
            title="Operation: Volume_Limit" 
            status="IN_PROGRESS" 
            progress={82} 
            icon={Flame} 
            colorClass="text-orange-500" 
            highlightClass="bg-orange-500"
          />
          <MissionCard 
            title="Operation: Central_Archive" 
            status="SYNCHRONIZING" 
            progress={45} 
            icon={History} 
            colorClass="text-indigo-500" 
            highlightClass="bg-indigo-500"
          />
          <MissionCard 
            title="Operation: Alpha_Tier" 
            status="STABILIZED" 
            progress={94} 
            icon={Trophy} 
            colorClass="text-amber-500" 
            highlightClass="bg-amber-500"
          />
          <MissionCard 
            title="Operation: Weakness_Void" 
            status="ANALYTIC_RUN" 
            progress={27} 
            icon={AlertCircle} 
            colorClass="text-emerald-500" 
            highlightClass="bg-emerald-500"
          />
        </div>
      </section>

      {/* 4. Performance Metrics Banner (NEW STATUS ROW) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 flex items-center gap-6 group hover:border-zinc-700 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
               <Binary className="text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div>
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Tactical_Yield</p>
               <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">98.4% Efficiency</h4>
            </div>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 flex items-center gap-6 group hover:border-zinc-700 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
               <BarChart3 className="text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div>
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Squad_Momentum</p>
               <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">+12.4% Increase</h4>
            </div>
         </div>
         <div className="p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 flex items-center gap-6 group hover:border-zinc-700 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
               <Shield className="text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <div>
               <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 italic">Integrity_Check</p>
               <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Status: OPTIMIZED</h4>
            </div>
         </div>
      </div>

      {/* 5. Global Overview Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Widget 1: The Dojo (Volume) */}
        <div 
          onMouseEnter={() => setActiveWidget('dojo')}
          onMouseLeave={() => setActiveWidget(null)}
          className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 group hover:border-zinc-700 transition-all flex flex-col justify-between h-[320px] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={14} className={`transition-colors duration-500 ${activeWidget === 'dojo' ? 'text-zinc-100' : 'text-zinc-600'}`} />
            <h4 className={`text-[10px] font-black uppercase tracking-widest italic transition-colors duration-500 ${activeWidget === 'dojo' ? 'text-zinc-300' : 'text-zinc-500'}`}>The_Dojo // Volume</h4>
          </div>
          <div className="h-40 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={12} data={dojoData}>
                <RadialBar background={{ fill: '#18181b' }} dataKey="value" cornerRadius={6} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] font-black">
              <span className="text-zinc-500 group-hover:text-indigo-400 transition-colors">TAMIM</span>
              <span className="text-zinc-300">19.4K SLV</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black">
              <span className="text-zinc-500 group-hover:text-teal-400 transition-colors">TANVIR</span>
              <span className="text-zinc-300">18.2K SLV</span>
            </div>
          </div>
        </div>

        {/* Widget 2: The War (Momentum) */}
        <div 
          onMouseEnter={() => setActiveWidget('war')}
          onMouseLeave={() => setActiveWidget(null)}
          className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 group hover:border-zinc-700 transition-all flex flex-col justify-between h-[320px] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap size={14} className={`transition-all duration-500 ${activeWidget === 'war' ? 'text-yellow-400 scale-125' : 'text-zinc-600'}`} />
            <h4 className={`text-[10px] font-black uppercase tracking-widest italic transition-colors duration-500 ${activeWidget === 'war' ? 'text-zinc-300' : 'text-zinc-500'}`}>The_War // Momentum</h4>
          </div>
          <div className="h-40 opacity-40 group-hover:opacity-100 transition-all duration-700">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momentumData}>
                <Line type="monotone" dataKey="t" stroke="#818cf8" strokeWidth={3} dot={false} animationDuration={2000} />
                <Line type="monotone" dataKey="v" stroke="#2dd4bf" strokeWidth={3} dot={false} animationDuration={2500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[9px] text-zinc-600 font-black uppercase leading-tight tracking-tighter group-hover:text-zinc-400 transition-colors">
            Tracking efficiency variance across last 5 tactical engagements. Stablization: 94.2%.
          </p>
        </div>

        {/* Widget 3: The Ruins (Mastery) */}
        <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 group hover:border-zinc-700 transition-all flex flex-col justify-between h-[320px] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-zinc-300 transition-colors">The_Ruins // Mastery</h4>
          </div>
          <div className="h-44 opacity-60 group-hover:opacity-100 transition-all duration-700">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={masteryData}>
                <PolarGrid stroke="#18181b" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#3f3f46', fontSize: 7, fontWeight: 900 }} />
                <Radar dataKey="A" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} />
                <Radar dataKey="B" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.1} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between pt-4 border-t border-zinc-900">
             <span className="text-[8px] font-black text-zinc-800 uppercase group-hover:text-indigo-900 transition-colors">Physics</span>
             <span className="text-[8px] font-black text-zinc-800 uppercase group-hover:text-teal-900 transition-colors">Chemistry</span>
             <span className="text-[8px] font-black text-zinc-800 uppercase group-hover:text-emerald-900 transition-colors">Math</span>
          </div>
        </div>

        {/* Widget 4: Hall of Fame (Trophies) */}
        <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 group hover:border-zinc-700 transition-all flex flex-col justify-between h-[320px] relative overflow-hidden hover:shadow-[0_0_30px_rgba(251,191,36,0.02)]">
          <Trophy size={80} className="absolute -right-8 -bottom-8 text-zinc-900/50 group-hover:text-amber-500/10 transition-all duration-700" />
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={14} className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic group-hover:text-amber-200 transition-colors">Hall_of_Fame // Feats</h4>
          </div>
          <div className="flex-grow flex flex-col justify-center space-y-6">
            <div className="group/tamim">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover/tamim:text-indigo-400 transition-colors">Unit_Tamim</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white italic mono leading-none group-hover/tamim:not-italic transition-all">
                  <AnimatedCounter value={12} />
                </span>
                <span className="text-xs font-black text-zinc-700 uppercase group-hover/tamim:text-indigo-900 transition-colors">Merits</span>
              </div>
            </div>
            <div className="group/tanvir">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 group-hover/tanvir:text-teal-400 transition-colors">Unit_Tanvir</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white italic mono leading-none group-hover/tanvir:not-italic transition-all">
                  <AnimatedCounter value={8} />
                </span>
                <span className="text-xs font-black text-zinc-700 uppercase group-hover/tanvir:text-teal-900 transition-colors">Merits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedPlayer && (
        <PlayerDetailModal 
          player={selectedPlayer.profile} 
          isTamim={selectedPlayer.isTamim} 
          onClose={() => setSelectedPlayer(null)} 
        />
      )}
    </div>
  );
};

export default TheGladiators;
