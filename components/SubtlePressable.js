import { StyleSheet, Text, View, Pressable } from 'react-native';
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