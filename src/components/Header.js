import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import GoBack from "./buttons/GoBack";
import Logo from "../../assets/icons/Logo.svg";

const Header = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <GoBack navigation={navigation} />
      <View style={{ alignSelf: "center" }}>
        <Logo width={50} height={50} />
      </View>

      <View style={{ width: 24 }}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
