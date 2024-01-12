import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";

import { selectUserToken } from "../redux/slices/userSlice";
import { Colors, FontSize, Fonts } from "../constants";
import Header from "../components/Header";

const MyProductionScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const token = useSelector(selectUserToken);
  const filter = ["1j", "7j", "4s", "1a"];
  const addresses = [
    { label: "Toutes mes adresses", value: "Toutes mes adresses" },
    { label: "rue 1", value: "rue 1" },
    { label: "rue 3", value: "rue 3" },
    { label: "rue 4", value: "rue 4" },
  ];
  const [addressFilter, setAddressFilter] = useState("Toutes mes addresse");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            placeholder={addressFilter}
            value={addressFilter}
          />
          <View style={styles.info_container}>
            <Text style={styles.power_txt}>248.6</Text>
            <Text style={styles.power_unity_txt}>Watts</Text>
          </View>
        </View>

        <View style={styles.filter}>
          {filter.map((item, index) => {
            return (
              <TouchableOpacity style={{}} key={index}>
                <Text
                  style={{
                    fontFamily: Fonts.QUICKSAND_BOLD,
                    fontSize: FontSize.S,
                    color: "white",
                    marginBottom: 4,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.days_filter_container}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-left" size={36} color={Colors.PR} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontFamily: Fonts.QUICKSAND_BOLD,
              fontSize: FontSize.M,
              marginBottom: 4,
            }}
          >
            Aujourd'hui
          </Text>
          <TouchableOpacity>
            <MaterialIcons name="arrow-right" size={36} color={Colors.PR} />
          </TouchableOpacity>
        </View>
        <LineChart
          data={{
            labels: ["Jan", "Fev", "Mars", "Avr", "Mai", "Jui"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={Dimensions.get("window").height / 2}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
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
              r: "6",
              strokeWidth: "2",
              stroke: "black",
            },
          }}
          bezier
          style={{
            marginVertical: 12,
            width: "100%",
            height: "100%",
          }}
        />
      </ScrollView>
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
    fontSize: FontSize.M,
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
    fontSize: FontSize.S,
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
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingVertical: 6,
  },
  days_filter_container: {
    marginTop: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
