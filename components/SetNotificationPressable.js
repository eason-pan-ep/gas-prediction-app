// This component is used to set a notification.
// It is a pressable component that displays an icon.
// It is used in the PredictionItem component.

import { Entypo } from "@expo/vector-icons";
import { Alert, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { colors } from "../styles/colors";

export const verifyPermissions = async () => {
  const status = await Notifications.getPermissionsAsync();
  if (status.granted) {
    return true;
  }
  const response = await Notifications.requestPermissionsAsync({
    ios: { allowBadge: true },
  });
  return response.granted;
};

export default function SetNotificationPressable(props) {
  const { date } = props;
  const defaultTime = "09:00"; // Default reminder time is 9:00 (Android)
  const [reminderTime, setReminderTime] = useState("");

  // Set to current date and time for testing purposes
  // const date = "2023-12-09"; // Uncomment this for testing purposes
  // const defaultTime = "16:37"; // Uncomment this for testing purposes

  // Reset reminder time when page is reloaded
  useEffect(() => {
    setReminderTime("");
  }, []);

  // Set reminder after reminder time is updated
  useEffect(() => {
    if (reminderTime.length > 0) {
      scheduleNotification(reminderTime);
      Alert.alert(
        "Reminder Set",
        `You will be notified at ${reminderTime} on ${date}.`,
        [{ text: "Okay" }]
      );
    }
  }, [reminderTime]);

  const isValidTime = (time) => {
    const [hours, minutes] = time.split(":");
    return (
      parseInt(hours, 10) >= 0 &&
      parseInt(hours, 10) <= 23 &&
      parseInt(minutes, 10) >= 0 &&
      parseInt(minutes, 10) <= 59
    );
  };

  const scheduleNotification = async (time) => {
    const [hours, minutes] = time.split(":");
    const notificationTime = new Date(date + "T00:00:00");
    notificationTime.setHours(hours);
    notificationTime.setMinutes(minutes);
    notificationTime.setSeconds(0);
    notificationTime.setMilliseconds(0);

    const now = new Date();
    const delay = notificationTime.getTime() - now.getTime();
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reminder to Fill Up Gas",
          body: "Don't forget to fill up your gas tank today!",
        },
        trigger: {
          seconds: delay / 1000, // Convert milliseconds to seconds
        },
      });
    } catch (err) {
      console.log("schedule notification error", err);
    }
  };

  const scheduleNotificationHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "You need to grant notification permissions to set reminders.",
          [{ text: "Okay" }]
        );
        return;
      }
      // use Alert.prompt if os is ios
      // otherwise, set reminder time to default time of 9:00
      if (Platform.OS === "ios") {
        Alert.prompt(
          "Set Reminder",
          "Enter a time in the format HH:MM (24-hour clock)",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Set",
              onPress: (time) => {
                if (!isValidTime(time)) {
                  Alert.alert(
                    "Invalid time format",
                    "Please enter a time in the format HH:MM",
                    [{ text: "Okay" }]
                  );
                  return;
                }
                setReminderTime(time);
              },
            },
          ],
          "plain-text",
          reminderTime,
          "numbers-and-punctuation"
        );
      } else {
        setReminderTime(defaultTime);
      }
    } catch (err) {
      console.log("schedule notification error", err);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={scheduleNotificationHandler}
    >
      <Entypo name="bell" size={24} color={colors.accent} />
    </Pressable>
  );
}
