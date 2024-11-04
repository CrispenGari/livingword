import { Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { BIBLE, COLORS, FONTS } from "@/constants";
import Book from "@/components/Book";
import { useVerseOfTheDayStore } from "@/store/useVerseOfTheDayStore";
import VerseModal from "@/components/VerseModal";
import { useSearchTermsStore } from "@/store/useSearchTermsStore";

const Page = () => {
  const { verse } = useVerseOfTheDayStore();
  const [open, setOpen] = React.useState(false);
  const { terms } = useSearchTermsStore();
  React.useEffect(() => {
    if (!verse.triggered) {
      setOpen(true);
    }
  }, [verse]);

  return (
    <>
      {verse.verse ? (
        <VerseModal onClose={() => setOpen(false)} open={open} verse={verse} />
      ) : null}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 150,
          backgroundColor: COLORS.main,
        }}
        style={{ flex: 1, backgroundColor: COLORS.main }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Old Testament</Text>
        {BIBLE.slice(0, 39)
          .filter((book) =>
            book.name.toLowerCase().includes(terms.all.toLowerCase().trim())
          )
          .map((book) => (
            <Book key={book.abbrev} book={book} testament="old" />
          ))}
        <Text style={styles.header}>New Testament</Text>
        {BIBLE.slice(39)
          .filter((book) =>
            book.name.toLowerCase().includes(terms.all.toLowerCase().trim())
          )
          .map((book) => (
            <Book key={book.abbrev} book={book} testament="new" />
          ))}
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    padding: 10,
    fontFamily: FONTS.bold,
    fontSize: 20,
    textAlign: "center",
  },
});
