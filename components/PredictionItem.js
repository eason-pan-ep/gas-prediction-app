// // This is the PredictionItem component. It is used to display the prediction data.
// // Receive the prediction data as a prop.
// // It contains the following information:
// // // date of prediction
// // // gas price prediction
// // It contains a button to set an alert for the prediction.
// //
//

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

import SetNotificationPressable from "./SetNotificationPressable";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const PredictionItem = ({ date, price, bgColor }) => {
  return (
    <View style={styles.container}>
      {/* display the prediction data */}
      <Text style={styles.infoText}>{date}</Text>
      <Text style={styles.infoText}>{price}</Text>

      {/* set alert button */}
      <SetNotificationPressable date={date} />
    </View>
  );
};

export default PredictionItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.info,
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginTop: 4,
    marginBottom: 4,
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: fontSizes.normal,
    color: colors.infoText,
    fontWeight: "500",
  },
});
