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
};

export const Fonts = {
  DongleBold: require("@/assets/fonts/Dongle-Bold.ttf"),
  DongleRegular: require("@/assets/fonts/Dongle-Regular.ttf"),
  DongleLight: require("@/assets/fonts/Dongle-Light.ttf"),
};

export const FONTS = {
  regular: "DongleRegular",
  bold: "DongleBold",
  light: "DongleLight",
};
