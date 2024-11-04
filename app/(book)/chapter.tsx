import { FlatList, View } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Verse from "@/components/Verse";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact, readAloud } from "@/utils";
import ChapterOptionsBottomSheet from "@/components/BottomSheets/ChapterOptionsBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useReadChapterHistoryStore } from "@/store/useReadChapterHistoryStore";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import Transcription from "@/components/Transcription";

type TChapter = {
  verses: string[];
  book: string;
  chapterNumber: number;
  abbr: string;
};
const Page = () => {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const data = React.useMemo(() => JSON.parse(chapter) as TChapter, []);
  const { settings } = useSettingsStore();
  const chapterBottomSheetRef = React.useRef<BottomSheetModal>(null);
  const [read, setRead] = React.useState(false);
  const [state, setState] = React.useState({
    controls: false,
    verseIndex: -1,
  });
  const { add: markChapterAsRead, chapters: completed } =
    useReadChapterHistoryStore();

  React.useEffect(() => {
    const found = !!completed.find(
      (c) => c.abbr === data.abbr && c.chapterNumber === data.chapterNumber
    );
    setRead(found);
  }, [completed]);

  React.useEffect(() => {
    if (state.controls) {
      readAloud(data.verses[state.verseIndex], {
        onDone: () => {
          Speech.stop();
          if (state.verseIndex + 1 === data.verses.length) {
            setState((s) => ({ ...s, controls: false, verseIndex: -1 }));
          }
          setState((s) => ({ ...s, verseIndex: s.verseIndex + 1 }));
        },
        onPause() {},
        onResume() {},
        onStopped() {},
      });
    }
  }, [state]);

  return (
    <>
      <StatusBar
        backgroundColor={settings.theme === "light" ? COLORS.main : COLORS.dark}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor:
              settings.theme === "light" ? COLORS.main : COLORS.dark,
          },
          headerTitle: data.book.concat(` ${data.chapterNumber}`),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 20,
            color: settings.theme === "dark" ? COLORS.white : COLORS.black,
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
              <Ionicons
                name="arrow-back"
                size={20}
                color={
                  settings.theme === "dark" ? COLORS.white : COLORS.tertiary
                }
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",

                  borderRadius: 30,
                }}
                onPress={async () => {
                  if (settings.haptics) {
                    await onImpact();
                  }
                  setState((s) => ({ ...s, controls: true, verseIndex: 0 }));
                }}
              >
                <Ionicons
                  name="volume-high-outline"
                  size={24}
                  color={
                    settings.theme === "dark" ? COLORS.white : COLORS.tertiary
                  }
                />
              </TouchableOpacity>
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
                  name="ellipsis-vertical"
                  size={20}
                  color={
                    settings.theme === "dark" ? COLORS.white : COLORS.tertiary
                  }
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <ChapterOptionsBottomSheet
        ref={chapterBottomSheetRef}
        chapter={{
          abbr: data.abbr,
          chapterNumber: data.chapterNumber,
          name: data.book,
          verses: data.verses,
        }}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{
          backgroundColor:
            settings.theme === "light" ? COLORS.main : COLORS.dark,
        }}
        data={data.verses}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Verse
            verseNumber={index + 1}
            verse={item}
            abbr={data.abbr}
            chapterName={data.book}
            chapterNumber={data.chapterNumber}
            isReading={state.verseIndex === index}
          />
        )}
        onEndReached={({ distanceFromEnd }) => {
          if (read) return;
          //  mark as read
          if (distanceFromEnd === 0)
            markChapterAsRead({
              abbr: data.abbr,
              name: data.book,
              chapterNumber: data.chapterNumber,
            });
        }}
      />
      {state.controls ? (
        <Transcription
          setState={setState}
          verseIndex={state.verseIndex}
          verses={data.verses}
        />
      ) : null}
    </>
  );
};

export default Page;
