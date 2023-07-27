import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLogo from "../components/AppLogo";

import AppHeader from "../components/AppHeader";
import UserContext from "../context/UserContext";
// Import the AppLogo component

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const handleExplorePress = () => {
    navigation.navigate("Explore");
  };

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../assets/eiffel-tower-1.jpg")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        {!user && <AppHeader onPressLogin={handleLoginPress} />}

        {/* App Logo */}
        <AppLogo />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.description}>
            Welcome to our Trips App! Plan your next adventure and explore the
            world with us.
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleExplorePress}
          >
            <Text style={styles.buttonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "white",
  },
  exploreButton: {
    backgroundColor: "#ffa500",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
