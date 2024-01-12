import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import LinearGradientWrapper from "./LinearGradientWrapper";

const ErrorScreen = ({ setRefresh }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View>
        <MaterialIcons name="error" size={76} color="red" />
      </View>
      <Text
        style={{
          fontFamily: Fonts.QUICKSAND_BOLD,
          fontSize: FontSize.M,
          color: Colors.PR,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        Une erreur s'est produite.
      </Text>
      <LinearGradientWrapper>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingHorizontal: 26,
            paddingVertical: 10,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",

            marginTop: 20,
          }}
          onPress={() => setRefresh((prev) => prev + 1)}
        >
          <Ionicons name="refresh" size={28} color="white" />

          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_BOLD,
              fontSize: FontSize.S,
              color: "white",
              marginBottom: 2,
              textAlign: "center",
              color: "white",
              marginLeft: 8,
            }}
          >
            Rafraichir
          </Text>
        </TouchableOpacity>
      </LinearGradientWrapper>
    </SafeAreaView>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({});
