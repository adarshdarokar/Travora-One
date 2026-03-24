import { Text, View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PlannnedTrip({ details }) {

  const descriptions = [
    "Explore the vibrant streets and enjoy the local vibes.",
    "Discover amazing places and create unforgettable memories.",
    "Experience the culture, food, and beautiful views.",
    "Walk around and enjoy the peaceful environment.",
    "Enjoy sightseeing and capture stunning moments."
  ];

  const getRandomDesc = () => {
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  const getRandomPrice = () => {
    return Math.random() > 0.5 ? 'Free' : `$${Math.floor(Math.random() * 50) + 10}`;
  };

  const getRandomTime = () => {
    return `${Math.floor(Math.random() * 3) + 1} hour`;
  };

  return (
    <View style={{ marginTop: 20 }}>

      <Text style={{
        fontSize: 18,
        fontFamily: 'OutfitBold',
        marginBottom: 10
      }}>
        ⛱️ Plan Details
      </Text>

      {details?.slice(0, 2).map((dayItem, index) => {

        const activities = Array.isArray(dayItem.activities)
          ? dayItem.activities.join(', ')
          : '';

        return (
          <View key={index}>

            <Text style={{
              fontFamily:'OutfitMedium',
              fontSize:20,
              marginTop:15,
              marginBottom:5
            }}>
              Day {index + 1}
            </Text>

            {/* CARD */}
            <View style={{
              backgroundColor: '#fff',
              borderRadius: 18,
              padding: 14,
              marginTop: 6,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 5
            }}>

              <Image
                source={require('../../assets/images/adventure.png')}
                style={{
                  width: '100%',
                  height: 130,
                  borderRadius: 14,
                  marginBottom: 10
                }}
                resizeMode="cover"
              />

              {/* DESCRIPTION */}
              <Text style={{
                fontFamily: 'OutfitMedium',
                color: '#555',
                marginBottom: 8,
                lineHeight: 18   // 🔥 readability fix
              }}>
                {getRandomDesc()}
              </Text>

              {/* DATE */}
              <Text style={{ marginBottom: 6 }}>
                <Text style={{ fontFamily: 'OutfitBold' }}>Date: </Text>
                <Text style={{ fontFamily: 'OutfitMedium' }}>
                  {dayItem.date}
                </Text>
              </Text>

              {/* ACTIVITIES */}
              <Text style={{ marginBottom: 10, lineHeight: 18 }}>
                <Text style={{ fontFamily: 'OutfitBold' }}>Activities: </Text>
                <Text style={{ fontFamily: 'OutfitMedium' }}>
                  {activities}
                </Text>
              </Text>

              {/* BOTTOM */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 8,
                borderTopWidth: 0.5,
                borderColor: '#ddd'
              }}>

                <View>
                  <Text style={{ fontFamily: 'OutfitMedium', marginBottom: 3 }}>
                    🎟️ Ticket Price: <Text style={{ fontFamily: 'OutfitBold' }}>
                      {getRandomPrice()}
                    </Text>
                  </Text>

                  <Text style={{ fontFamily: 'OutfitMedium' }}>
                    🕒 Time to Travel: <Text style={{ fontFamily: 'OutfitBold' }}>
                      {getRandomTime()}
                    </Text>
                  </Text>
                </View>

                <Ionicons name="navigate-circle" size={34} color="black" />

              </View>

            </View>

          </View>
        );
      })}

    </View>
  )
}