import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";

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
      onPress={() => {
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
          fontSize: 25,
        }}
      >
        Chapter {chapterNumber}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,
          fontSize: 20,
          color: COLORS.gray,
        }}
      >
        {nVerses} verses
      </Text>
    </TouchableOpacity>
  );
};

export default Chapter;
