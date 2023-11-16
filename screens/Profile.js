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
import React, { useEffect, useState } from "react";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database } from "../firebase/firebaseSetup";

import CustomPressable from "../components/CustomPressable";
import StaticField from "../components/StaticField";
import {
  calculateTotalAmountSpent,
  calculateAverageAmountSpent,
  calculateLowestPricePaid,
} from "../utility/fuelingStatCalculation";

export default function Profile({ navigation }) {
  // state variables for storing user profile information fetched from the database
  const [userProfile, setUserProfile] = useState({
    email: "",
    carModel: "",
    gasType: "",
    docID: "",
  });

  // user profile data change listener
  useEffect(() => {
    try{
      // get the user profile data matches current uid from the database
      const q = query(collection(database, "userProfiles"), where("user", "==", auth.currentUser.uid));
      // listen for changes to the user profile data
      onSnapshot(q, querySnapshot => {
        querySnapshot.forEach((doc) => {
          // store the user profile data in the state variable
          const useProfileData = doc.data();
          setUserProfile({
            email: useProfileData.email,
            carModel: useProfileData.carModel,
            gasType: useProfileData.gasType,
            docID: doc.id,
          });
        });
      });
    }catch(error){
      console.log("Error getting user profile data: ", error);
    } 
  }, [navigation]);

  // This is a dummy fueling history for testing purposes.
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
      <StaticField label="Email" value={userProfile.email} />
      <StaticField label="Car Model" value={userProfile.carModel} />
      <StaticField label="Gas Type" value={userProfile.gasType} />
      <StaticField
        label="Total Amount Spent"
        value={"$" + totalAmountSpent.toFixed(2)}
      />
      <StaticField
        label="Average Price Paid"
        value={"$" + averageAmountSpentPerL.toFixed(2) + "/L"}
      />
      <StaticField
        label="Lowest Price Paid"
        value={"$" + lowestPricePaidPerL.toFixed(2) + "/L"}
      />
      <CustomPressable title="Edit" onPress={onPressEdit} />
    </View>
  );
}
