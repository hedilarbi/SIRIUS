import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import LinearGradientWrapper from "./LinearGradientWrapper";

const AddDeviceWtihCodeTab = ({
  navigation,
  serialNumber,
  setSerialNumber,
}) => {
  const handleSubmit = () => {
    Keyboard.dismiss();
    navigation.navigate("Device", { serialNumber });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 12 }}>
      <Text style={styles.title}>Entrez le code manuellement</Text>

      <TextInput
        style={styles.input}
        placeholder="Numéro de série"
        onChangeText={(text) => setSerialNumber(text)}
      />
      <LinearGradientWrapper style={{ marginTop: 32 }}>
        <TouchableOpacity
          style={serialNumber.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={handleSubmit}
          disabled={serialNumber.length > 0 ? false : true}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 24,
          paddingRight: 36,
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={32}
          color={Colors.PR}
        />
        <Text style={styles.info_txt}>
          Le numéro de série se trouve directement sur votre appareil.
        </Text>
      </View>
    </View>
  );
};

export default AddDeviceWtihCodeTab;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 32,
    color: Colors.PR,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.PR,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 32,
  },
  btn: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
  },
  btn_inactive: {
    flexDirection: "row",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
  },
  btn_text: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
    marginRight: 12,
    marginTop: -4,
  },
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -2,
  },
});
