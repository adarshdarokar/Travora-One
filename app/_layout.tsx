import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { CreateTripContext } from "../context/CreateTripContext";
import { useState } from "react";

export default function RootLayout() {

  const [tripData, setTripData] = useState([]);

  const [loaded] = useFonts({
    Outfit: require("../assets/font/Outfit-Regular.ttf"),
    OutfitMedium: require("../assets/font/Outfit-Medium.ttf"),
    OutfitBold: require("../assets/font/Outfit-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}