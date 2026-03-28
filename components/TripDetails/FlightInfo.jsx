import { Text, TouchableOpacity, View } from 'react-native';
import HotelList from './HotelList';

export default function FlightInfo({ flights, hotels }) {

  const flight = flights?.[0];

  const airline =
    flight?.flight_number?.startsWith("AA")
      ? "American Airlines"
      : flight?.flight_number?.startsWith("DL")
      ? "Delta Airlines"
      : "Indigo";

  const price = flight?.price || "$100-$200";

  return (
    <View style={{ marginTop: -10 }}>

      <View style={{
        backgroundColor: "#f8f9fb",
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 }
      }}>

        <Text style={{
          fontFamily: 'OutfitBold',
          fontSize: 17,
          marginBottom: 8,
          color: "#111"
        }}>
          ✈️ Flights
        </Text>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>

          <View>
            <Text style={{
              fontFamily: "OutfitMedium",
              fontSize: 14,
              color: "#222"
            }}>
              {airline}
            </Text>

            <Text style={{
              fontFamily: "OutfitRegular",
              fontSize: 13,
              color: "#666",
              marginTop: 2
            }}>
              {price}
            </Text>
          </View>

          {/* 🔥 PREMIUM BUTTON */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: "#111",
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 999,
              elevation: 3,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 }
            }}
          >
            <Text style={{
              color: "#fff",
              fontFamily: "OutfitMedium",
              fontSize: 13
            }}>
              Book Now
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      <HotelList hotelList={hotels} />

    </View>
  );
}