import React from "react";
import { Colors } from "@/constants/theme";
import { View, Image, Text, StyleSheet,TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router'

export default function Login() {
  const router= useRouter();
  return (
    <View style={styles.screen}>
      <Image
        source={require("./../assets/images/travora.webp")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.card}>
        <Text style={styles.title}>AI Travel Planner</Text>

        <Text style={styles.description}>
          Discover your next adventure effortlessly. Personalized itineraries at
          your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button}
        onPress={()=>router.push('auth/sign-in')}
        >

          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: 470, // 👈 height control karo
    alignSelf: "center", // 👈 thodi badi
  },

  card: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    marginTop: -35, // 👈 smooth overlap
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 22, // 👈 kam spacing
  },

  title: {
    fontSize: 22,
    fontFamily: "OutfitBold",
    textAlign: "center",
  },

  description: {
    fontFamily: "Outfit",
    fontSize: 14,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 18, // 👈 kam gap
    lineHeight: 20,
  },

  button: {
    marginTop: "20%", // 👈 thoda upar
    height: 50,
    width: "88%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    elevation: 4,
  },

  buttonText: {
    color: Colors.WHITE,
    fontFamily: "OutfitMedium",
    fontSize: 16,
  },
});
