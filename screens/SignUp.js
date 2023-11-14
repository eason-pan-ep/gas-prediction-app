import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EditableField from '../components/EditableField';
import { fontSizes } from '../styles/fontSizes';
import { colors } from '../styles/colors';

const SignUp = () => {
  return (
    <View style={styles.container}>
        <EditableField />
    </View>
  )
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});