import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyKitsScreen from "../../screens/MyKitsScreen";
import KitScreen from "../../screens/KitScreen";
import MyDevicesScreen from "../../screens/MyDevicesScreen";

const KitsNavigation = () => {
  const KitsStack = createNativeStackNavigator();

  return (
    <KitsStack.Navigator>
      <KitsStack.Screen
        name="MyKits"
        component={MyKitsScreen}
        options={{
          headerShown: false,
        }}
      />
      <KitsStack.Screen
        name="Kit"
        component={KitScreen}
        options={{
          headerShown: false,
        }}
      />
      <KitsStack.Screen
        name="MyDevices"
        component={MyDevicesScreen}
        options={{
          headerShown: false,
        }}
      />
    </KitsStack.Navigator>
  );
};

export default KitsNavigation;
