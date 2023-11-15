// This is a pressable component that is styled to look like a text link.
//contains the following props:
// // title - string, the text to display on the button
// // onPress - function, the function to call when the button is pressed
//

import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

import { colors } from '../styles/colors';
import { fontSizes } from '../styles/fontSizes';

const SubtlePressable = ({title, onPress}) => {
  return (
    <Pressable onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

export default SubtlePressable;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        color: colors.secondary,
        fontSize: fontSizes.small,
    },
});