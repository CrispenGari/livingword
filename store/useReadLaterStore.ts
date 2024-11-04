import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";

type TChapter = {
  abbr: string;
  name: string;
  chapterNumber: number;
  verses: string[];
};
interface TState {
  chapters: TChapter[];
  add: (chapter: TChapter) => void;
  remove: (chapter: TChapter) => void;
  clear: () => void;
}

export const useReaderLaterStore = create<TState>()(
  persist(
    (set, _get) => ({
      chapters: [],
      clear: () => set({ ..._get(), chapters: [] }),
      add: (chapter) =>
        set({ ..._get(), chapters: [chapter, ..._get().chapters] }),
      remove: (chapter) => {
        const computed =
          `${chapter.abbr}${chapter.chapterNumber}`.toLowerCase();
        return set({
          ..._get(),
          chapters: [
            ..._get().chapters.filter(
              (f) => `${f.abbr}${f.chapterNumber}`.toLowerCase() !== computed
            ),
          ],
        });
      },
    }),
    {
      name: STORAGE_NAMES.READ_LATER,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
