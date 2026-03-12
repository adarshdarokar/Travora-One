import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { generateTripPlan } from "../../configs/AiModel";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";
import { auth, db } from "./../../configs/Firebase";

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const GenerativeAiTrip = async () => {
    if (!tripData) return;

    setLoading(true);

    try {
      console.log("TRIP DATA:", tripData);

      const tripResp = await generateTripPlan(tripData);

      console.log("AI TRIP RESPONSE:", tripResp);

      if (!tripResp) {
        throw new Error("Trip generation failed");
      }

      const docId = Date.now().toString();

      const safeTripData = {
        ...tripData,
        StartDate: tripData?.StartDate
          ? new Date(tripData.StartDate).toISOString()
          : null,
        EndDate: tripData?.EndDate
          ? new Date(tripData.EndDate).toISOString()
          : null,
      };

      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email || "unknown",
        tripData: safeTripData,
        tripPlan: tripResp,
      });

      console.log("TRIP SAVED");

      router.push("/(tabs)/mytrip");
    } catch (error) {
      console.log("AI ERROR:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    GenerativeAiTrip();
  }, []);

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

      <Text
        style={{
          fontFamily: "OutfitBold",
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        [ Do not Go back ]
      </Text>
    </View>
  );
}
