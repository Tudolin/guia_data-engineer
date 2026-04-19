import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  completedStages: number[]
  markStageComplete: (stageId: number) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedStages: [],
      markStageComplete: (stageId: number) =>
        set((state) => ({
          completedStages: state.completedStages.includes(stageId)
            ? state.completedStages
            : [...state.completedStages, stageId]
        })),
    }),
    {
      name: 'progress-storage',
    }
  )
)