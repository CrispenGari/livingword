import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { useFavoritesVersesStore } from "@/store/useFavoritesVersesStore";
import { TVerse } from "@/types";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  verse: TVerse & { verse: string };
}
const VerseOptionsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ verse }, ref) => {
    const snapPoints = React.useMemo(() => ["30%"], []);
    const { settings } = useSettingsStore();
    const [favored, setFavored] = React.useState(false);
    const { verses, add, remove } = useFavoritesVersesStore();
    const { dismiss } = useBottomSheetModal();

    const addToFavorites = async () => {
      if (settings.haptics) await onImpact();
      add({
        abbr: verse.abbr,
        chapterNumber: verse.chapterNumber,
        name: verse.name,
        verseNumber: verse.verseNumber,
      });
      dismiss();
    };
    const removeFromFavorites = async () => {
      if (settings.haptics) await onImpact();
      remove({
        abbr: verse.abbr,
        chapterNumber: verse.chapterNumber,
        name: verse.name,
        verseNumber: verse.verseNumber,
      });
      dismiss();
    };

    React.useEffect(() => {
      const found = !!verses.find(
        (v) =>
          v.abbr === verse.abbr &&
          v.verseNumber === verse.verseNumber &&
          v.chapterNumber === verse.chapterNumber
      );
      setFavored(found);
    }, [verses]);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backgroundStyle={{
          backgroundColor: COLORS.main,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        handleComponent={() => (
          <View
            style={{
              alignSelf: "center",
              backgroundColor: COLORS.tertiary,
              maxWidth: 200,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 999,
              height: 25,
              position: "absolute",
              top: -13,
              shadowOffset: { height: 5, width: 5 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              shadowColor: COLORS.tertiary,
              elevation: 1,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.bold,
                textTransform: "uppercase",
                color: COLORS.white,
              }}
            >
              {verse.name} {verse.chapterNumber}
            </Text>
          </View>
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10, gap: 10 }}>
          <View
            style={{
              width: "100%",
              maxWidth: 400,
              alignSelf: "center",
              backgroundColor: COLORS.tertiary,
              marginVertical: 10,
              padding: 20,
              borderRadius: 10,
              marginTop: 35,
              shadowOffset: { height: 5, width: 5 },
              shadowOpacity: 0.9,
              shadowRadius: 2,
              shadowColor: COLORS.tertiary,
              elevation: 1,
            }}
          >
            <View
              style={{
                position: "absolute",
                height: 25,
                backgroundColor: COLORS.primary,
                top: -15,
                borderRadius: 999,
                width: 100,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                }}
              >
                Verse {verse.verseNumber}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.white,
              }}
            >
              {verse.verseNumber}. {verse.verse}
            </Text>
          </View>
          {!favored ? (
            <TouchableOpacity
              onPress={addToFavorites}
              style={{
                width: "100%",
                gap: 10,
                flexDirection: "row",
                backgroundColor: COLORS.secondary,
                padding: 10,
                marginBottom: 3,
                borderRadius: 5,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Ionicons name="heart-outline" size={24} color={COLORS.black} />
              <Text style={{ fontFamily: FONTS.bold }}>
                Add to your favorite verses.
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={removeFromFavorites}
              style={{
                width: "100%",
                gap: 10,
                flexDirection: "row",
                backgroundColor: COLORS.secondary,
                marginBottom: 3,
                borderRadius: 5,
                padding: 10,
                paddingHorizontal: 20,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="heart-dislike-outline"
                size={24}
                color={COLORS.black}
              />
              <Text style={{ fontFamily: FONTS.bold }}>
                Remove verse from favorite verses.
              </Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default VerseOptionsBottomSheet;
