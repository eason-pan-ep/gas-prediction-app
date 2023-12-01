import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as Location from 'expo-location';

import { Entypo } from '@expo/vector-icons';

const GetLocationButton = ({ locationReturnHandler }) => {
    const [status, requestPermission] = Location.useForegroundPermissions();

    // This function will first call another function to ask for permission to access the device's location
    // and return the location if permission is granted
    const getLocation = async () => {
        try{
            // ask for permission to access the device's location
            if(!status.granted){
                await requestPermission();
                console.log("No permission, requesting permission, click button again");
            }else{
                // get the current location
                const location = await Location.getCurrentPositionAsync();
                locationReturnHandler(location);
            }
            
        }catch(error){
            console.log("Error getting user location: ", error);
        }
    };


// Main render
return (
    <Pressable style={({pressed})=>[styles.container, {backgroundColor: pressed? '#d6d6d6':'white'}]} 
    onPress={getLocation}>
        <Entypo name="location" size={24} color="#258cd4" style={styles.icon} />
    </Pressable>
  );
};

export default GetLocationButton;

const styles = StyleSheet.create({
    container: {
        bottom: '8%',
        right: '10%',
        flex: 0,
        zIndex: 1,
        position: 'absolute',
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 0},
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 5,
    },
    icon: {
        padding: 14,
        textAlign: 'center',
        color: '#258cd4',
    },
});