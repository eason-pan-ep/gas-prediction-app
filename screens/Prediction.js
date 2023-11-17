// This is the prediction screen.
// This screen displays a message telling if the user should fill up their tank or not.
// This screen displays the gas price predictions for the next 4 days.
// Next to each prediction is a button that allows the user to set a reminder to fill up gas on that day.
// This screen contains 1 button:
// // 1. Nearby Gas Stations - navigates to the Nearby Gas Stations screen.

import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

import StaticField from "../components/StaticField";
import PredictionItem from "../components/PredictionItem";
import CustomPressable from "../components/CustomPressable";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

import { generateRandomLocation } from "../utility/randomDummyPredictionData";
import { getDateList, getSuggestedDate } from "../utility/predictionUtil";

export default function Prediction({ navigation }) {
  const [suggestedDate, setSuggestedDate] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [city, setCity] = useState("");
  const fiveDays = getDateList();

  // placeholder function for getting user's city
  const getUserCity = () => {
    //change it to read from user's device GPS later
    return generateRandomLocation();
  };

  useEffect(() => {
    //get user's city
    setCity(getUserCity());
    //get today's date
    const todayStr = new Date().toISOString().split("T")[0];



  }, [navigation]);



  return (
    <View>
      {predictions.length === 0? 
        null:<>
              <Text style={styles.header}>Prediction for city of {city}</Text>
              <PredictionItem date={fiveDays[0]} price={"$ 1.93 / L"} />
              <PredictionItem date={fiveDays[1]} price={"$ 1.73 / L"} />
              <PredictionItem date={fiveDays[2]} price={"$ 1.83 / L"} />
              <PredictionItem date={fiveDays[3]} price={"$ 2.01 / L"} />
              <PredictionItem date={fiveDays[4]} price={"$ 1.93 / L"} />
            </>
      }
      {suggestedDate === ""?<Text style={styles.suggestionText}>Getting Prediction ....</Text>:<Text style={styles.suggestionText}>Fill up on {suggestedDate} {"\n"}potentially saves your money</Text>}
      <CustomPressable title={"Nearby Gas Stations"} onPress={() => {navigation.navigate("Nearby Gas Stations")}} />
      <CustomPressable title={"Done"} onPress={() => {navigation.goBack()}} />
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
  suggestionText:{
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: fontSizes.large,
    color: colors.primaryDark,
  },
});
