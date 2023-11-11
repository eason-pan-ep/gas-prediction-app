// This is the entry point of the application.
// This file contains the following:
// The App component has the following structure:
//
//    Application
//     |- Not authenticated: AuthStack (NavigatorStackContainer)
//     |    '- Sign In screen (also used for registration)
//     '- Authenticated: MainStack (BottomTabNavigator)
//          |- HomeStack (StackNavigator)
//          |  |- Home screen
//          |  |- Prediction screen
//          |- FuelingHistoryStack (StackNavigator)
//          |  |- Fueling History screen
//          |  |- Fueling Entry screen
//          |  '- Edit Fueling Entry screen
//          |- ProfileStack (StackNavigator)
//          |  |- Profile screen
//          |  '- Edit Profile screen
//          '- Nearby Gas Stations screen

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";

import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Prediction from "./screens/Prediction";
import FuelingHistory from "./screens/FuelingHistory";
import FuelingEntry from "./screens/FuelingEntry";
import EditFuelingEntry from "./screens/EditFuelingEntry";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import NearbyGasStations from "./screens/NearbyGasStations";

const AuthStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FuelingHistoryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// AuthStack -- contains the Sign In screen
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign In" component={SignIn} />
    </AuthStack.Navigator>
  );
};

// HomeStack -- contains the Home and Prediction screens
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Prediction" component={Prediction} />
    </HomeStack.Navigator>
  );
};

// FuelingHistoryStack -- contains the Fueling History, Fueling Entry, and Edit Fueling Entry screens
const FuelingHistoryStackNavigator = () => {
  return (
    <FuelingHistoryStack.Navigator>
      <FuelingHistoryStack.Screen
        name="Fueling History"
        component={FuelingHistory}
      />
      <FuelingHistoryStack.Screen
        name="Fueling Entry"
        component={FuelingEntry}
      />
      <FuelingHistoryStack.Screen
        name="Edit Fueling Entry"
        component={EditFuelingEntry}
      />
    </FuelingHistoryStack.Navigator>
  );
};

// ProfileStack -- contains the Profile and Edit Profile screens
const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
    </ProfileStack.Navigator>
  );
};

// MainStack -- contains the HomeStack, FuelingHistoryStack, and ProfileStack
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home Stack"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Fueling History Stack"
        component={FuelingHistoryStackNavigator}
        options={{
          title: "Fueling History",
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Profile Stack"
        component={ProfileStackNavigator}
        options={{ title: "Profile", headerShown: false }}
      />
      <MainStack.Screen
        name="Nearby Gas Stations"
        component={NearbyGasStations}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  // *********************************
  // Temporarily set to true for testing purposes.
  // *********************************
  const [authenticated, setAuthenticated] = useState(true);

  // *********************************
  // Add listener for authentication here.
  // *********************************

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {authenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
