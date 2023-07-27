import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AppLogo = () => {
  return (
    <SafeAreaView style={styles.logoContainer}>
      <Image
        source={require("../assets/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  logo: {
    width: 60,
    height: 100,
    marginVertical: -35,
  },
});

export default AppLogo;
