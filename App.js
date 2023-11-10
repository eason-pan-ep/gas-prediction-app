// This is the entry point of the application.
// This file contains the following:
// The App component has the following structure:
//    AuthStack (NavigatorStackContainer)
//       |- Sign In (Welcome) screen
//       '- Main Stack (BottomTabNavigator) (requires authentication)
//          |- Home screen
//          |- Prediction screen (not accessible from the bottom tab navigator)
//          |- Fueling History screen
//          |- Fueling Entry screen (not accessible from the bottom tab navigator)
//          |- Edit Fueling Entry screen (not accessible from the bottom tab navigator)
//          |- Profile screen
//          |- Edit Profile screen (not accessible from the bottom tab navigator)
//          '- Nearby Gas Stations screen (not accessible from the bottom tab navigator)

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import SignIn from "./screens/SignIn";
import Home from "./screens/home";
import Prediction from "./screens/Prediction";
import FuelingHistory from "./screens/FuelingHistory";
import FuelingEntry from "./screens/FuelingEntry";
import EditFuelingEntry from "./screens/EditFuelingEntry";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import NearbyGasStations from "./screens/NearbyGasStations";

const AuthStack = createNativeStackNavigator();
const MainStack = createBottomTabNavigator();

// Navigation 1: AuthStack
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Sign In" component={SignIn} />
      <AuthStack.Screen name="Main Stack" component={MainStackNavigator} />
    </AuthStack.Navigator>
  );
};

// Navigation 2: MainStack
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="Prediction"
        component={Prediction}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <MainStack.Screen name="Fueling History" component={FuelingHistory} />
      <MainStack.Screen
        name="Fueling Entry"
        component={FuelingEntry}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <MainStack.Screen
        name="Edit Fueling Entry"
        component={EditFuelingEntry}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          tabBarShowLabel: false,
        }}
      />
      <MainStack.Screen
        name="Nearby Gas Stations"
        component={NearbyGasStations}
        options={{
          tabBarShowLabel: false,
        }}
      />
    </MainStack.Navigator>
  );
};

export default function App() {
  // *********************************
  // Set to true for testing purposes.
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
