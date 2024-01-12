import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Colors, FontSize, Fonts } from "../constants";
import { addDevice, getPlantsData } from "../services/plantServices";
import { useSelector } from "react-redux";
import { selectUserToken } from "../redux/slices/userSlice";
import PanelIcon from "../../assets/icons/PanelIcon.svg";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import ErrorModal from "../components/modals/ErrorModal";
import Spinner from "../components/Spinner";

const DeviceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { serialNumber } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [kits, setKits] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [addDeviceLoading, setAddDeviceLoading] = useState(false);
  const token = useSelector(selectUserToken);
  const fetchData = async () => {
    getPlantsData(token)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            setKits(response.data.rows);
          } else {
            setShowErrorScreen(true);
          }
        } else {
          setShowErrorScreen(true);
        }
      })
      .catch((err) => {
        setShowErrorScreen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);

  const addDeviceToKit = async (guid) => {
    console.log("a");
    setAddDeviceLoading(true);
    addDevice(token, guid, serialNumber)
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.code === 200) {
            navigation.reset({
              index: 0,
              routes: [{ name: "HomeNav" }],
            });
          } else {
            setShowErrorModal(true);
          }
        } else {
          setShowErrorModal(true);
        }
      })
      .catch((err) => {
        setShowErrorModal(true);
      })
      .finally(() => {
        setAddDeviceLoading(false);
      });
  };
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
  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      {addDeviceLoading && <Spinner />}
      <View style={{ paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.device_container}>
        <View style={{ marginTop: 8 }}>
          <PanelIcon width={50} height={50} />
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Votre appareil</Text>
          <Text style={styles.name}>N° {serialNumber}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.BOXES_BG,
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          paddingHorizontal: 24,
        }}
      >
        <Text style={styles.instruction_txt}>
          Afin de finaliser l’ajout, relier l’appareil à une adresse :
        </Text>
        <View>
          {kits.map((kit, index) => {
            return (
              <TouchableOpacity
                onPress={() => addDeviceToKit(kit.powerStationGuid)}
                style={styles.address_btn}
                key={index}
              >
                <Text style={styles.address_btn_txt} numberOfLines={1}>
                  {kit.location}
                </Text>
                <AntDesign name="plus" size={24} color={Colors.PR} />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("AddKit", { serialNumber })}
        >
          <Text style={styles.btn_text}>Créer un nouveau kit</Text>
          <Feather name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  device_container: {
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    marginLeft: 24,
    marginTop: 24,
  },
  box: {
    marginLeft: 24,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: Colors.PR,
  },
  name: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: Colors.PR,
  },
  instruction_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginTop: 36,
    textAlign: "center",
    color: Colors.PR,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: Colors.PR,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    width: "100%",
    marginTop: 32,
  },
  btn_text: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.S,
    color: "white",

    marginTop: -4,
  },
  address_btn: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  address_btn_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    color: Colors.PR,
    marginBottom: 4,
  },
});
