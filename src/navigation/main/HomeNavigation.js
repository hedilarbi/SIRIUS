import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/HomeScreen";
import AddDeviceScreen from "../../screens/AddDeviceScreen";
import DeviceScreen from "../../screens/DeviceScreen";
import AddKitScreen from "../../screens/AddKitScreen";
import KitLocationScreen from "../../screens/KitLocationScreen";

const HomeNavigation = () => {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
