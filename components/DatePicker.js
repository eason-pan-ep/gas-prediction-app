// This is the DatePicker component. It is used to display a date picker and let users select a date.
//

import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";

import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

const DatePicker = ({ label, onDateChange, defaultValue }) => {
  const initializeData = () => {
    if (defaultValue !== "") {
      return new Date(defaultValue);
    } else {
      return "yyyy-mm-dd";
    }
  };
  const [date, setDate] = useState(initializeData());
  const [show, setShow] = useState(false);

  // function for handling date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    onDateChange(currentDate);
  };

  const dateDisplayHelper = () => {
    if (typeof date === "string") {
      return date;
    } else {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }
  };

  return (
    <Pressable onPress={() => setShow(true)}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.field}>{dateDisplayHelper()}</Text>
        <FontAwesome name="calendar" size={20} color={colors.accent} />
        {show && (
          <DateTimePicker
            value={typeof date === "string" ? new Date() : date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
    </Pressable>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 10,
  },
  label: {
    color: colors.primaryDark,
    fontSize: fontSizes.small,
    fontWeight: "bold",
    marginRight: 10,
    height: 24,
    paddingHorizontal: 10,
    width: "auto",
  },
  field: {
    color: colors.primaryDark,
    fontSize: fontSizes.small,
    height: 24,
    paddingHorizontal: 10,
    textAlign: "right",
    flexShrink: 1,
    width: "100%",
  },
});
