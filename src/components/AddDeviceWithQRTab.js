import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

import { Colors, Fonts } from "../constants";

const AddDeviceWithQRTab = ({ navigation, setSerialNumber }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setSerialNumber(data);
    navigation.navigate("Device", { serialNumber: data });
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, width: "100%", backgroundColor: "gray" }}></View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: Fonts.QUICKSAND_BOLD, color: Colors.SC }}>
          No access to camera
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

export default AddDeviceWithQRTab;

const styles = StyleSheet.create({});
