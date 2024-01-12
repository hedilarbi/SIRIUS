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

const KitNameSlide = ({ width, slideAnimValue, handleNext, setName, name }) => {
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
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start" }}
      >
        <Ionicons name="arrow-undo" size={24} color={Colors.PR} />
      </TouchableOpacity>
      <Text style={styles.title}>Donnez un nom au kit</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom du kit"
        onChangeText={(text) => setName(text)}
      />
      <LinearGradientWrapper style={{ marginTop: 46 }}>
        <TouchableOpacity
          style={name.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={handleNext}
          disabled={name.length > 0 ? false : true}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
    </Animated.View>
  );
};

export default KitNameSlide;

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
    borderBottomColor: Colors.PR,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 46,
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
