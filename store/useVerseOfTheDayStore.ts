import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
import { TVerse } from "@/types";

interface TState {
  verse: {
    verse: TVerse | null;
    date: string;
    triggered: boolean;
  };
  update: (verse: { verse: TVerse; date: string; triggered: boolean }) => void;
}

export const useVerseOfTheDayStore = create<TState>()(
  persist(
    (set, _get) => ({
      verse: {
        date: new Date().toLocaleDateString(),
        triggered: false,
        verse: null,
      },
      update: (verse) => set({ ..._get(), verse }),
    }),
    {
      name: STORAGE_NAMES.VERSE_OF_THE_DAY,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
