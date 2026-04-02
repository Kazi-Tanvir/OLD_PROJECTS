
import { SubjectId, ThemeColors, WarMode } from './types';

export const THEMES: Record<SubjectId, ThemeColors> = {
  all: {
    primary: '#18181b',   // zinc-900
    secondary: '#27272a', // zinc-800
    accent: '#71717a',    // zinc-500
    highlight: '#ffffff', // white
    bg: 'rgba(255, 255, 255, 0.05)',
    border: '#27272a',    // zinc-800
    text: '#fafafa'       // zinc-50
  },
  physics: {
    primary: '#1e3a8a',   // blue-900
    secondary: '#3b82f6', // blue-500
    accent: '#93c5fd',    // blue-300
    highlight: '#22d3ee', // cyan-400
    bg: 'rgba(30, 58, 138, 0.1)',
    border: '#1e40af',    // blue-800
    text: '#60a5fa'      // blue-400
  },
  chemistry: {
    primary: '#064e3b',   // emerald-900
    secondary: '#10b981', // emerald-500
    accent: '#6ee7b7',    // emerald-300
    highlight: '#5eead4', // teal-300
    bg: 'rgba(6, 78, 59, 0.1)',
    border: '#065f46',    // emerald-800
    text: '#34d399'      // emerald-400
  },
  math: {
    primary: '#4c1d95',   // violet-900
    secondary: '#8b5cf6', // violet-500
    accent: '#c4b5fd',    // violet-300
    highlight: '#e879f9', // fuchsia-400
    bg: 'rgba(76, 29, 149, 0.1)',
    border: '#5b21b6',    // violet-800
    text: '#a78bfa'      // violet-400
  }
};

export const WAR_THEMES: Record<WarMode, ThemeColors> = {
  tamim: {
    primary: '#312e81',   // indigo-900
    secondary: '#4f46e5', // indigo-600
    accent: '#818cf8',    // indigo-400
    highlight: '#818cf8', // indigo-400
    bg: 'rgba(79, 70, 229, 0.1)',
    border: '#4338ca',    // indigo-700
    text: '#c7d2fe'       // indigo-200
  },
  tanvir: {
    primary: '#064e3b',   // emerald-900
    secondary: '#0d9488', // teal-600
    accent: '#2dd4bf',    // teal-400
    highlight: '#2dd4bf', // teal-400
    bg: 'rgba(13, 148, 136, 0.1)',
    border: '#0f766e',    // teal-700
    text: '#ccfbf1'       // teal-100
  },
  comparison: {
    primary: '#18181b',   // zinc-900
    secondary: '#27272a', // zinc-800
    accent: '#71717a',    // zinc-500
    highlight: '#ffffff', // white
    bg: 'rgba(255, 255, 255, 0.05)',
    border: '#27272a',    // zinc-800
    text: '#fafafa'       // zinc-50
  }
};
