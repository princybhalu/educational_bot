import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  isProfilingComplete: boolean;
  setAuth: (value: boolean) => void;
  setProfiling: (value: boolean) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  //TODO : set here logic of routes checking
  isAuthenticated: true,
  isProfilingComplete: true,
  setAuth: (value) => set({ isAuthenticated: value }),
  setProfiling: (value) => set({ isProfilingComplete: value }),
}));
