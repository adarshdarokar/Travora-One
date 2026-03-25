export const GetPhotoRef = async (city = "Delhi") => {
  try {
    const resp = await fetch(
      `https://api.foursquare.com/v3/places/search?query=hotel&near=${city}&limit=10`,
      {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_FOURSQUARE_API_KEY,
          Accept: "application/json",
        },
      }
    );

    const result = await resp.json();

    console.log("RESULT:", result);

    // 🔥 safe handling
    if (!result || result.error) {
      console.log("API ERROR:", result);
      return [];
    }

    // 🔥 clean format
    return (result.results || []).map((place) => ({
      name: place.name,
      address: place.location?.formatted_address,
      lat: place.geocodes?.main?.latitude,
      lng: place.geocodes?.main?.longitude,
      image: `https://source.unsplash.com/400x300/?hotel,${place.name}`,
    }));

  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};
