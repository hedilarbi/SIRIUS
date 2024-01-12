import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OTPScreen from "../../screens/OTPScreen";
import EmailScreen from "../../screens/EmailScreen";
import ResetPasswordScreen from "../../screens/ResetPasswordScreen";

const ResetPasswordNavigation = () => {
  const ResetPasswordStack = createNativeStackNavigator();
  return (
    <ResetPasswordStack.Navigator>
      <ResetPasswordStack.Screen
        name="ResetPwd"
        component={ResetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </ResetPasswordStack.Navigator>
  );
};

export default ResetPasswordNavigation;
