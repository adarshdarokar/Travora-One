import { router, useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../../constants/theme";
import moment from "moment/moment";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SearchDates() {
  // State to store selected start and end dates
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);

  // Global trip data context (shared across create-trip flow)
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();
  // Configure navigation header when screen loads
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  /**
   * Handles date selection from CalendarPicker
   * CalendarPicker sends:
   * - START_DATE when first date is selected
   * - END_DATE when second date is selected
   */
  const onDateChange = (date, type) => {
    console.log(date, type);

    if (type == "START_DATE") {
      // Store selected start date using moment
      setStartDate(moment(date));
    } else {
      // Store selected end date using moment
      setEndDate(moment(date));
    }
  };

  /**
   * Triggered when user presses Continue button
   * Validates date selection and calculates trip duration
   */
  const OnDateSelectionContinue = () => {
    // Prevent continue if dates are not selected
    if (!StartDate || !EndDate) {
      ToastAndroid.show("Please select Start and End Date", ToastAndroid.LONG);
      return;
    }

    // Calculate number of days between start and end date
    const totalNoOfDates = EndDate.diff(StartDate, "days");

    // +1 because travel days include both start and end date
    console.log(totalNoOfDates + 1);

    /**
     * Save selected dates and trip duration
     * into global tripData context
     */
    setTripData({
      ...tripData,
      StartDate: StartDate,
      EndDate: EndDate,
      totalNoOfDates: totalNoOfDates + 1,
    });
    router.push("/create-trip/Select-budget");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      {/* Screen Title */}
      <Text
        style={{
          fontFamily: "OutfitBold",
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>

      {/* Calendar Section */}
      <View
        style={{
          marginTop: 40,
        }}
      >
        <CalendarPicker
          onDateChange={onDateChange} // date selection handler
          allowRangeSelection={true} // enable start + end date selection
          minDate={new Date()} // prevent selecting past dates
          maxRangeDuration={5} // maximum trip duration = 5 days
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextStyle={{
            color: Colors.WHITE,
          }}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={OnDateSelectionContinue}
        style={{
          padding: 12,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 13,
          marginTop: 29,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontSize: 19,
            fontFamily: "OutfitBold",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
