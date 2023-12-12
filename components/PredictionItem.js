// // This is the PredictionItem component. It is used to display the prediction data.
// // Receive the prediction data as a prop.
// // It contains the following information:
// // // date of prediction
// // // gas price prediction
// // It contains a button to set an alert for the prediction.
// //
//

import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import IndividualItemContainer from "./IndividualItemContainer";
import SetNotificationPressable from "./SetNotificationPressable";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const PredictionItem = ({ date, regular, premium, diesel }) => {

  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <IndividualItemContainer>
          {/* display the prediction data */}
          <View>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <View style={styles.pricesContainer}>
            <View style={styles.singlePriceContainer}>
              <Text style={styles.priceText} >{regular}</Text>
              <Text style={styles.infoText}>Regular</Text>
            </View>
            <View style={styles.singlePriceContainer}>
              <Text style={styles.priceText} >{premium}</Text>
              <Text style={styles.infoText}>Premium</Text>
            </View>
            <View style={styles.singlePriceContainer} >
              <Text style={styles.priceText} >{diesel}</Text>
              <Text style={styles.infoText}>Diesel</Text>
            </View>
          </View>
          
        </IndividualItemContainer>
        {/* set alert button */}
        <View style={styles.notificationPressableContainer}>
          <SetNotificationPressable date={date} />
        </View>
      </View>
    </View>
  );
};

export default PredictionItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: 30,
    paddingRight: 20,
    padding: 5,
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  pricesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  singlePriceContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: fontSizes.large,
    color: colors.infoDark,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: fontSizes.normal,
    color: colors.infoDark,
    
  },
  priceText: {
    fontSize: fontSizes.extraLarge,
    marginBottom: 5,
    fontWeight: "bold",

  },
  notificationPressableContainer: {
    flexBasis: 40,
    flexGrow: 1,
    alignItems: "center",
  },
});
