// This is the FuelingEntry screen.
// This screen contains the user's fueling entry information:
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // total cost of fueling
// // city of fueling
// // photo of odometer (if available)
// This screen contains 2 button:
// // 1. Edit - navigates to the Edit Fueling Entry screen.
// // 2. Delete - deletes the fueling entry (with confirmation message).

import { View, Text, Alert } from 'react-native';
import React from 'react';

import CustomPressable from '../components/CustomPressable';
import StaticField from '../components/StaticField';

import { deleteFromFuelingHistory } from '../firebase/firestoreHelper';



export default function FuelingEntry({ navigation, route }) {
  // get the fueling entry data from the route params
  const { fuelingEntryData } = route.params;

  // function for handling on press of the edit button
  const onPressEdit = () => {
    // navigate to the Edit Fueling Entry screen with the fueling entry data as route params
    navigation.navigate("Edit Fueling Entry", { fuelingEntryData: fuelingEntryData });
  };

  // function for handling on press of the delete button
  const onPressDelete = () => {
    // confirm the deletion
    Alert.alert("Confirm to Delete", "Are you sure you want to delete this fueling entry?\n This data CANNOT be recovered afterwards.", [
      { // if the user cancels, do nothing
        text: "Cancel",
        onPress: null,
        style: "cancel"
      },
      { // if the user confirms, delete the fueling entry from the database and navigate to the Fueling History screen
        text: "Delete",
        onPress: () => {
          deleteFromFuelingHistory(fuelingEntryData.docID);
          navigation.navigate("Fueling History");
        },
        style: "destructive"
      }
    ]);
  };

  
  // The main render
  return (
    <View>
      <StaticField label={"Fueling Date"} value={fuelingEntryData.date} />
      <StaticField label={"Amount of Fuel"} value={`${fuelingEntryData.amount} L`} />
      <StaticField label={"Gas Price"} value={`$ ${fuelingEntryData.price} / L`} />
      <StaticField label={"City"} value={fuelingEntryData.city} />
      <StaticField label={"Total Cost"} value={`$ ${Math.round((fuelingEntryData.price * fuelingEntryData.amount) * 100) / 100}`} />
      {/* add photo here  */}
      <CustomPressable title={"Delete"} onPress={onPressDelete} />
      <CustomPressable title={"Edit"} onPress={onPressEdit} />

    </View>
  );
};