export const generateTripPlan = async (tripData) => {
  try {

    const prompt = `
Generate a travel itinerary in JSON format.

Location: ${tripData?.locationInfo?.name}
Total Days: ${tripData?.totalNoOfDates}
Traveler: ${tripData?.traveler?.title}
Budget: ${tripData?.budget}

Return ONLY JSON in this structure:

{
 "location":"",
 "tripPlan":"",
 "duration":"",
 "traveler":"",
 "budget":"",
 "flights":[],
 "hotels":[],
 "itinerary":[]
}
`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("FULL GROQ RESPONSE:", JSON.stringify(data, null, 2));

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!data?.choices?.length) {
      throw new Error("No choices returned");
    }

    let text = data.choices[0].message?.content;

    if (!text) {
      throw new Error("AI returned empty response");
    }

    // markdown remove
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // JSON extract
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON from AI");
    }

    return JSON.parse(jsonMatch[0]);

  } catch (error) {
    console.log("AI ERROR:", error);
    return null;
  }
};