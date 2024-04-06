import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./auth/AuthNavigation";
import TabNavigation from "./main/TabNavigation";
import { deleteItemAsync, getItemAsync } from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserToken,
  setUser,
  setUserToken,
} from "../redux/slices/userSlice";
import { getUser, getUserToken } from "../services/userServices";
import KitLocationScreen from "../screens/KitLocationScreen";
import AddKitScreen from "../screens/AddKitScreen";
import DeviceScreen from "../screens/DeviceScreen";
import AddDeviceScreen from "../screens/AddDeviceScreen";
import ResetPasswordNavigation from "./auth/ResetPasswordNavigation";
import OTPScreen from "../screens/OTPScreen";
import PasswordScreen from "../screens/PasswordScreen";
import KitScreen from "../screens/KitScreen";
import MyDevicesScreen from "../screens/MyDevicesScreen";
import * as SplashScreen from "expo-splash-screen";

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const userToken = useSelector(selectUserToken);
  const [isLoading, setIsLoading] = useState(true);
  const initializeApp = async () => {
    try {
      const token = await getItemAsync("token");

      if (token) {
        const response = await getUser(token);

        if (response.status === 200) {
          if (response.data.code === 200) {
            dispatch(setUser(response.data.user));
            dispatch(setUserToken(token));
          } else {
            await deleteItemAsync("token");
          }
        } else {
          await deleteItemAsync("token");
        }
        await SplashScreen.hideAsync();
        setIsLoading(false);
      } else {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    initializeApp();
  }, [userToken]);

  if (isLoading) {
    return null;
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {userToken ? (
          <>
            <RootStack.Screen
              name="Main"
              component={TabNavigation}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="AddDevice"
              component={AddDeviceScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Device"
              component={DeviceScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="AddKit"
              component={AddKitScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="KitLocation"
              component={KitLocationScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="ResetPwdNav"
              component={ResetPasswordNavigation}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="OTP"
              component={OTPScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="PasswordScreen"
              component={PasswordScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="Kit"
              component={KitScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name="MyDevices"
              component={MyDevicesScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthNavigation}
            options={{
              headerShown: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
