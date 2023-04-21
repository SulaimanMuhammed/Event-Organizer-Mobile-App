import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import NavBar from './Navbar';

const IntroScreen = ({ onDone, onSkip }) => {
  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 100,
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        {/* <Image style={styles.introImageStyle} source={require(`photos/${item.image}`)} /> */}
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
    backgroundColor: '#f',
    // alignItems: 'center',
    // padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
});

const slides = [
  {
    key: 's1',
    text: 'Welcome to Hafalat',
    title: 'Party Like Never Before',
    image: "1.png",
    backgroundColor: '#FFBF00',
  },
  {
    key: 's2',
    title: 'Flight Booking',
    text: 'Upto 25% off on Domestic Flights',
    image: "1.png",
    backgroundColor: '#f6437b',
  },
  {
    key: 's3',
    title: 'Great Offers',
    text: 'Enjoy Great offers on our all services',
    image: "1.png",
    backgroundColor: '#f6437b',
  },
  {
    key: 's4',
    title: 'Best Deals',
    text: ' Best Deals on all our services',
    image: "1.png",
    backgroundColor: '#f6437b',
  },
  {
    key: 's5',
    title: 'Bus Booking',
    text: 'Enjoy Travelling on Bus with flat 100% off',
    image: "1.png",
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Train Booking',
    text: ' 10% off on first Train booking',
    image: '1.png',
    backgroundColor: '#f6437b',
  },
];
