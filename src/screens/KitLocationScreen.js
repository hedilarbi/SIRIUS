import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import * as Location from "expo-location";

import { Colors, FontSize, Fonts } from "../constants";
import { selectUserToken, selectUser } from "../redux/slices/userSlice";
import {
  addDevice,
  createPlant,
  deletePlant,
  getPlantsData,
} from "../services/plantServices";
import { GOOGLE_MAPS_API_KEY } from "@env";
import Header from "../components/Header";
import ErrorModal from "../components/modals/ErrorModal";
import Spinner from "../components/Spinner";
import axios from "axios";

const LOGITUDE_DELTA = 0.0121;
const LATITUDE_DELTA = 0.0122;

const KitLocationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const { serialNumber, name, power } = route.params;
  const [mapLoading, setMapLoading] = useState(true);
  const [error, setError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const user = useSelector(selectUser);
  const token = useSelector(selectUserToken);

  const createPlantAndDevice = async () => {
    setIsLoading(true);

    try {
      const plantResponse = await createPlant(
        token,
        name,
        power,
        power,
        location.longitude.toString(),
        location.latitude.toString(),
        address,
        user.userId.toString(),
        user.email,
        user.userName
      );

      if (plantResponse.status === 200 && plantResponse.data.code === 200) {
        const plantsDataResponse = await getPlantsData(token);

        if (
          plantsDataResponse.status === 200 &&
          plantsDataResponse.data.code === 200
        ) {
          const list = plantsDataResponse.data.rows;
          const kit = list.find((item) => item.location === address);

          if (kit) {
            const deviceResponse = await addDevice(
              token,
              kit.powerStationGuid,
              serialNumber,
              kit.powerStationId
            );

            if (deviceResponse.status === 200) {
              if (deviceResponse.data.code === 500) {
                setShowErrorModal(true);
                const deleteKitResponse = await deletePlant(
                  token,
                  kit.powerStationId
                );
              } else {
                navigation.navigate("Home");
              }
            } else {
              setShowErrorModal(true);
            }
          } else {
            setShowErrorModal(true);
          }
        } else {
          setShowErrorModal(true);
        }
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowErrorModal(true);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceSelect = async (data, details) => {
    Keyboard.dismiss();
    try {
      const { description } = details;
      setMapLoading(true);
      const response = await Location.geocodeAsync(description);

      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        setLocation({ latitude, longitude });
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
      setLocation({ longitude, latitude });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let response = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000,
      });
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${response.coords.latitude},${response.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const address = res.data.results[0].formatted_address;

      setAddress(address);

      setInitialRegion({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LOGITUDE_DELTA,
      });

      setLocation(response.coords);
      setMapLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Spinner />}
      <ErrorModal visiblity={showErrorModal} message="Operation Echoué" />
      <View style={{ paddingHorizontal: 24 }}>
        <Header navigation={navigation} />
      </View>
      <View style={styles.address_box}>
        <Text style={styles.title}>Quelle est l'adresse de votre kit ?</Text>
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
            placeholder="Adresse"
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
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable
              tappable
              onDragEnd={(e) => {
                handleMarkerPlace(e);
              }}
            />
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
          onPress={createPlantAndDevice}
        >
          <Text style={styles.confirm_btn_txt}>Confirmer</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default KitLocationScreen;

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
