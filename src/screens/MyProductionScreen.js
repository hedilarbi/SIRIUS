import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";

import { selectUserToken } from "../redux/slices/userSlice";
import { Colors, FontSize, Fonts, frenchMonthNames } from "../constants";
import Header from "../components/Header";
import { getPlantsData, plantHistoricalData } from "../services/plantServices";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import { yyyymmddFormat } from "../utils/dateFormaters";
import DateSlider from "../components/DateSlider";

const MyProductionScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [kits, setKits] = useState([]);
  const token = useSelector(selectUserToken);
  const filter = [
    { label: "Jour", value: "day" },
    { label: "Mois", value: "month" },
    { label: "Anneé", value: "year" },
  ];
  const [group, setGroup] = useState("day");

  const [addresses, setAddresses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(new Date().getMonth());
  const [historicalData, setHistoricalData] = useState([]);
  const [kit, setKit] = useState({});
  const [graphIsLoading, setGraphIsLoading] = useState(true);
  const slideRef = useRef(null);

  const [dates, setDates] = useState(
    frenchMonthNames.map((month, index) => ({
      label: month,
      value: index.toString(), // Use index as a unique key
    }))
  );
  const today = useRef(new Date());
  const [xAxisData, setXAxisData] = useState([
    "01",
    "03",
    "05",
    "07",
    "09",
    "12",
    "15",
    "18",
    "21",
    "24",
    "27",
    "30",
  ]);

  const fetchKits = async () => {
    setShowErrorScreen(false);
    try {
      const [getPlantsDataResponse] = await Promise.all([getPlantsData(token)]);
      if (getPlantsDataResponse.status === 200) {
        if (getPlantsDataResponse.data.code === 200) {
          setKits(getPlantsDataResponse.data.rows);

          const addressesList = getPlantsDataResponse.data.rows.map((row) => {
            return {
              label: row.location,
              value: row.location,
            };
          });
          setAddresses(addressesList);

          setKit(getPlantsDataResponse.data.rows[0]);
          return getPlantsDataResponse.data.rows;
        } else {
          setShowErrorScreen(true);
        }
      } else {
        setShowErrorScreen(true);
      }
    } catch (err) {
      setShowErrorScreen(true);
      console.log(err.message);
    }
  };

  const fetchPlantHistoricalData = async (kit, groupe, index) => {
    const date = new Date();
    date.setMonth(index);
    const formattedDate = yyyymmddFormat(date);
    setGraphIsLoading(true);
    try {
      const response = await plantHistoricalData(
        token,
        kit.powerStationGuid,
        kit.timezoneOffset,
        formattedDate,
        "day_energy",
        groupe
      );
      if (response.status === 200) {
        if (response.data.code === 200) {
          const formattedData = response.data.data.chart.map((item) => ({
            date: new Date(item.date).getFullYear().toString(),
            dayEnergy: item.dayEnergy || 0,
          }));

          setHistoricalData(formattedData);
        } else {
          console.log(response.data);
          setShowErrorScreen(true);
        }
      } else {
        setShowErrorScreen(true);
      }
    } catch (error) {
      console.log(error);
      setShowErrorScreen(true);
    } finally {
      setGraphIsLoading(false);
    }
  };

  const fetchData = async () => {
    const kits = await fetchKits();
    setIsLoading(false);
    if (kits.length > 0) {
      await fetchPlantHistoricalData(kits[0], group, currentIndex);
    }
  };
  const selectKit = async (value) => {
    const newKit = kits.find((item) => item.location === value);
    setKit(newKit);

    if (newKit) {
      setGraphIsLoading(true);
      try {
        await fetchPlantHistoricalData(newKit, group, currentIndex);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const updateGroup = async (item) => {
    setGraphIsLoading(true);
    setGroup(item.value);
    if (item.label === "Jour") {
      await fetchPlantHistoricalData(kit, item.value, currentIndex);
      setXAxisData([
        "01",
        "03",
        "05",
        "07",
        "09",
        "12",
        "15",
        "18",
        "21",
        "24",
        "27",
        "30",
        "31",
      ]);
    } else if (item.label === "Mois") {
      await fetchPlantHistoricalData(kit, item.value, currentIndex);
      setXAxisData([
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jui",
        "Juil",
        "Aou",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ]);
    } else {
      await fetchPlantHistoricalData(kit, item.value, currentIndex);
      const year = today.current.getFullYear();
      setXAxisData([year, year + 1]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );
  const handleNext = async () => {
    slideRef.current.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
      duration: 5000,
    });

    await fetchPlantHistoricalData(kit, group, currentIndex + 1);
    setCurrentIndex((prev) => prev + 1);
  };
  const handlePrevious = async () => {
    slideRef.current.scrollToIndex({
      index: currentIndex - 1,
      animated: true,
      duration: 5000,
    });

    setCurrentIndex((prev) => prev - 1);
    await fetchPlantHistoricalData(kit, group, currentIndex - 1);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (showErrorScreen) {
    return <ErrorScreen setRefresh={setRefresh} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {kits.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 24, marginTop: 12 }}>
            <Header navigation={navigation} />
          </View>
          <View style={{ width: "100%", paddingHorizontal: 24, marginTop: 12 }}>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              selectedStyle={styles.selectedStyle}
              itemContainerStyle={styles.itemContainerStyle}
              itemTextStyle={styles.itemTextStyle}
              containerStyle={styles.containerStyle}
              iconColor="white"
              data={addresses}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={kit.location}
              value={kit.location}
              onChange={(item) => selectKit(item.value)}
            />
            <View style={styles.info_container}>
              <Text style={styles.power_txt}>248.6</Text>
              <Text style={styles.power_unity_txt}>Watts</Text>
            </View>
          </View>
          <View style={styles.filter}>
            {filter.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{}}
                  key={index}
                  onPress={() => updateGroup(item)}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.QUICKSAND_BOLD,
                      fontSize: FontSize.S,
                      color: "white",
                      textDecorationLine:
                        group === item.value ? "underline" : "none",
                      marginBottom: 4,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <DateSlider
            dates={dates}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            slideRef={slideRef}
          />
          {graphIsLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                height: Dimensions.get("window").height / 2,
              }}
            >
              <ActivityIndicator size="large" color={Colors.PR} />
            </View>
          ) : historicalData.length > 0 && historicalData[0].dayEnergy ? (
            <LineChart
              data={{
                labels: xAxisData.map((item) => item),
                datasets: [
                  {
                    data: historicalData.map((item) => item.dayEnergy),
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={Dimensions.get("window").height / 2}
              yAxisLabel="Kwh"
              yAxisSuffix=""
              yAxisInterval={0.1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "white",
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",

                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  width: "100%",
                  height: "100%",
                },
                propsForDots: {
                  r: "2",
                  strokeWidth: "2",
                  stroke: "black",
                },
              }}
              bezier
              withShadow={false}
              withInnerLines={false}
              // withVerticalLines={false}
              // withHorizontalLines={false}
              style={{
                marginVertical: 12,
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                height: Dimensions.get("window").height / 2,

                paddingHorizontal: 36,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
                  fontSize: FontSize.M,
                  textAlign: "center",
                }}
              >
                Absence de données historiques dans ce kit
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Text
            style={{
              fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
              fontSize: FontSize.M,
            }}
          >
            Aucun Kit ajoutée
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyProductionScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.SC,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  selectedStyle: {
    height: 10,
  },
  icon: {
    marginRight: 5,
    color: "white",
  },
  itemContainerStyle: {
    padding: 0,
    margin: 0,
  },
  itemTextStyle: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    color: Colors.SC,
    fontSize: FontSize.XS,
    padding: 0,
    margin: 0,
  },
  containerStyle: {
    paddingHorizontal: 0,
    margin: 0,
  },

  placeholderStyle: {
    fontSize: FontSize.S,
    color: "white",
    fontFamily: Fonts.QUICKSAND_BOLD,
  },
  selectedTextStyle: {
    fontSize: FontSize.XS,
    color: "white",
    fontFamily: Fonts.QUICKSAND_BOLD,
  },
  info_container: {
    backgroundColor: Colors.BOXES_BG,
    width: "100%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 24,
  },
  power_txt: {
    textAlign: "center",
    color: Colors.PR,
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XXL,
  },
  power_unity_txt: {
    textAlign: "center",
    color: Colors.PR,
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.L,
  },
  filter: {
    backgroundColor: Colors.PR,
    borderRadius: 6,
    marginTop: 12,
    marginHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingVertical: 6,
  },
});
function getPastDates(days) {
  const today = new Date();
  const pastDates = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const label =
      i === 0
        ? "Aujourd'hui"
        : i === 1
        ? "hier"
        : date.toLocaleDateString("fr-FR", options);
    const value = date.toISOString().split("T")[0];

    pastDates.push({ label, value });
  }

  return pastDates;
}
