import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import PanelIcon from "../../assets/icons/PanelIcon.svg";

import { unbindDevice } from "../services/deviceServices";
const DeviceCard = ({
  serialNumber,
  deviceGuid,
  deviceId,
  setDeleteIsLoading,
  setShowErrorModal,
  token,
  setDevices,
  devices,
}) => {
  const deleteDevice = async () => {
    setDeleteIsLoading(true);
    try {
      const response = await unbindDevice(token, deviceGuid, deviceId);
      if (response.status === 200) {
        if (response.data.code === 200) {
          const list = devices.filter((device) => device.deviceId != deviceId);
          setDevices(list);
        } else {
          setShowErrorModal(true);
        }
      } else {
        setShowErrorModal(true);
      }
    } catch (err) {
      setShowErrorModal(true);
    } finally {
      setDeleteIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <PanelIcon width={50} height={50} />
      </View>
      <View style={styles.box}>
        <Text style={styles.title}>Votre appareil</Text>
        <Text style={styles.name}>{serialNumber}</Text>
        <TouchableOpacity style={styles.delete_btn} onPress={deleteDevice}>
          <Feather name="trash" size={20} color="white" />
          <Text style={styles.delete_btn_txt}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeviceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.PR,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",

    marginTop: 24,
  },
  box: {
    marginLeft: 24,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: "white",
  },
  name: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
  },
  delete_btn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  delete_btn_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.XS,
    marginLeft: 8,
    marginBottom: 2,
    textDecorationLine: "underline",
    color: "white",
  },
});
