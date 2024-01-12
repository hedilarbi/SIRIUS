import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import KitNameSlide from "../components/AddKitSlides/KitNameSlide";
import KitPowerSlide from "../components/AddKitSlides/KitPowerSlide";
import KitLocationSlide from "../components/AddKitSlides/KitLocationSlide";

const AddKitScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnimValue] = useState(new Animated.Value(0));
  const route = useRoute();
  const { serialNumber } = route.params;
  useEffect(() => {
    Animated.timing(slideAnimValue, {
      toValue: -width * currentStep,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    Keyboard.dismiss();
    setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    Keyboard.dismiss();
    setCurrentStep(currentStep - 1);
  };
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <KitNameSlide
        width={width}
        slideAnimValue={slideAnimValue}
        handleNext={handleNext}
        setName={setName}
        name={name}
      />
      <KitPowerSlide
        width={width}
        slideAnimValue={slideAnimValue}
        handlePrevious={handlePrevious}
        power={power}
        setPower={setPower}
        serialNumber={serialNumber}
        name={name}
      />
    </SafeAreaView>
  );
};

export default AddKitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",

    flexDirection: "row",
  },
});
