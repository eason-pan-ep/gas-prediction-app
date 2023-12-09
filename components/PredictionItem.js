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

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const PredictionItem = ({ date, price }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerRow}>
        <IndividualItemContainer>
          {/* display the prediction data */}
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.infoText}>{price}</Text>
        </IndividualItemContainer>

        {/* set alert button */}
        <Pressable
          style={[
            ({ pressed }) => ({ opacity: pressed ? 0.5 : 1 }),
            { flexBasis: 40, flexGrow: 1, alignItems: "center" },
          ]}
          onPress={() => {
            console.log("Alert Button Pressed");
          }}
        >
          <Entypo name="bell" size={24} color={colors.accentLight} />
        </Pressable>
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
  infoText: {
    fontSize: fontSizes.normal,
    color: colors.infoDark,
    fontWeight: "bold",
  },
});
