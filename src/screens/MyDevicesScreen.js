import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Colors, FontSize, Fonts } from "../constants";
import { selectUserToken } from "../redux/slices/userSlice";
import { getDevices } from "../services/deviceServices";
import DeviceCard from "../components/DeviceCard";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import ErrorModal from "../components/modals/ErrorModal";
import Spinner from "../components/Spinner";

const MyDevicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { powerStationGuid, name } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [devices, setDevices] = useState([]);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const token = useSelector(selectUserToken);

  const fetchData = async () => {
    try {
      const response = await getDevices(token);

      if (response.status === 200) {
        if (response.data.code === 200) {
          const list = response.data.rows.filter(
            (row) => row.powerStationGuid == powerStationGuid
          );

          setDevices(list);
        } else {
          setShowErrorScreen(true);
        }
      } else {
        setShowErrorScreen(true);
      }
    } catch (error) {
      setShowErrorScreen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ErrorModal
        visiblity={showErrorModal}
        message="Une erreur s'est produite"
      />
      {deleteIsLoading && <Spinner />}
      <View style={{ paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <Text style={styles.title}>kit {name}</Text>
      <View style={styles.device_container}>
        {devices.map((device, index) => {
          return (
            <DeviceCard
              serialNumber={device.serialNumber}
              key={index}
              deviceGuid={device.deviceGuid}
              deviceId={device.deviceId}
              setDeleteIsLoading={setDeleteIsLoading}
              setShowErrorModal={setShowErrorModal}
              setDevices={setDevices}
              token={token}
              devices={devices}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default MyDevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: FontSize.L,
    fontFamily: Fonts.QUICKSAND_BOLD,
    marginTop: 24,
    textAlign: "center",
    color: Colors.PR,
  },
  device_container: {
    flex: 1,
    backgroundColor: Colors.BOXES_BG,
    borderTopRightRadius: 48,
    borderTopLeftRadius: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
    marginTop: 16,
    paddingTop: 16,
  },
});
