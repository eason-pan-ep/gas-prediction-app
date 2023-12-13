// This is the screen that will display the nearby gas stations on a map.
// This screen contains a map that displays the nearby gas stations.
// This screen contains a list of the nearby gas stations.

import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GetLocationButton from "../components/GetLocationButton";
import { getLatitude, getLongitude } from "../utility/deviceLocationUtil";
import * as Location from "expo-location";
import { googleMapsApiKey } from "@env";

export default function NearbyGasStations() {
  const [userLocation, setUserLocation] = useState(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  // This function will run when the screen is first loaded
  // It will obtain the user's location and store it in the userLocation state variable
  useEffect(() => {
    console.log("User Location: ", userLocation);
    getLocation();
  }, []);

  // This function will ask for permission to access the device's location
  const verifyPermission = async () => {
    if (status.granted) {
      return true;
    }
    const response = await requestPermission();
    return response.granted;
  };

  // This function will first call another function to ask for permission to access the device's location
  // and return the location if permission is granted
  const getLocation = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission must be granted to locate nearby gas stations."
        );
        return;
      }
      // get the current location
      const currentLocation = await Location.getCurrentPositionAsync();
      console.log("Location Pressed: ", currentLocation);
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting user location: ", error);
    }
  };

  const getLocationHandler = () => {
    console.log("Get Location Pressed");
    getLocation();
  };

  return (
    <View style={styles.container}>
      <Text>NearbyGasStations</Text>
      {userLocation && (
        <Text>
          Location: {userLocation.latitude}, {userLocation.longitude}
        </Text>
      )}
      {userLocation && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${userLocation.latitude},${userLocation.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${userLocation.latitude},${userLocation.longitude}&key=${googleMapsApiKey}`,
          }}
          style={styles.image}
        />
      )}
      <GetLocationButton locationReturnHandler={getLocationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
