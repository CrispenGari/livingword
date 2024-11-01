import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { COLORS, FONTS } from "@/constants";
import Card from "@/components/Card";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { onImpact } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "@/store/useSettingsStore";

const PrivacyPolicy = () => {
  const { settings } = useSettingsStore();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Privacy Policy",
          headerLargeTitle: false,
          headerLargeTitleShadowVisible: true,

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
              Welcome to Living Word. We value your privacy and are committed to
              protecting your information. This Privacy Policy explains how we
              collect, use, and safeguard your data.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>2. Information We Collect</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Non-Personal Information:</Text> We may
              collect non-personal data, such as app usage statistics, to
              enhance user experience. Personal identification information is
              not required to access the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>3. How We Use Information</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>App Functionality:</Text> We utilize
              non-personal information to analyze user interactions with the app
              and improve features like verse favorites and daily
              recommendations.
            </Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>No Third-Party Sharing:</Text> Your data
              will not be shared with third-party services or advertisers,
              ensuring your privacy remains intact.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>4. Data Security</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Security Measures:</Text> We implement
              robust security measures to protect your data from unauthorized
              access or misuse.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInLeft.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>
              5. Changes to Privacy Policy
            </Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Policy Updates:</Text> We may update
              this policy periodically. Any significant changes will be
              communicated through the app.
            </Text>
          </Card>
        </Animated.View>

        <Animated.View entering={SlideInRight.duration(100).delay(100)}>
          <Card style={styles.card}>
            <Text style={styles.sectionHeader}>6. Contact Us</Text>
            <Text style={styles.bulletPoint}>
              <Text style={styles.bold}>Questions:</Text> If you have any
              questions or concerns about our privacy practices, please contact
              us at crispengari@gmail.com.
            </Text>
          </Card>
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default PrivacyPolicy;

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
