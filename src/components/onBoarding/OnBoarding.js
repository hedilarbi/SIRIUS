import { View, StyleSheet, FlatList, Animated } from "react-native";
import React, { useRef, useState } from "react";

import { OnBoardingSlides } from "../../constants";
import Paginator from "./Paginator";
import OnBoardingPage1 from "./OnBoardingPage1";
import OnBoardingPage2 from "./OnBoardingPage2";
import OnBoardingPage3 from "./OnBoardingPage3";

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = ({ item }) => {
    switch (item.type) {
      case "component1":
        return (
          <OnBoardingPage1
            item={item}
            setCurrentIndex={setCurrentIndex}
            flatListRef={slideRef}
          />
        );
      case "component2":
        return (
          <OnBoardingPage2
            item={item}
            setCurrentIndex={setCurrentIndex}
            flatListRef={slideRef}
          />
        );
      case "component3":
        return <OnBoardingPage3 item={item} currentIndex={currentIndex} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={OnBoardingSlides}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slideRef}
        />
      </View>

      <Paginator data={OnBoardingSlides} currentIndex={currentIndex} />
    </View>
  );
};

export default OnBoarding;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
