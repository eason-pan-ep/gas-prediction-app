// This is the prediction screen.
// This screen displays a message telling if the user should fill up their tank or not.
// This screen displays the gas price predictions for the next 4 days.
// Next to each prediction is a button that allows the user to set a reminder to fill up gas on that day.
// This screen contains 3 button:
// // 1. Nearby Gas Stations - navigates to the Nearby Gas Stations screen.
// // 2. Done - navigates back to the Home screen.
// // 3. Clear Cache - clears the cache of the prediction data.

import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import PredictionItem from "../components/PredictionItem";
import CustomPressable from "../components/CustomPressable";
import SubtlePressable from "../components/SubtlePressable";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

import {
  generateRandomLocation,
  generateDummyPrediction,
} from "../utility/randomDummyPredictionData";
import { getDateList, getSuggestedDate } from "../utility/predictionUtil";

import { auth, database } from "../firebase/firebaseSetup";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  writeToPredictionData,
  clearUserPredictionCache,
} from "../firebase/firestoreHelper";

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
    <View>
      {predictions.length === 0 ? null : (
        <>
          <Text style={styles.header}>Prediction for city of {city}</Text>
          <PredictionItem
            date={fiveDays[0]}
            price={`$ ${predictions[0]} / L`}
          />
          <PredictionItem
            date={fiveDays[1]}
            price={`$ ${predictions[1]} / L`}
          />
          <PredictionItem
            date={fiveDays[2]}
            price={`$ ${predictions[2]} / L`}
          />
          <PredictionItem
            date={fiveDays[3]}
            price={`$ ${predictions[3]} / L`}
          />
          <PredictionItem
            date={fiveDays[4]}
            price={`$ ${predictions[4]} / L`}
          />
        </>
      )}
      {suggestedDate === "" ? (
        <View>
          <Text style={styles.suggestionText}>
            Getting Predictions
            {"\n"}
            This may take a few minutes...
          </Text>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
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
      <View style={styles.clearButtonContainer}>
        <SubtlePressable title={"Clear Cache"} onPress={onPressClearCache} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: fontSizes.large,
    marginTop: 20,
    marginBottom: 20,
  },
  suggestionText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    fontSize: fontSizes.large,
    color: colors.primaryDark,
  },
  clearButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
