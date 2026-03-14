import moment from 'moment';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/theme';
import UserTripCard from './UserTripCard';

export default function UserTripList({ userTrips }) {

  const LatestTrip = userTrips?.[0]?.tripData;

  return (
   <View>
  <View style={{ marginTop: 20 }}>

    {LatestTrip?.locationInfo?.photoRef ?
      <Image source={{ uri: LatestTrip?.locationInfo?.photoRef }}
       style={{
          width: '100%',
          height: 230,
          resizeMode: 'cover',
          borderRadius: 15
        }}
      
      />
    :
      <Image
        source={require('./../../assets/images/adventure.png')}
        style={{
          width: '100%',
          height: 230,
          resizeMode: 'cover',
          borderRadius: 15
        }}
      />
    }
        <View style={{ marginTop: 10 }}>

          <Text
            style={{
              fontFamily: "OutfitMedium",
              fontSize: 20
            }}
          >
            {userTrips?.[0]?.tripPlan?.location}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5
            }}
          >

            <Text
              style={{
                fontFamily: 'Outfit',
                fontSize: 15,
                color: Colors.GRAY
              }}
            >
              {moment(LatestTrip?.StartDate).format('DD MMM YYYY')}
            </Text>

            <Text
              style={{
                fontFamily: 'Outfit',
                fontSize: 15,
                color: Colors.GRAY
              }}
            >
              🚌{LatestTrip?.traveler?.title}
            </Text>

          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 14,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: Colors.WHITE,
                textAlign: 'center',
                fontFamily: 'OutfitMedium',
                fontSize: 15
              }}
            >
              Your plan
            </Text>
          </TouchableOpacity>

        </View>

        {userTrips?.map((trip, index) => (
      <UserTripCard trip={trip} key={index}/>
        ))}

      </View>
    </View>
  )
}