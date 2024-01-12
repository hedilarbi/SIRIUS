import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import LinearGradientWrapper from "../components/LinearGradientWrapper";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/modals/ErrorModal";
import InfoIcon from "../../assets/icons/InfoIcon.svg";

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const inputs = Array(6)
    .fill(0)
    .map((_, i) => useRef(null));

  const handleInputChange = (text, index) => {
    if (text.length === 1 && index < 5) {
      // Move to the next input

      inputs[index + 1].current.focus();
    }

    // Update the OTP state
    const newOtp = otp.substring(0, index) + text + otp.substring(index + 1);
    setOtp(newOtp);
  };
  const handleNavigation = () => {
    if (route.params.parent === "signup") {
      const { email, guid } = route.params;
      navigation.navigate("SetupAccount", { email, guid, otp });
    } else if (route.params.parent === "delete") {
      const { guid } = route.params;
      navigation.navigate("PasswordScreen", { guid, otp });
    }
  };
  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && otp.length === 0) {
      const lastIndex = inputs.length - 1;
      if (lastIndex >= 0) {
        // Move cursor to the last input
        inputs[lastIndex].current.focus();
      }
    }
  };
  return (
    <SafeAreaView style={styles.container} onKeyPress={handleKeyPress}>
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <Header navigation={navigation} />
      <View
        style={{
          alignItems: "center",
          flex: 1,
          paddingHorizontal: 12,
          marginTop: 82,
        }}
      >
        <Text style={styles.title}>Votre code de vérification est…</Text>
        <View style={styles.otp_container}>
          {inputs.map((input, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={input}
              placeholder="0"
              value={otp[index]}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && index > 0) {
                  // Move cursor to the previous input
                  inputs[index - 1].current.focus();
                }
              }}
            />
          ))}
        </View>
        <LinearGradientWrapper style={{ marginTop: 32 }}>
          <TouchableOpacity
            style={otp.length === 6 ? styles.btn : styles.btn_inactive}
            onPress={() => handleNavigation()}
            disabled={otp.length === 6 ? false : true}
          >
            <Text style={styles.btn_text}>Valider mon code</Text>
            <AntDesign name="arrowright" size={24} color="white" />
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
          <InfoIcon width={20} height={20} />
          <Text style={styles.info_txt}>
            Entrez ici le code reçu à l’adresse mon-email@ici, pour modifier
            votre mot de passe
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    paddingHorizontal: 12,
    color: Colors.PR,
  },
  otp_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
    width: "100%",
  },
  input: {
    width: 40,
    height: 40,
    borderBottomWidth: 1,
    textAlign: "center",
    fontSize: FontSize.XL,
    borderBottomColor: Colors.PR,
    fontFamily: Fonts.QUICKSAND_BOLD,
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
    fontSize: FontSize.M,
    color: "white",
    marginRight: 24,
    marginTop: -4,
  },
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -5,
  },
});
