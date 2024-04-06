import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { setItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";
import { getUser, getUserToken } from "../services/userServices";
import { setUser, setUserToken } from "../redux/slices/userSlice";
import ErrorModal from "../components/modals/ErrorModal";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import LinearGradientWrapper from "../components/LinearGradientWrapper";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIslading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();
  const login = async () => {
    Keyboard.dismiss();
    setIslading(true);
    getUserToken(username, password)
      .then(async (response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            const token = response.data.data.token;
            await setItemAsync("token", token);
            getUser(token).then((rsp) => {
              if (rsp.status === 200) {
                if (rsp.data.code === 200) {
                  dispatch(setUser(rsp.data.user));
                  dispatch(setUserToken(token));
                } else {
                  setError(rsp.data.msg);
                }
              } else {
                setShowErrorModal(true);
              }
            });
          } else {
            setError(response.data.msg);
          }
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIslading(false);
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
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: "white",
      }}
    >
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <Header navigation={navigation} />
      <View style={{ flex: 1, marginTop: 60 }}>
        <Text style={styles.title}>Heureux de vous revoir !</Text>
        <View style={{ height: 30, width: "100%", marginTop: 12 }}>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_BOLD,
              fontSize: FontSize.S,
              textAlign: "center",
              color: "red",
            }}
          >
            {error}
          </Text>
        </View>
        <View style={{ marginTop: 20, width: "100%" }}>
          <TextInput
            style={styles.input}
            placeholder="Votre e-mail"
            onChangeText={(text) => setUsername(text)}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 32,
              alignItems: "center",
              borderBottomColor: Colors.PR,
              borderBottomWidth: 1,
            }}
          >
            <TextInput
              style={styles.input_pwd}
              placeholder="Votre mot de passe"
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
        </View>
        <LinearGradientWrapper style={{ marginTop: 32 }}>
          <TouchableOpacity
            style={[
              username.length > 0 && password.length > 0
                ? styles.login_btn
                : styles.login_btn_inactive,
              { width: "100%" },
            ]}
            onPress={login}
            disabled={username.length > 0 && password.length > 0 ? false : true}
          >
            <Text style={styles.login_btn_text}>Connexion</Text>
          </TouchableOpacity>
        </LinearGradientWrapper>
        {/* <TouchableOpacity style={styles.register_btn}>
          <Text style={styles.register_btn_text}>Mot de passe oublié ?</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XXL,
    textAlign: "center",
    color: Colors.PR,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    borderBottomColor: Colors.PR,
  },
  input_pwd: {
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    flex: 1,
  },
  login_btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 24,
  },
  login_btn_inactive: {
    backgroundColor: "gray",
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
    marginTop: 42,
  },

  register_btn_text: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    textDecorationLine: "underline",
    color: Colors.PR,
  },
});
