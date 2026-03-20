import { useLocalSearchParams, useNavigation } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import { Colors } from "../../constants/theme";

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

    const parsedTrip = JSON.parse(trip);
    setTripdetails(parsedTrip);

    const location = parsedTrip?.tripPlan?.location || "Tokyo";
    const city = location.split(",")[0];

    const fetchImage = async () => {
      try {
        const geoRes = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.sights&text=${encodeURIComponent(city)}&limit=5&apiKey=${GEO_API_KEY}`,
        );

        const geoData = await geoRes.json();
        const features = geoData?.features || [];

        let placeName =
          features[0]?.properties?.name ||
          features[1]?.properties?.name ||
          city;

        const imgRes = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(placeName + " " + city + " landmark tourism")}&orientation=landscape&client_id=${UNSPLASH_KEY}`,
        );

        const imgData = await imgRes.json();

        setImageUrl(
          imgData?.urls?.regular ||
            `https://source.unsplash.com/1200x500/?${city}`,
        );
      } catch (error) {
        console.log("Image error:", error);
        setImageUrl(`https://source.unsplash.com/1200x500/?${city}`);
      }
    };

    fetchImage();
  }, []);

  return (
    Tripdetails && (
      <View>
        {/* 🔥 TOP IMAGE */}
        <Image
          source={{
            uri: imageUrl || `https://source.unsplash.com/1200x500/?travel`,
          }}
          style={{
            width: "100%",
            height: 350,
          }}
        />

        {/* 🔥 CONTENT */}
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            height: "100%",
            marginTop: -40,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          {/* 📍 LOCATION */}
          <Text
            style={{
              fontSize: 25,
              fontFamily: "OutfitBold",
            }}
          >
            {Tripdetails?.tripPlan?.location}
          </Text>

          {/* 📅 DATE RANGE */}
          <Text
            style={{
              fontSize: 15,
              color: Colors.GRAY,
              marginTop: 5,
              fontFamily: "OutfitMedium",
            }}
          >
            {moment(Tripdetails?.tripData?.StartDate).format("DD MMM YYYY")} -{" "}
            {moment(Tripdetails?.tripData?.EndDate).format("DD MMM YYYY")}
          </Text>

          {/* 👤 TRAVELER */}
          <Text
            style={{
              fontSize: 15,
              color: Colors.GRAY,
              fontFamily: "OutfitMedium",
              marginTop: 3,
            }}
          >
            🚌  {Tripdetails?.tripPlan?.traveler?.title || "Just Me"}
          </Text>
          
<FlightInfo flights={Tripdetails?.tripPlan?.flights} />   
     </View>


      </View>
    )
  );
}
