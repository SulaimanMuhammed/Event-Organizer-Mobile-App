import React from "react";
import { connect } from "react-redux";
import { View, SafeAreaView, Text, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
//import { LOGOUT } from '../redux/Actions';
import { userReducer, LOGOUT } from "../redux/Actions";
import { useSelector, useDispatch } from "react-redux";

const UserPage = ({ userData }) => {
  const dispatch = useDispatch();
  const arrayOfArrays = useSelector((state) => state.arrayOfArrays);

  const handleLogout = () => {
    dispatch(userReducer(null));
  };
  const handleLogin = () => {
    dispatch(userReducer(user));
  };
  //console.log(user);// this.setState(prevState => ({
  //   cartCount: prevState.cartCount + 1,
  // }));
  // const checkedItems = useSelector(state => state.setCheckedItem);
  //console.log(item)
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
          <Text style={styles.email}>{userData?.email}</Text>
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
        {arrayOfArrays &&
          arrayOfArrays.map((item) =>
            item.map((nestedItem) => (
              <View>
                <Text>{nestedItem.price}</Text>
              </View>
            ))
          )}
        <View style={styles.eachUserItem}>
          <FontAwesome5
            name="sign-out-alt"
            style={{ fontSize: 35, color: "#f6437b" }}
            onPress={handleLogout}
          />
          <Text style={styles.textUserItem}>Logout</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  // console.log('Current state:', state.arrayOfArrays);
  return {
    userData: state.user.userInfo,
    //arrayOfArrays: state.arrayOfArrays,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  userReducer: (userInfo) => dispatch(userReducer(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
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
