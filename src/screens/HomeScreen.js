import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Colors, FontSize, Fonts } from "../constants";
import { getPlantsData } from "../services/plantServices";
import { selectUserToken } from "../redux/slices/userSlice";
import KitHome from "../components/KitHome";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import Logo from "../../assets/icons/Logo.svg";
import LinearGradientWrapper from "../components/LinearGradientWrapper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [kits, setKits] = useState(null);
  const [total, setTotal] = useState(null);
  const [isLoading, setIslading] = useState(true);
  const [error, setError] = useState(false);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [plantsDetails, setPlantsDetails] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const token = useSelector(selectUserToken);

  const fetchData = async () => {
    setShowErrorScreen(false);
    try {
      const [getPlantsDataResponse] = await Promise.all([getPlantsData(token)]);

      if (getPlantsDataResponse.status === 200) {
        if (getPlantsDataResponse.data.code === 200) {
          setKits(getPlantsDataResponse.data.rows);
          setTotal(getPlantsDataResponse.data.total);
        } else {
          setShowErrorScreen(true);
        }
      } else {
        setShowErrorScreen(true);
      }
    } catch (err) {
      setShowErrorScreen(true);
      console.log(err.message);
    } finally {
      setIslading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          paddingVertical: 12,
          paddingHorizontal: 24,
        }}
      >
        <Logo width={50} height={50} />
        {kits?.length > 0 ? (
          <KitHome kits={kits} />
        ) : (
          <>
            <View style={{ flex: 1, width: "100%", marginTop: 24 }}>
              <View style={styles.add_title_box}>
                <Text style={styles.add_title_text}>
                  Ajouter votre premier appareil
                </Text>
                <FontAwesome name="plus" size={30} color={Colors.PR} />
              </View>
            </View>
            <LinearGradientWrapper>
              <TouchableOpacity
                style={styles.add_btn}
                onPress={() => navigation.navigate("AddDevice")}
              >
                <Feather name="plus" size={24} color="white" />
                <Text style={styles.add_btn_txt}>Ajouter un appareil</Text>
              </TouchableOpacity>
            </LinearGradientWrapper>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  add_title_box: {
    borderRadius: 12,
    backgroundColor: Colors.BOXES_BG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 18,
    width: "100%",
  },
  add_title_text: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginBottom: 20,
    textAlign: "center",
    color: Colors.PR,
  },
  add_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 60,
    paddingVertical: 12,
  },
  add_btn_txt: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 4,
    marginLeft: 8,
  },
});
