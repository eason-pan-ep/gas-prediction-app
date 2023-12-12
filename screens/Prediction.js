// This is the prediction screen.
// This screen displays a message telling if the user should fill up their tank or not.
// This screen displays the gas price predictions for the next 4 days.
// Next to each prediction is a button that allows the user to set a reminder to fill up gas on that day.
// This screen contains 3 button:
// // 1. Nearby Gas Stations - navigates to the Nearby Gas Stations screen.
// // 2. Done - navigates back to the Home screen.
// // 3. Clear Cache - clears the cache of the prediction data.

import {
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  View,
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
          console.log("no match found in firestore");
          //const newPredictionData = generateDummyPrediction(city);
          const newPredictionData = [
            {
              date: "2021-10-01",
              regular: 180.9,
              premium: 200.7,
              diesel: 190.6,
            },
            {
              date: "2021-10-02",
              regular: 181.9,
              premium: 202.5,
              diesel: 194.6,
            }
          ]
          setPredictions(newPredictionData);
          //setSuggestedDate(getSuggestedDate(newPredictionData.prices));
          //writeToPredictionData({ ...newPredictionData, location: city });
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
      <View style={styles.predictionContainer}>
        <Text style={styles.suggestionText}>Prediction for city of</Text>
        <Text style={styles.headerText}>{city}</Text>
        {predictions.length === 0 ? null : (
          <>
            {[0, 1].map((index) => (
              <PredictionItem
                key={index}
                date={predictions[index].date}
                regular={predictions[index].regular}
                premium={predictions[index].premium}
                diesel={predictions[index].diesel}
              />
            ))}
          </>
        )}
        {predictions.length === 0 ? (
          <>
            <Text style={styles.suggestionText}>
              Getting Predictions
              {"\n"}
              This may take a few minutes...
            </Text>
            <ActivityIndicator size="large" color={colors.primary} />
          </>
        ) : null}
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable
          title={"Nearby Gas Stations"}
          onPress={() => {
            navigation.navigate("Gas Stations");
          }}
        />
        <CustomPressable
          title={"Done"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <SubtlePressable title={"Clear Cache"} onPress={onPressClearCache} />
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
  predictionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
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
