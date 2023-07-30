import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTrip, getTripById } from "../api/trips";
import { BASE_URL } from "../api";

import { Ionicons } from "@expo/vector-icons";
import UserContext from "../context/UserContext";

const TripDetails = ({ navigation, route }) => {
  const [showBox, setShowBox] = useState(true);
  const { user } = useContext(UserContext);
  const _id = route.params._id;
  const queryClient = useQueryClient();
  const {
    data: trip,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trip", _id],
    queryFn: () => getTripById(_id),
    onError: (err) => console.log(err),
  });

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteTripFun();
            setShowBox(false);
          },
        },

        {
          text: "No",
        },
      ]
    );
  };

  const { mutate: deleteTripFun } = useMutation({
    mutationFn: () => deleteTrip(_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["trips"]);
      navigation.navigate("Explore");
      alert("Trip deleted successfully!");
    },
  });
  const handleDelete = () => {
    showConfirmDialog();
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !trip) return <Text>Error fetching trip details.</Text>;

  return (
    <View>
      <View style={styles.cardContainer}>
        <Text style={styles.name}>
          {trip.creator ? trip.creator?.username : "Default User"}
        </Text>
        <View style={styles.card}>
          <Image
            source={{ uri: `${BASE_URL}/${trip.tripImage}` }}
            style={styles.image}
          />
          <Text style={styles.title}>{trip.title}</Text>
          <Text style={styles.description}>{trip.description}</Text>

          <View style={styles.buttonsContainer}>
            {trip?.creator?._id === user?._id && (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() =>
                    navigation.navigate("", {
                      _id: trip._id,
                    })
                  }
                >
                  <View style={styles.buttonContent}>
                    <Ionicons name="create-outline" size={18} color="black" />
                    <Text style={styles.buttonText}>Edit</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                >
                  <View style={styles.buttonContent}>
                    {showBox}
                    <Ionicons name="trash-outline" size={18} color="black" />
                    <Text style={styles.buttonText}>Delete</Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 7,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 12,
    borderColor: "black",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 4,
  },

  editButton: {
    marginRight: 4,
    marginLeft: 4,
  },
  deleteButton: {
    marginRight: 4,
    marginLeft: 4,
  },

  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    marginBottom: 30,
  },
  text: {
    fontSize: 30,
  },
});
