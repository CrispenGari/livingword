import { ScrollView, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { ReadLaterChapter } from "@/components/Chapter";
import { useReaderLaterStore } from "@/store/useReadLaterStore";
import { Stack, useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/components/Card";
import ReadLaterChaptersOptionBottomSheet from "@/components/BottomSheets/ReadLaterChaptersOptionsBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Page = () => {
  const { chapters } = useReaderLaterStore();
  const { settings } = useSettingsStore();
  const router = useRouter();
  const readLaterChapterOptionsRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: "Read Later Chapters",
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
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                readLaterChapterOptionsRef.current?.present();
              }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ReadLaterChaptersOptionBottomSheet ref={readLaterChapterOptionsRef} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        style={{
          backgroundColor: COLORS.main,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {chapters.length === 0 ? (
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
              No Read Later Chapters
            </Text>
          </Card>
        ) : (
          chapters.map((chapter, index) => (
            <ReadLaterChapter
              chapterNumber={chapter.chapterNumber}
              key={index}
              nVerses={chapter.verses.length}
              chapter={chapter.verses}
              book={chapter.name}
              abbr={chapter.abbr}
              index={index}
            />
          ))
        )}
      </ScrollView>
    </>
  );
};

export default Page;
