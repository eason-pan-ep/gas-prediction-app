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
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import TermsAndConditions from "./screens/TermsAndConditions";
import Home from "./screens/Home";
import Prediction from "./screens/Prediction";
import FuelingHistory from "./screens/FuelingHistory";
import FuelingEntry from "./screens/FuelingEntry";
import EditFuelingEntry from "./screens/EditFuelingEntry";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import ChangePasswords from "./screens/ChangePasswords";
import NearbyGasStations from "./screens/NearbyGasStations";
import { colors } from "./styles/colors";
import { fontSizes } from "./styles/fontSizes";

import { auth } from "./firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";

const AuthStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const FuelingHistoryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

// AuthStack -- contains the Sign In screen
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign Up" component={SignUp} />
      <AuthStack.Screen name="Sign In" component={SignIn} />
      <AuthStack.Screen
        name="Terms and Conditions"
        component={TermsAndConditions}
      />
    </AuthStack.Navigator>
  );
};

// HomeStack -- contains the Home and Prediction screens
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={stackNavigatorOptions}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Prediction" component={Prediction} />
      <HomeStack.Screen
        name="Edit Fueling Entry"
        component={EditFuelingEntry}
      />
      {/* <HomeStack.Screen
        name="Gas Stations"
        component={NearbyGasStations}
      /> */}
      <HomeStack.Screen name="Fueling History" component={FuelingHistory} />
    </HomeStack.Navigator>
  );
};

// FuelingHistoryStack -- contains the Fueling History, Fueling Entry, and Edit Fueling Entry screens
const FuelingHistoryStackNavigator = () => {
  return (
    <FuelingHistoryStack.Navigator screenOptions={stackNavigatorOptions}>
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
    <ProfileStack.Navigator screenOptions={stackNavigatorOptions}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="Edit Profile" component={EditProfile} />
      <ProfileStack.Screen name="Change Password" component={ChangePasswords} />
    </ProfileStack.Navigator>
  );
};

// MainStack -- contains the HomeStack, FuelingHistoryStack, and ProfileStack
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator screenOptions={tabNavigatorOptions}>
      <MainStack.Screen
        name="Home Stack"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <MainStack.Screen
        name="Fueling History Stack"
        component={FuelingHistoryStackNavigator}
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          ),
        }}
      />
      <MainStack.Screen
        name="Profile Stack"
        component={ProfileStackNavigator}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
      <MainStack.Screen
        name="Gas Stations"
        component={NearbyGasStations}
        options={{
          headerTitle: "Nearby Gas Stations",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" color={color} size={size} />
          ),
        }}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // *********************************
  // Listener for authentication state changes.
  // *********************************
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {authenticated ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  stackNavigator: {
    backgroundColor: colors.primaryDark,
  },
  stackNavigatorTitle: {
    color: colors.primaryDarkText,
    fontSize: fontSizes.extraLarge,
  },
  tabNavigator: {
    backgroundColor: colors.primaryLight,
    height: "10%",
  },
  tabNavigatorLabel: {
    color: colors.primaryLightText,
    fontSize: fontSizes.small,
    marginBottom: 10,
  },
  tabNavigatorIcon: {
    color: colors.primaryLightText,
    fontSize: fontSizes.large,
  },
  tabNavigatorHeader: {
    backgroundColor: colors.primaryDark,
  },
  tabNavigatorHeaderTitle: {
    color: colors.primaryDarkText,
    fontSize: fontSizes.extraLarge,
  },
});

const stackNavigatorOptions = {
  headerStyle: styles.stackNavigator,
  headerTitleStyle: styles.stackNavigatorTitle,
  headerTitleAlign: "center",
};

const tabNavigatorOptions = {
  tabBarStyle: styles.tabNavigator,
  tabBarLabelStyle: styles.tabNavigatorLabel,
  tabBarIconStyle: styles.tabNavigatorIcon,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.disabledText,
  headerStyle: styles.tabNavigatorHeader,
  headerTitleStyle: styles.tabNavigatorHeaderTitle,
  headerTitleAlign: "center",
};
