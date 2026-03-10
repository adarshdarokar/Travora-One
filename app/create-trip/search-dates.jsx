import { useNavigation, useRouter } from "expo-router";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SearchDates() {

  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);

  const { tripData, setTripData } = useContext(CreateTripContext);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onDateChange = (date, type) => {

    if (type === "START_DATE") {
      setStartDate(moment(date));
      setEndDate(null);
    }

    if (type === "END_DATE") {
      setEndDate(moment(date));
    }

  };

  const OnDateSelectionContinue = () => {

    if (!StartDate || !EndDate) {
      ToastAndroid.show(
        "Please select Start and End Date",
        ToastAndroid.LONG
      );
      return;
    }

    const totalNoOfDates = EndDate.diff(StartDate, "days");

    setTripData({
      ...tripData,
      StartDate,
      EndDate,
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

      <Text
        style={{
          fontFamily: "OutfitBold",
          fontSize: 35,
          marginTop: 20,
        }}
      >
        Travel Dates
      </Text>

      <View style={{ marginTop: 40 }}>

      <CalendarPicker
  onDateChange={onDateChange}
  allowRangeSelection={true}
  allowBackwardRangeSelect={true}

  minDate={moment().add(1, "days").toDate()}

  maxRangeDuration={5}

  todayBackgroundColor="transparent"

  selectedRangeStyle={{
    backgroundColor: Colors.PRIMARY,
  }}

  selectedDayTextStyle={{
    color: Colors.WHITE,
  }}
/>

      </View>

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