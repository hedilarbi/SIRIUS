import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import GoBackIcon from "../../../assets/icons/GoBackIcon.svg";

const GoBack = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <GoBackIcon width={25} height={25} />
    </TouchableOpacity>
  );
};

export default GoBack;

const styles = StyleSheet.create({});
