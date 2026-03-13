import Ionicons from "@expo/vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import UserTripList from "../../components/MyTrips/UserTripList";
import { auth, db } from "./../../configs/Firebase";
import { Colors } from "./../../constants/theme";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Detect logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        GetMyTrips(currentUser);
      }
    });

    return unsubscribe;
  }, []);

 const GetMyTrips = async (currentUser) => {
  try {
    setLoading(true);

    console.log("USER EMAIL:", currentUser.email);

    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", currentUser.email)
    );

    const querySnapshot = await getDocs(q);

    console.log("DOC SIZE:", querySnapshot.size);

    let trips = [];

    querySnapshot.forEach((doc) => {
      console.log("DOC DATA:", doc.data());

      trips.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log("FINAL TRIPS:", trips);

    setUserTrips(trips);
  } catch (error) {
    console.log("ERROR fetching trips:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <View
      style={{
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "OutfitBold",
            fontSize: 33,
          }}
        >
          My Trips
        </Text>

        <Ionicons
          name="add-circle"
          size={35}
          color="black"
          style={{ marginTop: 4 }}
        />
      </View>

      {loading && (
        <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
      )}

      {userTrips?.length == 0 ? 
        <StartNewTripCard />
       : 
        <UserTripList userTrips={userTrips} />
      }
    </View>
  );
}