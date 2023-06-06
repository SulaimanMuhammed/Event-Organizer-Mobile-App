// Home.js

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "react-native-vector-icons";

//import Carousel from 'react-native-reanimated-carousel';
import ReactLoading from "react-loading";

const weddingSlider = [
  {
    key: 1,
    text: "Welcome to Hafalat",
    rate: "3",
    image: {
      uri: "/photos/birthday-cake.png",
    },
  },
  {
    key: 2,
    rate: "4",
    title: "Party Like Never Before",
    image: {
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png",
    },
  },
  {
    key: 3,
    text: "Welcome to Hafalat",
    rate: "3",
    image: {
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png",
    },
  },
  {
    key: 4,
    rate: "2",
    title: "Party Like Never Before",
    image: {
      uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png",
    },
  },
];

const images = [
  {
    key: 435,
    uri: "https://example.com/image1.jpg",
    title: "Image 1",
  },
  {
    key: 65,
    uri: "https://example.com/image2.jpg",
    title: "Image 2",
  },
  {
    key: 455,
    uri: "https://example.com/image3.jpg",
    title: "Image 3",
  },
];
const data = [
  {
    key: 5436,
    title: "Aenean leo",
    body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
    imgUrl: "https://picsum.photos/id/11/200/300",
  },
  {
    key: 3572,
    title: "In turpis",
    body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
    imgUrl: "https://picsum.photos/id/10/200/300",
  },
  {
    key: 4658,
    title: "Lorem Ipsum",
    body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
    imgUrl: "https://picsum.photos/id/12/200/300",
  },
];

const Home = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userInfo);

  const order = useSelector((state) => state.user.order); // Assuming the reservation data is stored in the 'order' property of the Redux state

  const renderWelcomeMessage = () => {
    if (userData) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {userData.username}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginAndRegister")}
        >
          <FontAwesome5 name="cog" size={25} color="gray" />
          {/* <Text style={styles.loginButton}>Login</Text> */}
        </TouchableOpacity>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.logoAndCalendarPlace}>
          <View style={styles.logoSpace}>
            <Image
              style={styles.logo}
              source={require("../photos/birthday.png")}
            />
            <Text style={styles.heading}>Party like Never Before</Text>
            {order && (
              <View style={styles.reservation}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ReservationPage")}
                >
                  <Text style={{ color: "white" }}>View Reservation</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "10%",
            }}
          >
            <View>{renderWelcomeMessage()}</View>
            <View style={styles.calendar}>
              <TouchableOpacity onPress={() => navigation.navigate("Planner")}>
                <Image
                  source={require("../photos/calendar.png")}
                  style={styles.calendarPhoto}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.content}> */}

        <View style={styles.twoContents}>
          <View style={styles.secondPart}>
            <TouchableOpacity onPress={() => navigation.navigate("Party")}>
              <Text style={styles.secondTitle}>Party</Text>
              <Image
                source={require("../photos/wedding.png")}
                style={styles.mainImages}
              />
            </TouchableOpacity>
          </View>
          {/* here is the tags for birthay */}
          <View style={styles.secondPart}>
            <TouchableOpacity onPress={() => navigation.navigate("Birthday")}>
              <Text style={styles.secondTitle}>Birthday</Text>
              <Image
                source={require("../photos/birthday-cake.png")}
                style={styles.mainImages}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Speical Reservation */}

        <View style={styles.thirdPart}>
          <Text style={styles.secondTitle}>Offers</Text>
        </View>

        {/* here is the tag for others */}

        <View>
          {/* <Text style={styles.secondTitle}>
                            Trending
                          </Text> */}
        </View>
        <View style={styles.trending}>{/* birthday flatlist */}</View>
        {/* here goes offers */}

        <View>
          {/* <Text style={styles.secondTitle}>
                            Offers
                          </Text> */}
        </View>
        <View style={styles.trending}>
          {/* birthday flatlist */}
          <Text>Trending</Text>
          <FlatList
            data={weddingSlider}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.second}>
                {/* <Image
                                            source={{ uri: item.image.uri }}
                                          style={styles.images}
                                            /> */}
                <Image
                  source={require("../photos/1.png")}
                  style={styles.images}
                />
                <Text>{item.name}</Text>
                <Text>{item.rate}</Text>
              </View>
            )}
            keyExtractor={(item) => item.key}
          />
        </View>

        {/* </View> */}
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    //backgroundColor:'#f6437b',
    backgroundColor: "#ffff",
  },
  content: {
    // borderWidth:"1",
    // flexDirection:"row",
    opacity: "40",
  },
  logoAndCalendarPlace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // margin: "2%",
    padding: "2%",
  },
  mainImages: {
    width: "50%",
    height: "60%",
    marginLeft: "40%",
    marginTop: "10%",
  },
  images: {
    width: "90%",
    height: "50%",
    borderRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 5,
    color: "black",
  },
  secondTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: "white",
  },
  secondPart: {
    backgroundColor: "#f6437b",
    margin: 10,
    borderRadius: 10,
    height: 150,
    width: "40%",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.84,
    elevation: 2,
  },

  thirdPart: {
    backgroundColor: "#f6437b",
    margin: 10,
    borderRadius: 10,
    height: 200,
    width: "90%",
    marginLeft: "5%",
    ///////////////////////////
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.84,
    elevation: 2,
    //////////////////////
  },
  second: {
    backgroundColor: "#f6437b",
    margin: 10,
    borderRadius: 10,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  special: {
    margin: 20,
  },
  twoContents: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  trending: {
    //backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  logo: {
    width: 200,
    height: 100,
  },
  logoSpace: {
    width: "70%",
  },
  calendar: {
    backgroundColor: "#f6437b",
    borderRadius: 10,

    shadowColor: "#000",
    marginTop: "20%",
    padding: 3,
    shadowOffset: {
      width: 3,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 2.84,
    elevation: 2,
  },

  calendarPhoto: {
    width: 80,
    height: 80,

    //marginLeft: "40%",
  },
  loginButton: {
    color: "#ffff",
  },
  welcomeContainer: {
    borderRadius: 4,
    backgroundColor: "#f6437b",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    ///  boxShadow: 0px 2px 4px rgba(0, 0, 0, 0.25),
  },
  reservation: {
    backgroundColor: "#ff8469",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeContainer: {
    //alignItems: "flex-end",
    // marginRight: 16,
    // marginTop: 8,
    width: "90%",
  },
  welcomeText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "bold",
    textAlign: "right",
  },
});
