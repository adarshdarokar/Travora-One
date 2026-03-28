import { Text, View } from 'react-native';
import PlaceCard from './PlaceCard';

export default function PlannnedTrip({ details }) {

  return (
    <View style={{ 
      marginTop: 10,
      backgroundColor: "#f8f9fb",
      padding: 10,
      borderRadius: 15
    }}>

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'OutfitBold',
          marginRight: 8
        }}>
          ⛱️ Plan Details
        </Text>

        <View style={{
          flex: 1,
          height: 1,
          backgroundColor: "#ddd"
        }} />
      </View>

      {details?.slice(0, 2).map((dayItem, index) => (
        <PlaceCard key={index} dayItem={dayItem} index={index} />
      ))}

    </View>
  );
}