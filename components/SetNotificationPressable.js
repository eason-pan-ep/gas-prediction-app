// This component is used to set a notification.
// It is a pressable component that displays an icon.
// It is used in the PredictionItem component.

import { Entypo } from "@expo/vector-icons";
import { Pressable } from "react-native";
import React, { useState } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export const verifyPermissions = async () => {
  const status = await Notifications.getPermissionsAsync();
  if (status.granted) {
    return true;
  }
  const response = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
  return response.granted;
};

export default function SetNotificationPressable(date) {
  const { reminderTime, setReminderTime } = useState("09:00");

  const isValidTime = (time) => {
    const [hours, minutes] = time.split(":");
    return (
      parseInt(hours, 10) >= 0 &&
      parseInt(hours, 10) <= 23 &&
      parseInt(minutes, 10) >= 0 &&
      parseInt(minutes, 10) <= 59
    );
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
      // Modal popup to ask user for time
      // set the reminder time
      Alert.prompt(
        "Set Reminder Time",
        "Enter the time you want to be reminded at (HH:MM)",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Set",
            onPress: (time) => {
              if (isValidTime(time)) {
                setReminderTime(time);

                const scheduleTime = new Date(date);
                const [hours, minutes] = time.split(":");
                scheduleTime.setHours(parseInt(hours, 10));
                scheduleTime.setMinutes(parseInt(minutes, 10));

                Notifications.scheduleNotificationAsync({
                  content: {
                    title: "Reminder",
                    body: "Time to fill up your tank!",
                  },
                  trigger: { date: scheduleTime },
                });
                console.log("scheduled notification at", scheduleTime);
              } else {
                Alert.alert(
                  "Invalid Time",
                  "Please enter a valid time (HH:MM)",
                  [{ text: "Okay" }]
                );
              }
            },
          },
        ],
        "plain-text"
      );
    } catch (err) {
      console.log("schedule notification error", err);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={scheduleNotificationHandler}
    >
      <Entypo name="bell" size={24} color={colors.accentLight} />
    </Pressable>
  );
}
