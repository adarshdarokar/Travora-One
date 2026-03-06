import { View, Text } from "react-native";
import React from "react";
import { Colors } from "./../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { useState } from "react";

export default function mytrip() {
  const [userTrips, setuserTrips] = useState([]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "OutfitBold",
            fontSize: 33,
          }}
        >
          My Trips
        </Text>
        <Ionicons
          name="add-circle"
          size={35}
          color="black"
          style={{
            marginTop: 4,
          }}
        />
      </View>
      {userTrips?.length == 0 ? <StartNewTripCard /> : null}
    </View>
  );
}
