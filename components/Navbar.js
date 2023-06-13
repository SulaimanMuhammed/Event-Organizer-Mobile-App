import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Page1 from "./Home";
import UserPage from "./UserPage";
import SearchPage from "./SearchPage";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Page1 />
      {/* <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search')}
      /> */}
    </View>
  );
}

function User({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <UserPage />
      {/* <Button
        title="Go to Home"
        onPress={() => navigation.navigate('User')}
      /> */}
    </View>
  );
}

function SearchScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SearchPage />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

function tabBarIcon(route, focused, color, size) {
  let iconName;
  if (route.name === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (route.name === "Search") {
    iconName = focused ? "search" : "search-outline";
  } else if (route.name === "User") {
    iconName = focused ? "person" : "person-outline";
  }
  return <Ionicons name={iconName} size={size} color={color} />;
}
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) =>
            tabBarIcon(route, focused, color, size),
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          style: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-search" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
export default App;
