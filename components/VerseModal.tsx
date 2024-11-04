import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "@/constants";
import { TVerse } from "@/types";
import { useSettingsStore } from "@/store/useSettingsStore";
import { onImpact } from "@/utils";
import { useVerseOfTheDayStore } from "@/store/useVerseOfTheDayStore";

const VerseModal = ({
  open,
  onClose,
  verse: { verse, ...rest },
}: {
  onClose: () => void;
  open: boolean;
  verse: {
    verse: TVerse | null;
    date: string;
    triggered: boolean;
  };
}) => {
  const { settings } = useSettingsStore();
  const { update } = useVerseOfTheDayStore();

  const readAndClose = async () => {
    if (settings.haptics) await onImpact();
    update({ ...rest, verse: verse!, triggered: true });
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={readAndClose}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={readAndClose}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              padding: 20,
              backgroundColor: COLORS.main,
              borderRadius: 10,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              position: "relative",
            }}
          >
            <View
              style={{
                height: 25,
                position: "absolute",
                alignSelf: "center",
                shadowColor: COLORS.tertiary,
                backgroundColor: COLORS.tertiary,
                elevation: 1,
                shadowOffset: {
                  width: 2,
                  height: 1,
                },
                shadowRadius: 5,
                shadowOpacity: 0.5,
                width: "80%",
                alignItems: "center",
                top: -13,
                borderRadius: 999,
                maxWidth: 150,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  textTransform: "uppercase",
                  fontSize: 11,
                  color: COLORS.white,
                }}
              >
                {verse.name} {verse.chapterNumber} VS {verse.verseNumber}
              </Text>
            </View>
            <Text style={{ fontFamily: FONTS.regular, fontSize: 16 }}>
              {verse?.verseNumber}. {verse?.verse}
            </Text>

            <TouchableOpacity
              style={{
                width: 120,
                padding: 8,
                backgroundColor: COLORS.tertiary,
                marginTop: 20,
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              onPress={readAndClose}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  fontSize: 14,
                  color: COLORS.white,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default VerseModal;
