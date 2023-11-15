import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import EditableField from '../components/EditableField';
import { fontSizes } from '../styles/fontSizes';
import { colors } from '../styles/colors';
import { useState } from 'react';
import CustomPressable from '../components/CustomPressable';
import SubtlePressable from '../components/SubtlePressable';
import Checkbox from 'expo-checkbox';

const SignUp = ({navigation}) => {
    //state variables for storing user input
    const [signUpInfo, setSignUpInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
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

    //function for handling checkbox changes
    const handleCheckboxChange = () => {
        setSignUpInfo({ ...signUpInfo, isChecked: !signUpInfo.isChecked });
    };

    //function for handling sign up button press
    const handleSignUpPress = () => {
        console.log("Sign Up Pressed");
    };

    //function for handling sign in press
    const handleSignInPress = () => {
        navigation.navigate("Sign In");
    };


    //main render
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
            {/* input for confirm password */}
            <EditableField 
                label={"Confirm Password"} onChangeText={handleConfirmPasswordChange} defaultValue={"password"}
                inputType={'default'} isPassword={true}
            />

            {/* checkbox for terms and conditions */}
            <View style={styles.checkBoxContainer}>
                <Checkbox color={colors.primary} value={signUpInfo.isChecked} onValueChange={handleCheckboxChange} />
                <Text> Agree on </Text>
                <SubtlePressable title={"terms and conditions"} onPress={null} />
            </View>
            

            <View style={styles.buttonContainer}>
                <CustomPressable 
                    title={"Sign Up"}
                    onPress={handleSignUpPress}
                />
                <SubtlePressable 
                    title={"Already have an account? Sign in here."}
                    onPress={handleSignInPress}
                />
            </View>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    buttonContainer:{
        marginTop: 20,
        alignItems: 'center',
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});