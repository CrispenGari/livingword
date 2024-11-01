import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";

const Chapter = ({
  chapterNumber,
  nVerses,
  chapter,
  book,
}: {
  chapterNumber: number;
  nVerses: number;
  chapter: string[];
  book: string;
}) => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        backgroundColor: chapterNumber % 2 === 1 ? COLORS.main : COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 2,
      }}
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
        router.push({
          pathname: "/(book)/chapter",
          params: {
            chapter: JSON.stringify({
              verses: chapter,
              book,
              chapterNumber,
            }),
          },
        });
      }}
    >
      <Text
        style={{
          fontFamily: FONTS.bold,
        }}
      >
        Chapter {chapterNumber}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,

          color: COLORS.gray,
        }}
      >
        {nVerses} verses
      </Text>
    </TouchableOpacity>
  );
};

export default Chapter;
