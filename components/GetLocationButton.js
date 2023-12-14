import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";

import { colors } from "../styles/colors";

const GetLocationButton = ({ locationReturnHandler }) => {
  const [status, requestPermission] = Location.useForegroundPermissions();

  // Main render
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={locationReturnHandler}
    >
      <Entypo
        name="location"
        size={24}
        color={colors.primaryDark}
        style={styles.icon}
      />
    </Pressable>
  );
};

export default GetLocationButton;

const styles = StyleSheet.create({
  container: {
    bottom: 120,
    right: 5,
    width: 60,
    height: 60,
    flex: 0,
    zIndex: 1,
    position: "absolute",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 30,
    elevation: 5,
    backgroundColor: "#ffffff",
  },
  icon: {
    padding: 14,
    textAlign: "center",
    color: colors.primary,
  },
});
