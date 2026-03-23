import { Text, View } from 'react-native';

export default function PlannnedTrip({ details }) {

  return (
    <View style={{ marginTop: 20 }}>

      <Text style={{
        fontSize: 18,
        fontFamily: 'OutfitBold',
        marginBottom: 5
      }}>
        ⛱️ Plan Details
      </Text>

      {details?.slice(0, 2).map((dayItem, index) => {
        return (
          <View key={index}>

            <Text>Day {index + 1}</Text>

            <Text>
              {JSON.stringify(dayItem)}
            </Text>

          </View>
        );
      })}

    </View>
  )
}