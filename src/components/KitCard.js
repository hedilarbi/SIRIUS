import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";

const KitCard = ({ name, powerStationGuid }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Kit", { name, powerStationGuid })}
    >
      <Text style={styles.name}>{name}</Text>
      <AntDesign name="arrowright" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default KitCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PR,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  name: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    marginBottom: 4,
    color: "white",
  },
});
