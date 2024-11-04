import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "./storage";
import { STORAGE_NAMES } from "@/constants";
import { TSearchTerm } from "@/types";

interface TSearchTermState {
  terms: TSearchTerm;
  update: (settings: TSearchTerm) => void;
  restore: () => void;
}

const initialState = {
  all: "",
  new: "",
  old: "",
} satisfies TSearchTerm;

export const useSearchTermsStore = create<TSearchTermState>()(
  persist(
    (set, _get) => ({
      terms: initialState,
      update: (terms) => set({ ..._get(), terms }),
      restore: () => set({ ..._get(), terms: initialState }),
    }),
    {
      name: STORAGE_NAMES.SEARCH_TERMS,
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
