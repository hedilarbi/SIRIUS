import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Colors, FontSize, Fonts } from "../constants";
import UsageComparisonCard from "./UsageComparisonCard";
import LinearGradientWrapper from "./LinearGradientWrapper";
import EnergySaveIcon from "../../assets/icons/EnergySaveIcon.svg";

const KitHome = ({
  kits,
  totalEnergy,
  totalCO2,
  averageEnergyCurrentDay,
  averageEnergyCurrentMonth,
  averageEnergyCurrentYear,
  averageEnergyDayMinus1,
  averageEnergyMonthMinus1,
  averageEnergyYearMinus1,
}) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, width: "100%", justifyContent: "space-between" }}>
      <View style={{ width: "100%", marginTop: 24 }}>
        <View style={styles.add_title_box}>
          <Text style={styles.add_title_text}>
            Total de ma production en cours
          </Text>
          <Text style={[styles.add_title_text, { fontSize: FontSize.XL }]}>
            {totalEnergy}
          </Text>
          <Text style={[styles.add_title_text, { fontSize: FontSize.XL }]}>
            KWH
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
              {totalCO2} T
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
          <EnergySaveIcon width={40} height={40} />
          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              Economie
            </Text>
            <Text
              style={{
                fontFamily: Fonts.QUICKSAND_BOLD,
                fontSize: FontSize.S,
                color: Colors.PR,
              }}
            >
              ?? €
            </Text>
          </View>
        </View>
      </View>

      <UsageComparisonCard
        t={averageEnergyCurrentDay}
        tMinusOne={averageEnergyDayMinus1}
        mode="daily"
      />
      <UsageComparisonCard
        t={averageEnergyCurrentMonth}
        tMinusOne={averageEnergyMonthMinus1}
        mode="monthly"
      />
      <UsageComparisonCard
        t={averageEnergyCurrentYear}
        tMinusOne={averageEnergyYearMinus1}
        mode="yearly"
      />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <LinearGradientWrapper style={{ marginTop: 24 }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 32,
            }}
            onPress={() => navigation.navigate("MyProduction")}
          >
            <Ionicons name="stats-chart" size={24} color="white" />
            <Text
              style={{
                marginLeft: 24,
                fontFamily: Fonts.QUICKSAND_MEDIUM,
                fontSize: FontSize.S,
                color: "white",
                marginBottom: 4,
              }}
            >
              Détails de ma production
            </Text>
          </TouchableOpacity>
        </LinearGradientWrapper>
      </View>
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
