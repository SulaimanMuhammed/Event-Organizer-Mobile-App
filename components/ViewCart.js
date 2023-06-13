import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
//import { Alert } from "react-native";
import { Modal } from "react-native";

import { connect } from "react-redux";
import { addOrder } from "../redux/Actions";
import { app } from "../Firebase";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  addToCollection,
  collection,
} from "firebase/firestore";

// import { LoginAndRegister } from "./Login";
class ViewCart extends React.Component {
  handleCheckout = async () => {
    const { userData, navigation, selectedData, addOrder } = this.props;
    const { cart, personInfo, item } = this.props.route.params;
    // const fromCheckout = this.props.route.params.fromCheckout;
    try {
      if (userData) {
        const db = getFirestore(app);
        const currentUser = app.auth().currentUser;
        const userId = currentUser.uid;
        const ordersCollection = collection(db, "orders");
        const order = {
          cart: cart,
          birthdayInfo: personInfo,
          userId: userId,
          item: item,
        };

        const alertButtons = [
          {
            text: "No",
            onPress: () => {
              // Do nothing or add any desired logic
              navigation.goBack();
            },
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await setDoc(doc(ordersCollection), order);
              addOrder(order);
              navigation.navigate("Home");
            },
          },
        ];

        Alert.alert(
          "Success",
          "Reservation successful! Do you want to proceed?",
          alertButtons
        );
      } else {
        navigation.navigate("LoginAndRegister", {
          onLoginSuccess: this.handleLoginSuccess,
        });
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  // ...

  handleLoginSuccess = () => {
    // User has successfully logged in
    // Continue the checkout process
    // this.setState({ showModal: false });
    this.handleCheckout();
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  state = {
    showModal: false,
    // other state properties
  };
  render() {
    const { route } = this.props;
    const { cart } = route.params;
    const { personInfo } = route.params;
    const subtotal = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const taxRate = 0.1; // 10% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={30} color="gray" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10%",
            }}
          >
            <Image
              source={require("../photos/fireworkOpposite.png")}
              style={styles.fireworksOpposite}
            />
            <Image
              source={require("../photos/firework.png")}
              style={styles.fireworks}
            />
          </View>
          {/* <Image
            source={require("../photos/happy.png")}
            style={{
              width: "70%",
              height: "30%",
              position: "absolute",

              top: "10%",
              left: "15%",
            }}
          /> */}

          <View
            style={{
              position: "absolute",
              top: "10%",
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#f6437b",
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
                letterSpacing: 1,
                zIndex: 1,
              }}
            >
              Happy Birthday
            </Text>
          </View>

          <View
            style={{
              marginTop: "0%",
              borderBottomWidth: 3,
              borderBottomColor: "black",
              // backgroundColor: "#",
              //  paddingVertical: 10,
            }}
          >
            {personInfo.map((item, index) => (
              <View key={index}>
                <View style={styles.personNameContainer}>
                  <Text style={styles.personName}>{item.personName}</Text>
                </View>
                {/* <View style={styles.separator} /> */}
                <View style={styles.cartInfoConatiner}>
                  <View style={styles.icons}>
                    <FontAwesome5 name="clock" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>
                      {item.selectedTime.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  </View>
                  <View style={styles.icons}>
                    <FontAwesome5 name="calendar" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>
                      {item.selectedDate.toLocaleDateString("en-US")}
                    </Text>
                  </View>
                </View>
                <View style={styles.cartInfoConatiner}>
                  <View style={styles.icons}>
                    <FontAwesome5 name="music" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>{item.music}</Text>
                  </View>
                  <View style={styles.icons}>
                    <FontAwesome5 name="chair" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>{item.selectedNumber}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
          {/* <View style={styles.separator} /> */}
        </View>

        {/* <View style={styles.emptySpace} /> */}

        <ScrollView>
          <Text style={styles.otherText}>Products</Text>
          <View style={styles.cartItems}>
            {cart.map((item) => (
              <View
                key={item.id}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <View style={styles.cartItemLeft}>
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.cartItemImage}
                  />
                  <View style={styles.cartItemDetails}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>
                      Price: {item.price} IQD
                    </Text>
                  </View>
                  <View style={styles.cartItemRight}>
                    <Text style={styles.cartItemQuantity}>
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <Text style={styles.otherText}>Payment Summery:</Text>
          <View style={styles.totalContainer}>
            <View style={styles.eachTotal}>
              <Text style={styles.taxText}>Subtotal: </Text>
              <Text style={styles.taxText}> {subtotal.toFixed(2)} IQD</Text>
            </View>
            <View style={styles.eachTotal}>
              <Text style={styles.taxText}>Tax: </Text>
              <Text style={styles.taxText}> {tax.toFixed(2)}%</Text>
            </View>
            <View style={styles.eachTotal}>
              <Text style={styles.totalText}>Total: </Text>
              <Text style={styles.totalText}> {total.toFixed(2)} IQD</Text>
            </View>
          </View>
        </View>
        <View style={styles.checkAndAdd}>
          <TouchableOpacity
            style={styles.cartCheckoutButton}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={styles.cartCheckoutButtonText}>Add Items</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartCheckoutButton}
            onPress={this.handleCheckout}
          >
            <Text style={styles.cartCheckoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user.userInfo,
    //arrayOfArrays: state.arrayOfArrays,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addOrder: (order) => dispatch(addOrder(order)),
  // hasReservation: dispatch(hasReservation("reserved")),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffffff',
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "column",
    backgroundColor: "#ddrf",
    // paddingHorizontal: windowWidth * 0.05,
    //paddingVertical: windowWidth * 0.01,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  closeButton: {
    //marginBottom: windowWidth * 0.2,
    position: "absolute",
    marginLeft: "2%",
  },
  title: {
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
    color: "red",

    // marginLeft:"15%"
  },
  emptySpace: {
    width: windowWidth * 0.04,
    height: windowWidth * 0.04,
  },
  cartItems: {
    padding: windowWidth * 0.03,
  },
  fireworks: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    // position: 'absolute',
    right: windowWidth * 0.015,
  },
  fireworksOpposite: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    // position: 'absolute',
    left: windowWidth * 0.0,
  },
  cartItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemImage: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.12,
    margin: windowWidth * 0.01,
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: windowWidth * 0.03,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: windowWidth * 0.03,
    color: "#888888",
  },

  cartItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemQuantity: {
    fontSize: windowWidth * 0.03,
    //fontWeight: 'bold',
    marginRight: windowWidth * 0.03,
  },
  cartCheckoutButton: {
    backgroundColor: "#f6437b",
    padding: windowWidth * 0.02,
    alignItems: "center",
    borderRadius: 5,
  },
  cartCheckoutButtonText: {
    fontSize: windowWidth * 0.05,
    //fontWeight: 'bold',
    color: "#ffffff",
  },
  totalContainer: {
    backgroundColor: "#f9f9f9",
    padding: windowWidth * 0.03,
  },
  totalText: {
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
    color: "#f6437b",
  },
  taxText: {
    fontSize: windowWidth * 0.032,
    //fontWeight: 'bold',
  },
  otherText: {
    marginLeft: "3%",
    fontSize: windowWidth * 0.032,
    fontWeight: "bold",
  },
  halfCircle: {
    width: "100%",
    height: windowWidth * 0.02,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{ scaleX: 2 }],
  },
  eachTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInfo: { fontSize: 14, marginTop: 2, color: "black" },
  cartInfoConatiner: {
    flexDirection: "row",
    marginTop: "2%",
    justifyContent: "space-around",
    padding: 2,
  },
  iconStyle: {
    fontSize: 22,
    marginTop: 2,
    color: "#f6437b",
    margin: 10,
  },
  // checkAndAdd:{
  //   flexDirection:"row",
  //   justifyContent:"space-around",
  //   backgroundColor:"#f9f9f9"

  // },
  checkAndAdd: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    //top:"5%",
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    //paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowUpset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  popupContainer: {
    // position: 'absolute',
    //top:"30%",
    width: "100%",
    bottom: 0,
    left: 0,

    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    //borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 5,
  },
  eachButtonPoup: {
    backgroundColor: "#f6437b",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  textEachPopup: {
    fontSize: 16,
    color: "#ffff",
  },
  buttonsAferSet: {
    width: "60%",

    alignItems: "center",
  },
  personNameContainer: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  personName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  icons: {
    flexDirection: "row",
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
