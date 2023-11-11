// This component contains a label and a value. This can be set to be editable or not.
// This component contains the following props:
// // label - string, the label to display
// // value - string, the value to display
// // editable - boolean, whether or not the value is editable
// // onChange - function, the function to call when the value changes (if editable)
// // defaultValue - string, the default value to display (if editable)
// // inputType - string, the type of input to display (if editable)
// // style - object, additional style to apply to the component

import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function InlineField({ label, value, editable, style }) {
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
    marginVertical: 10,
    marginHorizontal: 10,
  },
  label: {
    color: colors.backgroundText,
    fontSize: fontSizes.normal,
    marginRight: 10,
  },
  value: {
    color: colors.backgroundText,
    fontSize: fontSizes.normal,
  },
});
