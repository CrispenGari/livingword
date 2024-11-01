import { View, Text } from "react-native";
import React from "react";
import { FONTS } from "@/constants";

const Verse = ({
  verseNumber,
  verse,
}: {
  verse: string;
  verseNumber: number;
}) => {
  const firstChar = verse.charAt(0);
  const rest = verse.slice(1);
  return (
    <View
      style={{
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ fontFamily: FONTS.regular }}>{verseNumber}.</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,

            flexWrap: "wrap",
          }}
        >
          {firstChar}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,

            flex: 1,
          }}
        >
          {rest}
        </Text>
      </View>
    </View>
  );
};

export default Verse;
