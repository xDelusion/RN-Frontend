import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AppHeader = ({ onPressLogin }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Login button */}
      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
        <Ionicons name="log-in" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 16,
  },
  logoContainer: {
    paddingRight: "25%",
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    color: "#ffa500",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffa500",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginLeft: 260,
    marginTop: 10,
    borderRadius: 8,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 4,
  },
});

export default AppHeader;
