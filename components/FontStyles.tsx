import { COLORS, FONTS } from "@/constants";
import { useSettingsStore } from "@/store/useSettingsStore";
import { TFontSize, TFontStyle, TFontWeight } from "@/types";
import { onImpact } from "@/utils";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    minWidth: 50,
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

export const FontSizeComponent = () => {
  const { settings, update } = useSettingsStore();
  return (
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
                  item === settings.fontSize ? COLORS.tertiary : COLORS.main,
              },
            ]}
            key={item}
          >
            <Text
              style={[
                styles.item_text,
                {
                  color:
                    item === settings.fontSize ? COLORS.white : COLORS.black,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )
      )}
    </View>
  );
};

export const FontWeightComponent = () => {
  const { settings, update } = useSettingsStore();
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {["normal", "bold"].map((item) => {
        const computed = `${item}Weight`;

        return (
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) await onImpact();
              update({
                ...settings,
                fontWeight: computed as TFontWeight,
              });
            }}
            style={[
              styles.item,
              {
                backgroundColor:
                  computed === settings.fontWeight
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
                    computed === settings.fontWeight
                      ? COLORS.white
                      : COLORS.black,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const FontStyleComponent = () => {
  const { settings, update } = useSettingsStore();
  return (
    <View style={{ flexDirection: "row", gap: 5 }}>
      {["normal", "italic"].map((item) => {
        const computed = `${item}Style`;

        return (
          <TouchableOpacity
            onPress={async () => {
              if (settings.haptics) await onImpact();
              update({
                ...settings,
                fontStyle: computed as TFontStyle,
              });
            }}
            style={[
              styles.item,
              {
                backgroundColor:
                  computed === settings.fontStyle
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
                    computed === settings.fontStyle
                      ? COLORS.white
                      : COLORS.black,
                },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
