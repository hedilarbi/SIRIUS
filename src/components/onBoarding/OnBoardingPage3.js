import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../../constants";
import LinearGradientWrapper from "../LinearGradientWrapper";
import FullLogo from "../../../assets/icons/FullLogo.svg";

const OnBoardingPage3 = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { width }]}>
      <FullLogo width={250} height={100} />
      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={[
          styles.image,
          { width: 220, height: 220, resizeMode: "contain" },
        ]}
      />
      <Text style={styles.description}>{item.description}</Text>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <LinearGradientWrapper>
            <TouchableOpacity
              style={[styles.login_btn, { width: "100%" }]}
              onPress={() => navigation.navigate("SignUpNav")}
            >
              <Text style={styles.login_btn_text}>Commencer !</Text>
            </TouchableOpacity>
          </LinearGradientWrapper>
        </View>
        <TouchableOpacity
          style={styles.register_btn}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.register_btn_text}>J'ai déja un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingPage3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: "center",
    paddingHorizontal: 36,
  },
  image: {
    justifyContent: "center",
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XXL,
    textAlign: "center",
    marginTop: 16,
    color: Colors.PR,
  },
  description: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.M,
    textAlign: "center",
    marginTop: 12,
  },
  login_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 24,
  },
  login_btn_text: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 4,
  },
  register_btn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  register_btn_text: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    textDecorationLine: "underline",
    color: Colors.PR,
  },
});
