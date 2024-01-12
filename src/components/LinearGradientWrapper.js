import { StyleSheet } from "react-native";
import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants";

const LinearGradientWrapper = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[Colors.PR, Colors.SC]}
      style={[{ width: "100%", borderRadius: 60 }, style]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientWrapper;

const styles = StyleSheet.create({});
