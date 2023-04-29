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
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { Alert } from "react-native";
import { Modal } from "react-native";
export default class ViewCart extends React.Component {
  handleCheckout = () => {
    if (this.props.isLoggedIn) {
      // Prompt the user to log in or create an account
      // this.setState({ showModal: true });
      this.props.navigation.navigate("Login");
    } else {
      this.setState({ showModal: true });
    }
    // Check if user is logged in
    // if (!this.props.isLoggedIn) {
    //   // Prompt the user to log in or create an account
    //   Alert.alert(
    //     'You must be logged in to checkout',
    //     'Do you want to log in or create an account?',
    //     [
    //       {
    //         text: 'Log in',
    //         onPress: () => this.props.navigation.navigate('Login'),

    //       },
    //       {
    //         text: 'Create account',
    //         onPress: () => this.props.navigation.navigate('Register')
    //       },
    //       {
    //         text: 'Cancel',
    //         onPress: () => this.props.navigation.navigate('Home'),
    //         style: 'cancel'
    //       }
    //     ],
    //     {
    //       cancelable: false,

    //         // Styling object
    //         titleStyle: styles.title,
    //         messageStyle: styles.message,
    //         buttonTextStyle: styles.buttonText,
    //         overlayStyle: styles.overlay,
    //         // ... other style properties as needed

    //   }
    //   );
    // }
    // else{
    //   // this.props.navigation.navigate('');
    //   Alert.alert("successfly booked for you")
    // }
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
        <Modal
          visible={this.state.showModal}
          animationType="slide"
          transparent={true}
          onRequestClose={this.hideModal}
          style={
            {
              //justifyContent: 'center',
            }
          }
        >
          <View style={styles.overlay}>
            <View style={styles.popupContainer}>
              <Text> You must be logged in to checkout</Text>
              <TouchableOpacity
                style={styles.eachButtonPoup}
                onPress={() => {
                  this.props.navigation.navigate("Login");
                  this.hideModal();
                }}
              >
                <Text style={styles.textEachPopup}> Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eachButtonPoup}
                onPress={() => {
                  this.props.navigation.navigate("Register"), this.hideModal;
                }}
              >
                <Text style={styles.textEachPopup}> Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.eachButtonPoup}
                onPress={() => {
                  this.props.navigation.navigate("Home"), this.hideModal;
                }}
              >
                <Text style={styles.textEachPopup}> cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.hideModal}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* ...login/create account form */}
        </Modal>

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
          <Image
            source={require("../photos/happy.png")}
            style={{
              width: "70%",
              height: "30%",
              position: "absolute",

              top: "10%",
              left: "15%",
            }}
          />

          {/* <Text style={styles.title}>Hersh Gyan </Text> */}
          <View
            style={{
              marginTop: "0%",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            {personInfo.map((item) => (
              <View key={item.id}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={styles.title}>{item.personName}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.cartInfoConatiner}>
                  <View style={{ flexDirection: "row", width: 100 }}>
                    <FontAwesome5 name="clock" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>
                      {item.selectedTime.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", width: 100 }}>
                    <FontAwesome5 name="calendar" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>
                      {item.selectedDate.toLocaleDateString("en-US")}
                    </Text>
                  </View>
                </View>
                <View style={styles.cartInfoConatiner}>
                  <View style={{ flexDirection: "row", width: 100 }}>
                    <FontAwesome5 name="music" style={styles.iconStyle} />
                    <Text style={styles.textInfo}>{item.music}</Text>
                  </View>
                  <View style={{ flexDirection: "row", width: 100 }}>
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
                  <Image source={item.source} style={styles.cartItemImage} />
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
    width: "90%",
    bottom: 0,
    left: 0,
    // right: 100,
    height: "40%",
    backgroundColor: "#fff",
    borderRadius: 20,
    //borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-around",
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
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  textEachPopup: {
    fontSize: 16,
    color: "#ffff",
  },
});
