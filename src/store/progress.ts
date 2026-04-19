import { create } from 'zustand';

interface ProgressState {
  completedStages: number[];
  markStageComplete: (stageId: number) => void;
  resetProgress: () => void;
}

const loadProgress = (): number[] => {
  const savedProgress = localStorage.getItem('userProgress');
  return savedProgress ? JSON.parse(savedProgress) : [];
};

export const useProgressStore = create<ProgressState>((set) => ({
  completedStages: loadProgress(),
  markStageComplete: (stageId) =>
    set((state) => {
      const updatedStages = [...state.completedStages, stageId];
      localStorage.setItem('userProgress', JSON.stringify(updatedStages));
      return { completedStages: updatedStages };
    }),
  resetProgress: () =>
    set(() => {
      localStorage.removeItem('userProgress');
      return { completedStages: [] };
    }),
}));