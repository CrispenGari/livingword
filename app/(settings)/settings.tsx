import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import * as Constants from "expo-constants";
import { COLORS, FONTS } from "@/constants";
import { onImpact, onFetchUpdateAsync, rateApp } from "@/utils";
import { router, Stack } from "expo-router";
import Card from "@/components/Card";
import SettingsItem from "@/components/SettingsItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import AboutBottomSheet from "@/components/BottomSheets/AboutBottomSheet";

const Page = () => {
  const { settings, update, restore: restoreSettings } = useSettingsStore();
  const aboutBottomSheetRef = React.useRef<BottomSheetModal>(null);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                aboutBottomSheetRef.current?.present();
              }}
              style={{
                width: 40,
                height: 40,
                backgroundColor: COLORS.main,
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Ionicons
                name="information-outline"
                size={18}
                color={COLORS.black}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <AboutBottomSheet ref={aboutBottomSheetRef} />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.main }}
        contentContainerStyle={{
          paddingBottom: 100,
          padding: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.tertiary,
            fontFamily: FONTS.bold,
          }}
        >
          {Constants.default.expoConfig?.name}{" "}
          {Constants.default.expoConfig?.version}
        </Text>
        <Text style={styles.headerText}>Misc</Text>
        <Card>
          <SettingsItem
            subtitle={
              settings.haptics
                ? "In app haptics are ONN."
                : "In app haptics are OFF."
            }
            onPress={() => {
              update({ ...settings, haptics: !settings.haptics });
            }}
            title="App Haptics"
            Icon={
              <MaterialIcons name="vibration" size={18} color={COLORS.black} />
            }
          />
          <SettingsItem
            subtitle="Check for new updates."
            onPress={async () => {
              await onFetchUpdateAsync();
            }}
            title="Updates"
            Icon={
              <MaterialIcons name="update" size={18} color={COLORS.black} />
            }
          />
          <SettingsItem
            subtitle="Reset settings to default."
            onPress={() => {
              Alert.alert(
                "Resetting Settings to Default",
                "Are you sure you want to reset the settings to default?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                        restoreSettings();
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Reset Settings"
            Icon={
              <Ionicons name="refresh-sharp" size={18} color={COLORS.black} />
            }
          />
        </Card>

        <Text style={styles.headerText}>User Reading Preference</Text>
        <Card>
          <SettingsItem
            subtitle="Adjust Page fontsize to your preference."
            onPress={() => {}}
            title="Reading Font"
            Icon={
              <Ionicons name="text-outline" size={18} color={COLORS.black} />
            }
          />
          <SettingsItem
            subtitle="Adjust Page reading theme."
            onPress={() => {}}
            title="Reading Theme"
            Icon={
              <Ionicons
                name="color-fill-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingsItem
            subtitle="Adjust Page reading rightness."
            onPress={() => {}}
            title="Reading Brightness"
            Icon={
              <Ionicons name="sunny-outline" size={18} color={COLORS.black} />
            }
          />
          <SettingsItem
            subtitle="Keep awake mode OFF."
            onPress={() => {}}
            title="Keep Awake"
            Icon={
              <Ionicons name="eye-outline" size={18} color={COLORS.black} />
            }
          />
        </Card>

        <Text style={styles.headerText}>Chapters & Verses Management</Text>
        <Card>
          <SettingsItem
            subtitle="Read Later Chapters."
            onPress={() => {}}
            title="Check the chapters that you want to read later."
            Icon={
              <Ionicons
                name="bookmark-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingsItem
            subtitle="Verse Of The Day."
            onPress={() => {}}
            title="Check the verse of the day."
            Icon={
              <Ionicons name="book-outline" size={18} color={COLORS.black} />
            }
          />
          <SettingsItem
            subtitle="Favorite Verses."
            onPress={() => {}}
            title="Check your favorite verses."
            Icon={<Ionicons name="heart" size={18} color={COLORS.black} />}
          />
          <SettingsItem
            subtitle="Clear favorite verses."
            onPress={async () => {
              Alert.alert(
                "Clearing Favorites Verses",
                "Are you sure you want to clear your favorite Verses?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Clear Favorites"
            Icon={
              <MaterialIcons
                name="heart-broken"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingsItem
            subtitle="Clear your read chapter history."
            onPress={async () => {
              Alert.alert(
                "Clearing Read Chapter History",
                "Are you sure you want to clear your read chapter history?",
                [
                  {
                    text: "Yes",
                    onPress: async () => {
                      if (settings.haptics) {
                      }
                    },
                    style: "default",
                  },
                  {
                    text: "No",
                    style: "cancel",
                    onPress: async () => {
                      if (settings.haptics) {
                        await onImpact();
                      }
                    },
                  },
                ],
                {
                  cancelable: false,
                }
              );
            }}
            title="Clear Read Chapter History"
            Icon={
              <MaterialIcons name="clear-all" size={18} color={COLORS.black} />
            }
          />
        </Card>
        <Text style={styles.headerText}>Support</Text>
        <Card>
          <SettingsItem
            onPress={async () => {
              await rateApp();
            }}
            title="Rate Living Word Bible"
            Icon={
              <Ionicons name="star-outline" size={18} color={COLORS.black} />
            }
            subtitle={
              Platform.select({
                ios: "Rate this app on AppStore.",
                android: "Rate this app on Play Store.",
              }) || "Rate this app on Play Store."
            }
          />
          <SettingsItem
            subtitle="Tell others about Living Word Bible."
            onPress={async () => {
              await Share.share(
                {
                  url: "https://github.com/CrispenGari/Living Word Bible",
                  message:
                    "Master of Cocktails: Download at https://github.com/CrispenGari/cocktailer",
                  title: "Share cocktailer with a Friend",
                },
                { dialogTitle: "Share cocktailer", tintColor: COLORS.tertiary }
              );
            }}
            title="Tell a Friend"
            Icon={
              <Ionicons name="heart-outline" size={18} color={COLORS.black} />
            }
          />

          <SettingsItem
            subtitle="About Living Word Bible."
            onPress={() => {
              aboutBottomSheetRef.current?.present();
            }}
            title="Information about Living Word Bible"
            Icon={
              <Ionicons
                name="information-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
          <SettingsItem
            onPress={async () => {
              const res = await Linking.canOpenURL(
                "https://github.com/CrispenGari/livingword/issues"
              );
              if (res) {
                Linking.openURL(
                  "https://github.com/CrispenGari/livingword/issues"
                );
              }
            }}
            title="Report an Issue"
            Icon={
              <Ionicons name="logo-github" size={18} color={COLORS.black} />
            }
            subtitle="Report a bug to github."
          />
        </Card>
        <Text style={styles.headerText}>Legal</Text>
        <Card>
          <SettingsItem
            onPress={async () => {
              router.navigate("/(settings)/tnc");
            }}
            title="Terms of Service"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
            subtitle="Terms and Conditions for Living Word Bible."
          />
          <SettingsItem
            subtitle="Privacy Policy of Living Word Bible."
            onPress={async () => {
              router.navigate("/(settings)/pp");
            }}
            title="Privacy Policy"
            Icon={
              <Ionicons
                name="document-text-outline"
                size={18}
                color={COLORS.black}
              />
            }
          />
        </Card>
      </ScrollView>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 10,
  },
});
