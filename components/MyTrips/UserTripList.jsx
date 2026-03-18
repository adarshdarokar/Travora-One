import moment from 'moment';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Colors } from '../../constants/theme';
import UserTripCard from './UserTripCard';

export default function UserTripList({ userTrips }) {

  const LatestTrip = userTrips?.[0]?.tripData;
  const location = userTrips?.[0]?.tripPlan?.location;

  const [imageUrl, setImageUrl] = useState(null);

  const API_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

  useEffect(() => {
    if (!location) return;

    const city = location.split(",")[0];

    const keywords = [
      "famous landmark",
      "city skyline",
      "tourist attraction",
      "city aerial view",
      "city night skyline"
    ];

    const randomKeyword =
      keywords[Math.floor(Math.random() * keywords.length)];

    const fetchImage = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${city} ${randomKeyword}&orientation=landscape&client_id=${API_KEY}`
        );

        const data = await res.json();

        if (data?.urls?.regular) {
          setImageUrl(data.urls.regular);
        }
      } catch (error) {
        console.log("Image fetch error:", error);
      }
    };

    fetchImage();
  }, [location]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <View>
        <View style={{ marginTop: 20 }}>

          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: '100%',
                height: 230,
                resizeMode: 'cover',
                borderRadius: 15
              }}
            />
          ) : (
            <Image
              source={require('./../../assets/images/adventure.png')}
              style={{
                width: '100%',
                height: 230,
                resizeMode: 'cover',
                borderRadius: 15
              }}
            />
          )}

          <View style={{ marginTop: 10 }}>
            
            <Text
              style={{
                fontFamily: "OutfitMedium",
                fontSize: 20
              }}
            >
              {location}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5
              }}
            >

              <Text
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 15,
                  color: Colors.GRAY
                }}
              >
                {moment(LatestTrip?.StartDate).format('DD MMM YYYY')}
              </Text>

              <Text
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 15,
                  color: Colors.GRAY
                }}
              >
                🚌 {LatestTrip?.traveler?.title}
              </Text>

            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.PRIMARY,
                padding: 14,
                borderRadius: 15,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color: Colors.WHITE,
                  textAlign: 'center',
                  fontFamily: 'OutfitMedium',
                  fontSize: 15
                }}
              >
                Your plan
              </Text>
            </TouchableOpacity>

          </View>

        {userTrips?.length > 0 && (
  <UserTripCard trip={userTrips[0]} />
)}

        </View>
      </View>
    </ScrollView>
  )
}