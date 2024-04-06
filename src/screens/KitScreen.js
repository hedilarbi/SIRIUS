import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Colors, FontSize, Fonts } from "../constants";
import { getPlant, updatePlant } from "../services/plantServices";
import { selectUserToken } from "../redux/slices/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import ErrorModal from "../components/modals/ErrorModal";
import Header from "../components/Header";
import { convertDateFromSlashtoDash, formatDate } from "../utils/dateFormaters";

import LinearGradientWrapper from "../components/LinearGradientWrapper";
import DeleteKitWarning from "../components/modals/DeleteKitWarning";
import Spinner from "../components/Spinner";
import MapModal from "../components/modals/MapModal";

const KitScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, powerStationGuid } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [kit, setKit] = useState(null);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [address, setAddress] = useState("");
  const [updatePower, setUpdatePower] = useState(false);
  const [power, setPower] = useState("");
  const [updatePrice, setUpdatePrice] = useState(false);
  const [price, setPrice] = useState("");
  const [updateBuildDate, setUpdatebuildDate] = useState(false);
  const [buildDate, setBuildDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState("");
  const myElementRef = useRef(null);
  const addressInputRef = useRef(null);
  const [coords, setCoords] = useState({});
  const [showDeleteKitWarning, setShowDeleteKitWarning] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const token = useSelector(selectUserToken);

  const fetchData = async () => {
    getPlant(token, powerStationGuid)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.code === 200) {
            setKit(response.data.data);
            setCoords({
              longitude: response.data.data.locationLongitude,
              latitude: response.data.data.locationLatitude,
            });
            setAddress(response.data.data.location);
            setDate(formatDate(response.data.data.buildDate));
          } else {
            setShowErrorModal(true);
          }
          setIsLoading(false);
        } else {
          setShowErrorModal(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setShowErrorModal(true);
        setIsLoading(false);
      });
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type == "set") {
      setBuildDate(selectedDate);

      setDate(formatDate(selectedDate));
      setShowDatePicker(false);
    } else {
      setShowDatePicker(false);
    }
  };
  const handleAddressTextInputFocus = () => {
    addressInputRef.current.blur();
    setShowMapModal(true);
  };
  const updateInfo = async () => {
    setIsLoading(true);
    var location;
    var locationLatitude;
    var locationLongitude;

    const buildDateDashFormat = convertDateFromSlashtoDash(date);

    const totalCost = price.length > 0 ? price : kit.totalCost;
    const installedCapacity = power.length > 0 ? power : kit.installedCapacity;
    if (address.length > 0) {
      location = address;
      locationLongitude = coords.longitude;
      locationLatitude = coords.latitude;
    } else {
      location = kit.location;
      locationLongitude = kit.locationLongitude;
      locationLatitude = kit.locationLatitude;
    }

    const {
      powerStationGuid,
      powerStationId,
      ownerUserId,
      ownerEmail,
      owner,
      timeZone,
      deptCode,
      deptId,
      guests,
      images,
    } = kit;
    try {
      const response = await updatePlant(
        token,
        powerStationGuid,
        powerStationId,
        ownerUserId,
        ownerEmail,
        owner,
        timeZone,
        deptCode,
        deptId,
        guests,
        images,
        location,
        locationLatitude,
        locationLongitude,
        buildDateDashFormat,
        totalCost,
        installedCapacity
      );

      if (response.status === 200 && response.data.code === 200) {
        fetchData();
        setUpdateLocation(false);
        setUpdatePower(false);
        setUpdatePrice(false);
        setUpdatebuildDate(false);
      } else {
        console.log(response.data);
        setShowErrorModal(true);
      }
      setIsLoading(false);
    } catch (err) {
      setShowErrorModal(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (showErrorModal) {
      const timer = setTimeout(() => {
        setShowErrorModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showErrorModal]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" && "padding"}
    >
      <SafeAreaView style={styles.container}>
        <ErrorModal
          visiblity={showErrorModal}
          message="Une erreur s'est produite"
        />
        {updateLocation && (
          <MapModal
            visiblity={showMapModal}
            setShowMapModal={setShowMapModal}
            setAddress={setAddress}
            setCoords={setCoords}
            coords={coords}
            address={address}
          />
        )}
        <DeleteKitWarning
          setShowDeleteKitWarning={setShowDeleteKitWarning}
          showDeleteKitWarning={showDeleteKitWarning}
          powerStationId={kit.powerStationId}
          powerStationGuid={powerStationGuid}
          setIsRequestLoading={setIsRequestLoading}
          setShowErrorModal={setShowErrorModal}
        />
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={new Date(buildDate)}
            onChange={onChangeDate}
            style={{ height: 120, marginTop: -10 }}
            maximumDate={new Date()}
          />
        )}
        {isRequestLoading && <Spinner />}

        <View style={{ marginTop: 12, paddingHorizontal: 24 }}>
          <Header navigation={navigation} />
        </View>
        <Text style={styles.title}>kit {name}</Text>
        <View
          style={{
            flex: 1,

            backgroundColor: Colors.BOXES_BG,
            borderTopRightRadius: 48,
            borderTopLeftRadius: 48,
            paddingHorizontal: 24,
            paddingTop: 12,
            marginTop: 12,
          }}
        >
          <ScrollView
            style={{
              flex: 1,
              width: "100%",
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 15,
            }}
          >
            <TouchableOpacity
              style={styles.nav_btn}
              onPress={() =>
                navigation.navigate("MyDevices", { powerStationGuid, name })
              }
            >
              <Text style={styles.nav_btn_txt}>Mes appareils ajoutés</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.info}>
              <View style={styles.info_box}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.box_info_title}>Localisation</Text>
                  <TouchableOpacity
                    onPress={() => setUpdateLocation(!updateLocation)}
                  >
                    <MaterialIcons name="edit" size={24} color={Colors.PR} />
                  </TouchableOpacity>
                </View>
                {updateLocation ? (
                  <TextInput
                    style={styles.input_info}
                    placeholder={kit.location}
                    ref={addressInputRef}
                    placeholderTextColor="#857878"
                    value={address}
                    editable={true}
                    onFocus={() => handleAddressTextInputFocus()}
                  />
                ) : (
                  <Text style={styles.box_info_txt}>{kit.location}</Text>
                )}
              </View>

              <View style={styles.info_box}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.box_info_title}>Puissance du Kit</Text>
                  <TouchableOpacity
                    onPress={() => setUpdatePower(!updatePower)}
                  >
                    <MaterialIcons name="edit" size={24} color={Colors.PR} />
                  </TouchableOpacity>
                </View>
                {updatePower ? (
                  <TextInput
                    style={styles.input_info}
                    keyboardType="numeric"
                    placeholder={kit.installedCapacity.toString()}
                    placeholderTextColor="#857878"
                    value={power}
                    onChangeText={(text) => setPower(text)}
                  />
                ) : (
                  <Text style={styles.box_info_txt}>
                    {kit.installedCapacity}
                  </Text>
                )}
              </View>
              <View style={styles.info_box}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.box_info_title}>Coût du kit</Text>
                  <TouchableOpacity
                    onPress={() => setUpdatePrice(!updatePrice)}
                  >
                    <MaterialIcons name="edit" size={24} color={Colors.PR} />
                  </TouchableOpacity>
                </View>
                {updatePrice ? (
                  <TextInput
                    style={styles.input_info}
                    keyboardType="numeric"
                    placeholder={kit.totalCost.toString()}
                    placeholderTextColor="#857878"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                  />
                ) : (
                  <Text style={styles.box_info_txt}>{kit.totalCost}</Text>
                )}
              </View>
              <View style={[styles.info_box, { borderBottomWidth: 0 }]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.box_info_title}>Date d’achat</Text>
                  <TouchableOpacity
                    onPress={() => setUpdatebuildDate(!updateBuildDate)}
                  >
                    <MaterialIcons name="edit" size={24} color={Colors.PR} />
                  </TouchableOpacity>
                </View>
                {updateBuildDate ? (
                  <Pressable onPress={() => setShowDatePicker(true)}>
                    <TextInput
                      style={styles.input_info}
                      placeholder="25 / 10 / 1999"
                      value={date}
                      editable={false}
                      onPressIn={() => setShowDatePicker(true)}
                    />
                  </Pressable>
                ) : (
                  <Text style={styles.box_info_txt}>{kit.buildDate}</Text>
                )}
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
              }}
            >
              {updateBuildDate ||
              updateLocation ||
              updatePower ||
              updatePrice ? (
                <LinearGradientWrapper>
                  <TouchableOpacity
                    style={styles.add_btn}
                    onPress={() => updateInfo()}
                  >
                    <Text style={styles.add_btn_txt}>Enregistrer</Text>
                  </TouchableOpacity>
                </LinearGradientWrapper>
              ) : (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: 60,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: "red",
                  }}
                  onPress={() => setShowDeleteKitWarning(true)}
                >
                  <Text style={styles.add_btn_txt}>Supprimer Kit</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default KitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  title: {
    fontSize: FontSize.L,
    fontFamily: Fonts.QUICKSAND_BOLD,
    marginTop: 24,
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
  nav_btn: {
    backgroundColor: Colors.PR,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
    borderRadius: 10,
  },
  nav_btn_txt: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.M,
    marginBottom: 4,
    color: "white",
  },
  box_info_title: {
    fontFamily: Fonts.QUICKSAND_BOLD,
    fontSize: FontSize.S,
    color: Colors.PR,
  },
  box_info_txt: {
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
    marginTop: 8,
  },
  input_info: {
    backgroundColor: "white",
    marginTop: 8,
    padding: 8,
    borderRadius: 8,
    fontFamily: Fonts.QUICKSAND_MEDIUM,
    fontSize: FontSize.S,
  },

  info: {
    marginTop: 24,
    flex: 1,
    zIndex: -1,
  },
  info_box: {
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 16,
  },
});
