import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";
import LinearGradientWrapper from "./LinearGradientWrapper";
import FullLogo from "../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../assets/icons/GoBackIcon.svg";
const OldPasswordSlide = ({
  width,
  slideAnimValue,
  handleNext,
  oldPassword,
  setOldPassword,
}) => {
  const navigation = useNavigation();
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
        onPress={() => navigation.goBack()}
        style={{ alignSelf: "flex-start" }}
      >
        <GoBackIcon width={25} height={25} />
      </TouchableOpacity>

      <View style={{ marginTop: 24 }}>
        <FullLogo height={100} width={250} />
      </View>
      <Text style={styles.title}>Saisissez votre ancien mot de passe</Text>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 20,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBlockColor: Colors.PR,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={showPassword ? false : true}
          onChangeText={(text) => setOldPassword(text)}
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
          style={oldPassword.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={handleNext}
          disabled={oldPassword.length > 0 ? false : true}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
    </Animated.View>
  );
};

export default OldPasswordSlide;

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
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -2,
  },
});
