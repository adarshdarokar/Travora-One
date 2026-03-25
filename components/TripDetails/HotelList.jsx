import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect } from "react";
import { GetPhotoRef } from "../../app/services/GooglePlace";
export default function HotelList({ hotelList }) {

  // 🔥 API CALL FUNCTION
  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef("Las Vegas"); // ✅ fixed
    console.log("API DATA:", result);
  };

  // 🔥 CALL ON LOAD
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

      {/* 🔥 HEADER */}
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

      {/* 🔥 LIST */}
      <FlatList
        data={enrichedHotels}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{
            marginRight: 16,
            width: 150,
            backgroundColor: "#fff",
            borderRadius: 18,
            padding: 8,
            borderWidth: 1,
            borderColor: "#eee",
            elevation: 3
          }}>
            
            <Image
              source={require("./../../assets/images/adventure.png")}
              style={{
                width: "100%",
                height: 110,
                borderRadius: 12,
              }}
            />

            <Text style={{
              fontFamily: "OutfitMedium",
              fontSize: 15,
              marginTop: 6,
            }} numberOfLines={2}>
              {item?.name || "Hotel Name"}
            </Text>

            <View style={{
              flexDirection: 'row',
              justifyContent: "space-between",
              marginTop: 6
            }}>
              <Text style={{ fontSize: 13 }}>
                ⭐ {item?.rating || "4.2"}
              </Text>

              <Text style={{ fontSize: 13 }}>
                💵 ${item?.price || "80"}
              </Text>
            </View>

          </View>
        )}
      />
    </View>
  );
}