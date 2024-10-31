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

const AllHeader = () => {
  const { top } = useSafeAreaInsets();
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
          <Text style={{ fontFamily: FONTS.bold, fontSize: 30 }}>
            Living Word Bible
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="settings-outline"
              size={25}
              color={COLORS.tertiary}
            />
          </TouchableOpacity>
        </View>

        <SearchInput
          text=""
          placeholder="Search All Books"
          onChangeText={(text) => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllHeader;
