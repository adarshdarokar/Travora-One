import { Image, Text, View } from "react-native";
import { Colors } from "../../constants/theme";
// import { useContext } from "react";
// import { CreateTripContext } from "../../context/CreateTripContext";

export default function GenerateTrip() {
    // const { tripData, setTripData } = useContext(CreateTripContext);
  
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "OutfitBold",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>

      <Text
        style={{
          fontFamily: "OutfitMedium",
          fontSize: 17,
          textAlign: "center",
          marginTop: 27,
        }}
      >
        We are working to generate your dream trip.
      </Text>

      <Image
        source={require("../../assets/images/PlaneGif.gif")}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
          marginTop: 40,
        }}
      />
      <Text style={{
        fontFamily:'OutfitBold',
        color:Colors.GRAY,
        fontSize:20,
        textAlign:'center',
        marginTop:40
      }}
      >
  [ Do not Go back ]
      </Text>
    </View>
  );
}