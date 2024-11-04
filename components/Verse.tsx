import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import VerseOptionsBottomSheet from "./BottomSheets/VerseOptionsBottomSheet";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";

const Verse = ({
  verseNumber,
  verse,
  abbr,
  chapterNumber,
  chapterName,
  isReading,
}: {
  verse: string;
  verseNumber: number;
  abbr: string;
  chapterNumber: number;
  chapterName: string;
  isReading: boolean;
}) => {
  const verseOptionsRef = React.useRef<BottomSheetModal>(null);
  const { settings } = useSettingsStore();

  return (
    <>
      <VerseOptionsBottomSheet
        verse={{
          abbr,
          chapterNumber,
          name: chapterName,
          verseNumber,
          verse,
        }}
        ref={verseOptionsRef}
      />
      <TouchableOpacity
        style={{
          alignItems: "flex-start",
          flexDirection: "row",
          gap: 10,
          paddingHorizontal: 10,
          backgroundColor: isReading ? COLORS.primary : "transparent",
        }}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          verseOptionsRef.current?.present();
        }}
      >
        <Text
          selectionColor={COLORS.tertiary}
          selectable
          style={[
            {
              fontFamily: FONTS.regular,
              flex: 1,
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
          {verseNumber}. {verse}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Verse;

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
