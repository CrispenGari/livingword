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
      <Text style={{ fontFamily: FONTS.regular, fontSize: 20, lineHeight: 30 }}>
        {verseNumber}.
      </Text>
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
            fontSize: 25,
            flexWrap: "wrap",
            lineHeight: 30,
          }}
        >
          {firstChar}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 25,
            flex: 1,
            lineHeight: 30,
          }}
        >
          {rest}
        </Text>
      </View>
    </View>
  );
};

export default Verse;
