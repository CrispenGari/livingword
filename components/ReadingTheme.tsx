import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";

const styles = StyleSheet.create({
  item: {
    width: 40,
    height: 40,
    justifyContent: "center",
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.tertiary,
    alignItems: "center",
    padding: 3,
    borderRadius: 40,
  },
});

export const ReadingThemeComponent = ({
  render,
}: {
  render?: "theme" | "keep-awake";
}) => {
  const { settings, update } = useSettingsStore();

  if (render === "theme")
    return (
      <View
        style={{
          flexDirection: "row",
          gap: 50,
          paddingVertical: 10,
          alignSelf: "center",
        }}
      >
        {settings.theme === "light" ? (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) await onImpact();
                update({
                  ...settings,
                  theme: "dark",
                });
              }}
              style={[styles.item, {}]}
            >
              <MaterialIcons name="light-mode" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONTS.bold,
                textTransform: "capitalize",
              }}
            >
              {settings.theme} Theme
            </Text>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) await onImpact();
                update({
                  ...settings,
                  theme: "light",
                });
              }}
              style={[styles.item, {}]}
            >
              <MaterialIcons name="dark-mode" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: FONTS.bold,
                textTransform: "capitalize",
              }}
            >
              {settings.theme} Theme
            </Text>
          </View>
        )}
      </View>
    );
  if (render === "keep-awake")
    return (
      <View
        style={{
          paddingVertical: 10,
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            if (settings.haptics) await onImpact();
            if (!settings.keepAwake) {
              await activateKeepAwakeAsync();
            } else {
              await deactivateKeepAwake();
            }
            update({
              ...settings,
              keepAwake: !settings.keepAwake,
            });
          }}
          style={[styles.item, {}]}
        >
          {settings.keepAwake ? (
            <Ionicons name="eye-outline" size={24} color={COLORS.white} />
          ) : (
            <Ionicons name="eye-off-outline" size={24} color={COLORS.white} />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONTS.bold,
          }}
        >
          {settings.keepAwake ? "Keep Awake ONN" : "Keep Awake OFF"}
        </Text>
      </View>
    );
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 50,
        paddingVertical: 10,
        alignSelf: "center",
      }}
    >
      {settings.theme === "light" ? (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) await onImpact();
              update({
                ...settings,
                theme: "dark",
              });
            }}
            style={[styles.item, {}]}
          >
            <MaterialIcons name="light-mode" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONTS.bold,
              textTransform: "capitalize",
            }}
          >
            {settings.theme} Theme
          </Text>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) await onImpact();
              update({
                ...settings,
                theme: "light",
              });
            }}
            style={[styles.item, {}]}
          >
            <MaterialIcons name="dark-mode" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: FONTS.bold,
              textTransform: "capitalize",
            }}
          >
            {settings.theme} Theme
          </Text>
        </View>
      )}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={async () => {
            if (settings.haptics) await onImpact();
            if (!settings.keepAwake) {
              await activateKeepAwakeAsync();
            } else {
              await deactivateKeepAwake();
            }
            update({
              ...settings,
              keepAwake: !settings.keepAwake,
            });
          }}
          style={[styles.item, {}]}
        >
          {settings.keepAwake ? (
            <Ionicons name="eye-outline" size={24} color={COLORS.white} />
          ) : (
            <Ionicons name="eye-off-outline" size={24} color={COLORS.white} />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: FONTS.bold,
          }}
        >
          {settings.keepAwake ? "Keep Awake ONN" : "Keep Awake OFF"}
        </Text>
      </View>
    </View>
  );
};
