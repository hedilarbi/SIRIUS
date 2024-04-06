import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";
import { emailValidator } from "../utils/validators";
import { sendVerificationCode } from "../services/userServices";
import GoBack from "../components/buttons/GoBack";
import ErrorModal from "../components/modals/ErrorModal";
import Spinner from "../components/Spinner";
import LinearGradientWrapper from "../components/LinearGradientWrapper";
import FullLogo from "../../assets/icons/FullLogo.svg";
import InfoIcon from "../../assets/icons/InfoIcon.svg";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const verifyEmail = async () => {
    const isEmailValid = emailValidator(email);
    if (isEmailValid) {
      setIsLoading(true);
      sendVerificationCode(email)
        .then((response) => {
          if (response.status === 200) {
            if (response.data?.code === 200) {
              const { guid } = response.data.data;
              setIsLoading(false);
              navigation.navigate("OTP", { parent: "signup", email, guid });
            } else {
              setError(response.data.msg);
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setShowErrorModal(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoading(false);
      setError("Veuillez saisir une adresse mail valide");
    }
  };
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <View style={{ alignSelf: "flex-start" }}>
        <GoBack navigation={navigation} />
      </View>
      <View style={{ marginTop: 16 }}>
        <FullLogo width={250} height={100} />
      </View>
      <Text style={styles.title}>D’abord, enregistrons votre email</Text>
      <View style={styles.error_box}>
        <Text style={styles.error_text}>{error}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="mon-email@ici"
        onChangeText={(text) => setEmail(text)}
      />
      <LinearGradientWrapper style={{ marginTop: 32 }}>
        <TouchableOpacity
          style={email.length > 0 ? styles.btn : styles.btn_inactive}
          onPress={() => verifyEmail()}
          disabled={email.length === 0}
        >
          <Text style={styles.btn_text}>Vérifier mon email</Text>
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
          En cliquant sur « Vérifier », un code vous sera envoyé par email.
          Notez le, et rendez-vous à l’étape suivante !
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: "white",
    alignItems: "center",
  },

  image: {
    resizeMode: "contain",
    marginTop: 12,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 32,
    color: Colors.PR,
  },
  error_box: {
    marginTop: 12,
    height: 32,
    width: "100%",
  },
  error_text: {
    textAlign: "center",
    color: "red",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.PR,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 16,
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
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
    marginRight: 24,
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
    marginTop: -5,
  },
});
