import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import NavBar from "./Navbar";
const slides = [
  {
    key: "s1",
    text: "Welcome to Hafalat",
    title: "Party Like Never Before",
    image: require("../photos/birthday-party.png"),
    backgroundColor: "blue",
  },
  {
    key: "s2",
    title: "Planning Made Easier! ",
    text: "With a Touch of Button",
    image: require("../photos/bride-and-groom.png"),
    backgroundColor: "white",
  },
  {
    key: "s3",
    title: "Great Offers",
    text: "Enjoy Great offers on our all services",
    image: require("../photos/1.png"),
    backgroundColor: "white",
  },
  {
    key: "s4",
    title: "",
    text: " Best Deals on all our services",
    image: require("../photos/1.png"),
    backgroundColor: "white",
  },
];

const IntroScreen = ({ onDone, onSkip }) => {
  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 100,
        }}
      >
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Image style={styles.introImageStyle} source={item.image} />

        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    // alignItems: 'center',
    // padding: 10,
    justifyContent: "center",
  },
  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  paragraphStyle: {
    padding: 20,
    textAlign: "center",
    fontSize: 16,
  },
  introImageStyle: {
    width: "80%",
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: "#f6437b",
    textAlign: "center",
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: "#f6437b",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
});
