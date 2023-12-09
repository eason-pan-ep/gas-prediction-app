import { View, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";

export default function IndividualItemContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: "2.5%",
    paddingRight: "2.5%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: "100%",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
});
