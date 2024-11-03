import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Card from "../Card";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { TFontSize } from "@/types";

interface Props {}
const ChapterOptionsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["50%"], []);
    const { settings, update } = useSettingsStore();

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
              width: 100,
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
              Options
            </Text>
          </View>
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
              Reading Font
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {["xsmall", "small", "normal", "medium", "large", "xlarge"].map(
              (item) => (
                <TouchableOpacity
                  onPress={async () => {
                    if (settings.haptics) await onImpact();
                    update({
                      ...settings,
                      fontSize: item as TFontSize,
                    });
                  }}
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        item === settings.fontSize
                          ? COLORS.tertiary
                          : COLORS.main,
                    },
                  ]}
                  key={item}
                >
                  <Text
                    style={[
                      styles.item_text,
                      {
                        color:
                          item === settings.fontSize
                            ? COLORS.white
                            : COLORS.black,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ChapterOptionsBottomSheet;

const styles = StyleSheet.create({
  item: {
    minWidth: 60,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.tertiary,
    alignItems: "center",
    padding: 3,
    borderRadius: 5,
    flex: 1,
    maxWidth: 80,
  },
  item_text: {
    fontFamily: FONTS.bold,
  },
});
