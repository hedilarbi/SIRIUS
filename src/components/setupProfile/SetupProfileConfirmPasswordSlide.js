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
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../../constants";
import Checkbox from "expo-checkbox";
import LinearGradientWrapper from "../LinearGradientWrapper";
import FullLogo from "../../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../../assets/icons/GoBackIcon.svg";

const SetupProfileConfirmPasswordSlide = ({
  width,
  slideAnimValue,
  verifyPassword,
  setVerifyPassword,
  handlePrevious,
  createAccount,
  error,
}) => {
  const [isSelected, setSelection] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        onPress={handlePrevious}
        style={{ alignSelf: "flex-start" }}
      >
        <GoBackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <FullLogo width={250} height={100} />
      </View>
      <Text style={styles.title}>Confirmez le mot de passe</Text>
      <View style={{ height: 42 }}>
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
          marginTop: 16,
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
          style={
            verifyPassword.length > 0 && isSelected
              ? styles.btn
              : styles.btn_inactive
          }
          onPress={createAccount}
          disabled={verifyPassword.length > 0 && isSelected ? false : true}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 36,
          paddingRight: 36,
        }}
      >
        <Checkbox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            flexWrap: "wrap",
            marginTop: 3,
          }}
        >
          <Text style={styles.info_txt}>J’ai lu et accepte</Text>
          <TouchableOpacity
            style={{ marginLeft: -5, marginRight: -5, paddingLeft: 0 }}
          >
            <Text
              style={[
                styles.info_txt,
                { textDecorationLine: "underline", color: Colors.PR },
              ]}
            >
              les conditions d’utilisateur
            </Text>
          </TouchableOpacity>
          <Text style={styles.info_txt}>et</Text>
          <TouchableOpacity style={{ marginLeft: -5 }}>
            <Text
              style={[
                styles.info_txt,
                { textDecorationLine: "underline", color: Colors.PR },
              ]}
            >
              les conditions d’utilisateur
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default SetupProfileConfirmPasswordSlide;

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
    marginRight: 12,
    marginTop: -4,
  },
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.XS,
    marginLeft: 12,
    marginTop: -6,
  },
  checkbox: {
    height: 15,
    width: 15,
    borderColor: Colors.PR,
  },
});
