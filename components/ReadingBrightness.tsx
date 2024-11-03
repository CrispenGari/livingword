import { COLORS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import * as Brightness from "expo-brightness";
import Slider from "@react-native-community/slider";
import React from "react";
import { View } from "react-native";

export const ReadingBrightnessComponent = () => {
  const { settings, update } = useSettingsStore();
  const [value, setValue] = React.useState(settings.brightness);

  React.useEffect(() => {
    if (settings.brightness) {
      setValue(settings.brightness);
    }
  }, [settings.brightness]);

  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      <Slider
        style={{ width: "100%", height: 20, marginLeft: 0 }}
        minimumValue={0}
        maximumValue={1}
        lowerLimit={0.1}
        minimumTrackTintColor={COLORS.white}
        maximumTrackTintColor={COLORS.tertiary}
        thumbTintColor={COLORS.main}
        value={value}
        onValueChange={(value) => setValue(value)}
        onSlidingComplete={async (value) => {
          await Brightness.setBrightnessAsync(value);
          setTimeout(() => {
            update({
              ...settings,
              brightness: value,
            });
          }, 500);
        }}
      />
    </View>
  );
};
