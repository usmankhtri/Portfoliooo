import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CursorVariant = 'default' | 'hover' | 'text' | 'button'

export interface AppState {
  isLoading: boolean
  hasSeenIntro: boolean
  soundEnabled: boolean
  activeCategory: string
  cursorVariant: CursorVariant
  finishLoading: () => void
  resetLoading: () => void
  toggleSound: () => void
  setActiveCategory: (category: string) => void
  setCursorVariant: (variant: CursorVariant) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoading: true,
      hasSeenIntro: false,
      soundEnabled: false,
      activeCategory: 'All',
      cursorVariant: 'default',
      finishLoading: () => set({ isLoading: false, hasSeenIntro: true }),
      resetLoading: () => set({ isLoading: true }),
      toggleSound: () => set((state: AppState) => ({ soundEnabled: !state.soundEnabled })),
      setActiveCategory: (category: string) => set({ activeCategory: category }),
      setCursorVariant: (variant: CursorVariant) => set({ cursorVariant: variant }),
    }),
    {
      name: 'usman-portfolio-storage',
      partialize: (state: AppState) => ({
        hasSeenIntro: state.hasSeenIntro,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
)

// Helper for manual intro triggers
export const replayIntro = () => {
  useAppStore.getState().resetLoading()
}
