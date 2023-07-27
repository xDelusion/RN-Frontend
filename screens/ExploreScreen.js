import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../api/trips";
import { BASE_URL } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { addTrip } from "../api/trips";

const ExploreScreen = ({ navigation }) => {
  const {
    data: tripData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => getAllTrips(),
  });
  const [newTrip, setNewTrip] = useState({
    image: "",
    title: "",
    description: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const { mutate: addTripFunction, error } = useMutation({
    mutationFn: () => {
      console.log("CALLING 3");
      return addTrip(newTrip);
    },
    onSuccess: (data) => {
      console.log("DONE", data);
      refetch();
      navigation.navigate("Explore");
      setModalVisible(false);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  const handleAddTrip = () => {
    // Code to handle adding a new trip
    // For example, you can send the new trip data to the backend API
    // and then update the tripData state with the new trip
    // After adding the trip, close the modal
    console.log("CALLING ADD TRIP");
    addTripFunction();
    console.log("CALLING ADD TRIP 2");
  };

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

  // Add the empty card as the first item in the data array
  const tripDataWithEmptyCard = tripData
    ? [
        {
          id: "emptyCard",
          image: "",
          title: "",
          description: "",
        },
        ...tripData,
      ]
    : [{ id: "emptyCard", image: "", title: "", description: "" }];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tripDataWithEmptyCard}
        renderItem={({ item }) =>
          item.id === "emptyCard" ? (
            <TouchableOpacity
              style={styles.emptyCard}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.plusSign}>+</Text>
            </TouchableOpacity>
          ) : (
            renderTripCard({ item })
          )
        }
        keyExtractor={(item) => item.id}
        style={styles.tripList}
      />

      {/* Modal for Adding New Trip */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Image URL"
            style={styles.input}
            value={newTrip.image}
            onChangeText={(text) => setNewTrip({ ...newTrip, image: text })}
          />
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={newTrip.title}
            onChangeText={(text) => setNewTrip({ ...newTrip, title: text })}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={newTrip.description}
            onChangeText={(text) =>
              setNewTrip({ ...newTrip, description: text })
            }
          />
          <Button title="Add Trip" onPress={handleAddTrip} />
        </View>
      </Modal>
    </SafeAreaView>
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
  emptyCard: {
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  plusSign: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
  },
});

export default ExploreScreen;
