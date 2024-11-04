import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { useFavoritesVersesStore } from "@/store/useFavoritesVersesStore";

interface Props {}
const FavoriteVersesOptionsBottomSheet = React.forwardRef<
  BottomSheetModal,
  Props
>(({}, ref) => {
  const snapPoints = React.useMemo(() => ["15%"], []);
  const { clear } = useFavoritesVersesStore();
  const { settings } = useSettingsStore();
  const { dismiss } = useBottomSheetModal();

  const clearAll = async () => {
    if (settings.haptics) await onImpact();
    clear();
    dismiss();
  };

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
            width: 150,
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
            Favorite Verses Options
          </Text>
        </View>
      )}
    >
      <BottomSheetView style={{ flex: 1, padding: 10 }}>
        <TouchableOpacity
          onPress={clearAll}
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
          <MaterialIcons name="clear-all" size={24} color={COLORS.black} />
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Clear All Favorite Verses
          </Text>
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default FavoriteVersesOptionsBottomSheet;
