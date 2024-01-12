import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

import { FontSize, Fonts } from "../../constants";

const SuccesModal = ({ visiblity, message }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visiblity}>
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          marginTop: 16,
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Entypo name="check" size={30} color="white" />
          <Text style={styles.error_text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccesModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1,
  },
  error_text: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    marginLeft: 12,
    flexWrap: "wrap",
    color: "white",
  },
});
