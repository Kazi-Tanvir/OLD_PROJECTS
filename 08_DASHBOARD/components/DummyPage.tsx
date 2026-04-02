
import React from 'react';

interface DummyPageProps {
  title: string;
  subtitle: string;
}

const DummyPage: React.FC<DummyPageProps> = ({ title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-4">
        <span className="text-zinc-700 text-[10px] font-black tracking-[0.5em] uppercase">ACCESSING_ZONE_0.1</span>
      </div>
      <h1 className="text-7xl font-black text-zinc-900 tracking-tighter uppercase italic mb-4">
        {title}
      </h1>
      <p className="text-zinc-600 font-bold uppercase tracking-widest text-sm max-w-lg mx-auto">
        {subtitle}. DATA_STREAM_RESTRICTED.
      </p>
      
      <div className="mt-12 w-24 h-[1px] bg-zinc-900" />
      
      <div className="mt-12 grid grid-cols-3 gap-8 opacity-20 grayscale">
         <div className="w-16 h-16 rounded-full border border-zinc-700 animate-pulse" />
         <div className="w-16 h-16 rounded-full border border-zinc-700 animate-pulse delay-75" />
         <div className="w-16 h-16 rounded-full border border-zinc-700 animate-pulse delay-150" />
      </div>
    </div>
  );
};

export default DummyPage;
