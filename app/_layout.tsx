import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {

  const [loaded] = useFonts({
    Outfit: require("../assets/font/Outfit-Regular.ttf"),
    OutfitMedium: require("../assets/font/Outfit-Medium.ttf"),
    OutfitBold: require("../assets/font/Outfit-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown:false
      }} />
    </Stack>
  );
}