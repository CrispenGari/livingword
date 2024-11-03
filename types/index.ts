export interface TBibleBook {
  abbrev: string;
  name: string;
  chapters: string[][];
}

export type TFontSize =
  | "normal"
  | "medium"
  | "small"
  | "large"
  | "xlarge"
  | "xsmall";

export type TTheme = "dark" | "light";
export type TSettings = {
  haptics: boolean;
  sound: boolean;
  fontSize: TFontSize;
  notify: boolean;
  keepAwake: boolean;
  brightness: number;
  theme: TTheme;
};

export type TVerse = {
  abbr: string;
  chapterNumber: number;
  name: string;
  verseNumber: number;
};
