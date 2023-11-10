// This screen is for editing a fueling history entry (also used for adding a fueling history entry).
// This screen contains the user's fueling entry information (editable):
// // date of fueling
// // amount of fuel purchased
// // gas price per L
// // photo of odometer (if available)
// This screen contains 4 buttons:
// // 1. Remove Photo - removes the photo of the odometer (if available).
// // 2. Take Photo - takes a photo of the odometer.
// // 3. Save - saves the changes and navigates to the Fueling Entry screen (with confirmation message).
// // 4. Cancel - discards the changes and navigates to the Fueling Entry screen.


import { View, Text } from 'react-native'
import React from 'react'

export default function EditFuelingHistory() {
  return (
    <View>
      <Text>EditFuelingHistory</Text>
    </View>
  )
}