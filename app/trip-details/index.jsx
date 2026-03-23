import { useLocalSearchParams, useNavigation } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, StatusBar, Text, View, ScrollView } from "react-native";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import { Colors } from "../../constants/theme";
import PlannnedTrip from "../../components/TripDetails/PlannnedTrip";

export default function Tripdetails() {
  const { trip } = useLocalSearchParams();
  const [Tripdetails, setTripdetails] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const navigation = useNavigation();

  const GEO_API_KEY = "e88f2f7d70774c7da579a6b795af5d5c";
  const UNSPLASH_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      title: "",
    });

    if (!trip) return;

    const parsedTrip = JSON.parse(trip);
    setTripdetails(parsedTrip);

    const location = parsedTrip?.tripPlan?.location || "Tokyo";
    const city = location.split(",")[0];

    const fetchImage = async () => {
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.sights&text=${encodeURIComponent(city)}&limit=5&apiKey=${GEO_API_KEY}`
        );

        const geoData = await geoRes.json();
        const features = geoData?.features || [];

        let placeName =
          features[0]?.properties?.name ||
          features[1]?.properties?.name ||
          city;

        const imgRes = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
            placeName + " " + city + " tourism landmark"
          )}&orientation=landscape&client_id=${UNSPLASH_KEY}`
        );

        const imgData = await imgRes.json();

        setImageUrl(
          imgData?.urls?.regular ||
            `https://source.unsplash.com/1200x500/?${city}`
        );
      } catch (error) {
        setImageUrl(`https://source.unsplash.com/1200x500/?${city}`);
      }
    };

    fetchImage();
  }, []);

  if (!Tripdetails) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }} showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor="transparent" />

      {/* 🔥 HERO IMAGE */}
      <Image
        source={{
          uri: imageUrl || `https://source.unsplash.com/1200x500/?travel`,
        }}
        style={{
          width: "100%",
          height: 300,
        }}
      />

      {/* 🔥 CONTENT */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          marginTop: -45,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 18,
          paddingTop: 18,
        }}
      >
        <Text style={{ fontSize: 22, fontFamily: "OutfitBold" }}>
          {Tripdetails?.tripPlan?.location || "Unknown"}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: Colors.GRAY,
            marginTop: 4,
            fontFamily: "OutfitMedium",
          }}
        >
          {moment(Tripdetails?.tripData?.StartDate).format("DD MMM YYYY")} -{" "}
          {moment(Tripdetails?.tripData?.EndDate).format("DD MMM YYYY")}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: Colors.GRAY,
            fontFamily: "OutfitMedium",
            marginTop: 2,
          }}
        >
          🚌 {Tripdetails?.tripPlan?.traveler?.title || "Just Me"}
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: "#eee",
            marginVertical: 12,
          }}
        />

        <FlightInfo
          flights={Tripdetails?.tripPlan?.flights || []}
          hotels={Tripdetails?.tripPlan?.hotels || []}
        />

        <PlannnedTrip details={Tripdetails?.tripPlan?.itinerary} />
      </View>
    </ScrollView>
  );
}