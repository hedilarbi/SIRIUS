import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { Colors, FontSize, Fonts } from "../constants";
import {
  getPlant,
  getPlantsData,
  plantHistoricalData,
} from "../services/plantServices";
import { selectUserToken } from "../redux/slices/userSlice";
import KitHome from "../components/KitHome";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import Logo from "../../assets/icons/Logo.svg";
import LinearGradientWrapper from "../components/LinearGradientWrapper";
import { yyyymmddFormat } from "../utils/dateFormaters";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [kits, setKits] = useState(null);
  const [totalEnergy, setTotalEnergy] = useState(0);
  const [totalCO2, setTotalCO2] = useState(0);
  const [isLoading, setIsloading] = useState(true);

  const [showErrorScreen, setShowErrorScreen] = useState(false);

  const [refresh, setRefresh] = useState(0);
  const token = useSelector(selectUserToken);
  const [averageEnergyCurrentDay, setAverageEnergyCurrentDay] = useState(0);
  const [averageEnergyDayMinus1, setAverageEnergyDayMinus1] = useState(0);
  const [averageEnergyCurrentYear, setAverageEnergyCurrentYear] = useState(0);
  const [averageEnergyYearMinus1, setAverageEnergyYearMinus1] = useState(0);
  const [averageEnergyCurrentMonth, setAverageEnergyCurrentMonth] = useState(0);
  const [averageEnergyMonthMinus1, setAverageEnergyMonthMinus1] = useState(0);

  const fetchData = async () => {
    setShowErrorScreen(false);
    setIsloading(true);

    try {
      const [getPlantsDataResponse] = await Promise.all([getPlantsData(token)]);

      if (getPlantsDataResponse.status === 200) {
        if (getPlantsDataResponse.data.code === 200) {
          let total_energy = 0;
          let total_co2 = 0;
          let energyCurrentDay = 0;
          let energyDayMinus1 = 0;
          let energyCurrentMonth = 0;
          let EnergyMonthMinus1 = 0;
          let EnergyCurrentYear = 0;
          let EnergyYearMinus1 = 0;
          const date = new Date();
          const todayDate = date.toISOString().split("T")[0] + "T00:00:00";
          const formattedDate = yyyymmddFormat(date);

          if (getPlantsDataResponse.data.rows.length > 0) {
            for (let i = 0; i < getPlantsDataResponse.data.rows.length; i++) {
              const kit = getPlantsDataResponse.data.rows[i];

              const [
                responsePlantInfo,
                responsePlantDayHistoricalData,
                responsePlantMonthHistoricalData,
                responsePlantYearHistoricalData,
              ] = await Promise.all([
                getPlant(token, kit.powerStationGuid),
                plantHistoricalData(
                  token,
                  kit.powerStationGuid,
                  kit.timezoneOffset,
                  formattedDate,
                  "day_energy",
                  "day"
                ),
                plantHistoricalData(
                  token,
                  kit.powerStationGuid,
                  kit.timezoneOffset,
                  formattedDate,
                  "day_energy",
                  "month"
                ),
                plantHistoricalData(
                  token,
                  kit.powerStationGuid,
                  kit.timezoneOffset,
                  formattedDate,
                  "day_energy",
                  "year"
                ),
              ]);

              const co2 = responsePlantInfo.data.data.co2Reduced;
              let dailyChartIndex = -1;
              let monthlyChartIndex = -1;
              let yearlyChartIndex = -1;

              if (responsePlantDayHistoricalData.data.data.chart.length > 0) {
                dailyChartIndex =
                  responsePlantDayHistoricalData.data.data.chart.findIndex(
                    (item) => item?.date === todayDate
                  );
              }

              if (responsePlantMonthHistoricalData.data.data.chart.length > 0) {
                monthlyChartIndex =
                  responsePlantMonthHistoricalData.data.data.chart.findIndex(
                    (item) => item?.date === todayDate
                  );
              }
              if (responsePlantYearHistoricalData.data.data.chart.length > 0) {
                yearlyChartIndex =
                  responsePlantYearHistoricalData.data.data.chart.findIndex(
                    (item) => item?.date === todayDate
                  );
              }
              if (dailyChartIndex > -1) {
                energyCurrentDay +=
                  responsePlantDayHistoricalData.data.data.chart[
                    dailyChartIndex
                  ].dayEnergy || 0;
                energyDayMinus1 +=
                  responsePlantDayHistoricalData.data.data.chart[
                    dailyChartIndex - 1
                  ].dayEnergy || 0;
              }
              if (monthlyChartIndex > -1) {
                energyCurrentMonth +=
                  responsePlantMonthHistoricalData.data.data.chart[
                    monthlyChartIndex
                  ].dayEnergy || 0;
                EnergyMonthMinus1 +=
                  responsePlantMonthHistoricalData.data.data.chart[
                    monthlyChartIndex - 1
                  ].dayEnergy || 0;
              }
              if (yearlyChartIndex > -1) {
                EnergyCurrentYear +=
                  responsePlantYearHistoricalData.data.data.chart[
                    yearlyChartIndex
                  ].dayEnergy || 0;
                EnergyYearMinus1 +=
                  responsePlantYearHistoricalData.data.data.chart[
                    yearlyChartIndex - 1
                  ].dayEnergy || 0;
              }
              const stringWithoutLastTwo = co2.slice(0, -2);

              const resultAsNumber = parseInt(stringWithoutLastTwo, 10);
              total_co2 += resultAsNumber;
              total_energy += responsePlantInfo.data.data.totalEnergy;
            }

            setAverageEnergyCurrentDay(
              energyCurrentDay / getPlantsDataResponse.data.rows.length
            );
            setAverageEnergyCurrentMonth(
              energyCurrentMonth / getPlantsDataResponse.data.rows.length
            );
            setAverageEnergyCurrentYear(
              EnergyCurrentYear / getPlantsDataResponse.data.rows.length
            );
            setAverageEnergyDayMinus1(
              energyDayMinus1 / getPlantsDataResponse.data.rows.length
            );
            setAverageEnergyMonthMinus1(
              EnergyMonthMinus1 / getPlantsDataResponse.data.rows.length
            );
            setAverageEnergyYearMinus1(
              EnergyYearMinus1 / getPlantsDataResponse.data.rows.length
            );

            setTotalCO2(total_co2);
            setTotalEnergy(total_energy);
          }
          setKits(getPlantsDataResponse.data.rows);
          setIsloading(false);
        } else {
          setShowErrorScreen(true);
        }
      } else {
        setShowErrorScreen(true);
      }
    } catch (err) {
      console.log(err);
      setShowErrorScreen(true);
      setIsloading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [refresh])
  );

  useEffect(() => {
    fetchData();
  }, [refresh]);

  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {kits?.length > 0 ? (
        <ScrollView
          style={{ flex: 1, width: "100%" }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 12,
            flexGrow: 1,
          }}
        >
          <Logo width={50} height={50} />
          <KitHome
            kits={kits}
            totalEnergy={totalEnergy}
            totalCO2={totalCO2}
            averageEnergyCurrentDay={averageEnergyCurrentDay}
            averageEnergyCurrentMonth={averageEnergyCurrentMonth}
            averageEnergyCurrentYear={averageEnergyCurrentYear}
            averageEnergyDayMinus1={averageEnergyDayMinus1}
            averageEnergyMonthMinus1={averageEnergyMonthMinus1}
            averageEnergyYearMinus1={averageEnergyYearMinus1}
          />
        </ScrollView>
      ) : (
        <>
          <View style={{ alignItems: "center", marginTop: 12 }}>
            <Logo width={50} height={50} />
          </View>
          <View style={{ flex: 1, paddingBottom: 12, paddingHorizontal: 12 }}>
            <View style={{ flex: 1, width: "100%", marginTop: 24 }}>
              <TouchableOpacity
                style={styles.add_title_box}
                onPress={() => navigation.navigate("AddDevice")}
              >
                <Text style={styles.add_title_text}>
                  Ajouter votre premier appareil
                </Text>
                <FontAwesome name="plus" size={30} color={Colors.PR} />
              </TouchableOpacity>
            </View>
            <LinearGradientWrapper>
              <TouchableOpacity
                style={styles.add_btn}
                onPress={() => navigation.navigate("AddDevice")}
              >
                <Feather name="plus" size={24} color="white" />
                <Text style={styles.add_btn_txt}>Ajouter un appareil</Text>
              </TouchableOpacity>
            </LinearGradientWrapper>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  add_title_box: {
    borderRadius: 12,
    backgroundColor: Colors.BOXES_BG,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 42,
    width: "100%",
  },
  add_title_text: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginBottom: 20,
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
    paddingHorizontal: 24,
  },
  add_btn_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    color: "white",
    marginBottom: 4,
    marginLeft: 8,
  },
});
