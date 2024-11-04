import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TVerse } from "@/types";
import { COLORS, FONTS } from "@/constants";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import VerseOptionsBottomSheet from "./BottomSheets/VerseOptionsBottomSheet";

const FavoriteVerse = ({ verse }: { verse: TVerse }) => {
  const verseOptionsRef = React.useRef<BottomSheetModal>(null);
  const { settings } = useSettingsStore();

  return (
    <>
      <VerseOptionsBottomSheet verse={verse} ref={verseOptionsRef} />
      <TouchableOpacity
        onPress={async () => {
          if (settings.haptics) await onImpact();
          verseOptionsRef.current?.present();
        }}
        style={{
          position: "relative",
          backgroundColor: COLORS.primary,
          marginTop: 20,
          padding: 20,
          borderRadius: 5,
        }}
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
            maxWidth: 150,
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
            {verse.name} {verse.chapterNumber} VS {verse.verseNumber}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: FONTS.bold,
          }}
        >
          {verse.verseNumber}. {verse.verse}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default FavoriteVerse;
