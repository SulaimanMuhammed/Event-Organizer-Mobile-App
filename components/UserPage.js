import React from "react";
import { connect } from "react-redux";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { userReducer, logout, cancelOrder } from "../redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import { LoginAndRegister } from "./Login";
import {
  useNavigation,
  useIsFocused,
  StackActions,
} from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { authLog } from "../Firebase";

const UserPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userInfo);
  const arrayOfArrays = useSelector((state) => state.arrayOfArrays);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await authLog.signOut();
              dispatch(logout(null));
              dispatch(cancelOrder(null));
              navigation.navigate("Home");
            } catch (error) {
              console.log("handle logout error", error);
              // Handle error
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (!userData && isFocused) {
    return <LoginAndRegister />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstPart}>
        <View style={styles.setting}>
          <FontAwesome5 name="cog" style={{ fontSize: 40, color: "white" }} />
        </View>
        <View style={styles.user}>
          <Image
            source={require("../photos/user.png")}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{userData?.username}</Text>
          <View>
            <Text style={styles.email}>Email: {userData?.email}</Text>
            <Text style={styles.email}>Phone Number: {userData?.phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.extraUser}>
        <View style={styles.eachUserItem}>
          <FontAwesome5
            name="star"
            style={{ fontSize: 35, color: "#f6437b" }}
          />
          <Text style={styles.textUserItem}>Favorite</Text>
        </View>
        <View style={styles.eachUserItem}>
          <FontAwesome5
            name="check"
            style={{ fontSize: 35, color: "#f6437b" }}
          />
          <Text style={styles.textUserItem}>Orders</Text>
        </View>
        <View style={styles.eachUserItem}>
          <FontAwesome5
            name="user"
            style={{ fontSize: 35, color: "#f6437b" }}
          />
          <Text style={styles.textUserItem}>Refer a Friend</Text>
        </View>
        <View style={styles.eachUserItem}>
          <FontAwesome5 name="box" style={{ fontSize: 35, color: "#f6437b" }} />
          <Text style={styles.textUserItem}>Get Help</Text>
        </View>
        <View style={styles.eachUserItem}>
          <FontAwesome5
            name="info"
            style={{ fontSize: 40, color: "#f6437b" }}
          />
          <Text style={styles.textUserItem}>About App</Text>
        </View>

        <View style={styles.eachUserItem}>
          <TouchableOpacity onPress={handleLogout}>
            <FontAwesome5
              name="sign-out-alt"
              style={{ fontSize: 35, color: "#f6437b" }}
            />
            <Text style={styles.textUserItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default UserPage;

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    //backgroundColor:"#f6437b",
    flex: 1,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
    marginBottom: 10,
  },
  firstPart: {
    backgroundColor: "#f6437b",
    width: "100%",

    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    //justifyContent:"center",
    // alignItems:"center"
  },
  setting: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  user: {
    justifyContent: "center",
    alignItems: "center",
  },
  extraUser: {
    justifyContent: "space-between",
    //alignItems:"center",

    margin: 20,
  },
  eachUserItem: {
    flexDirection: "row",
    marginTop: 30,
    //justifyContent:"space-around",
    alignItems: "flex-start",
    fontSize: 30,
  },
  textUserItem: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 5,
  },
});
