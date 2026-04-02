
import React from 'react';
import { User, Swords, Archive, Flame, Trophy } from 'lucide-react';

export type PageId = 'profile' | 'war' | 'ruins' | 'dojo' | 'hall';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'war', icon: Swords, label: 'The War' },
    { id: 'ruins', icon: Archive, label: 'The Ruins' },
    { id: 'dojo', icon: Flame, label: 'The Dojo' },
    { id: 'hall', icon: Trophy, label: 'Hall of Fame' },
  ];

  return (
    <nav className="fixed right-0 top-0 h-screen w-20 bg-zinc-950/80 backdrop-blur-md border-l border-zinc-800 z-[200] flex flex-col items-center justify-center gap-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;

        return (
          <div key={item.id} className="relative group flex items-center justify-center">
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] whitespace-nowrap opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              {item.label}
              {/* Tooltip Arrow */}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-zinc-900 border-r border-t border-zinc-800 rotate-45" />
            </div>

            {/* Nav Button */}
            <button
              onClick={() => onNavigate(item.id as PageId)}
              className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
                isActive 
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute -right-[11px] w-1 h-8 bg-white rounded-l shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-500" />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
};

export default Sidebar;
