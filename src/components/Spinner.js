import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import React from "react";
import { Colors } from "../constants";

const Spinner = () => {
  return (
    <View style={styles.spinner_box}>
      <ActivityIndicator size="large" color={Colors.PR} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner_box: {
    zIndex: 10,
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignContent: "center",
  },
});
