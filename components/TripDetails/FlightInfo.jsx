import { Text, TouchableOpacity, View } from 'react-native'
import { Colors } from "../../constants/theme";

export default function FlightInfo({ flights }) {

  const flight = flights?.[0];

  const airline =
    flight?.flight_number?.startsWith("AA")
      ? "American Airlines"
      : flight?.flight_number?.startsWith("DL")
      ? "Delta Airlines"
      : "Indigo";

  const price = flight?.price || "$100-$200 (approx.)";

  return (
    <View style={{ marginTop: 0 }}> {/* 🔥 ZERO GAP */}

      <View style={{
        backgroundColor: "#f8f9fb",
        borderRadius: 18,
        padding: 15,
        borderWidth: 1,
        borderColor: "#eee"
      }}>

        {/* Title */}
        <Text style={{
          fontFamily: 'OutfitBold',
          fontSize: 19,
          marginBottom: 5 
        }}>
          ✈️ Flights
        </Text>

        {/* Row */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          {/* Left */}
          <View>
            <Text style={{
              fontFamily: 'OutfitBold',
              fontSize: 15
            }}>
              {airline}
            </Text>

            <Text style={{
              fontFamily: 'Outfit',
              fontSize: 13,
              color: Colors.GRAY,
              marginTop: 2
            }}>
              {price}
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity style={{
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 7,
            paddingHorizontal: 16,
            borderRadius: 10
          }}>
            <Text style={{
              color: "#fff",
              fontFamily: 'Outfit',
              fontSize: 12
            }}>
              Book
            </Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>
  )
}