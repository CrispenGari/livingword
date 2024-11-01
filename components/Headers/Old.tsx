import {
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "../SearchInput";
import { Ionicons } from "@expo/vector-icons";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useRouter } from "expo-router";

const OldHeader = () => {
  const { top } = useSafeAreaInsets();
  const { settings } = useSettingsStore();
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.main,
      }}
    >
      <View
        style={{
          paddingBottom: 14,
          paddingTop: Platform.select({ ios: 0, android: top }),
          width: "100%",
          paddingHorizontal: 20,
          backgroundColor: COLORS.main,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
            Living Word Bible
          </Text>
          <TouchableOpacity
            style={{
              width: 35,
              height: 35,
              backgroundColor: COLORS.main,
              borderRadius: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={async () => {
              if (settings.haptics) {
                await onImpact();
              }
              router.push("/(settings)/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={25}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
        </View>

        <SearchInput
          text=""
          placeholder="Search Old Books"
          onChangeText={(text) => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default OldHeader;
