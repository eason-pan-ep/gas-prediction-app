// This component contains a label and a value.
// This component contains the following props:
// // label - string, the label to display
// // value - string, the value to display
// // style - object, additional style to apply to the component

import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function StaticField({ label, value, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 5,
  },
  label: {
    color: colors.primaryDark,
    fontSize: fontSizes.normal,
    fontWeight: "bold",
    height: 20,
    paddingHorizontal: 10,
  },
  value: {
    color: colors.accentDark,
    fontSize: fontSizes.normal,
    height: 20,
    paddingHorizontal: 10,
    flexShrink: 1,
  },
});
