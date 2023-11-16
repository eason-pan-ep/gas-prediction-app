// This screen is for editing a fueling history entry (also used for adding a fueling history entry).
// This screen contains the user's fueling entry information (editable):
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// This screen contains 4 buttons:
// // 1. Remove Photo - removes the photo of the odometer (if available).
// // 2. Take Photo - takes a photo of the odometer.
// // 3. Save - saves the changes and navigates to the Fueling Entry screen (with confirmation message).
// // 4. Cancel - discards the changes and navigates to the Fueling Entry screen.
// Receive the fueling entry data as route params.
// It contains the following information:
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// // city of fueling
// // docID of the fueling entry
//


import { View, Text } from 'react-native'
import React, { useState } from 'react'

import CustomPressable from '../components/CustomPressable';
import EditableField from '../components/EditableField';
import DatePicker from '../components/DatePicker';

import { writeToFuelingHistory } from '../firebase/firestoreHelper';



export default function EditFuelingEntry({ navigation, route }) {
  // Function to initialize the data for the fueling entry
  // If the route params contains a fueling entry data, then initialize with given data.
  // Otherwise, this is a new fueling entry.
  const initializeData = () => {
    let fuelingEntryData = null;
    try{
      fuelingEntryData = {
        date: route.params.fuelingEntryData.date,
        amount: route.params.fuelingEntryData.amount,
        price: route.params.fuelingEntryData.price,
        city: route.params.fuelingEntryData.city,
        photoRef: route.params.fuelingEntryData.photoRef,
      };
      setIsNewEntry(false);
    }catch(error){
      fuelingEntryData = {
        date: "",
        amount: "",
        price: "",
        city: "",
        photoRef: "",
      };
    }
    return fuelingEntryData;
  };
  
  
  // state variable for storing the fueling entry information
  const[entryInfo, setEntryInfo] = useState(initializeData());
  const[isNewEntry, setIsNewEntry] = useState(true);

  // function for handling date changes
  const handleDateChange = (date) => {
    const dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    setEntryInfo({...entryInfo, date: dateStr});
  };

  // function for handling amount changes
  const handleAmountChange = (text) => {
    setEntryInfo({...entryInfo, amount: Number(text)});
  };

  // function for handling price changes
  const handlePriceChange = (text) => {
    setEntryInfo({...entryInfo, price: Number(text)});
  };

  // function for handling city changes
  const handleCityChange = (text) => {
    setEntryInfo({...entryInfo, city: text});
  };

  // function for handling cancel button press
  const handleCancelPress = () => {
    navigation.goBack();
  };

  // function for handling save button press
  const handleSavePress = () => {
    //check if there is any empty field
    if(entryInfo.date === "" || entryInfo.amount === "" || entryInfo.price === "" || entryInfo.city === ""){
      //show error message
      alert("Please fill in all fields.");
      return;
    }
    if(isNewEntry){
      //write to Firestore fuelingHistory collection
      writeToFuelingHistory(entryInfo);
    }
    
    //navigate to where the user came from
    navigation.goBack();
  };

  // The main render
  return (
    <View>
      {/* date picker goes here */}
      <DatePicker label={"Fueling Date*"} onDateChange={handleDateChange} defaultValue={entryInfo.date}/>
      {/* input for amount */}
      <EditableField label={"Amount (L)*"} onChangeText={handleAmountChange} placeholder={"40"}
        inputType={'numeric'} isPassword={false} defaultValue={String(entryInfo.amount)}
      />
      {/* input for price */}
      <EditableField label={"Price ($/L)*"} onChangeText={handlePriceChange} placeholder={"1.70"} 
        inputType={'numeric'} isPassword={false} defaultValue={String(entryInfo.price)}
      />
      {/* input for city */}
      <EditableField label={"City*"} onChangeText={handleCityChange} placeholder={"Vancouver"} 
        inputType={'default'} isPassword={false} defaultValue={entryInfo.city}
      />

      {/* button for adding photo */}
      <CustomPressable title="Add Photo" onPress={()=>console.log("Add Photo Pressed.")} />
      {/* button for removing photo */}
      <CustomPressable title="Remove Photo" onPress={()=>console.log("Remove Photo Pressed.")} />
      {/* button for saving changes */}
      <CustomPressable title="Save" onPress={handleSavePress} />
      {/* button for canceling changes */}
      <CustomPressable title="Cancel" onPress={handleCancelPress} />
    </View>
  )
}