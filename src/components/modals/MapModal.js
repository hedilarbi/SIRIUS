import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LinearGradient } from "expo-linear-gradient";

import * as Location from "expo-location";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { Colors, FontSize, Fonts } from "../../constants";
import ErrorModal from "./ErrorModal";

const LOGITUDE_DELTA = 0.0121;
const LATITUDE_DELTA = 0.0122;

const MapModal = ({
  visiblity,
  setAddress,
  setCoords,
  setShowMapModal,
  address,
  coords,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LOGITUDE_DELTA,
  });

  const [mapLoading, setMapLoading] = useState(false);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handlePlaceSelect = async (data, details) => {
    Keyboard.dismiss();
    try {
      const { description } = details;
      setMapLoading(true);
      const response = await Location.geocodeAsync(description);

      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        setCoords({ latitude, longitude });
        setInitialRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LOGITUDE_DELTA,
        });

        setAddress(description);
        setMapLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkerPlace = async (e) => {
    try {
      const { longitude, latitude } = e.nativeEvent.coordinate;
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const address = response.data.results[0].formatted_address;

      setAddress(address);
      setCoords({ longitude, latitude });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);
  return (
    <Modal animationType="slide" visible={visiblity}>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          {isLoading && <Spinner />}
          <ErrorModal visiblity={showErrorModal} message="Operation Echoué" />

          <View style={styles.address_box}>
            <Text style={styles.title}>
              Quelle est l'adresse de votre kit ?
            </Text>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                width: "100%",
                zIndex: 50,
                paddingHorizontal: 10,
              }}
            >
              <GooglePlacesAutocomplete
                placeholder={address}
                onPress={(data, details) => handlePlaceSelect(data, details)}
                query={{
                  key: `${GOOGLE_MAPS_API_KEY}`,
                  language: "fr",
                }}
                styles={{
                  container: {},
                  textInputContainer: {},
                  textInput: {
                    fontSize: 20,
                    backgroundColor: Colors.BOXES_BG,
                    color: Colors.PR,
                    fontFamily: Fonts.QUICKSAND_BOLD,
                    paddingVertical: 8,
                  },
                  listView: {
                    position: "absolute",
                    top: 44,
                    left: -10, // Adjust this value as needed
                    width: "100%",
                    zIndex: 50,
                    paddingHorizontal: 10,
                  },
                  description: {
                    fontSize: 20,

                    color: Colors.PR,
                    fontFamily: Fonts.QUICKSAND_SEMI_BOLD,
                  },
                }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {mapLoading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={Colors.PR} />
              </View>
            ) : (
              <MapView
                style={{ flex: 1 }}
                initialRegion={initialRegion}
                provider={PROVIDER_GOOGLE}
                loadingEnabled={true}
                onPress={(e) => {
                  handleMarkerPlace(e);
                }}
              >
                {coords.longitude && (
                  <Marker
                    coordinate={{
                      latitude: coords.latitude,
                      longitude: coords.longitude,
                    }}
                    draggable
                    tappable
                    onDragEnd={(e) => {
                      handleMarkerPlace(e);
                    }}
                  />
                )}
              </MapView>
            )}
          </View>
          <LinearGradient
            colors={[Colors.PR, Colors.SC]}
            style={[{ width: "100%" }]}
            start={[0, 1]}
            end={[1, 0]}
          >
            <TouchableOpacity
              style={styles.confirm_btn}
              onPress={() => setShowMapModal(false)}
            >
              <Text style={styles.confirm_btn_txt}>Confirmer</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 24,
    width: "100%",
  },
  address_box: {
    height: 150,
  },
  title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    color: "white",
    textAlign: "center",
    marginTop: 24,
    color: Colors.PR,
  },
  confirm_btn: {
    alignItems: "center",
    paddingVertical: 24,
  },
  confirm_btn_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    color: "white",
  },
});
