import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../api/trips";
import { BASE_URL } from "../api";

const ExploreScreen = () => {
  const { data: tripData, isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });
  //   const [tripData, setTripData] = useState([]);

  //   useEffect(() => {
  //     fetchTripData();
  //   }, []);

  //   const fetchTripData = async () => {
  //     try {
  //       const response = await instance.get("/api/trip");
  //       setTripData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching trip data:", error);
  //     }
  //   };\

  const renderTripCard = ({ item }) => (
    <View style={styles.tripCard}>
      <Image
        source={{ uri: `${BASE_URL}/${item.image}` }}
        style={styles.tripImage}
      />
      <View style={styles.tripInfo}>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tripData}
        renderItem={renderTripCard}
        keyExtractor={(item) => item.id}
        style={styles.tripList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  tripList: {
    width: "100%",
  },
  tripCard: {
    width: "100%",
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
});

export default ExploreScreen;
