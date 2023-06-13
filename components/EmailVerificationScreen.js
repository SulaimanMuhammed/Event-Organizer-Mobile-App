import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { authLog } from "../Firebase";

const EmailVerificationScreen = ({ route, navigation }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");

  const { email } = route.params;

  const handleVerifyEmail = async () => {
    try {
      await authLog.applyActionCode(verificationCode);
      // Email verification successful
      navigation.navigate("Login"); // Redirect to the login screen
    } catch (error) {
      console.error("Email verification error:", error);
      setVerificationError("Invalid verification code");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <Text style={styles.description}>
        An email with a verification code has been sent to: {email}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      {verificationError ? (
        <Text style={styles.errorText}>{verificationError}</Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleVerifyEmail}>
        <Text style={styles.buttonText}>Verify Email</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmailVerificationScreen;
