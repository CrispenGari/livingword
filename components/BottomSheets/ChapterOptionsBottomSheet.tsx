import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Card from "../Card";

import {
  FontSizeComponent,
  FontWeightComponent,
  FontStyleComponent,
} from "../FontStyles";
import { ReadingBrightnessComponent } from "../ReadingBrightness";
import { ReadingThemeComponent } from "../ReadingTheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useReaderLaterStore } from "@/store/useReadLaterStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";

interface Props {
  chapter: {
    abbr: string;
    name: string;
    chapterNumber: number;
    verses: string[];
  };
}
const ChapterOptionsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({ chapter }, ref) => {
    const snapPoints = React.useMemo(() => ["80%"], []);

    const [readLater, setReadLater] = React.useState(false);
    const { chapters, add, remove } = useReaderLaterStore();
    const { settings } = useSettingsStore();
    const { dismiss } = useBottomSheetModal();

    const addToReadLater = async () => {
      if (settings.haptics) await onImpact();
      add(chapter);
      dismiss();
    };
    const removeFromReadLater = async () => {
      if (settings.haptics) await onImpact();
      remove(chapter);
      dismiss();
    };

    React.useEffect(() => {
      const found = !!chapters.find(
        (c) =>
          c.abbr === chapter.abbr && c.chapterNumber === chapter.chapterNumber
      );
      setReadLater(found);
    }, [chapters]);

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
              width: 130,
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
          <Card
            style={{
              marginTop: 40,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                height: 30,
                backgroundColor: COLORS.primary,
                top: -15,
                width: 100,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: FONTS.bold, fontSize: 18 }}>Font</Text>
            </View>

            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: 10,
              }}
            >
              Change Reading Font Size
            </Text>
            <FontSizeComponent />
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: 10,
              }}
            >
              Change Reading Font Weight
            </Text>
            <FontWeightComponent />
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: 10,
              }}
            >
              Change Reading Font Style
            </Text>
            <FontStyleComponent />
          </Card>

          <Card
            style={{
              marginTop: 20,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                height: 30,
                backgroundColor: COLORS.primary,
                top: -15,
                width: 100,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: FONTS.bold, fontSize: 18 }}>
                Brightness
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: 10,
              }}
            >
              Change Reading Brightness
            </Text>
            <ReadingBrightnessComponent />
          </Card>

          <Card
            style={{
              marginTop: 20,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                height: 30,
                backgroundColor: COLORS.primary,
                top: -15,
                width: 150,
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Text style={{ fontFamily: FONTS.bold, fontSize: 18 }}>
                Theme & Keep Awake
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: 10,
              }}
            >
              Change Reading Theme
            </Text>
            <ReadingThemeComponent />
          </Card>

          {!readLater ? (
            <TouchableOpacity
              onPress={addToReadLater}
              style={{
                width: "100%",
                gap: 10,
                flexDirection: "row",
                backgroundColor: COLORS.tertiary,
                padding: 10,
                marginBottom: 3,
                borderRadius: 5,
                paddingHorizontal: 20,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <MaterialIcons
                name="bookmark-add"
                size={24}
                color={COLORS.white}
              />
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                  fontSize: 16,
                }}
              >
                Add Chapter to "Read Later"
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={removeFromReadLater}
              style={{
                width: "100%",
                gap: 10,
                flexDirection: "row",
                backgroundColor: COLORS.tertiary,
                marginBottom: 3,
                borderRadius: 5,
                padding: 10,
                paddingHorizontal: 20,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <MaterialIcons
                name="bookmark-remove"
                size={24}
                color={COLORS.white}
              />
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                  fontSize: 16,
                }}
              >
                Remove Chapter from "Read Later"
              </Text>
            </TouchableOpacity>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ChapterOptionsBottomSheet;
