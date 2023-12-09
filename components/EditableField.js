// This component contains a label and a value. The field is editable.
// This component contains the following props:
// // label - string, the label to display
// // onChange - function, the function to call when the value changes
// // defaultValue - string, the default value to display
// // inputType - string, the type of input to display
// // style - object, additional style to apply to the component

import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function EditableField({
  label,
  onChangeText,
  placeholder,
  defaultValue,
  inputType,
  isPassword,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.field}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
        placeholder={placeholder}
        keyboardType={inputType}
        secureTextEntry={isPassword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 10,
  },
  label: {
    color: colors.primaryDark,
    fontSize: fontSizes.normal,
    fontWeight: "bold",
    marginRight: 10,
    flexBasis: "30%",
    height: 25,
    paddingHorizontal: 10,
  },
  field: {
    color: colors.accentDark,
    backgroundColor: "#ffffff",
    fontSize: fontSizes.small,
    height: 25,
    paddingHorizontal: 10,
    borderColor: colors.accentDark,
    borderWidth: 1,
    borderRadius: 10,
    flexGrow: 1,
    textAlign: "right",
  },
});
