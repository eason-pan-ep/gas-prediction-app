// This is the screen that will display the nearby gas stations on a map.
// This screen contains a map that displays the nearby gas stations.
// This screen contains a list of the nearby gas stations.

import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import GetLocationButton from '../components/GetLocationButton';
import { getLatitude, getLongitude } from '../utility/deviceLocationUtil';


export default function NearbyGasStations() {
  const [locationTest, setLocationTest] = useState("");

  const locationReturnHandler = (location) => {
    //setLocationTest(location.coord);
    //console.log("Location Pressed: ", location);
    setLocationTest("Latitude: " + getLatitude(location) + ", Longitude: " + getLongitude(location));
  };
  return (
    <View style={styles.container}>
      <Text>NearbyGasStations</Text>
      <GetLocationButton locationReturnHandler={locationReturnHandler} />
      {locationTest&&<Text>Location: {locationTest}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});