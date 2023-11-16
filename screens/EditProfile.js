// This screen allows the user to edit their profile information.
// This screen contains the user's profile information which are editable:
// // email address
// // password
// // car make / model
// This screen contains 2 button:
// // 1. Save - saves the changes made to the user's profile information.
// // 2. Cancel - discards the changes made to the user's profile information.

import { View, Text } from "react-native";
import React, { useState } from "react";

import EditableField from "../components/EditableField";
import CustomPressable from "../components/CustomPressable";

export default function EditProfile({route, navigation}) {
  const {email, carMake, carModel, gasType, docID} = route.params.userProfileData;
  const [editProfileInfo, setEditProfileInfo] = useState({
    email: email,
    carMake: carMake,
    carModel: carModel,
    gasType: gasType,
  });
  return (
    <View>
      <EditableField label={"Email"}  />
    </View>
  );
}
