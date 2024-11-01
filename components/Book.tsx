import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TBibleBook } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";

const Book = ({
  book,
  testament,
}: {
  book: TBibleBook;
  testament: "old" | "new";
}) => {
  const router = useRouter();
  const { settings } = useSettingsStore();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={async () => {
        if (settings.haptics) {
          await onImpact();
        }
        router.navigate({
          pathname: "/(book)/[book]",
          params: {
            book: book.abbrev,
          },
        });
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize: 20 }}>
          {book.name}
        </Text>
        <Text style={{ fontFamily: FONTS.regular, color: COLORS.gray }}>
          {book.chapters.length} Chapters
        </Text>
      </View>
      {testament === "new" ? (
        <Ionicons name="book-outline" size={24} color={COLORS.tertiary} />
      ) : (
        <Ionicons name="book" color={COLORS.tertiary} size={24} />
      )}
    </TouchableOpacity>
  );
};

export default Book;
