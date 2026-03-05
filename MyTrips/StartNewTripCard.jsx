import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "../constants/theme";
export default function StartNewTripCard() {
  return (
    <View
      style={{
        padding: 20,
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Entypo
        name="location-pin"
        size={30}
        color="black"
        style={{
          marginBottom: 18,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontFamily: "OutfitMedium",
        }}
      >
        No trips planned yet
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Outfit",
          textAlign: "center",
          color: Colors.GRAY,
          marginTop: 18,
        }}
      >
        Looks like it's time to plan a new {"\n"}travel experience! Get Started
        {"\n"} below.
      </Text>

      <TouchableOpacity
        style={{
          padding: 10,
          marginTop: 18,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: "OutfitMedium",
            fontSize: 15,
          }}
        >
          Start a new trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
