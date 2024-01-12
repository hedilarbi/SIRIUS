import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, FontSize, Fonts } from "../constants";

import { getPlant } from "../services/plantServices";
import { selectUserToken } from "../redux/slices/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import ErrorModal from "../components/modals/ErrorModal";
import Header from "../components/Header";

const KitScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, powerStationGuid } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [kit, setKit] = useState(null);
  const token = useSelector(selectUserToken);
  const fetchData = async () => {
    getPlant(token, powerStationGuid)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            setKit(response.data.data);
          } else {
            setShowErrorModal(true);
          }
        } else {
          console.log("aa");
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        console.log("ii");
        setShowErrorModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <Text style={styles.title}>kit {name}</Text>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.BOXES_BG,
          borderTopRightRadius: 48,
          borderTopLeftRadius: 48,
          paddingHorizontal: 24,
          paddingVertical: 12,
          width: "100%",
          marginTop: 16,
          paddingTop: 24,
        }}
      >
        <TouchableOpacity
          style={styles.nav_btn}
          onPress={() =>
            navigation.navigate("MyDevices", { powerStationGuid, name })
          }
        >
          <Text style={styles.nav_btn_txt}>Mes appareils ajoutés</Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.info}>
          <View style={styles.info_box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.box_info_title}>Localisation</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color={Colors.PR} />
              </TouchableOpacity>
            </View>
            <Text style={styles.box_info_txt}>{kit.location}</Text>
          </View>
          <View style={styles.info_box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.box_info_title}>Puissance du Kit</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color={Colors.PR} />
              </TouchableOpacity>
            </View>
            <Text style={styles.box_info_txt}>{kit.installedCapacity}</Text>
          </View>
          <View style={styles.info_box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.box_info_title}>Coût du kit</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color={Colors.PR} />
              </TouchableOpacity>
            </View>

            <Text style={styles.box_info_txt}>{kit.totalCost}</Text>
          </View>
          <View style={styles.info_box}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.box_info_title}>Date d’achat</Text>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color={Colors.PR} />
              </TouchableOpacity>
            </View>
            <Text style={styles.box_info_txt}>{kit.buildDate}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  title: {
    fontSize: FontSize.L,
    fontFamily: Fonts.QUICKSAND_BOLD,
    marginTop: 24,
    textAlign: "center",
    color: Colors.PR,
  },
  nav_btn: {
    backgroundColor: Colors.PR,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
    borderRadius: 10,
  },
  nav_btn_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginBottom: 4,
    color: "white",
  },
  box_info_title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: Colors.PR,
  },
  box_info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginTop: 8,
  },
  info: {
    marginTop: 24,
  },
  info_box: {
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 16,
  },
});
