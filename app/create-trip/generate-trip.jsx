import { GoogleGenAI } from "@google/genai";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { AI_PROMPT } from "../../constants/Options";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";
import { auth, db } from "./../../configs/Firebase";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
});

export default function GenerateTrip() {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const GenerativeAiTrip = async () => {
    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        tripData?.locationInfo?.name,
      )
        .replace("{totalDays}", tripData?.totalNoOfDates)
        .replace("{totalNight}", tripData?.totalNoOfDates - 1)
        .replace("{traveler}", tripData?.traveler?.title)
        .replace("{budget}", tripData?.budget);

      console.log("FINAL PROMPT:", FINAL_PROMPT);

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: FINAL_PROMPT,
      });

      const aiText = result.text;

      console.log("AI RESPONSE:", aiText);

      const tripResp = JSON.parse(aiText);

      const docId = Date.now().toString();

      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user?.email,
        tripPlan: tripResp,
        tripData: tripData,
        id: docId,
      });

      setLoading(false);

      router.push("/(tabs)/mytrip");
    } catch (error) {
      console.log("AI ERROR:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripData) {
      GenerativeAiTrip();
    }
  }, [tripData]);

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
