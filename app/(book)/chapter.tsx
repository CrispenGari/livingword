import { View, Text, FlatList } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Verse from "@/components/Verse";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import ChapterOptionsBottomSheet from "@/components/BottomSheets/ChapterOptionsBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type TChapter = {
  verses: string[];
  book: string;
  chapterNumber: number;
};
const Page = () => {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const data = JSON.parse(chapter) as TChapter;
  const { settings } = useSettingsStore();
  const chapterBottomSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: data.book.concat(` ${data.chapterNumber}`),
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

          headerRight: () => (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }

                chapterBottomSheetRef.current?.present();
              }}
            >
              <Ionicons
                name="ellipsis-vertical-outline"
                size={20}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ChapterOptionsBottomSheet ref={chapterBottomSheetRef} />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{
          backgroundColor: COLORS.main,
        }}
        data={data.verses}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Verse verseNumber={index + 1} verse={item} />
        )}
      />
    </>
  );
};

export default Page;
