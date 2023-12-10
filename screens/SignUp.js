// SignUp Account Screen:
// // This screen is shown by default when the app is opened if the user is not logged in.
// // This screen contains 1 logo image:
// // // logo of the app
// // This screen contains 3 EditableField components:
// // // email address
// // // password
// // // confirm password
// // This screen contains 1 checkbox:
// // // terms and conditions
// // This screen contains 2 buttons:
// // // 1. Sign Up - creates a new account.
// // // 2. Already have an account? Sign in here. - navigates to the Sign In screen.
//

import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState } from "react";

import EditableField from "../components/EditableField";
import CustomPressable from "../components/CustomPressable";
import SubtlePressable from "../components/SubtlePressable";
import Checkbox from "expo-checkbox";

import { auth } from "../firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { writeToUserProfile } from "../firebase/firestoreHelper";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const SignUp = ({ navigation }) => {
  //state variables for storing user input
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    carMake: "",
    carModel: "",
    gasType: 87,
    isChecked: false,
  });

  //functions for handling user input text changes
  const handleEmailChange = (text) => {
    setSignUpInfo({ ...signUpInfo, email: text });
  };
  const handlePasswordChange = (text) => {
    setSignUpInfo({ ...signUpInfo, password: text });
  };
  const handleConfirmPasswordChange = (text) => {
    setSignUpInfo({ ...signUpInfo, confirmPassword: text });
  };
  const handleCarMakeChange = (text) => {
    setSignUpInfo({ ...signUpInfo, carMake: text });
  };
  const handleCarModelChange = (text) => {
    setSignUpInfo({ ...signUpInfo, carModel: text });
  };
  const handleGasTypeChange = (num) => {
    setSignUpInfo({ ...signUpInfo, gasType: Number(num) });
  };

  //function for handling checkbox changes
  const handleCheckboxChange = () => {
    setSignUpInfo({ ...signUpInfo, isChecked: !signUpInfo.isChecked });
  };

  //function for pack user data into an object
  // and write to firestore userProfiles collection
  const initialLoadUserProfileData = () => {
    const data = {
      carMake: signUpInfo.carMake,
      carModel: signUpInfo.carModel,
      email: signUpInfo.email,
      gasType: signUpInfo.gasType,
    };
    writeToUserProfile(data);
  };

  //function for handling sign up button press
  const handleSignUpPress = async () => {
    if (
      signUpInfo.email === "" ||
      signUpInfo.password === "" ||
      signUpInfo.confirmPassword === ""
    ) {
      //check if any of the fields are empty
      alert("Please fill in all fields");
      return;
    }
    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      //check if passwords match
      alert("Passwords do not match");
      return;
    }
    if (!signUpInfo.isChecked) {
      //check if terms and conditions are agreed to
      alert("Please agree to the terms and conditions");
      return;
    }

    try {
      //try to create the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpInfo.email,
        signUpInfo.password
      );
      initialLoadUserProfileData(); //write the user data to firestore
      setSignUpInfo({
        //reset the state variables to empty
        email: "",
        password: "",
        confirmPassword: "",
        carMake: "",
        carModel: "",
        gasType: 87,
        isChecked: false,
      });
    } catch (error) {
      //catch common errors and alert the user
      if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
        return;
      }
      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
        return;
      }
      if (error.code === "auth/email-already-in-use") {
        alert("Email address already in use, please use another one.");
        return;
      }
      console.log("error creating user: ", typeof error.code, error.code);
      alert(error.code);
      return;
    }
  };

  //function for handling sign in press
  const handleSignInPress = () => {
    navigation.navigate("Sign In");
  };

  //main render
  return (
    <SafeAreaView style={styles.container}>
      {/* logo image */}
      <Image style={styles.logo} source={require("../assets/icon.png")} />
      {/* input for email */}
      <EditableField
        label={"Email*"}
        onChangeText={handleEmailChange}
        placeholder={"sample@oo.com"}
        inputType={"email-address"}
        isPassword={false}
      />
      {/* input for password */}
      <EditableField
        label={"Password*"}
        onChangeText={handlePasswordChange}
        placeholder={"password"}
        inputType={"default"}
        isPassword={true}
      />
      {/* input for confirm password */}
      <EditableField
        label={"Confirm Password*"}
        onChangeText={handleConfirmPasswordChange}
        placeholder={"password"}
        inputType={"default"}
        isPassword={true}
      />
      {/* input for car make */}
      <EditableField
        label={"Car Make"}
        onChangeText={handleCarMakeChange}
        placeholder={"Honda"}
        inputType={"default"}
        isPassword={false}
      />
      {/* input for car model */}
      <EditableField
        label={"Car Model"}
        onChangeText={handleCarModelChange}
        placeholder={"CRV"}
        inputType={"default"}
        isPassword={false}
      />
      {/* input for gas type */}
      <EditableField
        label={"Gas Type"}
        onChangeText={handleGasTypeChange}
        placeholder={"87"}
        inputType={"numeric"}
        isPassword={false}
      />
      <Text style={styles.infoReminder}>* indicates required fields.</Text>

      {/* checkbox for terms and conditions */}
      <View style={styles.checkBoxContainer}>
        <Checkbox
          color={colors.primaryDark}
          value={signUpInfo.isChecked}
          onValueChange={handleCheckboxChange}
        />
        <Text> Agree on</Text>
        <SubtlePressable
          title={"terms and conditions"}
          onPress={() => navigation.navigate("Terms and Conditions")}
        />
      </View>
      {/* buttons for sign up and sign in */}
      <View style={styles.buttonContainer}>
        <CustomPressable title={"Sign Up"} onPress={handleSignUpPress} />
        <SubtlePressable
          title={"Already have an account? Sign in here."}
          onPress={handleSignInPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  checkBoxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: "30%",
    height: "15%",
    alignSelf: "center",
    marginTop: "8%",
    marginBottom: "8%",
  },
  infoReminder: {
    fontSize: fontSizes.small,
    width: "95%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    color: colors.accentDark,
    textAlign: "center",
  },
});
