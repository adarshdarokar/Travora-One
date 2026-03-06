import { useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SearchPlace() {
  const navigation = useNavigation();

  const { tripData, setTripData } = useContext(CreateTripContext);

  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);

  const debounceRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const fetchPlaces = async (text) => {
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(text)}&limit=6`,
      );

      const data = await res.json();

      const results = data.features.map((item, index) => {
        const p = item.properties;

        const fullAddress = [p.name, p.city, p.state, p.country]
          .filter(Boolean)
          .join(", ");

        return {
          id: p.osm_id + "_" + index,
          label: fullAddress,
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0],
        };
      });

      setPlaces(results);
    } catch (err) {
      console.log("Location API error:", err);
    }
  };

  const searchPlace = (text) => {
    setQuery(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.length < 2) {
      setPlaces([]);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchPlaces(text);
    }, 400);
  };

  const fetchDetails = async (place) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${place.lat}&lon=${place.lng}&format=json&addressdetails=1`,
        {
          headers: {
            "User-Agent": "travora-app",
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();

      const details = {
        name: data.name,
        display_name: data.display_name,
        city: data.address.city || data.address.town || data.address.village,
        state: data.address.state,
        country: data.address.country,
        postcode: data.address.postcode,
        lat: data.lat,
        lon: data.lon,
      };

      console.log("Selected Location Details:", details);

      // ⭐ context update (आपके screenshot वाला part)
      setTripData({
        locationInfo: {
          name: details.display_name,
          coordinates: {
            lat: details.lat,
            lng: details.lon,
          },
          url: `https://www.openstreetmap.org/?mlat=${details.lat}&mlon=${details.lon}`,
        },
      });

      navigation.goBack();
    } catch (err) {
      console.log("Details API error:", err);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.label);
    setPlaces([]);

    fetchDetails(item);
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TextInput
        placeholder="Search location"
        value={query}
        onChangeText={searchPlace}
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
        }}
      />

      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text
              style={{
                padding: 12,
                borderBottomWidth: 0.5,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
