// This is the ListItem component. It is used to display a fueling entry item in the Fueling History list.
// Receive the fueling entry data as a prop.
// It contains the following information:
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// // city of fueling
// // docID of the fueling entry
//

import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import IndividualItemContainer from "./IndividualItemContainer";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const ListItem = ({ fuelingEntryData, filter }) => {
  // destructure the fueling entry data for display
  const { date, price, amount } = fuelingEntryData;
  const navigation = useNavigation();

  // function for handling on press of the fueling entry
  const onPressFuelingEntry = () => {
    // navigate to the Fueling Entry screen with the fueling entry data as route params
    navigation.navigate("Fueling Entry", {
      fuelingEntryData: fuelingEntryData,
    });
  };

  // The main render
  return (
    <IndividualItemContainer style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && { opacity: 0.5 },
        ]}
        onPress={onPressFuelingEntry}
      >
        <Text style={[styles.infoText, styles.dateText]}>
          {date
            .split("-")
            .map((item) => (item.length === 1 ? "0" + item : item))
            .join("-")}
        </Text>
        {filter === "price" && (
          <Text style={styles.infoText}>${price.toFixed(2)} /L</Text>
        )}
        {filter === "amount" && (
          <Text style={styles.infoText}>{amount.toFixed(2)} L</Text>
        )}
        {filter === "total" && (
          <Text style={styles.infoText}>
            ${(Math.round(price * amount * 100) / 100).toFixed(2)}
          </Text>
        )}
      </Pressable>
    </IndividualItemContainer>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    width: "95%",
  },
  pressableContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  dateText: {
    color: colors.infoDark,
    fontSize: fontSizes.normal,
    fontWeight: "bold",
  },
  infoText: {
    color: colors.infoDark,
    fontSize: fontSizes.normal,
    fontWeight: "bold",
  },
});
