import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import { generateTripPlan } from "../../configs/AiModel";
import { auth, db } from "../../configs/Firebase";
import { AI_PROMPT } from "../../constants/Options";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function GenerateTrip() {

  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  // ---------------- AUTH LISTENER ----------------
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (u) => {

      console.log("AUTH STATE:", u);

      if (u) {
        console.log("USER EMAIL:", u.email);
        setUser(u);
      } else {

        console.log("User not logged in → redirect login");

        router.replace("/auth/sign-in");

      }

    });

    return unsubscribe;

  }, []);

  // ---------------- AI TRIP FUNCTION ----------------
  const GenerativeAiTrip = async () => {

    if (!user || !tripData) return;

    console.log("USER READY:", user.email);
    console.log("TRIP DATA:", tripData);

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", tripData?.locationInfo?.name)
      .replace("{totalDays}", tripData?.totalNoOfDates)
      .replace("{totalNight}", tripData?.totalNoOfDates - 1)
      .replace("{traveler}", tripData?.traveler?.title)
      .replace("{budget}", tripData?.budget);

    console.log("FINAL PROMPT:", FINAL_PROMPT);

    try {

      const tripResp = await generateTripPlan(tripData);

      console.log("AI RESPONSE:", tripResp);

      if (!tripResp) {
        console.log("AI response empty");
        return;
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
        userEmail: user.email,
        tripData: safeTripData,
        tripPlan: tripResp,
        docId: docId,
      });

      console.log("TRIP SAVED WITH EMAIL:", user.email);

      router.push("/(tabs)/mytrip");

    } catch (error) {

      console.log("AI ERROR:", error);

    }

    setLoading(false);

  };

  // ---------------- RUN WHEN USER READY ----------------
  useEffect(() => {

    console.log("USER STATE:", user);
    console.log("TRIPDATA STATE:", tripData);

    if (user && tripData) {
      GenerativeAiTrip();
    }

  }, [user, tripData]);

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