import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Colors, FontSize, Fonts } from "../../constants";

const WelcomeSlide = ({ width, slideAnimValue, handleNext }) => {
  const navigation = useNavigation();
  return (
    <Animated.View
      style={{
        alignItems: "center",
        width,
        paddingHorizontal: 24,
        paddingVertical: 24,
        transform: [{ translateX: slideAnimValue }],
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start" }}
      >
        <Ionicons name="arrow-undo" size={24} color="black" />
      </TouchableOpacity>

      <Image
        source={require("../../../assets/images/logo.png")}
        style={[styles.image, { width }]}
      />
      <Text style={styles.title}>Merci !</Text>
      <Text style={styles.subtitle}>Votre email est vérifié</Text>

      <TouchableOpacity style={styles.btn} onPress={handleNext}>
        <Text style={styles.btn_text}>Créer mon compte</Text>
        <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WelcomeSlide;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    marginTop: 32,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 32,
    color: Colors.PR,
  },
  subtitle: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.L,
    textAlign: "center",
    marginTop: 16,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: Colors.PR,
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
});
