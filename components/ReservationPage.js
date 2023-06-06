import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../Firebase";
import { FontAwesome5 } from "react-native-vector-icons";

const ReservationPage = ({ navigation }) => {
  const currentUser = app.auth().currentUser;
  const userId = currentUser.uid;
  const [reservationData, setReservationData] = useState([]);
  const [lastOrders, setLastOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const db = getFirestore(app);
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const reservations = querySnapshot.docs.map((doc) => doc.data());
        setReservationData(reservations);

        // if (reservations.length > 0) {
        //   setLastOrders([reservations[reservations.length - 1]]);
        //   setCurrentOrder(reservations[0]);
        // }
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchReservationData();
  }, [userId]);

  if (reservationData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f6437b" />
        <Text style={styles.loadingText}>Loading reservation data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.arrow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Reservation Details</Text>

      <ScrollView>
        {/* <Text style={styles.sectionLabel}>Your Orders:</Text> */}
        {reservationData.length > 0 ? (
          reservationData.map((order, orderIndex) => (
            <View key={orderIndex} style={styles.eachCart}>
              <View style={styles.infoContainer}>
                <Text style={styles.sectionLabel}>Restaurant Information:</Text>
                <Text style={styles.infoText}>{order.item.name}</Text>
              </View>
              {order.birthdayInfo.map((item, infoIndex) => (
                <View style={styles.infoContainer} key={infoIndex}>
                  <Text style={styles.sectionLabel}>Birthday Information:</Text>
                  <Text style={styles.infoText}>{item.personName}</Text>
                  <Text style={styles.infoText}>{item.music}</Text>
                  <Text style={styles.infoText}>{item.sentence}</Text>
                  <Text style={styles.textInfo}>
                    {/* {item.selectedTime.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })} */}
                  </Text>
                  <Text style={styles.infoText}></Text>
                </View>
              ))}
              <Text style={styles.sectionLabel}>Your Order Information</Text>
              {order.cart.map((item, cartIndex) => (
                <View style={styles.cartItemContainer} key={cartIndex}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemText}>{item.quantity}</Text>
                </View>
              ))}

              {/* <View style={styles.infoContainer}>
                <Text style={styles.sectionLabel}>User ID:</Text>
                <Text style={styles.infoText}>{order.userId}</Text>
              </View> */}
            </View>
          ))
        ) : (
          <Text>No last orders found.</Text>
        )}

        <Text style={styles.sectionLabel}>Current Order:</Text>
        {currentOrder && (
          <View>
            {currentOrder.cart.map((item, cartIndex) => (
              <View style={styles.cartItemContainer} key={cartIndex}>
                <Text style={styles.cartItemText}>{item.name}</Text>
                <Text style={styles.cartItemText}>{item.quantity}</Text>
              </View>
            ))}

            <Text style={styles.sectionLabel}>Birthday Information:</Text>
            {currentOrder.birthdayInfo.map((item, infoIndex) => (
              <View style={styles.infoContainer} key={infoIndex}>
                <Text style={styles.infoText}>{item.personName}</Text>
                <Text style={styles.infoText}>{item.music}</Text>
                <Text style={styles.infoText}>{item.sentence}</Text>
                <Text style={styles.textInfo}>
                  {/* {item.selectedTime.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })} */}
                </Text>
                <Text style={styles.infoText}></Text>
              </View>
            ))}

            <View style={styles.infoContainer}>
              <Text style={styles.sectionLabel}>Rest Info:</Text>
              <Text style={styles.infoText}>{currentOrder.item.name}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.sectionLabel}>User ID:</Text>
              <Text style={styles.infoText}>{currentOrder.userId}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    //  paddingHorizontal: 20,
    //  paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  cartItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
    marginBottom: 10,
    //backgroundColor: "#ffc107",
    padding: 10,
    // borderRadius: 8,
  },
  cartItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f6437b",
    //marginTop: 20,
    // marginBottom: 10,
    // textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
    //backgroundColor: "#fff",
    borderRadius: 10,
    //padding: 15,
    //borderWidth: 1,
    borderColor: "#ddd",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  eachCart: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  arrow: {
    marginLeft: 20,
  },
});

export default ReservationPage;
