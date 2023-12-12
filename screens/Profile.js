// This is the Profile screen.
// This screen contains the user's profile information:
// // email address
// // car make / model
// // gas type
// // total money spent on gas
// // average money spent on gas per L
// // lowest gas price paid per L
// This screen contains 1 button:
// // 1. Edit - navigates to the Edit Profile screen.

import { View, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, database } from "../firebase/firebaseSetup";
import CustomPressable from "../components/CustomPressable";
import StaticField from "../components/StaticField";
import {
  calculateTotalAmountSpent,
  calculateAverageAmountSpent,
  calculateLowestPricePaid,
} from "../utility/fuelingStatCalculation";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function Profile({ navigation }) {
  // state variables for storing user profile information fetched from the database
  const [userProfile, setUserProfile] = useState({
    email: "",
    carMake: "",
    carModel: "",
    gasType: "",
    docID: "",
  });

  // user profile data change listener
  useEffect(() => {
    // if the user is not logged in, unsubscribe from the listener
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        userProfileListener();
      }
    });
    // listen for changes to the user profile data
    const userProfileListener = onSnapshot(
      // get the user profile data matches current uid from the database
      query(
        collection(database, "userProfiles"),
        where("user", "==", auth.currentUser.uid)
      ),
      (snapshot) => {
        snapshot.forEach((doc) => {
          // store the user profile data in the state variable
          const useProfileData = doc.data();
          setUserProfile({
            email: useProfileData.email,
            carMake: useProfileData.carMake,
            carModel: useProfileData.carModel,
            gasType: useProfileData.gasType,
            docID: doc.id,
          });
        });
      },
      (error) => {
        console.log("Error getting user profile data: ", error);
      }
    );
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
  const onPressEdit = () => {
    navigation.navigate("Edit Profile", {
      userProfileData: userProfile,
    });
  };

  // This function is called when the Change Password button is pressed.
  // This function should navigate to the Change Password screen.
  const onPressChangePassword = () => {
    navigation.navigate("Change Password");
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.staticFieldContainer}>
        <StaticField label="Email" value={userProfile.email} />
        <StaticField label="Car Make" value={userProfile.carMake} />
        <StaticField label="Car Model" value={userProfile.carModel} />
        <StaticField label="Gas Type" value={userProfile.gasType} />
        <StaticField
          label="Total Amount Spent"
          value={"$" + totalAmountSpent.toFixed(2)}
          textColor={colors.secondaryDark}
        />
        <StaticField
          label="Average Price Paid"
          value={"$" + averageAmountSpentPerL.toFixed(2) + "/L"}
          textColor={colors.secondaryDark}
        />
        <StaticField
          label="Lowest Price Paid"
          value={"$" + lowestPricePaidPerL.toFixed(2) + "/L"}
          textColor={colors.secondaryDark}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable title={"Edit"} onPress={onPressEdit} />
        <CustomPressable
          title={"Change Password"}
          onPress={onPressChangePassword}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "stretch",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  staticFieldContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
