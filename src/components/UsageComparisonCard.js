import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Colors, FontSize, Fonts } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const UsageComparisonCard = () => {
  return (
    <View
      style={{
        marginTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: Colors.PR,
        width: "100%",
        paddingBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_BOLD,
              fontSize: FontSize.S,
              color: Colors.PR,
            }}
          >
            Jeudi
          </Text>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_MEDIUM,
              fontSize: FontSize.S,
              marginTop: 8,
              color: "black",
            }}
          >
            660.00 Wh
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_BOLD,
              fontSize: FontSize.S,
              color: Colors.PR,
            }}
          >
            Mercredi
          </Text>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_MEDIUM,
              fontSize: FontSize.S,
              marginTop: 8,
              color: "#9D9D9D",
            }}
          >
            660.00 Wh
          </Text>
        </View>
        <Ionicons name="trending-up-outline" size={48} color="green" />
      </View>
    </View>
  );
};

export default UsageComparisonCard;

const styles = StyleSheet.create({});
