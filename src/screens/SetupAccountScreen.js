import {
  Animated,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { setItemAsync } from "expo-secure-store";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import { getUserToken, registerUser } from "../services/userServices";
import { setUser, setUserToken } from "../redux/slices/userSlice";
import UsernameSlide from "../components/setupProfile/UsernameSlide";
import SetupProfilePasswordSlide from "../components/setupProfile/SetupProfilePasswordSlide";
import SetupProfileConfirmPasswordSlide from "../components/setupProfile/SetupProfileConfirmPasswordSlide";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/modals/ErrorModal";

const SetupAccountScreen = () => {
  const { width } = useWindowDimensions();
  const [currentStep, setCurrentStep] = useState(0);
  const [slideAnimValue] = useState(new Animated.Value(0));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErroModal] = useState(false);
  const dispatch = useDispatch();
  const route = useRoute();
  const { email, guid, otp } = route.params;
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

  const createAccount = async () => {
    if (password != verifyPassword) {
      setError("Les mots de passe ne sont pas identiques");
    } else {
      setIsLoading(true);
      registerUser(
        username,
        "0000000",
        email,
        username,
        otp,
        guid,
        password
      ).then(async (response) => {
        if (response.status === 200) {
          getUserToken(username, password).then(async (resp) => {
            if (resp.status === 200) {
              console.log(resp.data);
              if (resp.data.code === 200) {
                dispatch(
                  setUser({
                    username,
                    phonenumber: "1333633343",
                    email,
                    password,
                  })
                );
                dispatch(setUserToken(resp.data.data.token));
                await setItemAsync("token", token);
                setIsLoading(false);
              } else {
                setIsLoading(false);
                setError(resp.data.msg);
              }
            } else {
              setIsLoading(false);
              setShowErroModal(true);
            }
          });
        } else {
          setIsLoading(false);
          setShowErroModal(true);
        }
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      {/* <WelcomeSlide
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
      /> */}
      <UsernameSlide
        handleNext={handleNext}
        width={width}
        slideAnimValue={slideAnimValue}
        handlePrevious={handlePrevious}
        username={username}
        setUsername={setUsername}
      />
      <SetupProfilePasswordSlide
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        password={password}
        setPassword={setPassword}
      />
      <SetupProfileConfirmPasswordSlide
        handlePrevious={handlePrevious}
        width={width}
        slideAnimValue={slideAnimValue}
        password={password}
        verifyPassword={verifyPassword}
        setVerifyPassword={setVerifyPassword}
        createAccount={createAccount}
        error={error}
      />
    </SafeAreaView>
  );
};

export default SetupAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",

    flexDirection: "row",
  },
});
