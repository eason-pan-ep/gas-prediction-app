// This is the login screen that will allow the user to login to their account or back to the sign up screen.
// This screen contains a logo of the app.
// Log In component:
// // This component contains 2 text input fields:
// // // 1 -- email address
// // // 2 -- password
// // This component contains 1 buttons:
// // // Log In - logs the user in to their account.
//

import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import React, { useState } from "react";

import EditableField from "../components/EditableField";
import CustomPressable from "../components/CustomPressable";

import { colors } from "../styles/colors";

import { auth } from "../firebase/firebaseSetup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  // state variables for storing user input
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  // functions for handling email text changes
  const handleEmailChange = (text) => {
    setSignInInfo({ ...signInInfo, email: text });
  };

  // functions for handling password text changes
  const handlePasswordChange = (text) => {
    setSignInInfo({ ...signInInfo, password: text });
  };

  // function for handling sign in button press
  // // locally validate the user input first
  // // then call the firebase function to sign in
  // // if the user input is invalid, alert the user
  const handleSignInPress = async () => {
    if (signInInfo.email === "" || signInInfo.password === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInInfo.email,
        signInInfo.password
      );
      setSignInInfo({ email: "", password: "" }); //reset the state variables to empty strings
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
        alert(
          "Email and password do not match, please check them and try again."
        );
        return;
      }
    }
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      {/* logo image */}
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      {/* input for email */}
      <EditableField
        label={"Email"}
        onChangeText={handleEmailChange}
        inputType={"email-address"}
        isPassword={false}
      />
      {/* input for password */}
      <EditableField
        label={"Password"}
        onChangeText={handlePasswordChange}
        inputType={"default"}
        isPassword={true}
      />
      {/* button for sign in */}
      <View style={styles.buttonContainer}>
        <CustomPressable title={"Sign In"} onPress={handleSignInPress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  logo: {
    width: "30%",
    height: "15%",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: "8%",
  },
});
