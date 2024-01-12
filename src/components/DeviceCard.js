import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import PanelIcon from "../../assets/icons/PanelIcon.svg";
const DeviceCard = ({ name }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 8 }}>
        <PanelIcon width={50} height={50} />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Votre appareil</Text>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity style={styles.delete_btn}>
          <Feather name="trash" size={20} color="white" />
          <Text style={styles.delete_btn_txt}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PR,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: "row",

    marginTop: 24,
  },
  box: {
    marginLeft: 24,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: "white",
  },
  name: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
  },
  delete_btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  delete_btn_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.XS,
    marginLeft: 8,
    marginBottom: 2,
    textDecorationLine: "underline",
    color: "white",
  },
});
