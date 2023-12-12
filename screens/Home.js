// This is the home screen.
// This screen contains 2 buttons:
// // 1. Predict Gas Prices - navigates to the Prediction screen.
// // 2. Add Fueling Entry - navigates to the Edit Fuelling Entry screen.

import { StyleSheet, View, SafeAreaView } from "react-native";
import React from "react";
import { auth } from "../firebase/firebaseSetup";
import { signOut } from "firebase/auth";

import LargePressable from "../components/LargePressable";
import CustomPressable from "../components/CustomPressable";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

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

  //
  function onPressSignOut() {
    try {
      auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LargePressable
        title={"PREDICT\nGAS PRICES!\n\n(press me)"}
        onPress={onPressPredictGasPrices}
      />
      <CustomPressable
        title="Add Fueling Entry"
        onPress={onPressAddFuelingEntry}
      />
      <CustomPressable
        title="Sign Out"
        onPress={onPressSignOut}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.error,
          borderWidth: 2,
          shadowColor: colors.error,
        }}
        textStyle={{
          color: colors.error,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 10,
  },
});
