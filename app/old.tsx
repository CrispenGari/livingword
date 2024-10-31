import { ScrollView } from "react-native";
import React from "react";
import { BIBLE, COLORS } from "@/constants";
import Book from "@/components/Book";

const Page = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 150,
        backgroundColor: COLORS.main,
      }}
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {BIBLE.slice(0, 39).map((book) => (
        <Book key={book.abbrev} book={book} testament="old" />
      ))}
    </ScrollView>
  );
};

export default Page;
