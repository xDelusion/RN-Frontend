import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getMe, logOut } from "../api/trips";
import UserContext from "../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../api";

const TripCard = ({ trip }) => {
  return (
    <TouchableOpacity style={styles.tripCard}>
      <Image
        source={{ uri: `${BASE_URL}/${trip.image}` }}
        style={styles.tripImage}
      />
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{trip.title}</Text>
        <Text style={styles.tripDescription}>{trip.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      console.log("first");
      return getMe();
    },
  });

  console.log(data, isFetching);
  const profileData = {
    profileImage: data?.profileImage || "https://example.com/profile.jpg", // Replace with your profile image URI
    username: data?.username || "JohnDoe",
    email: data?.email || "johndoe@example.com",
    trips: data?.trips || [
      {
        _id: "1",
        title: "Trip 1",
        description: "This is Trip 1 description.",
        image: "https://example.com/trip1.jpg",
      },
      {
        _id: "2",
        title: "Trip 2",
        description: "This is Trip 2 description.",
        image: "https://example.com/trip2.jpg",
      },
      {
        _id: "3",
        title: "Trip 3",
        description: "This is Trip 3 description.",
        image: "https://example.com/trip3.jpg",
      },
      // Add more trips data as needed
    ],
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user session or token, reset state, etc.

    // After logout, navigate to the home screen
    logOut();
    setUser(false);

    navigation.navigate("Home");
  };

  const renderTripItem = ({ item }) => {
    return <TripCard trip={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Profile Image */}
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
        />

        {/* Username */}
        <Text style={styles.username}>{profileData.username}</Text>

        {/* Email */}
        <Text style={styles.email}>{profileData.email}</Text>

        {/* List of Trips */}
        <FlatList
          data={profileData.trips}
          renderItem={renderTripItem}
          keyExtractor={(item) => item._id}
          style={styles.tripList}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetch()}
            />
          }
        />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F8F8",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    marginTop: 25,
    marginLeft: 100,
    borderWidth: 5,
    borderColor: "#E53935",
  },
  username: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 120,
    color: "#E53935",
  },
  email: {
    fontSize: 20,
    marginBottom: 16,
    marginLeft: 85,
    color: "#888",
  },
  tripList: {
    flex: 1,
    width: "100%",
  },
  tripCard: {
    width: 350,
    backgroundColor: "#fff",
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tripImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tripInfo: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E53935",
  },
  tripDescription: {
    fontSize: 14,
    color: "#888",
  },
  logoutButton: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
