import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  View,
} from "react-native";
import * as Location from "expo-location";
import { googleMapsApiKey } from "@env";
import { WebView } from "react-native-webview";

import GetLocationButton from "../components/GetLocationButton";
import { colors } from "../styles/colors";

export default function NearbyGasStations() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const defaultLocation = {
    latitude: 49.24966,
    longitude: -123.11934,
  };
  const [userLocation, setUserLocation] = useState(defaultLocation);
  const [loading, setLoading] = useState(false);
  const [htmlMap, setHtmlMap] = useState("");

  useEffect(() => {
    const initializeLocation = async () => {
      await getLocation();
    };
    updateHtmlMap();
    initializeLocation();
  }, []);

  useEffect(() => {
    updateHtmlMap();
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
    setLoading(true);
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission must be granted to locate nearby gas stations."
        );
        setLoading(false);
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      console.log("Error getting user location: ", error);
      setLoading(false);
    }
    setLoading(false);
  };

  const getLocationHandler = () => {
    getLocation();
  };

  const updateHtmlMap = () => {
    const uri =
      `https://www.google.com/maps/embed/v1/search?` +
      `q=Gas%20Station` +
      `&key=${googleMapsApiKey}` +
      `&center=${userLocation.latitude}%2C${userLocation.longitude}` +
      `&zoom=12`;
    const htmlMap = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Google Maps Embed</title>
    </head>  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    html,
    body {
      height: 100%;
      margin: 0;
      overflow: hidden; /* Optional: Prevents scrollbars */
    }

    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
    <body>
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style="border:0"
        src=${uri}
        allowfullscreen
      ></iframe>
    </body>
    </html>`;
    setHtmlMap(htmlMap);
  };

  return (
    <SafeAreaView style={styles.container}>
      <GetLocationButton locationReturnHandler={getLocationHandler} />
      <View style={styles.webViewContainer}>
        {htmlMap && (
          <WebView source={{ html: htmlMap }} style={styles.webView} />
        )}
      </View>
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator
          size="large"
          animating={loading}
          color={colors.primaryDark}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },
  webViewContainer: {
    flexGrow: 1,
    width: "100%",
    position: "absolute",
    bottom: 0, // Position at the bottom
    height: "110%", // Set the height as desired
  },
  webView: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  activityIndicatorContainer: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
