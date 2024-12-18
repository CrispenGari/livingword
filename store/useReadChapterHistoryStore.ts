import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";

type TChapter = {
  abbr: string;
  name: string;
  chapterNumber: number;
};
interface TReadChapterHistoryState {
  chapters: TChapter[];
  add: (chapter: TChapter) => void;
  remove: (chapter: TChapter) => void;
  clear: () => void;
}

export const useReadChapterHistoryStore = create<TReadChapterHistoryState>()(
  persist(
    (set, _get) => ({
      chapters: [],
      clear: () => set({ ..._get(), chapters: [] }),
      add: (chapter) =>
        set({ ..._get(), chapters: [chapter, ..._get().chapters] }),
      remove: (chapter) =>
        set({
          ..._get(),
          chapters: [..._get().chapters.filter((f) => f.abbr !== chapter.abbr)],
        }),
    }),
    {
      name: STORAGE_NAMES.READ,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
