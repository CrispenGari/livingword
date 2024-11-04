import { Alert } from "react-native";
import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";
import * as Updates from "expo-updates";
import * as Constants from "expo-constants";
import * as Speech from "expo-speech";
import * as Notifications from "expo-notifications";
import { TVerse } from "@/types";
import { BIBLE } from "@/constants";

export const readAloud = (
  verse: string,

  {
    onDone,
    onStopped,
    onPause,
    onResume,
  }: {
    onDone: () => void;
    onStopped: () => void;
    onResume: () => void;
    onPause: () => void;
  }
) => {
  Speech.speak(verse, {
    onDone: () => {
      onDone();
    },
    onStopped: () => {
      onStopped();
    },
    onResume: () => {
      onResume();
    },
    onPause: () => {
      onPause();
    },
  });
};

export const scheduleDailyNotification = ({ verse }: { verse: TVerse }) => {
  // Schedule the daily notification
  Notifications.scheduleNotificationAsync({
    content: {
      title: "Living Word Bible",
      body: `${verse.name} ${verse.chapterNumber} vs ${verse.verseNumber}: ${verse.verse}`,
      sound: true,
      badge: 1,
      subtitle: "📖 Verse of the day.",
    },
    trigger: {
      hour: 6,
      minute: 0,
      repeats: true, // Ensures it triggers daily
    },
  });
};

export const rateApp = async () => {
  const available = await StoreReview.isAvailableAsync();
  if (available) {
    const hasAction = await StoreReview.hasAction();
    if (hasAction) {
      await StoreReview.requestReview();
    }
  }
};
export const onFetchUpdateAsync = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    Alert.alert(
      Constants.default.name,
      "Failed to fetch for updates.",
      [{ text: "OK", style: "destructive" }],
      { cancelable: false }
    );
  }
};

export const onImpact = async () =>
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

export const hasDatePassed = (today: string, targetDate: string) => {
  // Convert date strings back to Date objects
  const todayDate = new Date(today);
  const target = new Date(targetDate);

  // Check if the target date is before today
  return target < todayDate;
};

export const randomizeVerse = () => {
  const randomBookIndex = Math.floor(Math.random() * BIBLE.length);
  const randomBook = BIBLE[randomBookIndex];
  const chapters = randomBook.chapters;
  const randomChapterIndex = Math.floor(Math.random() * chapters.length);
  const randomVerses = chapters[randomChapterIndex];
  const randomVerseIndex = Math.floor(Math.random() * randomVerses.length);
  const randomVerse = randomVerses[randomVerseIndex];

  return {
    verseNumber: randomVerseIndex + 1,
    name: randomBook.name,
    abbr: randomBook.abbrev,
    chapterNumber: randomChapterIndex + 1,
    verse: randomVerse,
  } satisfies TVerse;
};
