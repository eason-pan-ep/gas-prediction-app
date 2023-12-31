// This is the prediction screen.
// This screen displays a message telling if the user should fill up their tank or not.
// This screen displays the gas price predictions for the next 4 days.
// Next to each prediction is a button that allows the user to set a reminder to fill up gas on that day.
// This screen contains 3 button:
// // 1. Nearby Gas Stations - navigates to the Nearby Gas Stations screen.
// // 2. Done - navigates back to the Home screen.
// // 3. Clear Cache - clears the cache of the prediction data.

import { Text, StyleSheet, Alert, ActivityIndicator, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebaseSetup";
import { collection, query, where, getDocs } from "firebase/firestore";

import PredictionItem from "../components/PredictionItem";
import CustomPressable from "../components/CustomPressable";
import SubtlePressable from "../components/SubtlePressable";
import { getGasPrices, getCity } from "../utility/predictionUtil";
import { writeToPredictionData, clearUserPredictionCache } from "../firebase/firestoreHelper";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

import * as Location from "expo-location";



export default function Prediction({ navigation }) {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [predictions, setPredictions] = useState([]);
  const [city, setCity] = useState("");
  const TODAY = new Date();

  // This function will first ask for permission to access the device's location
  // and return the location if permission is granted
  const verifyPermission = async () => {
    if(!status){
      const response = await requestPermission();
      if(!response){
        return false;
      }
      return response.granted;
    }
    return status.granted;
  };


  const getLocation = async () => {
    try{
      const hasPermission = await verifyPermission();
      if(!hasPermission){
        Alert.alert("Permission to access location was denied");
        navigation.goBack();
        return;
      }
      // get the current location
      const location = await Location.getCurrentPositionAsync();
      return location;
      
    }catch(error){
      console.log("Error getting user location(prediction): ", error);
    }
  }


  useEffect(() => {
    //get today's date string
    const todayStr = `${TODAY.getFullYear()}-${
      TODAY.getMonth() + 1
    }-${TODAY.getDate()}`;

    // try to get docs from predictionData collection that matches today's date and user's city
    // if there is no match, get new prediction data from the APIs
    // otherwise, set the state variable with the data from the database
    const getPrediction = async () => {
      try {
        //get user's city
        const location = await getLocation();
        const coordinate = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
        const findCity = await getCity(coordinate);
        
        if(!findCity.includes("Vancouver")){
          Alert.alert("Prediction is only available for Vancouver, BC");
          navigation.goBack();
          return;
        }
        setCity(findCity);
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
          const newPredictionData = await getGasPrices(city);
          setPredictions(newPredictionData.prices);
          writeToPredictionData(newPredictionData);
        } else {
          console.log("match found");
          querySnapshot.forEach((doc) => {
            const predictionData = doc.data();
            let data=[];
            for(object in predictionData.prices){
              data.push(predictionData.prices[object])
            }
            setPredictions(data);
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
        {city&&<Text style={styles.headerText}>{city}</Text>}
        {predictions.length === 0 ? null : (
          <>
            {[0, 1].map((index) => (
              <PredictionItem
                key={index}
                date={`${TODAY.getFullYear()}-${TODAY.getMonth() + 1}-${TODAY.getDate() + index}`}
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
    marginTop: '2.5%',
    textAlign: "center",
    fontSize: fontSizes.normal,
    color: colors.infoDark,
  },
});
