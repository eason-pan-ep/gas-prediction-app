// This is a custom pressable component that is styled to look like giant circle
// This component has the following props:
// // title - string, the text to display on the button
// // onPress - function, the function to call when the button is pressed
// // style - object, additional style to apply to the button

import { Pressable, Text, StyleSheet, View } from "react-native";
import React from "react";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function LargePressable({ title, onPress, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.pressableContainer,
        style,
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <View style={styles.outerCircle}>
        <View style={styles.innerCircle}>
          <Text style={styles.pressableText}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: colors.primaryLight,
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "center",
    width: 280,
    height: 280,
    marginVertical: 30,
    marginHorizontal: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 150,
    elevation: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  pressableText: {
    color: colors.primaryText,
    fontSize: fontSizes.extraLarge,
    textAlign: "center",
  },
  outerCircle: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    height: 250,
    borderRadius: 125,
    elevation: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  innerCircle: {
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    height: 220,
    borderRadius: 110,
    elevation: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
