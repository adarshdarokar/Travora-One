import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function PlaceCard({ dayItem }) {

  const [imageUrl, setImageUrl] = useState(null);

  const UNSPLASH_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

  const descriptions = [
    "Explore the vibrant streets and enjoy the local vibes.",
    "Discover amazing places and create unforgettable memories.",
    "Experience the culture, food, and beautiful views.",
    "Walk around and enjoy the peaceful environment.",
    "Enjoy sightseeing and capture stunning moments."
  ];

  const getRandomDesc = () => {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getRandomPrice = () => {
    return Math.random() > 0.5 ? 'Free' : `$${Math.floor(Math.random() * 50) + 10}`;
  };

  const getRandomTime = () => {
    return `${Math.floor(Math.random() * 3) + 1} hour`;
  };

  // 🔥 FIX: sirf FIRST place use karo
  const placeName = Array.isArray(dayItem.activities)
    ? dayItem.activities[0]?.location || 'tourist place'
    : 'tourist place';

  useEffect(() => {
    fetchImage();
  }, [placeName]); // 🔥 IMPORTANT

  const fetchImage = async () => {
    try {
      const query = `${placeName} tourist place`;

      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${UNSPLASH_KEY}`
      );

      const data = await res.json();

      if (data?.urls?.regular) {
        setImageUrl(data.urls.regular);
      } else {
        setImageUrl(null);
      }

    } catch (error) {
      setImageUrl(null);
    }
  };

  return (
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 18,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#eee",
      elevation: 3
    }}>

      <Image
        source={{
          uri:
            imageUrl ||
            `https://source.unsplash.com/400x300/?${encodeURIComponent(placeName)}`
        }}
        style={{
          width: '100%',
          height: 130,
          borderRadius: 14,
          marginBottom: 10
        }}
      />

      <Text style={{
        fontFamily: 'OutfitMedium',
        color: '#555',
        marginBottom: 8
      }}>
        {getRandomDesc()}
      </Text>

      <Text style={{ marginBottom: 6 }}>
        <Text style={{ fontFamily: 'OutfitBold' }}>Day: </Text>
        <Text style={{ fontFamily: 'OutfitMedium' }}>
          {dayItem.day}
        </Text>
      </Text>

      <Text style={{ marginBottom: 10 }}>
        <Text style={{ fontFamily: 'OutfitBold' }}>Place: </Text>
        <Text style={{ fontFamily: 'OutfitMedium' }}>
          {placeName}
        </Text>
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 0.5,
        borderColor: '#ddd'
      }}>

        <View>
          <Text style={{ fontFamily: 'OutfitMedium' }}>
            🎟️ {getRandomPrice()}
          </Text>

          <Text style={{ fontFamily: 'OutfitMedium' }}>
            🕒 {getRandomTime()}
          </Text>
        </View>

        <Ionicons name="navigate-circle" size={34} color="black" />

      </View>

    </View>
  );
}