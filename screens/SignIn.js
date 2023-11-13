// This is the login screen that will allow the user to login to their account or create a new account.
// This screen contains a logo of the app.
// The Log In component is displayed by default.
// The Create Account component is displayed when the Create Account button is pressed.
// Log In component:
// // This component contains 2 text input fields:
// // // email address
// // // password
// // This component contains 2 buttons:
// // // 1. Log In - logs the user in to their account.
// // // 2. Create Account - navigates to the Create Account component.
// Create Account component:
// // This component contains 3 text input fields:
// // // email address
// // // password
// // // confirm password
// // This component contains 2 buttons:
// // // 1. Create Account - creates a new account.
// // // 2. Cancel - navigates to the Log In component.

import { View, Text } from "react-native";
import React from "react";

export default function SignIn() {
  return (
    <View>
      <Text>SignIn</Text>
    </View>
  );
}
