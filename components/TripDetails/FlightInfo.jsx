import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from "../../constants/theme";
import HotelList from './HotelList';

export default function FlightInfo({ flights, hotels }) {

  const flight = flights?.[0];

  const airline =
    flight?.flight_number?.startsWith("AA")
      ? "American Airlines"
      : flight?.flight_number?.startsWith("DL")
      ? "Delta Airlines"
      : "Indigo";

  const price = flight?.price || "$100-$200 (approx.)";

 return (
  <View style={{ marginTop: -10 }}>

    <View style={{
      backgroundColor: "#f8f9fb",
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: "#eee",
      marginBottom: 10
    }}>

      <Text style={{
        fontFamily: 'OutfitBold',
        fontSize: 17,
        marginBottom: 4 
      }}>
        ✈️ Flights
      </Text>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>

        <View>
          <Text>{airline}</Text>
          <Text>{price}</Text>
        </View>

        <TouchableOpacity>
          <Text>Book</Text>
        </TouchableOpacity>

      </View>

    </View>

    <HotelList hotelList={hotels} />

  </View>
);
}