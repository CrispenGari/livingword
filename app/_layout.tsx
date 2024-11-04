import { Tabs, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { COLORS, FONTS, Fonts } from "@/constants";
import { LogBox, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AllHeader from "@/components/Headers/All";
import OldHeader from "@/components/Headers/Old";
import NewHeader from "@/components/Headers/New";
import { useBrightnessPermission } from "@/hooks";
import { useSettingsStore } from "@/store/useSettingsStore";
import * as Brightness from "expo-brightness";
import * as Notifications from "expo-notifications";
import { useNotificationsToken } from "@/hooks/useNotificationsToken/useNotificationsToken";
import {
  hasDatePassed,
  randomizeVerse,
  scheduleDailyNotification,
} from "@/utils";
import { useVerseOfTheDayStore } from "@/store/useVerseOfTheDayStore";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [loaded, error] = useFonts(Fonts);
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <RootLayout />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default InitialLayout;

const RootLayout = () => {
  const width = 350;
  const { granted } = useBrightnessPermission();
  const { token } = useNotificationsToken();
  const { update, settings } = useSettingsStore();
  const { verse, update: updateTodaysVerse } = useVerseOfTheDayStore();
  const router = useRouter();

  // randomize verses
  React.useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (!!verse.verse) {
      if (verse.date !== today) {
        if (hasDatePassed(verse.date, today)) {
          const data = randomizeVerse();
          updateTodaysVerse({
            date: today,
            triggered: false,
            verse: data,
          });
        }
      }
    } else {
      const data = randomizeVerse();
      updateTodaysVerse({
        date: today,
        triggered: false,
        verse: data,
      });
    }
  }, [verse]);

  React.useEffect(() => {
    (async () => {
      if (granted) {
        const brightness = await Brightness.getBrightnessAsync();
        update({
          ...settings,
          brightness,
        });
      }
    })();
  }, [granted]);

  React.useEffect(() => {
    if (!!token && settings.notify && verse?.verse) {
      scheduleDailyNotification({
        verse: verse.verse,
      });
    }
  }, [token, settings]);

  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        router.navigate("/(settings)/day");
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <>
      <StatusBar backgroundColor={COLORS.main} animated={false} />
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarStyle: {
            height:
              width >= 600 ? 70 : Platform.select({ ios: 100, android: 80 }),
            backgroundColor: COLORS.main,
            position: "absolute",
            elevation: 0,
            borderWidth: 0,
            shadowOpacity: 0,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: COLORS.tertiary,
          tabBarInactiveTintColor: COLORS.secondary,
          tabBarLabelStyle: {
            fontFamily: FONTS.bold,
            marginTop: width >= 600 ? 10 : -10,
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "All",
            header: () => <AllHeader />,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="menu-book" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="old"
          options={{
            header: () => <OldHeader />,
            title: "Old Testament",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="new"
          options={{
            title: "New Testament",
            header: () => <NewHeader />,
            headerStyle: {
              height: Platform.select({ ios: 100, android: 150 }),
              backgroundColor: COLORS.primary,
            },
            headerTitleStyle: {
              fontFamily: FONTS.bold,
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="(book)"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(settings)"
          options={{
            href: null,
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};
