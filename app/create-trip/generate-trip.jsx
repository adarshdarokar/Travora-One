import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { generateTripPlan } from "../../configs/AiModel";
import { AI_PROMPT } from "../../constants/Options"; // AI prompt template
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";
import { auth, db } from "./../../configs/Firebase";

export default function GenerateTrip() {
  // Context se trip ka data le rahe hain
  const { tripData } = useContext(CreateTripContext);

  // loading state UI ke liye
  const [loading, setLoading] = useState(false);

  // navigation ke liye router
  const router = useRouter();

  // firebase authenticated user
  const user = auth.currentUser;

  // ---------------- AI TRIP GENERATION FUNCTION ----------------
  const GenerativeAiTrip = async () => {
    // agar tripData nahi hai to function stop
    if (!tripData) return;

    setLoading(true);

    // ----------- AI PROMPT CREATE KAR RAHE HAIN -----------
    // template prompt me values replace kar rahe hain
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.locationInfo?.name,
    )
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1)
      .replace("{traveler}", tripData.traveler?.title)
      .replace("{budget}", tripData.budget)
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNight}", tripData.totalNoOfDays - 1);

    // console me final prompt check karne ke liye
    console.log("FINAL PROMPT:", FINAL_PROMPT);

    try {
      // debug ke liye trip data print
      console.log("TRIP DATA:", tripData);

      // ----------- AI MODEL CALL KAR RAHE HAIN -----------
      const tripResp = await generateTripPlan(FINAL_PROMPT);

      console.log("AI TRIP RESPONSE:", tripResp);

      // agar AI response nahi aaya to error throw
      if (!tripResp) {
        throw new Error("Trip generation failed");
      }

      // firestore document id generate
      const docId = Date.now().toString();

      // ----------- DATE SAFE FORMAT ME CONVERT KAR RAHE HAIN -----------
      // firestore me moment object nahi chal sakta
      const safeTripData = {
        ...tripData,
        StartDate: tripData?.StartDate
          ? new Date(tripData.StartDate).toISOString()
          : null,
        EndDate: tripData?.EndDate
          ? new Date(tripData.EndDate).toISOString()
          : null,
      };

      // ----------- FIRESTORE ME TRIP SAVE KAR RAHE HAIN -----------
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email || "unknown",
        tripData: safeTripData,
        tripPlan: tripResp,
        docId: docId,
      });

      console.log("TRIP SAVED");

      // trip save hone ke baad mytrip page pe redirect
      router.push("/(tabs)/mytrip");
    } catch (error) {
      // agar AI ya firestore me error aaye
      console.log("AI ERROR:", error);
    }

    setLoading(false);
  };

  // ----------- PAGE LOAD HOTE HI AI TRIP GENERATE -----------
  useEffect(() => {
    GenerativeAiTrip();
  }, []);

  // ---------------- UI ----------------
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
