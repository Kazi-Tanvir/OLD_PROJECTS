
import React from 'react';
import { WarMode, ThemeColors } from '../types';

interface WarTabsProps {
  activeId: WarMode;
  onSelect: (id: WarMode) => void;
  themes: Record<WarMode, ThemeColors>;
}

const WarTabs: React.FC<WarTabsProps> = ({ activeId, onSelect, themes }) => {
  const modes: { id: WarMode; label: string }[] = [
    { id: 'tamim', label: 'Operator: Tamim' },
    { id: 'tanvir', label: 'Operator: Tanvir' },
    { id: 'comparison', label: 'H2H Comparison' }
  ];

  return (
    <div className="flex justify-center md:justify-end">
      <div className="bg-zinc-900/50 p-1 rounded-xl flex flex-wrap gap-1 border border-zinc-800">
        {modes.map((mode) => {
          const isActive = activeId === mode.id;
          const theme = themes[mode.id];

          return (
            <button
              key={mode.id}
              onClick={() => onSelect(mode.id)}
              className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{
                backgroundColor: isActive ? theme.secondary : 'transparent',
                boxShadow: isActive ? `0 0 20px ${theme.highlight}22` : 'none',
              }}
            >
              <span className="relative z-10">{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WarTabs;
