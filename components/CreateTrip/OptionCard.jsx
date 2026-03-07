import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/theme";

export default function OptionCard({ option, selectedTraveler }) {
  return (
    <View
      style={[
        {
          padding: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Colors.Light_GRAY,
          borderRadius: 15,
          marginTop: 10,
        },
        selectedTraveler?.id == option?.id && { borderWidth: 1 },
      ]}
    >
      <View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OutfitBold",
          }}
        >
          {option.title}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontFamily: "Outfit",
            color: Colors.GRAY,
            marginTop: 4,
          }}
        >
          {option?.desc}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 30,
        }}
      >
        {option.icon}
      </Text>
    </View>
  );
}
