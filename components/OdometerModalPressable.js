import React, { useState } from "react";
import { View, Text, Pressable, Modal, Image, StyleSheet } from "react-native";

import CustomPressable from "./CustomPressable";
import { colors } from "../styles/colors";
import { fontSizes } from "../styles/fontSizes";

export default function OdometerModalPressable({
  children,
  title,
  imageSource,
  onPress,
  style,
  textStyle,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.pressableContainer,
          style,
          pressed && { opacity: 0.5 },
        ]}
        onPress={() => {
          setModalVisible(true);
          onPress && onPress();
        }}
      >
        {children}
        <Text style={[styles.pressableText, textStyle]}>{title}</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.photoContainer}>
            <Text style={styles.headerText}>Odometer Record</Text>
            <Image source={imageSource} style={styles.modalImage} />
          </View>
          <CustomPressable
            title={"Close"}
            onPress={() => {
              setModalVisible(false);
            }}
            style={{
              minWidth: 150,
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    color: colors.primaryDark,
    fontSize: fontSizes.normal,
    height: 50,
    width: 100,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 10,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  pressableText: {
    color: colors.primaryDarkText,
    fontSize: fontSizes.normal,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(158, 158, 158, 0.8)",
    margin: 0,
  },
  headerText: {
    color: colors.primaryDarkText,
    fontSize: fontSizes.large,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  photoContainer: {
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    borderRadius: 30,
    paddingBottom: 10,
    backgroundColor: colors.primaryDark,
    elevation: 10,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalImage: {
    width: 280,
    height: 210,
    margin: 20,
    alignSelf: "center",
    borderRadius: 20,
    borderColor: colors.primaryDarkText,
    borderWidth: 1,
  },
});
