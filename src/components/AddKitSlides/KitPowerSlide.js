import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../../constants";
import LinearGradientWrapper from "../LinearGradientWrapper";

const KitPowerSlide = ({
  width,
  slideAnimValue,
  serialNumber,
  handlePrevious,
  power,
  setPower,
  name,
}) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      style={{
        alignItems: "center",
        width,
        paddingHorizontal: 24,
        paddingVertical: 12,
        transform: [{ translateX: slideAnimValue }],
      }}
    >
      <TouchableOpacity
        onPress={handlePrevious}
        style={{ alignSelf: "flex-start" }}
      >
        <Ionicons name="arrow-undo" size={24} color={Colors.PR} />
      </TouchableOpacity>

      <Text style={styles.title}>Puissance du kit (en W)</Text>

      <TextInput
        style={styles.input}
        placeholder="000"
        keyboardType="numeric"
        onChangeText={(text) => setPower(text)}
      />
      <LinearGradientWrapper style={{ marginTop: 46 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("KitLocation", { serialNumber, name, power })
          }
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
    </Animated.View>
  );
};

export default KitPowerSlide;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 84,
    color: Colors.PR,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 46,
    borderBottomColor: Colors.PR,
  },
  btn: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
  },
  btn_text: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.M,
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
