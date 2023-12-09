// This is the prediction screen.
// This screen displays a message telling if the user should fill up their tank or not.
// This screen displays the gas price predictions for the next 4 days.
// Next to each prediction is a button that allows the user to set a reminder to fill up gas on that day.
// This screen contains 3 button:
// // 1. Nearby Gas Stations - navigates to the Nearby Gas Stations screen.
// // 2. Done - navigates back to the Home screen.
// // 3. Clear Cache - clears the cache of the prediction data.

import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDateList, getSuggestedDate } from "../utility/predictionUtil";
import { auth, database } from "../firebase/firebaseSetup";
import { collection, query, where, getDocs } from "firebase/firestore";

import PredictionItem from "../components/PredictionItem";
import CustomPressable from "../components/CustomPressable";
import SubtlePressable from "../components/SubtlePressable";
import {
  generateRandomLocation,
  generateDummyPrediction,
} from "../utility/randomDummyPredictionData";
import {
  writeToPredictionData,
  clearUserPredictionCache,
} from "../firebase/firestoreHelper";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function Prediction({ navigation }) {
  const [suggestedDate, setSuggestedDate] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [city, setCity] = useState(generateRandomLocation());
  const fiveDays = getDateList();

  useEffect(() => {
    //get today's date
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // try to get docs from predictionData collection that matches today's date and user's city
    // if there is no match, get new prediction data from the APIs
    // otherwise, set the state variable with the data from the database
    const getPrediction = async () => {
      try {
        const q = query(
          collection(database, "predictionData"),
          where("user", "==", auth.currentUser.uid),
          where("date", "==", todayStr),
          where("location", "==", city)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          //no match found => get new prediction data from the APIs
          console.log("no match found");
          const newPredictionData = generateDummyPrediction(city);
          setPredictions(newPredictionData.prices);
          setSuggestedDate(getSuggestedDate(newPredictionData.prices));
          writeToPredictionData({ ...newPredictionData, location: city });
        } else {
          console.log("match found");
          querySnapshot.forEach((doc) => {
            const predictionData = doc.data();
            setPredictions(predictionData.prices);
            setSuggestedDate(getSuggestedDate(predictionData.prices));
          });
        }
      } catch (error) {
        console.log("error getting prediction data: ", error);
      }
    };
    getPrediction();
  }, [navigation]);

  // function for handling on press of the clear cache button
  const onPressClearCache = () => {
    //confirm with users before clearing the cache
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to clear all prediction cache?",
      [
        // if the user cancels, do nothing
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          // if the user confirms, clear the cache
          text: "Confirm",
          onPress: () => {
            clearUserPredictionCache();
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.suggestionText}>Prediction for city of</Text>
      <Text style={styles.headerText}>{city}</Text>
      {predictions.length === 0 ? null : (
        <>
          {[0, 1, 2, 3, 4].map((index) => (
            <PredictionItem
              key={index}
              date={fiveDays[index]}
              price={`$ ${predictions[index].toFixed(2)} / L`}
            />
          ))}
        </>
      )}
      {suggestedDate === "" ? (
        <>
          <Text style={styles.suggestionText}>
            Getting Predictions
            {"\n"}
            This may take a few minutes...
          </Text>
          <ActivityIndicator size="large" color={colors.primary} />
        </>
      ) : (
        <Text style={styles.suggestionText}>
          Fill up on {suggestedDate} {"\n"}potentially saves your money
        </Text>
      )}
      <CustomPressable
        title={"Nearby Gas Stations"}
        onPress={() => {
          navigation.navigate("Nearby Gas Stations");
        }}
      />
      <CustomPressable
        title={"Done"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SubtlePressable title={"Clear Cache"} onPress={onPressClearCache} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    color: colors.infoDark,
    fontSize: fontSizes.extraLarge,
    fontWeight: "bold",
    textAlign: "center",
  },
  suggestionText: {
    textAlign: "center",
    fontSize: fontSizes.normal,
    color: colors.infoDark,
  },
});
