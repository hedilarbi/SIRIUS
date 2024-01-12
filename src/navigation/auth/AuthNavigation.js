import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../../screens/SignInScreen";
import OnBoardingScreen from "../../screens/OnBoardingScreen";
import SignUpNavigation from "./SignUpNavigation";
import ResetPasswordNavigation from "./ResetPasswordNavigation";

const AuthNavigation = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="OnBoarding"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUpNav"
        component={SignUpNavigation}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="ResetPwdNav"
        component={ResetPasswordNavigation}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
