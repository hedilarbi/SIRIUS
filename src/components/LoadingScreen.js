import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants";

const LoadingScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size="large" color={Colors.PR} />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
