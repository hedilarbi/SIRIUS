import { View, Text, StyleSheet } from "react-native";
import React from "react";
import OnBoarding from "../components/onBoarding/OnBoarding";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoardingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <OnBoarding />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
