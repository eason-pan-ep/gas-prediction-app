// This is the DatePicker component. It is used to display a date picker and let users select a date.
//

import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

import { fontSizes } from '../styles/fontSizes';

const DatePicker = ({ label, onDateChange, defaultValue }) => {
    const initializeData = () => {
        if(defaultValue !== ""){
            return new Date(defaultValue);
        }else{
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
        if(typeof(date) === "string"){
            return date;
        }else{
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }
    };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.label}>{dateDisplayHelper()}</Text>
        <Pressable onPress={()=> setShow(true)}>
            <FontAwesome name="calendar" size={24} color="black" />
        </Pressable>
      {show && (
        <DateTimePicker 
            value={typeof(date)=== "string" ? new Date() : date}
            mode='date'
            display='default'
            onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
    container: {
        paddingLeft: '2.5%',
        paddingRight: '2.5%',
        marginTop: '2.5%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    label: {
        fontSize: fontSizes.large,
        marginRight: '2.5%',
    },
});