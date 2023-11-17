import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Entypo } from '@expo/vector-icons';

import { colors } from '../styles/colors';
import { fontSizes } from '../styles/fontSizes';

const PredictionItem = ({ date, price, bgColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>{date}</Text>
      <Text style={styles.infoText}>{price}</Text>
      <Entypo name="bell" size={24} color={colors.accentLight} />
    </View>
  );
};

export default PredictionItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.info,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginTop: 4,
        marginBottom: 4,
        padding: 10,
        borderRadius: 10,
    },
    infoText: {
        fontSize: fontSizes.normal,
        color: colors.infoText,
        fontWeight: '500',
    },
});