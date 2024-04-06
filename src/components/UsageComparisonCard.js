import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Colors, FontSize, Fonts } from "../constants";
import { Ionicons } from "@expo/vector-icons";

const UsageComparisonCard = ({ t, tMinusOne, mode }) => {
  const [current, setCurrent] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    switch (mode) {
      case "daily":
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        const dayNameInFrench = currentDate
          .toLocaleString("fr-FR", {
            weekday: "long",
            timeZone: "UTC",
            locale: "fr-FR",
          })
          .split(" ")[0];
        const yesterdayName = yesterday
          .toLocaleString("fr-FR", {
            weekday: "long",
            timeZone: "UTC",
            locale: "fr-FR",
          })
          .split(" ")[0];

        setCurrent(dayNameInFrench);
        setPrevious(yesterdayName);
        break;

      case "monthly":
        const monthNameInFrench = currentDate.toLocaleString("fr-FR", {
          month: "long",
          timeZone: "UTC",
          locale: "fr-FR",
        });
        let previousMonth = currentDate.getMonth();
        const previousMonthName = new Date(
          currentDate.getFullYear(),
          previousMonth
        ).toLocaleString("fr-FR", {
          month: "long",
          timeZone: "UTC",
          locale: "fr-FR",
        });
        setCurrent(monthNameInFrench);
        setPrevious(previousMonthName);
        break;
      case "yearly":
        const currentYear = currentDate.getFullYear();
        const previousYear = currentDate.getFullYear() - 1;
        setCurrent(currentYear);
        setPrevious(previousYear);
        break;
    }
  }, []);

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
            {current}{" "}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_MEDIUM,
              fontSize: FontSize.S,
              marginTop: 8,
              color: "black",
            }}
          >
            {t.toFixed(2)} Wh
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
            {previous}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_MEDIUM,
              fontSize: FontSize.S,
              marginTop: 8,
              color: "#9D9D9D",
            }}
          >
            {tMinusOne.toFixed(2)} Wh
          </Text>
        </View>
        {t >= tMinusOne ? (
          <Ionicons name="trending-up-outline" size={48} color="green" />
        ) : (
          <Ionicons name="trending-down-outline" size={48} color="red" />
        )}
      </View>
    </View>
  );
};

export default UsageComparisonCard;

const styles = StyleSheet.create({});
