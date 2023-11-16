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


import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../styles/colors';
import { fontSizes } from '../styles/fontSizes';

const ListItem = ({ fuelingEntryData }) => {
    const { date, price, amount } = fuelingEntryData;
    const navigation = useNavigation();
  return (
        <Pressable style={styles.container} onPress={null} >
            <Text style={styles.infoText}>{date}</Text>
            <Text style={styles.infoText}>${price}/L</Text>
            <Text style={styles.infoText}>{amount}L</Text>
        </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
    container: {
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: 4,
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.info,
        borderRadius: 10,
        height: 40,
    },
    infoText: {
        fontSize: fontSizes.normal,
        paddingLeft: '5%',
        paddingRight: '5%',
        color: colors.infoText,
    },
});