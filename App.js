import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/redux/store";
import RootNavigation from "./src/navigation/RootNavigation";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("./assets/fonts/Quicksand/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("./assets/fonts/Quicksand/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("./assets/fonts/Quicksand/Quicksand-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
