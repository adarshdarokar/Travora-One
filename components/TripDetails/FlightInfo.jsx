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
    <View style={{ marginTop: -10 }}> {/* 🔥 thoda upar shift */}

      <View style={{
        backgroundColor: "#f8f9fb",
        borderRadius: 16,
        padding: 12, // 🔥 padding kam kiya
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 10 // 🔥 hotels ke liye space
      }}>

        <Text style={{
          fontFamily: 'OutfitBold',
          fontSize: 17, // 🔥 thoda chota
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
            <Text style={{
              fontFamily: 'OutfitBold',
              fontSize: 14
            }}>
              {airline}
            </Text>

            <Text style={{
              fontFamily: 'Outfit',
              fontSize: 12,
              color: Colors.GRAY,
              marginTop: 1
            }}>
              {price}
            </Text>
          </View>

          <TouchableOpacity style={{
            backgroundColor: Colors.PRIMARY,
            paddingVertical: 5, // 🔥 chota button
            paddingHorizontal: 12,
            borderRadius: 8
          }}>
            <Text style={{
              color: "#fff",
              fontFamily: 'Outfit',
              fontSize: 11
            }}>
              Book
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* 🏨 Hotels */}
      
      <HotelList hotelList={hotels} />

    </View>
  )
}