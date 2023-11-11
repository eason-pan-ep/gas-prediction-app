// This is a custom pressable component that is styled to look like a button.
// This component has the following props:
// // title - string, the text to display on the button
// // onPress - function, the function to call when the button is pressed
// // style - object, additional style to apply to the button

import { Pressable, Text, StyleSheet } from "react-native";

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
    padding: 10,
    borderRadius: 10,
  },
  pressableText: {
    color: colors.primaryText,
    fontSize: fontSizes.large,
  },
  pressablePressed: {
    backgroundColor: colors.primaryDark,
  },
});
