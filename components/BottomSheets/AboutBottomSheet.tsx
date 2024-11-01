import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Card from "../Card";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props {}
const AboutBottomSheet = React.forwardRef<BottomSheetModal, Props>(
  ({}, ref) => {
    const snapPoints = React.useMemo(() => ["70%"], []);

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={true}
        enableOverDrag={false}
        backgroundStyle={{
          backgroundColor: COLORS.main,
        }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView style={{ flex: 1, padding: 10 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              marginBottom: 10,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            How does Living Word Work?
          </Text>
          <BottomSheetScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Animated.Image
                entering={ZoomIn}
                exiting={ZoomOut}
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: "contain",
                  marginBottom: 10,
                }}
                source={require("@/assets/images/adaptive-icon.png")}
              />
            </View>
            <View>
              <Card style={styles.card}>
                <Text style={styles.sectionHeader}>1. Read Chapters</Text>
                <Text style={styles.bulletPoint}>
                  Living Word allows you to read chapters from the Bible easily,
                  with adjustable font sizes for a comfortable reading
                  experience.
                </Text>
              </Card>
            </View>

            <View>
              <Card style={styles.card}>
                <Text style={styles.sectionHeader}>2. Favorite Verses</Text>
                <Text style={styles.bulletPoint}>
                  Save verses you find inspiring to revisit them later. Your
                  favorite verses are easily accessible in one place.
                </Text>
              </Card>
            </View>

            <View>
              <Card style={styles.card}>
                <Text style={styles.sectionHeader}>3. Add to Read Later</Text>
                <Text style={styles.bulletPoint}>
                  If you come across a chapter or verse you’d like to study in
                  depth, add it to your "Read Later" list.
                </Text>
              </Card>
            </View>

            <View>
              <Card style={styles.card}>
                <Text style={styles.sectionHeader}>4. Verse of the Day</Text>
                <Text style={styles.bulletPoint}>
                  Every day, a new verse is highlighted to inspire and guide you
                  in your daily life.
                </Text>
              </Card>
            </View>
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AboutBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    backgroundColor: COLORS.main,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: FONTS.regular,
  },
  bold: {
    fontFamily: FONTS.bold,
  },
});
