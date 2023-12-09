// This is the Change Passwords screen. It is used to change the user's password.
// // // It contains 2 buttons:
// // // // 1. Change Password - changes the user's password.
// // // // 2. Cancel - navigates to the Profile screen.
// // // It contains 3 input fields:
// // // // 1. Current Password
// // // // 2. New Password
// // // // 3. Confirm Password
// //

import { StyleSheet, SafeAreaView, View } from "react-native";
import React, { useState } from "react";

import CustomPressable from "../components/CustomPressable";
import EditableField from "../components/EditableField";
import {
  verifyPassword,
  changePassWords,
} from "../firebase/authenticationHelper";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const ChangePasswords = ({ navigation }) => {
  //state variable for storing user input
  const [passwordsChangeInfo, setPasswordsChangeInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //functions for handling current password changes
  const handleCurrentPasswordChange = (text) => {
    setPasswordsChangeInfo({ ...passwordsChangeInfo, currentPassword: text });
  };
  //functions for handling new password changes
  const handleNewPasswordChange = (text) => {
    setPasswordsChangeInfo({ ...passwordsChangeInfo, newPassword: text });
  };
  //functions for handling confirm password changes
  const handleConfirmPasswordChange = (text) => {
    setPasswordsChangeInfo({ ...passwordsChangeInfo, confirmPassword: text });
  };

  //function for handling on press of the cancel button
  const handleCancelPress = () => {
    //navigate back to the previous screen
    navigation.goBack();
  };

  //function for handling on press of the change password button
  const handleChangePasswordPress = async () => {
    //validate all fields are filled in
    if (
      passwordsChangeInfo.currentPassword === "" ||
      passwordsChangeInfo.newPassword === "" ||
      passwordsChangeInfo.confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    //verify the current password is correct
    const isVerified = await verifyPassword(
      passwordsChangeInfo.currentPassword
    );
    if (!isVerified) {
      alert("Current password is incorrect");
      return;
    }
    //verify the new password and confirm password match
    if (
      passwordsChangeInfo.newPassword !== passwordsChangeInfo.confirmPassword
    ) {
      alert("New password and confirm password do not match");
      return;
    }
    //update the password in firebase authentication
    await changePassWords(passwordsChangeInfo.newPassword);
    alert("Password changed successfully");

    //navigate back to the previous screen
    navigation.navigate("Profile");
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editableFieldContainer}>
        {/* input for current password */}
        <EditableField
          label="Current Password*"
          onChangeText={handleCurrentPasswordChange}
          placeholder={"Enter your current password"}
          defaultValue={passwordsChangeInfo.currentPassword}
          inputType={"default"}
          isPassword={true}
        />
        {/* input for new password */}
        <EditableField
          label="New Password*"
          onChangeText={handleNewPasswordChange}
          placeholder={"Enter your new password"}
          defaultValue={passwordsChangeInfo.newPassword}
          inputType={"default"}
          isPassword={true}
        />
        {/* input for confirm password */}
        <EditableField
          label="Confirm Password*"
          onChangeText={handleConfirmPasswordChange}
          placeholder={"Confirm your new password"}
          defaultValue={passwordsChangeInfo.confirmPassword}
          inputType={"default"}
          isPassword={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* button for canceling password change */}
        <CustomPressable
          title={"Cancel"}
          onPress={handleCancelPress}
          style={{
            minWidth: 150,
            backgroundColor: colors.background,
            borderColor: colors.primaryDark,
            borderWidth: 2,
            shadowColor: colors.primaryDark,
          }}
          textStyle={{
            color: colors.primaryDark,
          }}
        />
        {/* button for changing password */}
        <CustomPressable
          title={"Change\nPassword"}
          onPress={handleChangePasswordPress}
          style={{ minWidth: 150 }}
          textStyle={{ fontSize: fontSizes.normal }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePasswords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "stretch",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  editableFieldContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
});
