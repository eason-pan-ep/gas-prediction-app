// This screen contains the user's fueling history.
// This screen contains a list of the user's fueling entries.
// Each entry is a card that contains the following information:
// // date of fueling
// // amount of fuel purchased
// // total cost of fueling
// Each entry is pressable (navigates to the Fueling Entry screen).
// This screen contains 1 button (on the header):
// // 1. "+" - navigate to the Add a Fueling Entry screen.

import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import CustomPressable from "../components/CustomPressable";
import ListItem from "../components/ListItem";
import { auth, database } from "../firebase/firebaseSetup";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function FuelingHistory({ navigation }) {
  // state variable for storing the user's fueling history data read from the database
  const filterChoices = [
    { type: "price", text: "Price" },
    { type: "amount", text: "Amount" },
    { type: "total", text: "Total" },
  ];
  const [fuelingList, setFuelingList] = useState([]);
  const [filterInfo, setFilterInfo] = useState("price");

  //Function to handle on press of the add fueling entry button
  function onPressAddFuelingEntry() {
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
      query(
        collection(database, "fuelingHistory"),
        where("user", "==", auth.currentUser.uid)
      ),
      (snapshot) => {
        let updatedData = [];
        snapshot.forEach((doc) => {
          // append the fueling entry data to the state variable
          const fuelingEntryData = { ...doc.data(), docID: doc.id };
          updatedData.push(fuelingEntryData);
        });
        //sort the list by date and set the state variable
        updatedData.sort((a, b) => (a.date > b.date ? -1 : 1));
        setFuelingList(updatedData);
      },
      (error) => {
        console.log("Error getting fueling history data: ", error);
      }
    );
  }, [navigation]);

  // The main render
  return (
    <SafeAreaView style={styles.container}>
      {/* the filter buttons */}
      <View style={styles.filterPressableContainer}>
        {filterChoices.map((filterChoice) => (
          <CustomPressable
            key={filterChoice.type}
            title={filterChoice.text}
            onPress={() => setFilterInfo(filterChoice.type)}
            style={{
              flexGrow: 1,
              minWidth: "auto",
              backgroundColor:
                filterInfo === filterChoice.type
                  ? colors.primary
                  : colors.background,
              borderColor: colors.primary,
              borderWidth: 2,
              shadowColor: colors.primary,
            }}
            textStyle={{
              fontSize: fontSizes.normal,
              color:
                filterInfo === filterChoice.type
                  ? colors.background
                  : colors.primary,
            }}
          />
        ))}
      </View>
      {/* the list of fueling entries */}
      <FlatList
        data={fuelingList}
        renderItem={(listItem) => (
          <ListItem fuelingEntryData={listItem.item} filter={filterInfo} />
        )}
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        {/* the add new fueling entry button */}
        <CustomPressable
          title="Add a Fueling Entry"
          onPress={onPressAddFuelingEntry}
        ></CustomPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingTop: 25,
    marginHorizontal: 10,
  },
  filterPressableContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
  },
  flatList: {
    width: "100%",
    padding: 10,
    margin: 5,
  },
  buttonContainer: {
    flexShrink: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});
