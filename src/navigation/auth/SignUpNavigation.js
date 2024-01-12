import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreen from "../../screens/SignUpScreen";
import SetupAccountScreen from "../../screens/SetupAccountScreen";
import OTPScreen from "../../screens/OTPScreen";

const SignUpNavigation = () => {
  const SignUpStack = createNativeStackNavigator();
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <SignUpStack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />
      <SignUpStack.Screen
        name="SetupAccount"
        component={SetupAccountScreen}
        options={{
          headerShown: false,
        }}
      />
    </SignUpStack.Navigator>
  );
};

export default SignUpNavigation;
