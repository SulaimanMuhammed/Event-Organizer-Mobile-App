import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from "react-native";
//import { useDispatch } from 'react-redux';
// import { RecaptchaVerifier } from "react-native-recaptcha-v3";
import { app, authLog, getUserData } from "../Firebase";
import { useDispatch, useSelector } from "react-redux";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { login, register } from "../redux/Actions"; // Import the login and register actions
import { FontAwesome5 } from "react-native-vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
//import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const onLoginSuccess = route.params?.onLoginSuccess;

  const handleLogin = async () => {
    try {
      await authLog.signInWithEmailAndPassword(email, password);
      const user = authLog.currentUser;

      const userData = await getUserData(user.uid);
      //  console.log("from login page", userData);
      dispatch(register(userData.username, userData.email, userData.phone));

      // Check if the login was triggered from the checkout process
      //  const fromCheckout = this.props.route.params.fromCheckout;

      if (onLoginSuccess) {
        // Login was triggered from the checkout process, notify the checkout page
        onLoginSuccess();
        navigation.goBack();
      } else {
        // Login was not triggered from the checkout process, navigate to the "User" page
        navigation.navigate("User");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("Invalid username or password");
      // Handle login error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="hafalat@booking.com"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [registerError, setRegisterError] = useState("");
  const dispatch = useDispatch();
  const onLoginSuccess = route.params?.onLoginSuccess;

  const validateFields = () => {
    if (!email || !password || !confirmPassword || !username || !phone) {
      setRegisterError("Please fill in all fields");
      return false;
    }
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return false;
    }
    return true;
  };
  ///////////////////////////////check if emai exists or not :
  const checkEmailExists = async (email) => {
    try {
      const methods = await authLog.fetchSignInMethodsForEmail(email);
      return methods.length > 0; // If methods.length is greater than 0, it means the email already exists
    } catch (error) {
      console.error("Email existence check error:", error);
      return false; // Assume email doesn't exist in case of error
    }
  };

  const handleRegister = async () => {
    const isValid = validateFields();

    try {
      // Register logic here
      if (!isValid) {
        return;
      }
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setRegisterError("Email already exists"); // Set the error message
        return;
      }
      const userCredentials = await authLog.createUserWithEmailAndPassword(
        email,
        password,
        phone,
        username
      );
      const user = userCredentials.user;

      const firestore = getFirestore(app);
      const userRef = doc(collection(firestore, "users"), user.uid);
      await setDoc(userRef, {
        email,
        username,
        phone,
      });
      dispatch(register(username, email, phone));

      if (onLoginSuccess) {
        onLoginSuccess();
        navigation.goBack();
      } else {
        navigation.navigate("User");
      }
    } catch {
      console.error("Register error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.arrow}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      {registerError ? (
        <Text style={styles.errorText}>{registerError}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Login", { onLoginSuccess })}
      >
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

// const RegisterScreen = () => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationCode, setVerificationCode] = useState("");
//   const [confirm, setConfirm] = useState(null);
//   const [verificationId, setVerificationId] = useState(null);

//   useEffect(() => {
//     const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is already signed in, handle the logged-in state
//       }
//     });

//     return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
//   }, []);

//   const sendVerificationCode = async () => {
//     try {
//       const phoneProvider = new firebase.auth.PhoneAuthProvider();
//       const id = await phoneProvider.verifyPhoneNumber(phoneNumber);
//       setVerificationId(id);
//     } catch (error) {
//       console.log("Error sending verification code:", error);
//     }
//   };

//   const confirmCode = async () => {
//     try {
//       const credential = firebase.auth.PhoneAuthProvider.credential(
//         verificationId,
//         verificationCode
//       );
//       await firebase.auth().signInWithCredential(credential);
//       // Code confirmation successful, handle the authenticated state
//     } catch (error) {
//       console.log("Invalid code:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Phone Number:</Text>
//       <TextInput
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//         style={styles.input}
//       />
//       <TouchableOpacity onPress={sendVerificationCode}>
//         <Text>Send Code</Text>
//       </TouchableOpacity>

//       {verificationId && (
//         <>
//           <Text>Verification Code:</Text>
//           <TextInput
//             value={verificationCode}
//             onChangeText={setVerificationCode}
//             keyboardType="numeric"
//             style={styles.input}
//           />
//           <Button title="Confirm" onPress={confirmCode} />
//         </>
//       )}
//     </View>
//   );
// };

const LoginAndRegister = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const onLoginSuccess = route.params?.onLoginSuccess;

  const handleGoBack = () => {
    if (route?.name === "UserPage") {
      navigation.navigate("Home");
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.popupContainer}>
      <View>
        {route.name !== "UserPage" && (
          <TouchableOpacity onPress={handleGoBack}>
            <FontAwesome5 name="arrow-left" size={30} color="#f6437b" />
          </TouchableOpacity>
        )}
      </View>
      <Text>You must be logged in to checkout</Text>
      <View style={styles.buttonsAferSet}>
        <TouchableOpacity
          style={styles.eachButtonPoup}
          onPress={() => {
            navigation.navigate("Login", { onLoginSuccess: onLoginSuccess });
          }}
        >
          <Text style={styles.textEachPopup}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eachButtonPoup}
          onPress={() => {
            navigation.navigate("Register", { onLoginSuccess: onLoginSuccess });
          }}
        >
          <Text style={styles.textEachPopup}> Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eachButtonPoup}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.textEachPopup}> cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#f6437b",
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: "80%",
  },
  button: {
    backgroundColor: "#f6437b",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  link: {
    marginTop: 32,
  },
  linkText: {
    color: "#000",
    textDecorationLine: "underline",
  },
  popupContainer: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "center",

    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    // top: "30%",
  },

  eachButtonPoup: {
    backgroundColor: "#f6437b",
    padding: 20,

    borderRadius: 20,
    //width: ,
    alignItems: "center",

    marginTop: "10%",
  },
  textEachPopup: {
    fontSize: 16,
    color: "#ffff",
  },
  buttonsAferSet: {
    width: "60%",
    // alignItems:"center"
  },
  arrow: {
    position: "absolute",
    height: "85%",
    left: "5%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  // input: {
  //   width: 200,
  //   height: 40,
  //   borderWidth: 1,
  //   borderColor: "gray",
  //   marginBottom: 10,
  //   paddingHorizontal: 10,
  // },
});

export { LoginScreen, RegisterScreen, LoginAndRegister };
