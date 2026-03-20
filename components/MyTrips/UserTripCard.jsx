import moment from "moment";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

export default function UserTripCard({ trip }) {
  const tripData =
    typeof trip.tripData === "string"
      ? JSON.parse(trip.tripData)
      : trip.tripData;

  const location =
    trip?.tripPlan?.location || tripData?.locationInfo?.name || "Tokyo";

  const [places, setPlaces] = useState([]);

  const GEO_API_KEY = "e88f2f7d70774c7da579a6b795af5d5c";
  const UNSPLASH_KEY = process.env.EXPO_PUBLIC_UNSPLASH_API_KEY;

  const cityCoords = {
    Tokyo: "139.6917,35.6895",
    Paris: "2.3522,48.8566",
    London: "-0.1276,51.5074",
    Dubai: "55.2708,25.2048",
    Delhi: "77.1025,28.7041",
    Amritsar: "74.8723,31.6340",
  };

  useEffect(() => {
    if (!location) return;

    const city = location.split(",")[0];
    const coords = cityCoords[city] || "139.6917,35.6895";

    const fetchPlaces = async () => {
      try {
        const res = await fetch(
          `https://api.geoapify.com/v2/places?categories=tourism.sights&text=${encodeURIComponent(city)}&bias=proximity:${coords}&limit=6&apiKey=${GEO_API_KEY}`,
        );

        const data = await res.json();

        let features = data?.features || [];

        if (features.length === 0) {
          setPlaces([
            {
              name: `${city} Famous Place`,
              image: `https://source.unsplash.com/400x300/?${city}`,
            },
            {
              name: `${city} Tourist Spot`,
              image: `https://source.unsplash.com/400x300/?${city}`,
            },
            {
              name: `${city} Landmark`,
              image: `https://source.unsplash.com/400x300/?${city}`,
            },
            {
              name: `${city} Attraction`,
              image: `https://source.unsplash.com/400x300/?${city}`,
            },
          ]);
          return;
        }

        const result = await Promise.all(
          features.slice(0, 4).map(async (place) => {
            let rawName =
              place?.properties?.name || place?.properties?.formatted || city;

            const isEnglish = /^[a-zA-Z0-9\s.,'-]+$/.test(rawName);
            const fallbackNames = [
              `Central ${city} Park`,
              `${city} Old Town`,
              `${city} Riverside`,
              `${city} Heritage Site`,
              `${city} Cultural Center`,
              `${city} City Square`,
            ];
            const name = isEnglish
              ? rawName
              : fallbackNames[Math.floor(Math.random() * fallbackNames.length)];

            try {
              const imgRes = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(name + " " + city)}&client_id=${UNSPLASH_KEY}`,
              );

              const imgData = await imgRes.json();

              return {
                name,
                image:
                  imgData?.urls?.regular ||
                  `https://source.unsplash.com/400x300/?${name},${city}`,
              };
            } catch {
              return {
                name,
                image: `https://source.unsplash.com/400x300/?${name},${city}`,
              };
            }
          }),
        );

        setPlaces(result);
      } catch (e) {
        console.log("Geoapify error:", e);

        setPlaces([
          {
            name: `${city} Place 1`,
            image: `https://source.unsplash.com/400x300/?${city}`,
          },
          {
            name: `${city} Place 2`,
            image: `https://source.unsplash.com/400x300/?${city}`,
          },
          {
            name: `${city} Place 3`,
            image: `https://source.unsplash.com/400x300/?${city}`,
          },
          {
            name: `${city} Place 4`,
            image: `https://source.unsplash.com/400x300/?${city}`,
          },
        ]);
      }
    };

    fetchPlaces();
  }, [location]);

  const renderCard = (place, index, subtitle1, subtitle2) => (
    <View
      key={index}
      style={{
        marginTop: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri:
            place?.image || `https://source.unsplash.com/400x300/?${location}`,
        }}
        style={{
          width: 100,
          height: 85,
          borderRadius: 11,
          backgroundColor: "#eee",
        }}
      />

      <View>
        <Text style={{ fontFamily: "OutfitMedium", fontSize: 18 }}>
          {place?.name || location}
        </Text>

        <Text style={{ fontSize: 12, color: Colors.GRAY }}>{subtitle1}</Text>

        <Text style={{ fontSize: 12, color: Colors.GRAY }}>{subtitle2}</Text>
      </View>
    </View>
  );

  return (
    <View>
      {renderCard(
        places[0],
        0,
        moment(tripData?.StartDate).format("DD MMM YYYY"),
        "Top tourist place",
      )}

      {renderCard(places[1], 1, `Discover ${location}`, "Must visit place")}

      {renderCard(places[2], 2, "Explore more", "Popular destination")}

      {renderCard(places[3], 3, "Travel hotspot", "Worth visiting")}
    </View>
  );
}
