import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { BIBLE, COLORS, FONTS } from "@/constants";
import Chapter from "@/components/Chapter";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const router = useRouter();
  const { book: abbrev } = useLocalSearchParams<{ book: string }>();
  const book = BIBLE.find((b) => b.abbrev === abbrev)!;

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: book.name.toUpperCase(),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 30,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginRight: 30,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              onPress={() => {
                router.replace("/");
              }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.tertiary} />
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 25,
                  color: COLORS.tertiary,
                }}
              >
                ALL
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
        style={{
          backgroundColor: COLORS.main,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {book.chapters.map((chapter, index) => (
          <Chapter
            chapterNumber={index + 1}
            key={index}
            nVerses={chapter.length}
            chapter={chapter}
            book={book.name}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default Page;
