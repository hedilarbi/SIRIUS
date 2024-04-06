import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, FontSize, Fonts } from "../constants";
const DateSlider = ({
  dates,
  currentIndex,
  setCurrentIndex,
  handleNext,
  handlePrevious,
  slideRef,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const { width } = useWindowDimensions();
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: width - 100 }} key={index}>
        <Text
          style={{
            textAlign: "center",
            fontFamily: Fonts.QUICKSAND_BOLD,
            fontSize: FontSize.M,
            marginBottom: 4,
          }}
          k
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {currentIndex <= 0 ? (
        <View style={{ backgroundColor: "white", width: 36 }}></View>
      ) : (
        <TouchableOpacity onPress={() => handlePrevious()}>
          <MaterialIcons name="arrow-left" size={36} color={Colors.PR} />
        </TouchableOpacity>
      )}

      <View style={{ flex: dates.length }}>
        <FlatList
          data={dates}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.value}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slideRef}
          initialScrollIndex={currentIndex}
          getItemLayout={(data, index) => ({
            length: width - 100,
            offset: (width - 100) * index,
            index,
          })}
        />
      </View>
      {currentIndex >= dates.length - 1 ||
      new Date().getMonth() == currentIndex ? (
        <View style={{ backgroundColor: "white", width: 36 }}></View>
      ) : (
        <TouchableOpacity onPress={() => handleNext()}>
          <MaterialIcons name="arrow-right" size={36} color={Colors.PR} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DateSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
});
