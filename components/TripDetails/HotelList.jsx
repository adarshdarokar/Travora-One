import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { GetPhotoRef } from "../../app/services/GooglePlace";
import HotelCard from "../../components/TripDetails/HotelCard";

export default function HotelList({ hotelList }) {

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef("Las Vegas");
    console.log("API DATA:", result);
  };

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const enrichedHotels = (hotelList || []).map((hotel) => ({
    ...hotel,
    rating: hotel.rating ?? (Math.random() * 1.5 + 3.5).toFixed(1),
    price: hotel.price ?? Math.floor(Math.random() * 100 + 50)
  }));

  return (
    <View style={{ 
      marginTop: 10,
      backgroundColor: "#f8f9fb",
      padding: 10,
      borderRadius: 15
    }}>

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
      }}>
        <Text style={{
          fontFamily: "OutfitBold",
          fontSize: 20,
          marginRight: 8
        }}>
          🏨 Hotel Recommendation
        </Text>

        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: "#ddd"
        }} />
      </View>

      <FlatList
        data={enrichedHotels}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <HotelCard item={item} />
        )}
      />

    </View>
  );
}
