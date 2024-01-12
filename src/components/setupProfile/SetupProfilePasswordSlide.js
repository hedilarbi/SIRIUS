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
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";

import LinearGradientWrapper from "../LinearGradientWrapper";
import { Colors, FontSize, Fonts } from "../../constants";
import FullLogo from "../../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../../assets/icons/GoBackIcon.svg";

const SetupProfilePasswordSlide = ({
  width,
  slideAnimValue,
  handleNext,
  handlePrevious,
  setPassword,
  password,
}) => {
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
      <Text style={styles.title}>Choisissez un mot de passe</Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 32,
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: Colors.PR,
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={showPassword ? false : true}
          onChangeText={(text) => setPassword(text)}
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
          style={password.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={handleNext}
          disabled={password.length > 0 ? false : true}
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
          Choisissez votre mot de passe. Vous pourrez toujours le modifier plus
          tard si vous l’oubliez !
        </Text>
      </View>
    </Animated.View>
  );
};

export default SetupProfilePasswordSlide;

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
  btn_text: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.M,
    color: "white",
    marginRight: 12,
    marginTop: -4,
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
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -2,
  },
});
