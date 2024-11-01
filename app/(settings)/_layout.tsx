import React from "react";
import { Stack, useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";

const Layout = () => {
  const { settings } = useSettingsStore();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        animation: "none",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.main,
        },
      }}
    >
      <Stack.Screen
        name="settings"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) await onImpact();
                if (router.canGoBack()) router.back();
              }}
              style={{ marginRight: 10, paddingRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 20,
          },
          headerTitle: "Settings",
        }}
      />
    </Stack>
  );
};

export default Layout;
