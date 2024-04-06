import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../../constants";
import { deletePlant } from "../../services/plantServices";
import { useSelector } from "react-redux";
import { selectUserToken } from "../../redux/slices/userSlice";
import { useNavigation } from "@react-navigation/native";

const DeleteKitWarning = ({
  setShowDeleteKitWarning,
  showDeleteKitWarning,
  powerStationId,

  setIsRequestLoading,
  setShowErrorModal,
}) => {
  const token = useSelector(selectUserToken);
  const navigation = useNavigation();
  const deleteKit = async () => {
    setIsRequestLoading(true);
    try {
      const response = await deletePlant(token, powerStationId);
      if (response.status === 200) {
        if (response.data.code === 200) {
          navigation.goBack();
        } else {
          setShowErrorModal(true);
        }
      } else {
        setShowErrorModal(true);
      }
    } catch (err) {
      console.log(err);
      setShowErrorModal(true);
    } finally {
      setShowDeleteKitWarning(false);
      setIsRequestLoading(false);
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showDeleteKitWarning}
    >
      <View
        style={{
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
          marginTop: 16,
          backgroundColor: "rgba(0, 0, 0,0.4)",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 32,
          zIndex: 40,
        }}
      >
        <View style={styles.parent_container}>
          <View style={styles.container}>
            <MaterialIcons name="error" size={30} color="red" />
            <Text style={styles.error_text}>
              Êtes-vous sûr de vouloir supprimer ce kit ?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 24,

              gap: 12,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                paddingHorizontal: 12,
                paddingVertical: 8,
                flex: 1 / 2,
                borderColor: "red",
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => setShowDeleteKitWarning(false)}
            >
              <Text
                style={{
                  fontFamily: Fonts.QUICKSAND_MEDIUM,
                  fontSize: FontSize.S,
                  color: Colors.PR,
                  marginBottom: 4,
                }}
              >
                Annuler
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                paddingHorizontal: 12,
                paddingVertical: 8,
                flex: 1 / 2,
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={deleteKit}
            >
              <Text
                style={{
                  fontFamily: Fonts.QUICKSAND_MEDIUM,
                  fontSize: FontSize.S,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                Confirmer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteKitWarning;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    flexDirection: "row",
  },
  parent_container: {
    backgroundColor: "white",

    justifyContent: "center",

    paddingVertical: 26,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderWidth: 1,
  },
  error_text: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    marginLeft: 12,
    flexWrap: "wrap",
    color: "red",
  },
});
