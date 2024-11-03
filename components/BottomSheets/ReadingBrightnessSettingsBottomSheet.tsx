import { Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Card from "../Card";
import { ReadingBrightnessComponent } from "../ReadingBrightness";

interface Props {}
const ReadingBrightnessSettingsBottomSheet = React.forwardRef<
  BottomSheetModal,
  Props
>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["20%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={true}
      enableContentPanningGesture={false}
      enableOverDrag={false}
      backgroundStyle={{
        backgroundColor: COLORS.primary,
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
            maxWidth: 150,
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
            Reading Brightness
          </Text>
        </View>
      )}
    >
      <BottomSheetView style={{ flex: 1, padding: 10, gap: 10 }}>
        <Card
          style={{
            marginTop: 40,
          }}
        >
          <ReadingBrightnessComponent />
        </Card>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default ReadingBrightnessSettingsBottomSheet;
