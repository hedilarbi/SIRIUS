import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { Colors, FontSize, Fonts } from "../../constants";

const KitLocationSlide = ({ width, slideAnimValue, handlePrevious }) => {
  return (
    <Animated.View
      style={{
        alignItems: "center",
        width,
        paddingHorizontal: 24,
        paddingVertical: 24,
        transform: [{ translateX: slideAnimValue }],
        flex: 1,
      }}
    >
      <TouchableOpacity
        onPress={handlePrevious}
        style={{ alignSelf: "flex-start" }}
      >
        <Ionicons name="arrow-undo" size={24} color="black" />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
        >
          {/* <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          draggable
          tappable
          onDragEnd={(e) => handleMarkerPlace(e)}
        /> */}
        </MapView>
      </View>
    </Animated.View>
  );
};

export default KitLocationSlide;

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    marginTop: 32,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.XL,
    textAlign: "center",
    marginTop: 32,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 5,
    textAlign: "center",
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    width: "100%",
    marginTop: 32,
  },
  btn: {
    flexDirection: "row",
    backgroundColor: Colors.PR,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 32,
    width: "100%",
    marginTop: 32,
  },
  btn_text: {
    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
    fontSize: FontSize.M,
    color: "white",
    marginRight: 12,
    marginTop: -4,
  },
  info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginLeft: 12,
    marginTop: -2,
  },
});
