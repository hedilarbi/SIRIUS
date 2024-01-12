import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../../constants";
import HomeNavigation from "./HomeNavigation";
import KitsNavigation from "./KitsNavigation";
import MyProductionScreen from "../../screens/MyProductionScreen";
import ProfileNavigation from "./ProfileNavigation";
import MyKitsIcon from "../../../assets/icons/MyKitsIcon.svg";
import MyProductionIcon from "../../../assets/icons/MyProductionIcon.svg";
import HomeIcon from "../../../assets/icons/HomeIcon.svg";
import ProfileIcon from "../../../assets/icons/ProfileIcon.svg";
const TabNavigation = () => {
  const MainTab = createBottomTabNavigator();

  return (
    <>
      <MainTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case "HomeNav":
                iconName = focused ? (
                  <HomeIcon width={30} height={30} />
                ) : (
                  <HomeIcon width={30} height={30} />
                );
                break;
              case "KitsNav":
                iconName = focused ? (
                  <MyKitsIcon width={30} height={30} />
                ) : (
                  <MyKitsIcon width={30} height={30} />
                );
                break;
              case "MyProduction":
                iconName = focused ? (
                  <MyProductionIcon width={30} height={30} />
                ) : (
                  <MyProductionIcon width={30} height={30} />
                );
                break;

              case "ProfileNav":
                iconName = focused ? (
                  <ProfileIcon width={30} height={30} />
                ) : (
                  <ProfileIcon width={30} height={30} />
                );
                break;
            }

            return iconName;
          },
          tabBarActiveTintColor: Colors.PR,
          tabBarInactiveTintColor: "black",
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
            backgroundColor: Colors.PR,
          },
          tabBarLabelStyle: {
            fontFamily: Fonts.QUICKSAND_MEDIUM,
            color: "white",
            fontSize: 10,
          },
        })}
      >
        <MainTab.Screen
          name="HomeNav"
          component={HomeNavigation}
          options={{ headerShown: false, title: "Accueil" }}
        />
        <MainTab.Screen
          name="KitsNav"
          component={KitsNavigation}
          options={{ headerShown: false, title: "Mon équipement" }}
        />
        <MainTab.Screen
          name="MyProduction"
          component={MyProductionScreen}
          options={{ headerShown: false, title: "Ma production" }}
        />

        <MainTab.Screen
          name="ProfileNav"
          component={ProfileNavigation}
          options={{ headerShown: false, title: "Mon Profil" }}
        />
      </MainTab.Navigator>
    </>
  );
};

export default TabNavigation;
