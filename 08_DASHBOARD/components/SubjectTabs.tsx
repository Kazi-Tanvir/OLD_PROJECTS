
import React from 'react';
import { SubjectId, ThemeColors } from '../types';

interface SubjectTabsProps {
  activeId: SubjectId;
  onSelect: (id: SubjectId) => void;
  themes: Record<SubjectId, ThemeColors>;
}

const SubjectTabs: React.FC<SubjectTabsProps> = ({ activeId, onSelect, themes }) => {
  const subjects: { id: SubjectId; label: string }[] = [
    { id: 'all', label: 'All Subjects' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'math', label: 'Math' }
  ];

  return (
    <div className="flex justify-center md:justify-end mt-6">
      <div className="bg-zinc-900/50 p-1 rounded-xl flex flex-wrap gap-1 border border-zinc-800">
        {subjects.map((sub) => {
          const isActive = activeId === sub.id;
          const theme = themes[sub.id];

          return (
            <button
              key={sub.id}
              onClick={() => onSelect(sub.id)}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden group ${
                isActive 
                  ? 'text-white' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
              style={{
                backgroundColor: isActive ? theme.primary : 'transparent',
                boxShadow: isActive ? `0 0 20px ${theme.highlight}22` : 'none',
              }}
            >
              {isActive && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(to top, ${theme.highlight}, transparent)` }}
                />
              )}
              <span className="relative z-10">{sub.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectTabs;
