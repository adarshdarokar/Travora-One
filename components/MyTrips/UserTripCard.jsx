import moment from 'moment'
import { Image, Text, View } from 'react-native'
import { Colors } from '../../constants/theme'

export default function UserTripCard({ trip }) {

  const formatData = (data) => {
    if (typeof data === "string") {
      return JSON.parse(data)
    }
    return data
  }

  return (
    <View style={{ 
        
        marginTop:10 ,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    
    }}
    
    >

      <Image
        source={require('./../../assets/images/adventure.png')}
        style={{
          width:100,
          height:85,
          borderRadius:11
        }}
      />

      <View>
        <Text style={{
            fontFamily:'OutfitMedium',
            fontSize:18,

        }}  
        
        >{trip.tripPlan?.location}</Text>

        <Text style={{
            fontFamily:'Oufit',
            fontSize:12,
            color:Colors.GRAY
        }}>
          {moment(formatData(trip.tripData)?.StartDate).format('DD MMM YYYY')}

        </Text>
          <Text  style={{
            fontFamily:'Oufit',
            fontSize:12,
            color:Colors.GRAY 
          }}
          >
      Traveling: {formatData(trip.tripData).traveler.title}

        </Text>
      </View>

    </View>
  )
}