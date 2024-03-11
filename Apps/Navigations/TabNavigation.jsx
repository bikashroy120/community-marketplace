import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import ExploreScreen from "../Screen/ExploreScreen";
import AddPostScreen from "../Screen/AddPostScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel: ({ color, size }) => {
            return (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                Home
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={"search"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel: ({ color, size }) => {
            return (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                Explore
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="addpost"
        component={AddPostScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={"camera"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel: ({ color, size }) => {
            return (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                Add Post
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={"person-circle"}
                size={24}
                color={color}
              />
            );
          },
          tabBarLabel: ({ color, size }) => {
            return (
              <Text style={{ color: color, fontSize: 12, marginBottom: 3 }}>
                Profile
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
