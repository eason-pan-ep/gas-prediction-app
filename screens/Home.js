// This is the home screen.
// This screen contains 2 buttons:
// // 1. Predict Gas Prices - navigates to the Prediction screen.
// // 2. Add Fueling Entry - navigates to the Edit Fuelling Entry screen.

import { View, Text } from "react-native";
import React from "react";

import CustomPressable from "../components/CustomPressable";

export default function Home({ navigation }) {
  // This function is called when the Predict Gas Prices button is pressed.
  // This function should navigate to the Prediction screen.
  function onPressPredictGasPrices() {
    navigation.navigate("Prediction");
  }

  // This function is called when the Add Fueling Entry button is pressed.
  // This function should navigate to the Edit Fueling Entry screen.
  function onPressAddFuelingEntry() {
    navigation.navigate("Edit Fueling Entry");
  }

  return (
    <View>
      <CustomPressable
        title="Predict Gas Prices"
        onPress={onPressPredictGasPrices}
      />
      <CustomPressable
        title="Add Fueling Entry"
        onPress={onPressAddFuelingEntry}
      />
    </View>
  );
}
