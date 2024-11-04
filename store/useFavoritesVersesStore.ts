import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
import { TVerse } from "@/types";

interface TState {
  verses: TVerse[];
  add: (verse: TVerse) => void;
  remove: (verse: TVerse) => void;
  clear: () => void;
}

export const useFavoritesVersesStore = create<TState>()(
  persist(
    (set, _get) => ({
      verses: [],
      clear: () => set({ ..._get(), verses: [] }),
      add: (verse) => set({ ..._get(), verses: [verse, ..._get().verses] }),
      remove: (verse) => {
        const computed = `${verse.abbr}${verse.chapterNumber}${verse.verseNumber}`;
        return set({
          ..._get(),
          verses: [
            ..._get().verses.filter(
              (f) => `${f.abbr}${f.chapterNumber}${f.verseNumber}` !== computed
            ),
          ],
        });
      },
    }),
    {
      name: STORAGE_NAMES.FAVORITES,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
