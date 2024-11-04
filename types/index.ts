export interface TBibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

export type TSearchTerm = {
  all: string;
  new: string;
  old: string;
};

export type TFontSize =
  | "normal"
  | "medium"
  | "small"
  | "large"
  | "xlarge"
  | "xsmall";

export type TFontStyle = "normalStyle" | "italicStyle";
export type TFontWeight = "normalWeight" | "boldWeight";

export type TTheme = "dark" | "light";
export type TSettings = {
  haptics: boolean;
  sound: boolean;
  fontSize: TFontSize;
  notify: boolean;
  keepAwake: boolean;
  brightness: number;
  theme: TTheme;
  fontWeight: TFontWeight;
  fontStyle: TFontStyle;
};

export type TVerse = {
  abbr: string;
  chapterNumber: number;
  name: string;
  verseNumber: number;
  verse: string;
};
