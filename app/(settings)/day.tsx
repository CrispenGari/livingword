import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import ReadLaterChaptersOptionBottomSheet from "@/components/BottomSheets/ReadLaterChaptersOptionsBottomSheet";
import Card from "@/components/Card";
import { ReadLaterChapter } from "@/components/Chapter";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useFavoritesVersesStore } from "@/store/useFavoritesVersesStore";
import FavoriteVerse from "@/components/FavoriteVerse";
import { useVerseOfTheDayStore } from "@/store/useVerseOfTheDayStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import VerseOptionsBottomSheet from "@/components/BottomSheets/VerseOptionsBottomSheet";

const Page = () => {
  const { settings } = useSettingsStore();
  const { verse } = useVerseOfTheDayStore();
  const verseOptionsRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: "Verse of the Day",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 20,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 30,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.tertiary} />
            </TouchableOpacity>
          ),
        }}
      />
      {!!verse?.verse ? (
        <VerseOptionsBottomSheet
          verse={{
            ...verse.verse,
          }}
          ref={verseOptionsRef}
        />
      ) : null}

      <View
        style={{
          padding: 10,
          flex: 1,
          backgroundColor: COLORS.main,
        }}
      >
        {!!!verse?.verse ? (
          <Card
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,

                color: COLORS.gray,
              }}
            >
              No Verse of the Day: {new Date().toLocaleDateString()}.
            </Text>
          </Card>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              width: "100%",
              maxWidth: 400,
              alignSelf: "center",
              padding: 20,
              borderRadius: 10,
              marginTop: 30,
            }}
            onPress={async () => {
              if (settings.haptics) await onImpact();
              verseOptionsRef.current?.present();
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
                {verse.verse.name} {verse.verse.chapterNumber} VS{" "}
                {verse.verse.verseNumber}
              </Text>
            </View>
            <Text style={{ fontFamily: FONTS.regular, fontSize: 16 }}>
              {verse.verse.verseNumber}. {verse.verse.verse}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default Page;
