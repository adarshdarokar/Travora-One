export const SelecTravelerList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "🌍",
    people: 1,
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🍻",
    people: 2,
  },
  {
    id: 3,
    title: "Family",
    desc: "A fun loving adventurous family",
    icon: "🏖️",
    people: "3 to 5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "👾",
    people: 5,
  },
];

export const SelecBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Basic travel, low cost.",
    icon: "💸"
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Comfortable travel, fair cost.",
    icon: "💰"
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium travel experience.",
    icon: "⭐"
  }
];


export const AI_PROMPT = "Generate a detailed travel plan for the location:{location},for {totalDays}day and {totalNight} for a {traveler} with a {Budget}. Include: Flight details, Flight price with booking links, A place to visit nearby with place name, place details, place image URL, geo coordinates, ticket pricing, Time to travel for each location for {totalDays} day and 1 night with each day plan. Return the response strictly in JSON format.";