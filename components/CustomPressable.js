// This is a custom pressable component that is styled to look like a button.
// This component has the following props:
// // title - string, the text to display on the button
// // onPress - function, the function to call when the button is pressed
// // style - object, additional style to apply to the button

import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function CustomPressable({ title, onPress, style, textStyle }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        style,
        pressed && { opacity: 0.5 },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.pressableText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 300,
    margin: 10,
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 10,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  pressableText: {
    color: colors.primaryText,
    fontSize: fontSizes.large,
    textAlign: "center",
  },
});
