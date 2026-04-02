
export type SubjectId = 'physics' | 'chemistry' | 'math' | 'all';
export type WarMode = 'tamim' | 'tanvir' | 'comparison';

export interface ThemeColors {
  primary: string;    // Darkest shade
  secondary: string;  // Mid shade
  accent: string;     // Light shade
  highlight: string;  // Glow/Highlight color
  bg: string;         // Background tint
  border: string;     // Border color
  text: string;       // Text color
}

export interface ProblemBreakdown {
  mcq: number;
  cq: number;
  written: number;
}

export interface ChapterData extends ProblemBreakdown {
  id: string;
  name: string;
  paper: 1 | 2;
  total: number;
}

export interface SubjectStats {
  id: SubjectId;
  name: string;
  chapters: ChapterData[];
}
