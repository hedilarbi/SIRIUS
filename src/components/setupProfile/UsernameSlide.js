import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../../constants";
import LinearGradientWrapper from "../LinearGradientWrapper";
import FullLogo from "../../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../../assets/icons/GoBackIcon.svg";

const UsernameSlide = ({
  width,
  slideAnimValue,
  handleNext,
  setUsername,
  username,
}) => {
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
        <GoBackIcon width={25} height={25} />
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <FullLogo width={250} height={100} />
      </View>

      <Text style={styles.title}>Choisissez un pseudo</Text>

      <TextInput
        style={styles.input}
        placeholder="Pseudo ici"
        onChangeText={(text) => setUsername(text)}
      />
      <LinearGradientWrapper style={{ marginTop: 32 }}>
        <TouchableOpacity
          style={username.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={handleNext}
          disabled={username.length > 0 ? false : true}
        >
          <Text style={styles.btn_text}>Continuer</Text>
          <FontAwesome5 name="long-arrow-alt-right" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradientWrapper>
    </Animated.View>
  );
};

export default UsernameSlide;

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
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 32,
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
