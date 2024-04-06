import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { Colors, FontSize, Fonts } from "../constants";
import { selectUserToken } from "../redux/slices/userSlice";
import { getPlantsData } from "../services/plantServices";
import Header from "../components/Header";
import KitCard from "../components/KitCard";
import ErrorScreen from "../components/ErrorScreen";
import LinearGradientWrapper from "../components/LinearGradientWrapper";
import LoadingScreen from "../components/LoadingScreen";

const MyKitsScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [kits, setKits] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const token = useSelector(selectUserToken);
  const fetchData = async () => {
    getPlantsData(token)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            setKits(response.data.rows);
          }
        } else {
          setShowErrorScreen(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowErrorScreen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <Text style={styles.title}>Mon équipement</Text>
      <View style={styles.body}>
        {kits?.length > 0 ? (
          <ScrollView style={{ flex: 1, width: "100%", marginTop: 16 }}>
            {kits.map((kit, index) => (
              <KitCard
                key={index}
                name={kit.stationName}
                powerStationGuid={kit.powerStationGuid}
              />
            ))}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              width: "100%",
              marginTop: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
                fontSize: FontSize.M,
              }}
            >
              Aucun Kit ajoutée
            </Text>
          </View>
        )}
        <LinearGradientWrapper style={{ marginTop: 15 }}>
          <TouchableOpacity
            style={styles.add_btn}
            onPress={() => navigation.navigate("AddDevice")}
          >
            <Feather name="plus" size={24} color="white" />
            <Text style={styles.add_btn_txt}>Ajouter un appareil</Text>
          </TouchableOpacity>
        </LinearGradientWrapper>
      </View>
    </SafeAreaView>
  );
};

export default MyKitsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    backgroundColor: Colors.BOXES_BG,
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    paddingHorizontal: 16,
    paddingVertical: 15,
    width: "100%",
    marginTop: 16,
    paddingTop: 16,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.L,
    color: Colors.PR,
    textAlign: "center",
    marginTop: 16,
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
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 4,
    marginLeft: 8,
  },
});
