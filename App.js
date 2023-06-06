import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import store from "./redux/Store";
import IntroScreen from "./components/IntroScreen";
import HomeScreen from "./components/Home";
import SearchScreen from "./components/SearchPage";
import UserScreen from "./components/UserPage";
import Party from "./components/Party";
import Birthday from "./components/Birthday";
import BirthdayPage from "./components/BirthdayPage";
import { Provider } from "react-redux";
import ViewCart from "./components/ViewCart";
import {
  LoginAndRegister,
  LoginScreen,
  RegisterScreen,
} from "./components/Login";
import Planner from "./components/Planner";
import ReservationPage from "./components/ReservationPage";
import EmailVerificationScreen from "./components/EmailVerificationScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // new stack navigator for PartyScreen
const renderTabIcon = (route, focused, color, size) => {
  let iconName;
  if (route.name === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (route.name === "Search") {
    iconName = focused ? "search" : "search-outline";
  } else if (route.name === "User") {
    iconName = focused ? "person" : "person-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
function MainStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          renderTabIcon(route, focused, color, size),

        tabBarActiveTintColor: "#f6437b",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
      //  tabBarOptions={{
      //     activeTintColor: '#f6437b',
      //     inactiveTintColor: 'gray',
      //   }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        {showRealApp ? (
          <Stack.Navigator
            screenOptions={{
              gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="Main"
              component={MainStackScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Party"
              component={Party}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="Birthday"
              component={Birthday}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="BirthdayPage"
              component={BirthdayPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewCart"
              component={ViewCart}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="LoginAndRegister"
              component={LoginAndRegister}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="Planner"
              component={Planner}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="ReservationPage"
              component={ReservationPage}
              options={{ headerShown: false, tabBarVisible: false }}
            />
            <Stack.Screen
              name="EmailVerificationScreen"
              component={EmailVerificationScreen}
              options={{ headerShown: false, tabBarVisible: false }}
            />
          </Stack.Navigator>
        ) : (
          <IntroScreen onDone={onDone} onSkip={onSkip} />
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
