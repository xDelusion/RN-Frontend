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
  RefreshControl,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "../api/trips";
import { BASE_URL } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { addTrip } from "../api/trips";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import TripDetails from "./TripDetailScreen";

const ExploreScreen = () => {
  const { navigate } = useNavigation();

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
      setModalVisible(false);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });

  const handleAddTrip = () => {
    console.log("CALLING ADD TRIP");
    addTripFunction();
    console.log("CALLING ADD TRIP 2");
  };

  const handleReturnToExploreScreen = () => {
    setModalVisible(false);
  };

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setNewTrip({ ...newTrip, image: result.uri });
      }
    } catch (error) {
      console.log("Error while picking image:", error);
    }
  };

  const handleTripCardPress = (tripId) => {
    navigate("Trip Details", { _id: tripId });
  };

  const renderTripCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleTripCardPress(item._id)}>
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
    </TouchableOpacity>
  );

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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
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

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Trip</Text>
          <Image
            source={{ uri: newTrip.image }}
            style={styles.tripImagePreview}
          />
          <TouchableOpacity
            style={styles.chooseImageButton}
            onPress={handleChooseImage}
          >
            <Text style={styles.chooseImageText}>Choose Image</Text>
          </TouchableOpacity>
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
          <View style={styles.buttonContainer}>
            <Button title="Add Trip" onPress={handleAddTrip} color="#E53935" />
            <Button
              title="Cancel"
              onPress={handleReturnToExploreScreen}
              color="#888"
            />
          </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  tripImagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginTop: 20,
  },
  chooseImageButton: {
    backgroundColor: "#E53935",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  chooseImageText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tripDetailText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ExploreScreen;
