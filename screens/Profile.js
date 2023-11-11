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
import InlineField from "../components/InlineField";
import {
  calculateTotalAmountSpent,
  calculateAverageAmountSpent,
  calculateLowestPricePaid,
} from "../utility/fuelingStatCalculation";

export default function Profile({ navigation }) {
  // For testing purposes, the user's profile information is hardcoded.
  const user = {
    email: "johndoe@gmail.com",
    carModel: "Honda Civic",
    history: userFuelingHistory,
  };
  const userFuelingHistory = [
    {
      date: "2023-11-01",
      amount: 40,
      price: 1.99,
      photo: null,
    },
    {
      date: "2023-11-15",
      amount: 50,
      price: 2.29,
      photo: null,
    },
    {
      date: "2023-11-30",
      amount: 45,
      price: 1.89,
      photo: null,
    },
  ];
  const totalAmountSpent = calculateTotalAmountSpent(userFuelingHistory);
  const averageAmountSpentPerL =
    calculateAverageAmountSpent(userFuelingHistory);
  const lowestPricePaidPerL = calculateLowestPricePaid(userFuelingHistory);

  // This function is called when the Edit button is pressed.
  // This function should navigate to the Edit Profile screen.
  function onPressEdit() {
    navigation.navigate("Edit Profile");
  }

  return (
    <View>
      <InlineField label="Email" value={user.email} />
      <InlineField label="Car Model" value={user.carModel} />
      <InlineField
        label="Total Amount Spent"
        value={"$" + totalAmountSpent.toFixed(2)}
      />
      <InlineField
        label="Average Price Paid"
        value={"$" + averageAmountSpentPerL.toFixed(2) + "/L"}
      />
      <InlineField
        label="Lowest Price Paid"
        value={"$" + lowestPricePaidPerL.toFixed(2) + "/L"}
      />
      <CustomPressable title="Edit" onPress={onPressEdit} />
    </View>
  );
}
