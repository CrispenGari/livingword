import { ScrollView } from "react-native";
import React from "react";
import { BIBLE, COLORS } from "@/constants";
import Book from "@/components/Book";
import { useSearchTermsStore } from "@/store/useSearchTermsStore";

const Page = () => {
  const { terms } = useSearchTermsStore();
  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 150,
        backgroundColor: COLORS.main,
      }}
      style={{ flex: 1, backgroundColor: COLORS.main }}
      showsVerticalScrollIndicator={false}
    >
      {BIBLE.slice(0, 39)
        .filter((book) =>
          book.name.toLowerCase().includes(terms.old.toLowerCase().trim())
        )
        .map((book) => (
          <Book key={book.abbrev} book={book} testament="old" />
        ))}
    </ScrollView>
  );
};

export default Page;
