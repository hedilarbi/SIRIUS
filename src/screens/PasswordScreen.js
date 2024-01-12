import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, FontSize, Fonts } from "../constants";

import FullLogo from "../../assets/icons/FullLogo.svg";
import GoBackIcon from "../../assets/icons/GoBackIcon.svg";
import { deleteUserAccount } from "../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  clearUserToken,
  selectUser,
  selectUserToken,
} from "../redux/slices/userSlice";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/modals/ErrorModal";
import { deleteItemAsync } from "expo-secure-store";
import Header from "../components/Header";

const PasswordScreen = ({}) => {
  const [isLoading, setIsloading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const route = useRoute();
  const { guid, otp } = route.params;
  const token = useSelector(selectUserToken);
  const { email } = useSelector(selectUser);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const deleteAccount = async () => {
    setIsloading(true);
    deleteUserAccount(token, otp, guid, password, email)
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            await deleteItemAsync(token);
            dispatch(clearUser());
            dispatch(clearUserToken());
          } else {
            setShowErrorModal(true);
          }
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        setShowErrorModal(true);
      })
      .finally(() => {
        setIsloading(false);
      });
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
    <SafeAreaView
      style={{
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 12,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header navigation={navigation} />
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />

      <Text style={styles.title}>Saisissez votre mot de passe</Text>

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

      <TouchableOpacity
        style={password.length > 0 ? styles.btn : styles.btn_inactive}
        onPress={deleteAccount}
        disabled={password.length > 0 ? false : true}
      >
        <Text style={styles.btn_text}>Supprimer mon compte</Text>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    marginTop: 32,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 64,
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
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
    marginTop: 32,
  },
  btn_inactive: {
    flexDirection: "row",
    backgroundColor: "gray",
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
    marginRight: 12,
    marginTop: -4,
  },
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -5,
  },
});
