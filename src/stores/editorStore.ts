import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type EditorCacheKey = 'activity' | 'trainPlan' | 'direction';

interface CachedContent {
  html: string;
  timestamp: number;
}

interface EditorStore {
  cache: Record<EditorCacheKey, CachedContent>;
  setContent: (key: EditorCacheKey, content: string) => void;
  getContent: (key: EditorCacheKey) => string;
  clearContent: (key: EditorCacheKey) => void;
}

// 过期时间一天
const EXPIRATION_TIME = 1 * 24 * 60 * 60 * 1000;

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      cache: {
        activity: { html: '', timestamp: 0 },
        trainPlan: { html: '', timestamp: 0 },
        direction: { html: '', timestamp: 0 },
      },
      setContent: (key, content) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: {
              html: content,
              timestamp: Date.now(),
            },
          },
        })),
      getContent: (key) => {
        const item = get().cache[key];
        if (!item || !item.timestamp) return '';
        const now = Date.now();
        if (now - item.timestamp > EXPIRATION_TIME) {
          // 一天过期后自动清除
          set((state) => ({
            cache: {
              ...state.cache,
              [key]: { html: '', timestamp: 0 },
            },
          }));
          return '';
        }
        return item.html;
      },
      clearContent: (key) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { html: '', timestamp: 0 },
          },
        })),
    }),
    {
      name: 'editor-cache-storage',
    }
  )
);
