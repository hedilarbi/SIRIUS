import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { deleteItemAsync } from "expo-secure-store";
import { Feather } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { sendDeleteAccountVerificationCode } from "../services/userServices";
import {
  clearUser,
  clearUserToken,
  selectUser,
  selectUserToken,
} from "../redux/slices/userSlice";
import Header from "../components/Header";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/modals/ErrorModal";
import LinearGradientWrapper from "../components/LinearGradientWrapper";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showConfirmDeleteModel, setShowConfirmDeleteModel] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);
  const logout = async () => {
    setIsLoading(true);
    await deleteItemAsync("token");
    dispatch(clearUser());
    dispatch(clearUserToken());
    setIsLoading(false);
  };
  const sendDeleteAccountCode = async () => {
    setIsLoading(true);
    sendDeleteAccountVerificationCode(token, user.email)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            navigation.navigate("OTP", {
              parent: "delete",
              guid: response.data.data.guid,
            });
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
        setIsLoading(false);
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
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <View style={{ width: "100%", paddingHorizontal: 24, marginTop: 16 }}>
        <Header navigation={navigation} />
      </View>
      <Text style={styles.box_header_txt}>Mon Profile</Text>
      <View style={styles.box}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.PR,
            borderRadius: 30,
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <ProfileIcon width={60} height={60} />
          <View style={styles.box_body}>
            <Text style={styles.box_body_title}>Votre email</Text>
            <Text style={styles.box_body_mail}>{user.email}</Text>
            <TouchableOpacity
              style={styles.box_body_btn}
              onPress={() => navigation.navigate("ResetPwdNav")}
            >
              <Text style={styles.box_body_btn_txt}>
                Mettre à jour le mot de passe
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box_body_delete_btn}
              onPress={() => sendDeleteAccountCode()}
            >
              <Feather name="trash" size={20} color="white" />
              <Text style={[styles.box_body_btn_txt, { marginLeft: 8 }]}>
                Supprimer mon compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradientWrapper style={{}}>
          <TouchableOpacity onPress={logout} style={styles.logout_btn}>
            <Text style={styles.logout_btn_txt}>Déconnexion</Text>
          </TouchableOpacity>
        </LinearGradientWrapper>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  box: {
    backgroundColor: Colors.BOXES_BG,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 12,

    flex: 1,
    justifyContent: "space-between",
  },
  box_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  box_header_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.L,
    marginTop: 24,
    color: Colors.PR,
    textAlign: "center",
  },
  box_body: { marginLeft: 24 },
  box_body_title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: "white",
  },
  box_body_mail: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginTop: 8,
    color: "white",
  },
  box_body_btn: { marginTop: 8 },
  box_body_delete_btn: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  box_body_btn_txt: {
    fontSize: FontSize.XS,
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    textDecorationLine: "underline",
    color: "white",
  },
  logout_btn: {
    borderRadius: 32,
    alignContent: "center",
    width: "100%",
    paddingVertical: 12,
  },
  logout_btn_txt: {
    color: "white",
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    textAlign: "center",
    marginBottom: 5,
  },
  delete_btn: {
    backgroundColor: "red",
    borderRadius: 12,
    alignContent: "center",
    width: "100%",
    paddingVertical: 8,
    marginTop: 12,
  },
});
