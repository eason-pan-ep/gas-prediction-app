// This screen contains the user's fueling history.
// This screen contains a list of the user's fueling entries.
// Each entry is a card that contains the following information:
// // date of fueling
// // amount of fuel purchased
// // total cost of fueling
// Each entry is pressable (navigates to the Fueling Entry screen).
// This screen contains 1 button (on the header):
// // 1. "+" - navigate to the Add a Fueling Entry screen.

import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'

import CustomPressable from '../components/CustomPressable'

export default function FuelingHistory({navigation}) {
  const [fuelingList, setFuelingList] = useState([]);

  //Function to handle on press of the add fueling entry button
  function onPressAddFuelingEntry(){
    //Navigate to the Add a Fueling Entry screen
    navigation.navigate("Edit Fueling Entry");
  }


  // The main render
  return (
    <View>
      <CustomPressable title="Add a Fueling Entry" onPress={onPressAddFuelingEntry} />
      <FlatList 

      />
    </View>
  )
}