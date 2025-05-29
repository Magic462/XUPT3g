// src/stores/editorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EditorCacheKey = 'activity' | 'trainPlan' | 'direction';

interface EditorStore {
  cache: Record<EditorCacheKey, string>;
  setContent: (key: EditorCacheKey, content: string) => void;
  getContent: (key: EditorCacheKey) => string;
  clearContent: (key: EditorCacheKey) => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      cache: { activity: '', trainPlan: '', direction: '' },
      setContent: (key, content) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: content,
          },
        })),
      getContent: (key) => get().cache[key],
      clearContent: (key) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: '',
          },
        })),
    }),
    {
      name: 'editor-cache-storage', // localStorage key
    }
  )
);
