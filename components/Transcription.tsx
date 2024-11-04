import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Animated, { SlideInDown } from "react-native-reanimated";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import * as Speech from "expo-speech";

const Transcription = ({
  verseIndex,
  verses,
  setState,
}: {
  verseIndex: number;
  verses: string[];
  setState: React.Dispatch<
    React.SetStateAction<{
      controls: boolean;
      verseIndex: number;
    }>
  >;
}) => {
  const { settings } = useSettingsStore();

  return (
    <Animated.View
      style={{
        backgroundColor:
          settings.theme === "light" ? COLORS.primary : COLORS.tertiary,
        padding: 20,
        position: "relative",
        height: 300,
      }}
      entering={SlideInDown.duration(200).delay(200)}
    >
      <View
        style={{
          height: 25,
          position: "absolute",
          alignSelf: "center",
          shadowColor: COLORS.tertiary,
          backgroundColor: COLORS.tertiary,
          elevation: 1,
          shadowOffset: {
            width: 2,
            height: 1,
          },
          shadowRadius: 5,
          shadowOpacity: 0.5,
          width: "80%",
          alignItems: "center",
          top: -13,
          borderRadius: 999,
          maxWidth: 100,
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            textTransform: "uppercase",
            fontSize: 11,
            color: COLORS.white,
          }}
        >
          Transcription.
        </Text>
      </View>

      <Text
        style={[
          {
            fontFamily: FONTS.regular,
            color: settings.theme === "light" ? COLORS.black : COLORS.white,
          },
          styles[settings.fontSize],
          {
            fontFamily:
              settings.fontWeight === "boldWeight" &&
              settings.fontStyle === "italicStyle"
                ? FONTS.boldItalic
                : settings.fontStyle === "italicStyle"
                ? FONTS.italic
                : settings.fontWeight === "boldWeight"
                ? FONTS.bold
                : FONTS.regular,
          },
        ]}
      >
        {verseIndex + 1}. {verses[verseIndex]}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
          maxWidth: 300,
          justifyContent: "center",
          gap: 10,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.main,
          }}
          onPress={async () => {
            if (settings.haptics) await onImpact();
            Speech.stop();
            setState((s) => ({ ...s, verseIndex: -1, controls: false }));
          }}
        >
          <Ionicons
            name="stop"
            size={24}
            color={settings.theme === "light" ? COLORS.black : COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Transcription;

const styles = StyleSheet.create({
  xsmall: {},
  small: {
    fontSize: 16,
  },
  normal: { fontSize: 20 },
  medium: { fontSize: 24 },
  large: { fontSize: 28 },
  xlarge: { fontSize: 32 },
});
