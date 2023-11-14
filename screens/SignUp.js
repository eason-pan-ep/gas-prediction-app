import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EditableField from '../components/EditableField';
import { fontSizes } from '../styles/fontSizes';
import { colors } from '../styles/colors';
import { useState } from 'react';
import CustomPressable from '../components/CustomPressable';
import SubtlePressable from '../components/SubtlePressable';

const SignUp = ({navigation}) => {
    //state variables for storing user input
    const [accountInfo, setAccountInfo] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    //functions for handling user input text changes
    const handleEmailChange = (text) => {
        setAccountInfo({ ...accountInfo, email: text });
    };
    const handlePasswordChange = (text) => {
        setAccountInfo({ ...accountInfo, password: text });
    };
    const handleConfirmPasswordChange = (text) => {
        setAccountInfo({ ...accountInfo, confirmPassword: text });
    };

    //function for handling sign up button press
    const handleSignUpPress = () => {
        console.log("Sign Up Pressed");
    };


    //main render
    return (
        <View style={styles.container}>
            <EditableField 
                label={"Email"} onChangeText={handleEmailChange} defaultValue={"sample@oo.com"}
                inputType={'email-address'} isPassword={false}
            />
            <EditableField 
                label={"Password"} onChangeText={handlePasswordChange} defaultValue={"password"}
                inputType={'default'} isPassword={true}
            />
            <EditableField 
                label={"Confirm Password"} onChangeText={handleConfirmPasswordChange} defaultValue={"password"}
                inputType={'default'} isPassword={true}
            />

            <View style={styles.buttonContainer}>
                <CustomPressable 
                    title={"Sign Up"}
                    onPress={handleSignUpPress}
                />
                <SubtlePressable 
                    title={"Already have an account? Sign in here."}
                    onPress={()=>navigation.navigate('Sign In')}
                />
            </View>
        </View>
    )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    buttonContainer:{
        marginTop: 20,
        alignItems: 'center',
    },
});