import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HeaderBackButton } from "@react-navigation/elements";
import ProfileScreen from "../../screens/ProfileScreen";
import ResetPasswordNavigation from "../auth/ResetPasswordNavigation";

const ProfileNavigation = () => {
  const ProfileStack = createNativeStackNavigator();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
