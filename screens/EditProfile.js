// This screen allows the user to edit their profile information.
// This screen contains the user's profile information which are editable:
// // email address (contact email, not the account)
// // password (not implemented yet)
// // car make 
// // car model
// // gas type
// This screen contains 2 button:
// // 1. Save - saves the changes made to the user's profile information.
// // 2. Cancel - discards the changes made to the user's profile information.

import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

import EditableField from "../components/EditableField";
import CustomPressable from "../components/CustomPressable";
import { updateUserProfile } from "../firebase/firestoreHelper";

export default function EditProfile({route, navigation}) {
  // destruct the user profile data from the route params
  const {email, carMake, carModel, gasType, docID} = route.params.userProfileData;
  // state variable for storing the user profile information
  const [editProfileInfo, setEditProfileInfo] = useState({
    email: email,
    carMake: carMake,
    carModel: carModel,
    gasType: gasType,
  });

  // function for handling email text changes
  const handleEmailChange = (text) => {
    setEditProfileInfo({ ...editProfileInfo, email: text });
  };
  // function for handling car make text changes
  const handleCarMakeChange = (text) => {
    setEditProfileInfo({ ...editProfileInfo, carMake: text });
  };
  // function for handling car model text changes
  const handleCarModelChange = (text) => {
    setEditProfileInfo({ ...editProfileInfo, carModel: text });
  };
  // function for handling gas type text changes
  const handleGasTypeChange = (text) => {
    setEditProfileInfo({ ...editProfileInfo, gasType: Number(text) });
  };

  // function for handling save button press
  const handleSavePress = () => {
    updateUserProfile(editProfileInfo, docID);
    navigation.navigate("Profile");
  };

  // function for handling cancel button press
  const handleCancelPress = () => {
    navigation.goBack();
  };



  // The main render
  return (
    <View>
      <EditableField label={"Email"} onChangeText={handleEmailChange}
        defaultValue={editProfileInfo.email} inputType={'email-address'} isPassword={false}
      />
      <EditableField label={"Car Make"} onChangeText={handleCarMakeChange}
        defaultValue={editProfileInfo.carMake} inputType={'default'} isPassword={false}
      />
      <EditableField label={"Car Model"} onChangeText={handleCarModelChange}
        defaultValue={editProfileInfo.carModel} inputType={'default'} isPassword={false}
      />
      <EditableField label={"Gas Type"} onChangeText={handleGasTypeChange}
        defaultValue={String(editProfileInfo.gasType)} inputType={'default'} isPassword={false}
      />

      <View style={styles.buttonContainer}>
        <CustomPressable title={"Cancel"} onPress={handleCancelPress} />
        <CustomPressable title={"   Save   "} onPress={handleSavePress} />
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "95%",
  },
});
