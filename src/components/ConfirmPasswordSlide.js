import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import LinearGradientWrapper from "./LinearGradientWrapper";
import FullLogo from "../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../assets/icons/GoBackIcon.svg";
const ConfirmPasswordSlide = ({
  width,
  slideAnimValue,
  setVerifyPassword,
  verifyPassword,
  handlePrevious,
  updatePassword,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
        <GoBackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <FullLogo height={100} width={250} />
      </View>
      <Text style={styles.title}>Confirmez le mot de passe</Text>
      <View style={{ height: 40 }}>
        <Text
          style={{
            fontFamily: Fonts.QUICKSAND_BOLD,
            fontSize: FontSize.S,
            color: "red",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: Colors.PR,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={showPassword ? false : true}
          onChangeText={(text) => setVerifyPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Entypo name="eye" size={24} color={Colors.PR} />
          ) : (
            <Entypo name="eye-with-line" size={24} color={Colors.PR} />
          )}
        </TouchableOpacity>
      </View>
      <LinearGradientWrapper style={{ marginTop: 32 }}>
        <TouchableOpacity
          style={verifyPassword.length > 0 ? styles.btn : styles.btn_inactive}
          disabled={verifyPassword.length > 0 ? false : true}
          onPress={updatePassword}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
    </Animated.View>
  );
};

export default ConfirmPasswordSlide;

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
  input: {
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    flex: 1,
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
    marginRight: 24,
    marginTop: -4,
  },
});
