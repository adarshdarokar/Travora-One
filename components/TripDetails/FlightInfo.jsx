import { Text, View } from 'react-native'

export default function FlightInfo({ flights }) {

  console.log("FLIGHTS DATA:", flights)

  // 🔥 first flight lo
  const flight = flights?.[0]

  // 🔥 airline detect (flight number se)
  const airline =
    flight?.flight_number?.startsWith("AA")
      ? "American Airlines"
      : "Delta"

  // 🔥 price fallback
  const price = flight?.price || "$100-$200 (approx.)"

  return (
    <View style={{ marginTop: 20 }}>

      <Text style={{
        fontFamily: 'OutfitBold',
        fontSize: 20
      }}>
        ✈️ Flights
      </Text>

      <Text style={{ marginTop: 5 }}>
        Airline: {airline}
      </Text>

      <Text style={{ marginTop: 3 }}>
        Price: {price}
      </Text>

    </View>
  )
}