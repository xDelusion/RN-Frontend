import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { register, storeToken } from "../api/trips";
import UserContext from "../context/UserContext";

const RegisterScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const { setUser } = useContext(UserContext);

  const { mutate: registerFunction, error } = useMutation({
    mutationFn: () => register({ ...userInfo, profileImage }),
    onSuccess: (data) => {
      storeToken(data.token);
      setUser(true);
      navigation.navigate("Home");
    },
  });

  useEffect(() => {
    // Request permission to access the device's gallery
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.log("Error while picking image:", error);
    }
  };

  //   const handleRegister = () => {
  //     // Implement your register logic here
  //     // For example, you can send the data to your backend server
  //     // and handle the registration process.
  //     // After successful registration, you can navigate to the home screen or login screen.
  //     // navigation.navigate("Home");
  //   };

  return (
    <ImageBackground
      source={require("../assets/RS2.jpg")}
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileImagePlaceholder}>
              Add Profile Image
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleImageUpload}
        >
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, username: value });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, email: value });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          onChangeText={(value) => {
            setUserInfo({ ...userInfo, password: value });
          }}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            registerFunction();
          }}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImagePlaceholder: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "white",
  },
  registerButton: {
    backgroundColor: "#4169E1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  loginLink: {
    marginTop: 16,
  },
  loginLinkText: {
    color: "#4169E1",
    fontSize: 16,
  },
});

export default RegisterScreen;
