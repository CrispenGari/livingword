import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import Card from "@/components/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";

const TermsOfService = () => {
  const { settings } = useSettingsStore();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Terms of Service",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={async () => {
                if (settings.haptics) await onImpact();
                if (router.canGoBack()) router.back();
              }}
              style={{ marginRight: 10, paddingRight: 10 }}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontFamily: FONTS.bold,
            fontSize: 20,
          },
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: 100,
          backgroundColor: COLORS.main,
        }}
      >
        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>1. Introduction</Text>
            <Text style={styles.bulletPoint}>
              Welcome to Living Word. By using our app, you agree to these terms
              of service. Please read them carefully.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>2. Eligibility</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Age Requirement:</Text> You must be at
              least 18 years old to use this app. By using Living Word, you
              confirm that you meet this age requirement.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. User Responsibilities</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Respectful Use:</Text> Users are
              expected to use the app respectfully, following all community
              guidelines.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Privacy</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Personal Information:</Text> We respect
              your privacy and handle any collected data as per our Privacy
              Policy.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>5. Changes to Terms</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Modifications:</Text> We may update
              these terms periodically. Significant changes will be communicated
              through the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>6. Contact Us</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Support:</Text> For any questions or
              concerns, please contact us at crispengari@gmail.com.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default TermsOfService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.main,
  },
  card: {
    padding: 10,
    maxWidth: 500,
    alignSelf: "flex-start",
    borderRadius: 5,
    width: "100%",
    paddingVertical: 10,
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
    color: COLORS.tertiary,
  },
});
