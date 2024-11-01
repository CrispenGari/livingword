import { Text } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

interface Props {}
const ChapterOptionsBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["70%"], []);

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
      >
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              marginBottom: 10,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Chapter Options
          </Text>
          <BottomSheetView style={{ flex: 1 }}>
            <Text>Hello</Text>
          </BottomSheetView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default ChapterOptionsBottomSheet;
