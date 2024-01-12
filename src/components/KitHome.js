import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import UsageComparisonCard from "./UsageComparisonCard";
import LinearGradientWrapper from "./LinearGradientWrapper";

const KitHome = ({ kits }) => {
  const navigation = useNavigation();
  console.log(kits);
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ width: "100%", marginTop: 24 }}>
        <View style={styles.add_title_box}>
          <Text style={styles.add_title_text}>
            Total de ma production en cours
          </Text>
          <Text style={[styles.add_title_text, { fontSize: FontSize.XL }]}>
            248.60
          </Text>
          <Text style={[styles.add_title_text, { fontSize: FontSize.XL }]}>
            Watts
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 12,
          gap: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1 / 2,

            borderRadius: 12,
            backgroundColor: Colors.BOXES_BG,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Ionicons name="earth-sharp" size={40} color={Colors.PR} />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              CO2
            </Text>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              667.99G
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1 / 2,

            borderRadius: 12,
            backgroundColor: Colors.BOXES_BG,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Ionicons name="earth-sharp" size={40} color={Colors.PR} />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              CO2
            </Text>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              667.99G
            </Text>
          </View>
        </View>
      </View>

      <UsageComparisonCard />
      <UsageComparisonCard />
      <UsageComparisonCard />
      <LinearGradientWrapper style={{ marginTop: 24 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",

            paddingVertical: 12,
            borderRadius: 36,
          }}
          onPress={() => navigation.navigate("MyProduction")}
        >
          <Ionicons name="stats-chart" size={24} color="white" />
          <Text
            style={{
              marginLeft: 24,
              fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
              fontSize: FontSize.M,
              color: "white",
              marginBottom: 4,
            }}
          >
            Détails de ma production
          </Text>
        </TouchableOpacity>
      </LinearGradientWrapper>
    </View>
  );
};

export default KitHome;

const styles = StyleSheet.create({
  add_title_box: {
    borderRadius: 12,
    backgroundColor: Colors.BOXES_BG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 12,
    width: "100%",
  },
  add_title_text: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginBottom: 0,
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

    backgroundColor: Colors.PR,
  },
  add_btn_txt: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 4,
    marginLeft: 8,
  },
});
