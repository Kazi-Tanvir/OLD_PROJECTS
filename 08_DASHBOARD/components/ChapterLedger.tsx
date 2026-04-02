
import React, { useState, useMemo } from 'react';
import { ChapterData, ThemeColors } from '../types';

interface ChapterLedgerProps {
  chapters: ChapterData[];
  theme: ThemeColors;
}

type SortKey = 'id' | 'name' | 'mcq' | 'cq' | 'written' | 'total';

const ChapterLedger: React.FC<ChapterLedgerProps> = ({ chapters, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' }>({
    key: 'id',
    direction: 'asc',
  });

  const activeChapters = chapters.filter(c => c.total > 0);

  const filteredAndSortedChapters = useMemo(() => {
    let result = activeChapters.filter(
      c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    result.sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [activeChapters, searchTerm, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <span className="opacity-20 ml-1">↕</span>;
    return sortConfig.direction === 'asc' ? <span className="ml-1">↑</span> : <span className="ml-1">↓</span>;
  };

  // Subject color map for "All Subjects" view hover effect
  const getSubjectColor = (id: string) => {
    if (id.startsWith('P')) return 'group-hover:text-blue-400 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]';
    if (id.startsWith('C')) return 'group-hover:text-emerald-400 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]';
    if (id.startsWith('M')) return 'group-hover:text-violet-400 group-hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]';
    return '';
  };

  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-zinc-900 bg-zinc-950/20 backdrop-blur-sm transition-all duration-500">
      <div 
        className="p-6 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between cursor-pointer group select-none gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-white tracking-tight uppercase italic group-hover:not-italic transition-all">Raw Data Grid</h3>
          <span className="px-2 py-0.5 rounded-full bg-zinc-900 text-[8px] font-black text-zinc-500 border border-zinc-800 group-hover:text-zinc-300 transition-colors">
            {filteredAndSortedChapters.length} / {activeChapters.length} CHAPTERS
          </span>
        </div>

        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <input
              type="text"
              placeholder="SEARCH CHAPTER..."
              className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-1.5 text-[10px] text-white focus:outline-none focus:border-zinc-600 transition-all w-48 font-mono"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <button 
            className="text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400 uppercase tracking-widest flex items-center gap-2 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isOpen ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-emerald-500'}`} 
              style={{ backgroundColor: isOpen ? undefined : theme.highlight, boxShadow: isOpen ? undefined : `0 0 8px ${theme.highlight}` }}
            /> 
            {isOpen ? 'Close View' : 'Open Detailed Ledger'}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="overflow-x-auto animate-in slide-in-from-top duration-500">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/10 border-b border-zinc-900/50">
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('id')}>
                  Code <SortIcon column="id" />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('name')}>
                  Name <SortIcon column="name" />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('mcq')}>
                  MCQ <SortIcon column="mcq" />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('cq')}>
                  CQ <SortIcon column="cq" />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('written')}>
                  Written <SortIcon column="written" />
                </th>
                <th className="px-8 py-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-right cursor-pointer hover:text-zinc-400 transition-colors" onClick={() => requestSort('total')}>
                  Total <SortIcon column="total" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedChapters.length > 0 ? (
                filteredAndSortedChapters.map((chapter) => (
                  <tr 
                    key={chapter.id}
                    className="group border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-all cursor-default"
                  >
                    <td className="px-8 py-5">
                      <span className={`mono text-xs font-bold transition-all duration-300 ${getSubjectColor(chapter.id)}`}>
                        {chapter.id}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-zinc-400 font-medium group-hover:text-white transition-colors">
                      {chapter.name}
                    </td>
                    <td className="px-8 py-5 text-xs text-zinc-500 mono group-hover:text-zinc-300">
                      {chapter.mcq}
                    </td>
                    <td className="px-8 py-5 text-xs text-zinc-500 mono group-hover:text-zinc-300">
                      {chapter.cq}
                    </td>
                    <td className="px-8 py-5 text-xs text-zinc-500 mono group-hover:text-zinc-300">
                      {chapter.written}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`mono text-sm font-black group-hover:scale-110 inline-block transition-all duration-300 ${getSubjectColor(chapter.id)}`}>
                        {chapter.total}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-zinc-700 text-xs uppercase font-black tracking-widest italic">
                    No results found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChapterLedger;
