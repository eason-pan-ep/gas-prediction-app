// This is the login screen that will allow the user to login to their account or back to the sign up screen.
// This screen contains a logo of the app.
// Log In component:
// // This component contains 2 text input fields:
// // // 1 -- email address
// // // 2 -- password
// // This component contains 1 buttons:
// // // Log In - logs the user in to their account.
//

import React, { useState } from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";

import EditableField from "../components/EditableField";
import CustomPressable from "../components/CustomPressable";
import SubtlePressable from "../components/SubtlePressable";
import { auth } from "../firebase/firebaseSetup";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function SignIn({ navigation }) {
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

  // function for handling sign up button press
  // // navigate to the sign up screen
  const handleSignUpPress = () => {
    setSignInInfo({ email: "", password: "" }); //reset the state variables to empty strings
    navigation.navigate("Sign Up");
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      {/* logo image */}
      <Image
        style={styles.logo}
        source={require("../assets/octane-oracle-icon.png")}
      />
      <Text style={styles.welcomeMessage}>Welcome back to Octane Oracle</Text>
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
        <SubtlePressable
          title={"Do not have an account? Sign up here."}
          onPress={handleSignUpPress}
        />
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
    width: 128,
    height: 128,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    borderColor: colors.primaryDark,
    borderWidth: 2,
    borderRadius: 20,
  },
  welcomeMessage: {
    fontSize: fontSizes.extraLarge,
    color: colors.primaryDark,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
