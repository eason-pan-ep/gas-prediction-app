import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import { googleMapsApiKey } from "@env";

import GetLocationButton from "../components/GetLocationButton";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function NearbyGasStations() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);
  const [gasStations, setGasStations] = useState([]);

  const defaultLocation = {
    latitude: 49.24966,
    longitude: -123.11934,
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const staticMapBaseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  const zoomLevel = 13;
  const mapSize = `${windowWidth.toFixed(0)}x${windowHeight.toFixed(0)}`;
  const mapType = "roadmap";
  const userMarkerColor = "red";
  const [mapURI, setMapURI] = useState(
    // use concatenation:
    staticMapBaseUrl +
      `?center=${defaultLocation.latitude},${defaultLocation.longitude}` +
      `&zoom=${zoomLevel}` +
      `&size=${mapSize}` +
      `&maptype=${mapType}` +
      `&markers=color:${userMarkerColor}|${defaultLocation.latitude},${defaultLocation.longitude}` +
      `&key=${googleMapsApiKey}`
  );

  useEffect(() => {
    setUserLocation(defaultLocation);
    const initializeLocation = async () => {
      await getLocation();
    };
    initializeLocation();
  }, []);

  useEffect(() => {
    console.log("User location changed: ", userLocation);
    if (userLocation) {
      setMapURI(
        staticMapBaseUrl +
          `?center=${userLocation.latitude},${userLocation.longitude}` +
          `&zoom=${zoomLevel}` +
          `&size=${mapSize}` +
          `&maptype=${mapType}` +
          `&markers=color:${userMarkerColor}|${userLocation.latitude},${userLocation.longitude}` +
          `&key=${googleMapsApiKey}`
      );
      searchGasStations(userLocation);
    }
  }, [userLocation]);

  const verifyPermission = async () => {
    if (!status) {
      const response = await requestPermission();
      if (!response) {
        // Handle the case where requestPermission fails
        console.log("Permission request failed");
        return false;
      }
      return response.granted;
    }
    return status.granted;
  };

  const getLocation = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission must be granted to locate nearby gas stations."
        );
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync();
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

  const searchGasStations = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&type=gas_station&key=${googleMapsApiKey}`
      );
      const data = await response.json();
      setGasStations(data.results);
    } catch (error) {
      console.error("Error searching gas stations:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {userLocation && (
        <Text>
          Location: {userLocation.latitude}, {userLocation.longitude}
        </Text>
      )}
      {userLocation && <Image source={{ uri: mapURI }} style={styles.image} />}
      {gasStations.map((station) => (
        <Text key={station.place_id}>{station.name}</Text>
      ))}
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
