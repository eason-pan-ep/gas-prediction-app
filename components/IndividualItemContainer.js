import { View, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";

export default function IndividualItemContainer({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    //flexDirection: "row",
    marginTop: "2.5%",
    paddingTop: "2.5%",
    paddingBottom: "2.5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "space-around",
    //alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    height: 120,
    width: "100%",
    elevation: 5,
    shadowColor: colors.primaryLight,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
});
