import { useNavigation, Link } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/theme";
import { SelecTravelerList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveler() {

  // Navigation hook to configure header options
  const navigation = useNavigation();

  // State to store currently selected traveler option
  const [selectedTraveler, setSelectedTraveler] = useState();

  // Global trip data context (shared across create trip screens)
  const { tripData, setTripData } = useContext(CreateTripContext);

  // Ref to track previous tripData for logging changes
  const prevData = useRef(null);

  /**
   * Configure navigation header when screen loads
   */
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  /**
   * Update global tripData when traveler selection changes
   */
  useEffect(() => {
    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler,
      });
    }
  }, [selectedTraveler]);

  /**
   * Debug logger:
   * Logs tripData only when it actually changes
   * Prevents unnecessary console logs
   */
  useEffect(() => {
    const current = JSON.stringify(tripData);

    if (prevData.current !== current) {
      console.log(tripData);
      prevData.current = current;
    }
  }, [tripData]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >

      {/* Screen Title */}
      <Text
        style={{
          fontSize: 30,
          fontFamily: "OutfitBold",
          marginTop: 25,
        }}
      >
        Who's Traveling
      </Text>

      {/* Traveler Selection Section */}
      <View
        style={{
          marginTop: 19,
        }}
      >
        <Text
          style={{
            fontFamily: "OutfitBold",
            fontSize: 20,
          }}
        >
          Choose your travelers
        </Text>

        {/* Traveler Options List */}
        <FlatList
          data={SelecTravelerList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{
                marginVertical: 10,
              }}
            >
              {/* OptionCard component displays traveler UI */}
              <OptionCard
                option={item}
                selectedTraveler={selectedTraveler}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Continue Button → Navigate to date selection screen */}
      <Link href={"/create-trip/search-dates"} asChild>
        <TouchableOpacity
          style={{
            padding: 13,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 13,
            marginTop: 23,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "OutfitMedium",
              fontSize: 18,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}