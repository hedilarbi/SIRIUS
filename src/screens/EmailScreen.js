import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";
import InfoIcon from "../../assets/icons/InfoIcon.svg";
import FullLogo from "../../assets/icons/FullLogo.svg";

const EmailScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 12 }}>
        <FullLogo width={250} height={100} />
      </View>
      <Text style={styles.title}>D’abord, enregistrons votre email</Text>
      <TextInput style={styles.input} placeholder="Votre e-mail" />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          Keyboard.dismiss();
          navigation.navigate("OTP", { parent: "resetPwd" });
        }}
      >
        <Text style={styles.btn_text}>Vérifier mon email</Text>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          marginTop: 24,
          paddingRight: 36,
        }}
      >
        <InfoIcon width={20} height={20} />
        <Text style={styles.info_txt}>
          En cliquant sur « Vérifier », un code vous sera envoyé par email.
          Notez le, et rendez-vous à l’étape suivante !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: "white",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 32,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 32,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: Colors.PR,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
    marginTop: 32,
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
    marginTop: -5,
  },
});
