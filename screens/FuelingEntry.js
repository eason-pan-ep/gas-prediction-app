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

import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";

import CustomPressable from "../components/CustomPressable";
import StaticField from "../components/StaticField";
import { deleteFromFuelingHistory } from "../firebase/firestoreHelper";
import { storage } from "../firebase/firebaseSetup";
import { deleteEntriesWithImage } from "../firebase/storageHelper";
import { colors } from "../styles/colors";

export default function FuelingEntry({ navigation, route }) {
  // get the fueling entry data from the route params
  const fuelingEntryData = route.params.fuelingEntryData;

  //state variable for storing the photo url
  const [photo, setPhoto] = useState("");

  // to get the photo url and set the photo state variable
  useEffect(() => {
    const getPhotoUrl = async () => {
      if (fuelingEntryData.photoRef !== "") {
        try {
          const reference = ref(storage, fuelingEntryData.photoRef);
          const url = await getDownloadURL(reference);
          setPhoto(url);
        } catch (error) {
          console.log("Error getting photo url: ", error);
        }
      }
    };
    getPhotoUrl();
  }, []);

  // function for handling on press of the edit button
  const onPressEdit = () => {
    // navigate to the Edit Fueling Entry screen with the fueling entry data as route params
    navigation.navigate("Edit Fueling Entry", {
      fuelingEntryData: fuelingEntryData,
    });
  };

  // function for handling on press of the delete button
  const onPressDelete = () => {
    // confirm the deletion
    Alert.alert(
      "Confirm to Delete",
      "Are you sure you want to delete this fueling entry?\n This data CANNOT be recovered afterwards.",
      [
        {
          // if the user cancels, do nothing
          text: "Cancel",
          onPress: null,
          style: "cancel",
        },
        {
          // if the user confirms, delete the fueling entry from the database and navigate to the Fueling History screen
          text: "Delete",
          onPress: () => {
            if (fuelingEntryData.photoRef !== "") {
              // if the fueling entry has a photo, delete the photo from the firebase storage and delete the fueling entry from the database
              deleteEntriesWithImage(
                route.params.fuelingEntryData.docID,
                fuelingEntryData.photoRef
              );
            } else {
              deleteFromFuelingHistory(fuelingEntryData.docID);
            }

            navigation.navigate("Fueling History");
          },
          style: "destructive",
        },
      ]
    );
  };

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.staticFieldContainer}>
        <StaticField
          label={"Fueling Date"}
          value={fuelingEntryData.date
            .split("-")
            .map((item) => (item.length === 1 ? "0" + item : item))
            .join("-")}
        />
        <StaticField
          label={"Amount of Fuel"}
          value={`${fuelingEntryData.amount.toFixed(2)} L`}
        />
        <StaticField
          label={"Gas Price"}
          value={`$${fuelingEntryData.price.toFixed(2)} /L`}
        />
        <StaticField
          label={"Total Cost"}
          value={`$${(
            Math.round(fuelingEntryData.price * fuelingEntryData.amount * 100) /
            100
          ).toFixed(2)}`}
        />
        <StaticField label={"Location"} value={fuelingEntryData.city} />
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
      </View>
      <View style={styles.buttonContainer}>
        <CustomPressable
          title={"Edit"}
          onPress={onPressEdit}
          style={{ minWidth: 150 }}
        />
        <CustomPressable
          title={"Delete"}
          onPress={onPressDelete}
          style={{
            minWidth: 150,
            backgroundColor: colors.background,
            borderColor: colors.error,
            borderWidth: 2,
            shadowColor: colors.error,
          }}
          textStyle={{
            color: colors.error,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "stretch",
    paddingTop: 20,
  },
  staticFieldContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
});
