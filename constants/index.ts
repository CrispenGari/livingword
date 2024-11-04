import data from "@/assets/data/en_bbe.json";
import { TBibleBook } from "@/types";

export const BIBLE = data as TBibleBook[];

export const LOGO = require("@/assets/images/adaptive-icon.png");

export const COLORS = {
  main: "#DFF2EB",
  primary: "#B9E5E8",
  secondary: "#7AB2D3",
  tertiary: "#4A628A",
  black: "#000000",
  white: "#ffffff",
  gray: "#8E9598",
  dark: "#243642",
};

export const Fonts = {
  GentiumPlusBold: require("@/assets/fonts/GentiumPlus-Bold.ttf"),
  GentiumPlusRegular: require("@/assets/fonts/GentiumPlus-Regular.ttf"),
  GentiumPlusItalic: require("@/assets/fonts/GentiumPlus-Italic.ttf"),
  GentiumPlusBoldItalic: require("@/assets/fonts/GentiumPlus-BoldItalic.ttf"),
};

export const FONTS = {
  regular: "GentiumPlusRegular",
  bold: "GentiumPlusBold",
  italic: "GentiumPlusItalic",
  boldItalic: "GentiumPlusBoldItalic",
};

export const STORAGE_NAMES = {
  SETTINGS: "living-word:settings",
  READ: "living-word:read",
  READ_LATER: "living-word:read-read",
  FAVORITES: "living-word:favorites",
  VERSE_OF_THE_DAY: "living-word:verse-of-the-day",
  SEARCH_TERMS: "living-word:search-terms",
};
