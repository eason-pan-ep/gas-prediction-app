// This is the screen that will display the nearby gas stations on a map.
// This screen contains a map that displays the nearby gas stations.
// This screen contains a list of the nearby gas stations.

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import GetLocationButton from "../components/GetLocationButton";
import * as Location from "expo-location";
import { googleMapsApiKey } from "@env";

export default function NearbyGasStations() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);

  const defaultLocation = {
    latitude: 49.24966,
    longitude: -123.11934,
  };

  // Get screen dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // Constants for the Google Maps API
  const staticMapBaseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  const zoomLevel = 13;
  const mapSize = `${windowWidth.toFixed(0)}x${windowHeight.toFixed(0)}`;
  const mapType = "roadmap";
  const userMarkerColor = "red";

  const [mapURI, setMapURI] = useState(
    `${staticMapBaseUrl}?center=${defaultLocation.latitude},${defaultLocation.longitude}&zoom=${zoomLevel}&size=${mapSize}&maptype=${mapType}&markers=color:${userMarkerColor}|${defaultLocation.latitude},${defaultLocation.longitude}&key=${googleMapsApiKey}`
  );

  // This function will run when the screen is first loaded
  // It will obtain the user's location and store it in the userLocation state variable
  useEffect(() => {
    console.log("User Location: ", userLocation);
    getLocation();
  }, []);

  // Update Map URI when userLocation changes
  useEffect(() => {
    if (userLocation) {
      setMapURI(
        `${staticMapBaseUrl}?center=${userLocation.latitude},${userLocation.longitude}&zoom=${zoomLevel}&size=${mapSize}&maptype=${mapType}&markers=color:${userMarkerColor}|${userLocation.latitude},${userLocation.longitude}&key=${googleMapsApiKey}`
      );
      console.log("Map URI: ", mapURI);
    }
  }, [userLocation]);

  // This function will ask for permission to access the device's location
  const verifyPermission = async () => {
    console.log("Status: ", status);
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
    <SafeAreaView style={styles.container}>
      {userLocation && (
        <Text>
          Location: {userLocation.latitude}, {userLocation.longitude}
        </Text>
      )}
      {userLocation && <Image source={{ uri: mapURI }} style={styles.image} />}
      <GetLocationButton locationReturnHandler={getLocationHandler} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
