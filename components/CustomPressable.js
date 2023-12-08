// This is a custom pressable component that is styled to look like a button.
// This component has the following props:
// // title - string, the text to display on the button
// // onPress - function, the function to call when the button is pressed
// // style - object, additional style to apply to the button

import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function CustomPressable({ title, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        pressed && styles.pressablePressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.pressableText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    height: 60,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  pressableText: {
    color: colors.primaryText,
    fontSize: fontSizes.large,
    fontFamily: "Lato-Regular",
  },
  pressablePressed: {
    backgroundColor: colors.primaryDark,
  },
});
