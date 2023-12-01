// This screen is for editing a fueling history entry (also used for adding a fueling history entry).
// This screen contains the user's fueling entry information (editable):
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// This screen contains 5 buttons:
// // 1. Remove Photo - removes the photo of the odometer (if available).
// // 2. Take Photo - takes a photo of the odometer.
// // 3. Save - saves the changes and navigates to the Fueling Entry screen (with confirmation message).
// // 4. Cancel - discards the changes and navigates to the Fueling Entry screen.
// // 5. Delete - deletes the fueling entry (with confirmation message).
// Receive the fueling entry data as route params.
// It contains the following information:
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// // city of fueling
// // docID of the fueling entry
//


import { View, Alert, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import CustomPressable from '../components/CustomPressable';
import EditableField from '../components/EditableField';
import DatePicker from '../components/DatePicker';

import { writeToFuelingHistory, updateFuelingHistory, deleteFromFuelingHistory } from '../firebase/firestoreHelper';
import { uploadImage, deleteEntriesWithImage, deleteImage } from '../firebase/storageHelper';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/firebaseSetup';

import * as ImagePicker from 'expo-image-picker';



export default function EditFuelingEntry({ navigation, route }) {
  // state variable for storing the camera permission status
  const [ status, requestPermission ] = ImagePicker.useCameraPermissions();

  // local state variable for storing the photo of the odometer
  const [ photo, setPhoto ] = useState("");

  // Function to check if this is a new fueling entry
  const checkIsNewEntry = () => {
    try{
      const test = route.params.fuelingEntryData;
      return false;
    }catch(error){
      return true;
    }
  };
  // flag for storing whether this is a new fueling entry 
  const isNewEntry = checkIsNewEntry();


  // Function to initialize the data for the fueling entry
  // If the route params contains a fueling entry data, then initialize with given data.
  // Otherwise, this is a new fueling entry.
  const initializeData = () => {
    let fuelingEntryData = null;
    try{
      const passedData = route.params.fuelingEntryData;
      fuelingEntryData = {
        date: passedData.date,
        amount: passedData.amount,
        price: passedData.price,
        city: passedData.city,
        photoRef: passedData.photoRef,
      };
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


  // to get the photo url and set the photo state variable
  useEffect(() => {
    const getPhotoUrl = async () => {
      if(entryInfo.photoRef !== ""){
        try{
          const reference = ref(storage, entryInfo.photoRef);
          const url = await getDownloadURL(reference);
          setPhoto(url);
        }catch(error){
          console.log("Error getting photo url: ", error);
        }
      }
    };
    getPhotoUrl();
  }, []);
  

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
      if(photo !== ""){
        //upload the photo to Firebase storage and get the download url
        uploadImage(photo, entryInfo, "");
      }else{
        writeToFuelingHistory(entryInfo);
      }
    }else{
      // if users changed the photo, delete the old photo from Firebase storage
      if(entryInfo.photoRef !== photo.substring(photo.lastIndexOf('/')+1)){
        //delete the old image from Firebase storage
        deleteImage(entryInfo.photoRef);
      }
      if(photo !== ""){
        //upload the photo to Firebase storage and get the download url
        uploadImage(photo, entryInfo, route.params.fuelingEntryData.docID);
      }else{
        //update the existing entry in Firestore fuelingHistory collection
        updateFuelingHistory(entryInfo, route.params.fuelingEntryData.docID);
      }
    }
    //navigate to where the user came from
    navigation.navigate("Fueling History");
  };


  // function for handling delete button press
  const handleDeletePress = () => {
    console.log("Photo ref: ", entryInfo.photoRef);
    //confirm the deletion
    Alert.alert("Confirm to Delete", "Are you sure you want to delete this fueling entry?\n This data CANNOT be recovered afterwards.", [
      { // if the user cancels, do nothing
        text: "Cancel",
        onPress: null,
        style: "cancel"
      },
      { // if the user confirms, delete the fueling entry from the database and navigate to the Fueling History screen
        text: "Delete",
        onPress: () => {
          if(entryInfo.photoRef !== ""){
            // if the fueling entry has a photo, delete the photo from the firebase storage and delete the fueling entry from the database
            deleteEntriesWithImage(route.params.fuelingEntryData.docID, entryInfo.photoRef);
          }else{
            // if the fueling entry does not have a photo, delete the fueling entry from the database
            deleteFromFuelingHistory(route.params.fuelingEntryData.docID);
          }
          navigation.navigate("Fueling History");
        },
        style: "destructive"
      }
    ]);
  };
  


  // function for handling take photo button press
  const handleTakePhotoPress = async () => {
    try{
      if(!status.granted){ // if the camera permission is not granted, request the permission
        await requestPermission();
        console.log("Camera permission requested.");
        return;
      }else{
        // if the camera permission is granted, launch the camera
        const photoRes = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setPhoto(photoRes.assets[0].uri);
      }
      
    }catch(error){
      console.log("Take photo handler error: ", error);
    }
  };



  // The main render
  return (
    <ScrollView>
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

      {/* image goes here */}
      {photo && <Image source={{ uri: photo }} style={styles.image} />}

      {/* button for adding photo */}
      <CustomPressable title="Add Photo" onPress={ handleTakePhotoPress } />
      {/* button for removing photo */}
      <CustomPressable title="Remove Photo" onPress={()=>setPhoto("")} />
      {/* button for saving changes */}
      <CustomPressable title="Save" onPress={handleSavePress} />
      {/* button for canceling changes */}
      <CustomPressable title="Cancel" onPress={handleCancelPress} />
      {/* button for delete the current entry */}
      {!isNewEntry&&<CustomPressable title="Delete" onPress={handleDeletePress} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});