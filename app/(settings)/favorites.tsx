import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Card from "@/components/Card";
import { COLORS, FONTS } from "@/constants";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useFavoritesVersesStore } from "@/store/useFavoritesVersesStore";
import FavoriteVerse from "@/components/FavoriteVerse";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FavoriteVersesOptionsBottomSheet from "@/components/BottomSheets/FavoriteVersesOptionsBottomSheet";

const Page = () => {
  const { settings } = useSettingsStore();
  const { verses } = useFavoritesVersesStore();
  const favoriteVersesRef = React.useRef<BottomSheetModal>(null);
  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.main,
          },
          headerTitle: "Your Favorite Verses",
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 20,
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
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                router.back();
              }}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.tertiary} />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              onPress={async () => {
                if (settings.haptics) {
                  await onImpact();
                }
                favoriteVersesRef.current?.present();
              }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={20}
                color={COLORS.tertiary}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <FavoriteVersesOptionsBottomSheet ref={favoriteVersesRef} />
      {verses.length === 0 ? (
        <View
          style={{
            padding: 10,
            flex: 1,
            backgroundColor: COLORS.main,
          }}
        >
          <Card
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 200,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.regular,

                color: COLORS.gray,
              }}
            >
              No favorite verses.
            </Text>
          </Card>
        </View>
      ) : (
        <FlatList
          keyExtractor={(verse) =>
            verse.abbr.concat(verse.verseNumber.toString())
          }
          data={verses}
          renderItem={({ item }) => <FavoriteVerse verse={item} />}
          style={{
            backgroundColor: COLORS.main,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            padding: 10,
          }}
        />
      )}
    </>
  );
};

export default Page;
