import { useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/theme";
import { SelecTravelerList } from "../../constants/Options";
import OptionCard from "../../components/CreateTrip/OptionCard";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setselectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);

  const prevData = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler,
      });
    }
  }, [selectedTraveler]);

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
      <Text
        style={{
          fontSize: 30,
          fontFamily: "OutfitBold",
          marginTop: 25,
        }}
      >
        Who's Traveling
      </Text>

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

        <FlatList
          data={SelecTravelerList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setselectedTraveler(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selectedTraveler={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 13,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 13,
          marginTop: 23,
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
    </View>
  );
}
