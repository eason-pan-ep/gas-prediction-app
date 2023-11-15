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

import { View, Text, StyleSheet } from "react-native";
import React from "react";
import EditableField from "../components/EditableField";
import { useState } from "react";
import { colors } from "../styles/colors";
import CustomPressable from "../components/CustomPressable";
import { auth } from "../firebase/firebaseSetup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  //state variables for storing user input
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  //functions for handling email text changes
  const handleEmailChange = (text) => {
    setSignInInfo({ ...signInInfo, email: text });
  };

  //functions for handling password text changes
  const handlePasswordChange = (text) => {
    setSignInInfo({ ...signInInfo, password: text });
  };

  //function for handling sign in button press
  const handleSignInPress = async () => {
    if(signInInfo.email === "" || signInInfo.password === ""){
      alert("Please fill in all fields");
      return;
    }
    try{
      const userCredential = await signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password);
      console.log("userCredential: ", userCredential);
      setSignInInfo({email: "", password: ""}); //reset the state variables to empty strings
    }catch(error){
      if(error.code === "auth/invalid-login-credentials"){
        alert("Email and password do not match, please check them and try again.");
        return;
      }
    }
  };

  
  

  return (
    <View style={styles.container}>
      {/* input for email */}
      <EditableField  
        label={"Email"} onChangeText={handleEmailChange} defaultValue={"sample@oo.com"}
        inputType={'email-address'} isPassword={false}
      />

      {/* input for password */}
      <EditableField  
        label={"Password"} onChangeText={handlePasswordChange} defaultValue={"password"}
        inputType={'default'} isPassword={true}
      />

      {/* button for sign in */}
      <CustomPressable 
        title={"Sign In"}
        onPress={handleSignInPress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },

});
