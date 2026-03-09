import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter,router } from "expo-router";
import { SelecBudgetOptions } from "../../constants/Options";
import OptionCard from "./../../components/CreateTrip/OptionCard";
import { Colors } from "../../constants/theme";
import { CreateTripContext } from "../../context/CreateTripContext";
export default function Selectbudget() {
  const navigation = useNavigation();
  const [selectedOption, setselectedOption] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router=useRouter()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  useEffect(() => {
    setTripData({
      ...tripData,
      budget: selectedOption?.title,
    });
  }, [selectedOption]);
  const OnClickContinue=()=>{
    if(!selectedOption){
      ToastAndroid.show('Select yout Budget',ToastAndroid.LONG)
      return;

    }
    router.push('')
  }
  return (
    <View
      style={{
        paddingTop: 95,
        padding: 25,
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
        Budget
      </Text>

      <View>
        <Text
          style={{
            fontFamily: "OutfitMedium",
            fontSize: 18,
            marginTop: 24,
          }}
        >
          Choose spending habits for your trip.
        </Text>
        <FlatList
          data={SelecBudgetOptions}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => setselectedOption(item)}
              style={{
                marginVertical: 10,
              }}
            >
              <OptionCard option={item} selectedOption={selectedOption} />
            </TouchableOpacity>
          )}
        />
      </View>
        <TouchableOpacity
        onPress={()=>OnClickContinue()}
          style={{
            padding: 13,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 13,
            marginTop: 23,
            width: "100%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Colors.WHITE,
              fontFamily: "OutfitMedium",
              fontSize: 18,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
    </View>
  );
}
