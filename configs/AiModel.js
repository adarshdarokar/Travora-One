import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
});

export const generateTripPlan = async (tripData) => {
  try {

    const prompt = `
Generate a detailed travel itinerary.

Location: ${tripData.locationInfo.name}
Total Days: ${tripData.totalNoOfDates}
Total Nights: ${tripData.totalNoOfDates - 1}
Traveler Type: ${tripData.traveler.title}
Budget: ${tripData.budget}

STRICT RULES:
- Return ONLY valid JSON.
- No explanation.
- No markdown.
- Response must start with { and end with }.

JSON FORMAT:

{
  "location": "",
  "duration": "",
  "traveler": "",
  "budget": "",
  "flights": [
    {
      "airline": "",
      "departure": "",
      "arrival": "",
      "price": "",
      "booking_url": ""
    }
  ],
  "hotels": [
    {
      "name": "",
      "address": "",
      "price_per_night": "",
      "rating": "",
      "image_url": "",
      "geo_coordinates": {
        "lat": "",
        "lng": ""
      },
      "description": ""
    }
  ],
  "itinerary": [
    {
      "day": "",
      "places": [
        {
          "place_name": "",
          "details": "",
          "image_url": "",
          "ticket_price": "",
          "travel_time": "",
          "geo_coordinates": {
            "lat": "",
            "lng": ""
          }
        }
      ]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("AI RAW RESPONSE:", text);

    const jsonData = JSON.parse(text);

    return jsonData;

  } catch (error) {
    console.log("AI Trip Generation Error:", error);
  }
};