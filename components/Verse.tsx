import { View, Text, TouchableOpacity } from "react-native";
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
}: {
  verse: string;
  verseNumber: number;
  abbr: string;
  chapterNumber: number;
  chapterName: string;
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
        }}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          verseOptionsRef.current?.present();
        }}
      >
        <Text
          selectable
          selectionColor={COLORS.tertiary}
          style={{ fontFamily: FONTS.regular }}
        ></Text>

        <Text
          selectionColor={COLORS.tertiary}
          selectable
          style={{
            fontFamily: FONTS.regular,
            flex: 1,
          }}
        >
          {verseNumber}. {verse}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Verse;
