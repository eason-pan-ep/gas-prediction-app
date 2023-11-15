import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import EditableField from '../components/EditableField';
import { fontSizes } from '../styles/fontSizes';
import { colors } from '../styles/colors';
import { useState } from 'react';
import CustomPressable from '../components/CustomPressable';
import SubtlePressable from '../components/SubtlePressable';
import Checkbox from 'expo-checkbox';
import { auth } from '../firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    const handleSignUpPress = async () => {
        if(signUpInfo.email === "" || signUpInfo.password === "" || signUpInfo.confirmPassword === ""){ //check if any of the fields are empty
            alert("Please fill in all fields");
            return;
        }
        if(signUpInfo.password !== signUpInfo.confirmPassword){ //check if passwords match
            alert("Passwords do not match");
            return;
        }
        if(!signUpInfo.isChecked){ //check if terms and conditions are agreed to
            alert("Please agree to the terms and conditions");
            return;
        }
        
        try{ //try to create the user
            const userCredential = await createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password);
            console.log("user created: ", userCredential);
            setSignUpInfo({ //reset the state variables to empty
                email: "",
                password: "",
                confirmPassword: "",
                isChecked: false,
            }); 
        }catch(error){ //catch any errors and alert the user
            if(error.code === "auth/weak-password"){
                alert("Password should be at least 6 characters.");
                return;
            }
            if(error.code === "auth/invalid-email"){
                alert("Please enter a valid email address.");
                return;
            }
            if(error.code === "auth/email-already-in-use"){
                alert("Email address already in use, please use another one.");
                return;
            }
            console.log("error creating user: ", typeof(error.code), error.code);
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