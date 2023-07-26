import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login, storeToken } from "../api/trips";
import UserContext from "../context/UserContext";

const LoginScreen = ({ navigation }) => {
  const [userInfo, setuserInfo] = useState({});
  const { setUser } = useContext(UserContext);
  const {
    mutate: loginFunction,
    error,
    isLoading,
  } = useMutation({
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      console.log(data);
      storeToken(data.token);
      setUser(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleRegisterPress = () => {
    navigation.navigate("Register"); // Navigate to the "Register" screen
  };

  return (
    <ImageBackground
      source={require("../assets/nyc.jpg")} // Replace with your image path
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Text style={styles.logo}>YourLogo</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(value) => {
            setuserInfo({ ...userInfo, username: value });
          }}
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          onChangeText={(value) => {
            setuserInfo({ ...userInfo, password: value });
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            loginFunction();
          }}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Register Here Link */}

        <TouchableOpacity
          onPress={() => {
            handleRegisterPress();
          }}
        >
          <Text style={styles.registerLink}>
            Don't have an account?
            <Text style={styles.registerText}>Register here</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#ffa500",
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "white",
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: "#ffa500",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerLink: {
    marginTop: 16,
    color: "#aaa",
    fontSize: 16,
  },
  registerText: {
    color: "#ffa500",
    fontWeight: "bold",
  },
});

export default LoginScreen;
