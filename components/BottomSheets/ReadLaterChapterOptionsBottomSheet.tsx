import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useReaderLaterStore } from "@/store/useReadLaterStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { useReadChapterHistoryStore } from "@/store/useReadChapterHistoryStore";

interface Props {
  chapter: {
    abbr: string;
    name: string;
    chapterNumber: number;
    verses: string[];
  };
}
const ReadLaterChapterOptionBottomSheet = React.forwardRef<
  BottomSheetModal,
  Props
>(({ chapter }, ref) => {
  const snapPoints = React.useMemo(() => ["20%"], []);
  const { remove } = useReaderLaterStore();
  const {
    add: markAsRead,
    remove: markAsUnread,
    chapters: completed,
  } = useReadChapterHistoryStore();

  const [read, setRead] = React.useState(false);
  const { settings } = useSettingsStore();
  const { dismiss } = useBottomSheetModal();

  const markChapterAsRead = async () => {
    if (settings.haptics) await onImpact();
    markAsRead(chapter);
    dismiss();
  };
  const markChapterAsUnRead = async () => {
    if (settings.haptics) await onImpact();
    markAsUnread(chapter);
    dismiss();
  };
  const removeFromReadLater = async () => {
    if (settings.haptics) await onImpact();
    remove(chapter);
    dismiss();
  };

  React.useEffect(() => {
    const found = !!completed.find(
      (c) =>
        c.abbr === chapter.abbr && c.chapterNumber === chapter.chapterNumber
    );
    setRead(found);
  }, [completed, chapter]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
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
            width: 135,
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
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.bold,
              textTransform: "uppercase",
              color: COLORS.white,
            }}
          >
            Chapter Options
          </Text>
        </View>
      )}
    >
      <BottomSheetView style={{ flex: 1, padding: 10 }}>
        {read ? (
          <TouchableOpacity
            onPress={markChapterAsUnRead}
            style={{
              width: "100%",
              gap: 10,
              flexDirection: "row",
              backgroundColor: COLORS.primary,
              padding: 10,
              marginBottom: 3,
              borderRadius: 5,
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons
              name="book-open"
              size={24}
              color={COLORS.black}
            />
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.black,
                fontSize: 16,
              }}
            >
              Mark Chapter as UnRead
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={markChapterAsRead}
            style={{
              width: "100%",
              gap: 10,
              flexDirection: "row",
              backgroundColor: COLORS.primary,
              padding: 10,
              marginBottom: 3,
              borderRadius: 5,
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <MaterialCommunityIcons
              name="book"
              size={24}
              color={COLORS.black}
            />
            <Text
              style={{
                fontFamily: FONTS.bold,
                color: COLORS.black,
                fontSize: 16,
              }}
            >
              Mark Chapter as Read
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={removeFromReadLater}
          style={{
            width: "100%",
            gap: 10,
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            marginBottom: 3,
            borderRadius: 5,
            padding: 10,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <MaterialIcons
            name="bookmark-remove"
            size={24}
            color={COLORS.black}
          />
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Remove Chapter from "Read Later"
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ReadLaterChapterOptionBottomSheet;
