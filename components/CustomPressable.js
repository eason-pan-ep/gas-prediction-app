// This is a custom pressable component that is styled to look like a button.
// This component has the following props:
// // title - the title of the button
// // onPress - the function to call when the button is pressed
// // style - additional style of the button

import { Pressable, Text, StyleSheet } from "react-native";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function CustomPressable({ title, onPress, style }) {
  return (
    <Pressable style={[styles.pressableContainer, style]} onPress={onPress}>
      <Text style={{ color: "#ffffff", fontSize: 20 }}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
  },
  pressableText: {
    color: colors.primaryText,
    fontSize: fontSizes.large,
  },
});
