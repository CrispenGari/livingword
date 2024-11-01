import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

interface SettingItemProps {
  Icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}
const SettingsItem = ({ Icon, title, onPress, subtitle }: SettingItemProps) => {
  const { settings } = useSettingsStore();
  return (
    <TouchableOpacity
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
        onPress();
      }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 2,
      }}
    >
      {Icon}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold, flexShrink: 18 }}>{title}</Text>
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: 12,
            color: COLORS.tertiary,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsItem;
