import { View, Text, FlatList } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Verse from "@/components/Verse";

type TChapter = {
  verses: string[];
  book: string;
  chapterNumber: number;
};
const Page = () => {
  const { chapter } = useLocalSearchParams<{ chapter: string }>();
  const data = JSON.parse(chapter) as TChapter;

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: data.book.concat(` ${data.chapterNumber}`).toUpperCase(),
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
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.tertiary} />
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 25,
                  color: COLORS.tertiary,
                  textTransform: "uppercase",
                }}
              >
                {data.book}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{
          backgroundColor: COLORS.main,
        }}
        data={data.verses}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <Verse verseNumber={index + 1} verse={item} />
        )}
      />
    </>
  );
};

export default Page;
