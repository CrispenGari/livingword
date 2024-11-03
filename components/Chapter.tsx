import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useReadChapterHistory } from "@/store/useReadChapterHistory";

const Chapter = ({
  chapterNumber,
  nVerses,
  chapter,
  book,
  abbr,
}: {
  chapterNumber: number;
  nVerses: number;
  chapter: string[];
  book: string;
  abbr: string;
}) => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  const { chapters: completed } = useReadChapterHistory();
  const [read, setRead] = React.useState(false);

  React.useEffect(() => {
    const found = !!completed.find(
      (c) => c.abbr === abbr && c.chapterNumber === chapterNumber
    );
    setRead(found);
  }, [completed]);

  return (
    <TouchableOpacity
      style={{
        width: 80,
        height: 80,
        backgroundColor: chapterNumber % 2 === 1 ? COLORS.main : COLORS.primary,
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
