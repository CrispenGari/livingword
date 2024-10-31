import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TBibleBook } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "@/constants";
import { useRouter } from "expo-router";

const Book = ({
  book,
  testament,
}: {
  book: TBibleBook;
  testament: "old" | "new";
}) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() => {
        router.navigate({
          pathname: "/(book)/[book]",
          params: {
            book: book.abbrev,
          },
        });
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: FONTS.bold, fontSize: 25 }}>
          {book.name}
        </Text>
        <Text
          style={{ fontFamily: FONTS.light, fontSize: 18, color: COLORS.gray }}
        >
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
