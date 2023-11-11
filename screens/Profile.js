// This is the Profile screen.
// This screen contains the user's profile information:
// // email address
// // car make / model
// // total money spent on gas
// // average money spent on gas per L
// // lowest gas price paid per L
// This screen contains 1 button:
// // 1. Edit - navigates to the Edit Profile screen.

import { View, StyleSheet } from "react-native";
import React from "react";

import CustomPressable from "../components/CustomPressable";

export default function Profile({ navigation }) {
  // This function is called when the Edit button is pressed.
  // This function should navigate to the Edit Profile screen.
  function onPressEdit() {
    navigation.navigate("Edit Profile");
  }

  return (
    <View>
      <CustomPressable title="Edit" onPress={onPressEdit} />
    </View>
  );
}
