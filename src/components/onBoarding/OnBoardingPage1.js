import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors, FontSize, Fonts } from "../../constants";

import FullLogo from "../../../assets/icons/FullLogo.svg";
import ArrowRight from "../../../assets/icons/ArrowRight.svg";

const OnBoardingPage1 = ({ item, setCurrentIndex, flatListRef }) => {
  const { width } = useWindowDimensions();

  const handleNext = () => {
    flatListRef.current.scrollToIndex({
      index: 1,
      animated: true,
      duration: 5000,
    });

    setCurrentIndex(1);
  };
  return (
    <View style={[styles.container, { width }]}>
      <FullLogo width={250} height={100} />

      <Text style={styles.title}>{item.title}</Text>
      <Image
        source={item.image}
        style={[styles.image, { width: 250, resizeMode: "contain" }]}
      />

      <Text style={styles.description}>{item.description}</Text>

      <View style={{ marginTop: 36 }}>
        <TouchableOpacity onPress={handleNext}>
          <ArrowRight width={50} height={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingPage1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: "center",
    paddingHorizontal: 36,
  },
  image: {
    justifyContent: "center",
    marginTop: 16,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XXL,
    textAlign: "center",
    marginTop: 26,
    color: Colors.PR,
  },
  description: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.M,
    textAlign: "center",
    marginTop: 12,
  },
});
