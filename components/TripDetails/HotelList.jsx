import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function HotelList({ hotelList }) {

  // 🔥 DATA ENRICHMENT (AUTO ADD PRICE + RATING)
  const enrichedHotels = hotelList?.map((hotel, index) => ({
    ...hotel,

    // ⭐ Rating (3.5 - 5)
    rating: hotel.rating ?? (Math.random() * 1.5 + 3.5).toFixed(1),

    // 💲 Price ($50 - $150)
    price: hotel.price ?? Math.floor(Math.random() * 100 + 50)
  }));

  return (
    <View style={{ marginTop: 20 }}>
      
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
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (

          <View
            style={{
              marginRight: 21,
              width: 150,
            }}
          >
            {/* 🖼️ Image */}
            <Image
              source={require("./../../assets/images/adventure.png")}
              style={{
                width: 150,
                height: 110,
                borderRadius: 15,
              }}
            />

            {/* 🏨 Hotel Name */}
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              {item.name || "Hotel Name"}
            </Text>

            {/* ⭐ Rating + 💲 Price */}
        <View style={{ 
  flexDirection:'row',
  alignItems:'center', // 🔥 vertical align
  gap: 40// 🔥 thoda sa gap (React Native >= 0.71)
}}>
  
  <Text>
    ⭐ {item.rating || "4.2"}
  </Text>

  <Text>
    💵 ${item.price || "80"}
  </Text>

</View>
          </View>
        )}
      />
    </View>
  );
}