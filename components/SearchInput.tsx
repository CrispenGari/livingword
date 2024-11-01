import { TextInput, Keyboard } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";
import { useSettingsStore } from "@/store/useSettingsStore";

interface Props {
  onChangeText: (text: string) => void;
  text: string;
  placeholder: string;
}
const SearchInput = ({ onChangeText, text, placeholder }: Props) => {
  const { settings } = useSettingsStore();
  const scale = useSharedValue(0);
  const startZoomIn = React.useCallback(() => {
    scale.value = withTiming(1, { duration: 1000 });
  }, []);

  React.useEffect(() => {
    startZoomIn();
  }, []);
  const textInputRef = React.useRef<TextInput>(null);
  const focused = useSharedValue(0);

  const animatedTextInputStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      focused.value,
      [0, 1],
      [COLORS.main, COLORS.primary]
    );
    return {
      backgroundColor,
    };
  });

  const onFocus = () => {
    focused.value = withTiming(1, { duration: 400 });
  };
  const onBlur = () => {
    focused.value = withTiming(0, { duration: 400 });
  };

  return (
    <Animated.View
      style={[
        animatedTextInputStyle,
        {
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          width: "100%",
          maxWidth: 450,
          borderRadius: 10,
          gap: 10,
          paddingHorizontal: 20,
          elevation: 5,
          marginVertical: 5,
          shadowOffset: { width: 1, height: 1 },
          shadowRadius: 5,
          shadowOpacity: 0.1,
          backgroundColor: COLORS.main,
        },
      ]}
    >
      <TextInput
        style={{
          flex: 1,
          fontFamily: FONTS.regular,
          paddingHorizontal: 10,
        }}
        placeholderTextColor={COLORS.black}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={textInputRef}
        value={text}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={async () => {
          if (settings.haptics) {
            await onImpact();
          }
          onChangeText("");
          Keyboard.dismiss();
          textInputRef.current?.blur();
        }}
      >
        <Ionicons name="close-outline" size={20} color={COLORS.black} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SearchInput;
