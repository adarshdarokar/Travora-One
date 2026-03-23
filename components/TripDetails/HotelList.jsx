import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function HotelList({ hotelList }) {

  const enrichedHotels = (hotelList || []).map((hotel) => ({
    ...hotel,
    rating: hotel.rating ?? (Math.random() * 1.5 + 3.5).toFixed(1),
    price: hotel.price ?? Math.floor(Math.random() * 100 + 50)
  }));

  return (
    <View style={{ marginTop: 5 }}>

      {/* 🔥 yahi main shift */}

      <Text
        style={{
          fontFamily: "OutfitBold",
          fontSize: 20,
        }}
      >
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        data={enrichedHotels}
        style={{ marginTop: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View
            style={{
              marginRight: 21,
              width: 150,
            }}
          >
            <Image
              source={require("./../../assets/images/adventure.png")}
              style={{
                width: 150,
                height: 110,
                borderRadius: 15,
              }}
            />

            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 16,
                marginTop: 5,
              }}
              numberOfLines={2}
            >
              {item?.name || "Hotel Name"}
            </Text>

            <View style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: "space-between",
              marginTop: 4
            }}>
              <Text>
                {`⭐ ${item?.rating || "4.2"}`}
              </Text>

              <Text>
                {`💵 $${item?.price || "80"}`}
              </Text>
            </View>

          </View>
        )}
      />
    </View>
  );
}