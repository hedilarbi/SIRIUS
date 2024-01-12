import {
  Animated,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { resetUserPassword } from "../services/userServices";
import { useSelector } from "react-redux";

import { selectUserToken } from "../redux/slices/userSlice";
import OldPasswordSlide from "../components/OldPasswordSlide";
import SuccesModal from "../components/modals/SuccesModal";
import PasswordSlide from "../components/PasswordSlide";
import ConfirmPasswordSlide from "../components/ConfirmPasswordSlide";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/modals/ErrorModal";

const ResetPasswordScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnimValue] = useState(new Animated.Value(0));
  const [oldPassword, setOldPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isLoading, setIslading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const token = useSelector(selectUserToken);

  useEffect(() => {
    Animated.timing(slideAnimValue, {
      toValue: -width * currentStep,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const handleNext = () => {
    Keyboard.dismiss();
    setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    Keyboard.dismiss();
    setCurrentStep(currentStep - 1);
  };

  const updatePassword = async () => {
    if (password != verifyPassword) {
      setError("Les mots de passe ne sont pas identiques");
    } else {
      resetUserPassword(token, oldPassword, password)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.code === 200) {
              setShowSuccesModal(true);
            } else {
              setError(response.data.msg);
            }
          } else {
            setShowErrorModal(true);
          }
        })
        .finally(() => {
          setIslading(false);
        });
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
  useEffect(() => {
    if (showSuccesModal) {
      const timer = setTimeout(() => {
        setShowSuccesModal(false);
        navigation.goBack();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showSuccesModal]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <SuccesModal visiblity={showSuccesModal} message="Operation reussite" />
      <OldPasswordSlide
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
      />
      <PasswordSlide
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
        password={password}
        setPassword={setPassword}
      />
      <ConfirmPasswordSlide
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
        error={error}
        updatePassword={updatePassword}
      />
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",

    flexDirection: "row",
  },
});
