import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useReadChapterHistoryStore } from "@/store/useReadChapterHistoryStore";
import ReadLaterChapterOptionBottomSheet from "./BottomSheets/ReadLaterChapterOptionsBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Chapter = ({
  chapterNumber,
  nVerses,
  chapter,
  book,
  abbr,
  index,
}: {
  chapterNumber: number;
  nVerses: number;
  chapter: string[];
  book: string;
  abbr: string;
  index: number;
}) => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { chapters: completed } = useReadChapterHistoryStore();
  const [read, setRead] = React.useState(false);

  React.useEffect(() => {
    const found = !!completed.find(
      (c) => c.abbr === abbr && c.chapterNumber === chapterNumber
    );
    setRead(found);
  }, [completed, abbr, chapterNumber]);

  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        backgroundColor: index % 2 === 1 ? COLORS.main : COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 2,
        position: "relative",
      }}
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
        router.push({
          pathname: "/(book)/chapter",
          params: {
            chapter: JSON.stringify({
              verses: chapter,
              book,
              chapterNumber,
              abbr,
            }),
          },
        });
      }}
    >
      {read ? (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, .1)",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="checkmark-outline"
            color={COLORS.tertiary}
            size={30}
          />
        </View>
      ) : null}
      <Text
        style={{
          fontFamily: FONTS.bold,
        }}
      >
        Chapter {chapterNumber}
      </Text>
      <Text
        style={{
          fontFamily: FONTS.regular,

          color: COLORS.gray,
        }}
      >
        {nVerses} verses
      </Text>
    </TouchableOpacity>
  );
};

export default Chapter;

export const ReadLaterChapter = ({
  chapterNumber,
  nVerses,
  chapter,
  book,
  abbr,
  index,
}: {
  chapterNumber: number;
  nVerses: number;
  chapter: string[];
  book: string;
  abbr: string;
  index: number;
}) => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { chapters: completed } = useReadChapterHistoryStore();
  const [read, setRead] = React.useState(false);
  const readLaterBottomSheet = React.useRef<BottomSheetModal>(null);

  React.useEffect(() => {
    const found = !!completed.find(
      (c) => c.abbr === abbr && c.chapterNumber === chapterNumber
    );
    setRead(found);
  }, [completed, abbr, chapterNumber]);

  return (
    <>
      <ReadLaterChapterOptionBottomSheet
        chapter={{
          abbr,
          chapterNumber,
          name: book,
          verses: chapter,
        }}
        ref={readLaterBottomSheet}
      />
      <TouchableOpacity
        onLongPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          readLaterBottomSheet.current?.present();
        }}
        style={{
          width: 150,
          height: 80,
          backgroundColor: index % 2 === 1 ? COLORS.main : COLORS.primary,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginBottom: 2,
          position: "relative",
          marginTop: 20,
        }}
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          router.push({
            pathname: "/(settings)/read-later",
            params: {
              chapter: JSON.stringify({
                verses: chapter,
                book,
                chapterNumber,
                abbr,
              }),
            },
          });
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.tertiary,
            position: "absolute",
            borderRadius: 999,
            width: "80%",
            alignSelf: "center",
            height: 25,
            top: -13,
            shadowRadius: 5,
            shadowOffset: { height: 2, width: 2 },
            shadowColor: COLORS.tertiary,
            shadowOpacity: 0.5,
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              textTransform: "uppercase",
              color: COLORS.white,
              fontSize: 12,
            }}
          >
            {book}
          </Text>
        </View>
        {read ? (
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, .1)",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="checkmark-outline"
              color={COLORS.tertiary}
              size={30}
            />
          </View>
        ) : null}
        <Text
          style={{
            fontFamily: FONTS.bold,
          }}
        >
          Chapter {chapterNumber}
        </Text>
        <Text
          style={{
            fontFamily: FONTS.regular,

            color: COLORS.gray,
          }}
        >
          {nVerses} verses
        </Text>
      </TouchableOpacity>
    </>
  );
};
