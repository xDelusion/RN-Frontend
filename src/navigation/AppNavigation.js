import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Home from "../screen/Home";
import Explore from "../screen/Explore";
import Profile from "../screen/Profile";

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator options={{}}>
      <Tab.Screen
        name={"home"}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={"exlore"}
        component={Explore}
        options={{
          title: "exp",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"profile"}
        component={Profile}
        options={{
          title: "exp",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircleo" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
