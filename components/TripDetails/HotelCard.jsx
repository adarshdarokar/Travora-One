import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function HotelCard({ item }) {

  const [imageUrl, setImageUrl] = useState(null);

  const UNSPLASH_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

  useEffect(() => {
    if (item?.name) {
      GetGooglePhotoRef();
    }
  }, [item]);

  const GetGooglePhotoRef = async () => {
    try {
      // 🔥 ADD LOCATION FOR BETTER ACCURACY
      const place = item?.address || "Tokyo";
      const query = `${item.name} ${place} luxury hotel exterior`;

      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_KEY}`
      );

      const data = await res.json();

      setImageUrl(
        data?.urls?.regular ||
        `https://source.unsplash.com/400x300/?hotel,${encodeURIComponent(item.name + " " + place)}`
      );

    } catch (error) {
      setImageUrl(
        `https://source.unsplash.com/400x300/?hotel,${encodeURIComponent(item.name + " " + (item?.address || "Tokyo"))}`
      );
    }
  };

  // 🔥 SMART PRICE FORMAT (NO DOUBLE $)
  const formatPriceValue = (price) => {
    if (!price) return "150";
    if (String(price).includes("$")) return price;
    return `$${price}`;
  };

  const formattedPrice = item?.price2
    ? `${formatPriceValue(item.price)} to ${formatPriceValue(item.price2)}`
    : formatPriceValue(item?.price);

  return (
    <View style={{
      marginRight: 16,
      width: 170,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: "#f1f1f1",
      elevation: 5,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 }
    }}>
      
      <Image
        source={{
          uri:
            imageUrl ||
            `https://source.unsplash.com/400x300/?hotel,${encodeURIComponent((item?.name || "hotel") + " " + (item?.address || "Tokyo"))}`
        }}
        style={{
          width: "100%",
          height: 115,
          borderRadius: 14,
        }}
      />

      <Text
        style={{
          fontFamily: "OutfitMedium",
          fontSize: 15,
          marginTop: 8,
          lineHeight: 18,
          color: "#222",
        }}
        numberOfLines={2}
      >
        {item?.name || "Hotel Name"}
      </Text>

      <Text
        style={{
          fontSize: 13,
          color: "#111",
          fontFamily: "OutfitMedium",
          marginTop: 4
        }}
      >
        {formattedPrice}
      </Text>

      <Text
        style={{
          fontSize: 12.5,
          color: "#777",
          fontFamily: "OutfitRegular",
          marginTop: 4
        }}
      >
        ⭐ {item?.rating || "4.2"}
      </Text>

    </View>
  );
}