import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter,router } from "expo-router";
import { Colors } from "../../constants/theme";
import Entypo from "@expo/vector-icons/Entypo";
import { CreateTripContext } from "../../context/CreateTripContext";
import moment from "moment/moment";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function ReviewTrip() {
  // Navigation hook (header options change करने के लिए)
  const navigation = useNavigation();

  // Context से tripData ले रहे हैं (जिसमें location आदि store है)
  const { tripData, setTripData } = useContext(CreateTripContext);
const router=useRouter()
  // Screen load होते ही header settings apply होंगी
  useEffect(() => {
    navigation.setOptions({
      headerShown: true, // header दिखाना
      headerTranparent: true, // header transparent करना
      headerTitle: "", // header title हटाना
    });
  }, []);

  return (
    // Main container
    <View
      style={{
        padding: 25,
        paddingTop: 15,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      {/* Main Heading */}
      <Text
        style={{
          fontFamily: "OutfitBold",
          fontSize: 30,
        }}
      >
        Review your trip
      </Text>

      {/* Sub section */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        {/* Description text */}
        <Text
          style={{
            fontFamily: "OutfitMedium",
            fontSize: 20,
          }}
        >
          Before generating your trip, please review your selection.
        </Text>

        {/* Destination Row */}
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row", // icon और text side by side
            gap: 12,
          }}
        >
          {/* Location Icon */}
          <Entypo
            style={{
              marginTop: 1,
            }}
            name="location-pin"
            size={34}
            color="black"
          />

          {/* Destination Text Section */}
          <View>
            {/* Label */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Destination
            </Text>

            {/* Selected Location Name from Context */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 15,
              }}
            >
              {tripData?.locationInfo?.name}
            </Text>
          </View>
        </View>

        {/* Destination Row */}
        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row", // icon और text side by side
            gap: 12,
          }}
        >
          {/*  Date selection info */}
          <EvilIcons name="calendar" size={40} color="black" />
          {/* Destination Text Section */}
          <View>
            {/* Label */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Travel Date
            </Text>

            {/* Selected Location Name from Context */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 15,
              }}
            >
              {moment(tripData?.startdate).format("DD MMM") +
                " To " +
                moment(tripData.EndDate).format("DD MMM") +
                "   "}
              ({tripData?.totalNoOfDates} days)
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row", // icon और text side by side
            gap: 12,
          }}
        >
          {/* Location Icon */}
          <FontAwesome6 name="bus" size={28} color="black" />

          {/* Destination Text Section */}
          <View>
            {/* Label */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Who is Traveling
            </Text>

            {/* Selected Location Name from Context */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 15,
              }}
            >
              {tripData?.traveler?.title}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            display: "flex",
            flexDirection: "row", // icon और text side by side
            gap: 12,
          }}
        >
          {/* Location Icon */}
          <MaterialCommunityIcons name="cash-100" size={35} color="black" />

          {/* Destination Text Section */}
          <View>
            {/* Label */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 20,
                color: Colors.GRAY,
              }}
            >
              Budget{" "}
            </Text>

            {/* Selected Location Name from Context */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 15,
              }}
            >
              {tripData?.budget}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={()=>router.push('/create-trip/generate-trip')}
        style={{
          padding: 13,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 13,
          marginTop: 80,
          width: "100%",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "OutfitMedium",
            fontSize: 18,
          }}
        >
          Build my trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}
