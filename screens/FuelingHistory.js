// This screen contains the user's fueling history.
// This screen contains a list of the user's fueling entries.
// Each entry is a card that contains the following information:
// // date of fueling
// // amount of fuel purchased
// // total cost of fueling
// Each entry is pressable (navigates to the Fueling Entry screen).
// This screen contains 1 button (on the header):
// // 1. "+" - navigate to the Add a Fueling Entry screen.

import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import CustomPressable from '../components/CustomPressable';
import ListItem from '../components/ListItem';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase/firebaseSetup';
import { collection, onSnapshot, query, where } from 'firebase/firestore';


export default function FuelingHistory({ navigation }) {
  // state variable for storing the user's fueling history data read from the database
  const [fuelingList, setFuelingList] = useState([]);

  //Function to handle on press of the add fueling entry button
  function onPressAddFuelingEntry(){
    //Navigate to the Add a Fueling Entry screen
    navigation.navigate("Edit Fueling Entry");
  }

  // Fueling history data change listener
  useEffect(() => {
    // if the user is not logged in, unsubscribe from the listener
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        fuelingHistoryListener();
      }
    });

    // listen for changes to the fueling history data
    const fuelingHistoryListener = onSnapshot(
      query(collection(database, "fuelingHistory"), where("user", "==", auth.currentUser.uid)),
      (snapshot) => {
        let updatedData = [];
        snapshot.forEach((doc) => {
          // append the fueling entry data to the state variable
          const fuelingEntryData = {...doc.data(), docID: doc.id}
          updatedData.push(fuelingEntryData);
        });
        setFuelingList(updatedData);
      },
      (error) => {
        console.log("Error getting fueling history data: ", error);
      });
  }, [navigation])


  // The main render
  return (
    <View>
      <CustomPressable title="Add a Fueling Entry" onPress={onPressAddFuelingEntry} />
      <FlatList 
        data={fuelingList}
        renderItem={(listItem) => (<ListItem fuelingEntryData={listItem.item} /> )}
      />
    </View>
  )
}