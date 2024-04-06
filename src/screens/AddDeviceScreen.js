import {
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Colors, FontSize, Fonts } from "../constants";
import AddDeviceWithQRTab from "../components/AddDeviceWithQRTab";
import AddDeviceWtihCodeTab from "../components/AddDeviceWtihCodeTab";

const AddDeviceScreen = () => {
  const navigation = useNavigation();
  const [addDeviceMode, setAddDeviceMode] = useState("QR");
  const [serialNumber, setSerialNumber] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          paddingHorizontal: 12,
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          style={
            addDeviceMode === "QR" ? styles.btn_active : styles.btn_inactive
          }
          onPress={() => setAddDeviceMode("QR")}
        >
          <Text
            style={
              addDeviceMode === "QR"
                ? styles.btn_active_txt
                : styles.btn_inactive_txt
            }
          >
            Scannez le code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            addDeviceMode === "CODE" ? styles.btn_active : styles.btn_inactive
          }
          onPress={() => setAddDeviceMode("CODE")}
        >
          <Text
            style={
              addDeviceMode === "CODE"
                ? styles.btn_active_txt
                : styles.btn_inactive_txt
            }
          >
            Entrez le code
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 12 }}>
        {addDeviceMode === "QR" ? (
          <AddDeviceWithQRTab
            navigation={navigation}
            serialNumber={serialNumber}
            setSerialNumber={setSerialNumber}
          />
        ) : (
          <AddDeviceWtihCodeTab
            navigation={navigation}
            setSerialNumber={setSerialNumber}
            serialNumber={serialNumber}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddDeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  btn_active: {
    alignItems: "center",
    paddingVertical: 8,
    flex: 1 / 2,
    backgroundColor: Colors.PR,
    borderRadius: 10,
  },
  btn_inactive: {
    alignItems: "center",
    paddingVertical: 8,
    flex: 1 / 2,

    borderRadius: 10,
    backgroundColor: Colors.BOXES_BG,
  },
  btn_active_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 2,
  },
  btn_inactive_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: Colors.PR,
    marginBottom: 2,
  },
});
