import Constants from "expo-constants";

const API_KEY = Constants.expoConfig.extra.GEO_API_KEY;

export const GetPhotoRef = async (city = "Delhi") => {
  try {
    console.log("KEY:", API_KEY);

    // ✅ Delhi coords (test ke liye)
    const lat = 28.6139;
    const lon = 77.2090;

    const resp = await fetch(
      `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:${lon},${lat},5000&limit=10&apiKey=${API_KEY}`
    );

    const result = await resp.json();

    console.log("RESULT:", result);

    return (result.features || []).map((place) => ({
      name: place.properties.name || "Hotel",
      address: place.properties.formatted,
      lat: place.properties.lat,
      lng: place.properties.lon,
      image: `https://source.unsplash.com/400x300/?hotel,${place.properties.name}`,
    }));

  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};