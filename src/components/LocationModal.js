import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { store } from "../redux/store";

// import { wp } from "../helpers/Responsiveness";
import { wp } from "../components/Responsiveness";

import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";

const LocationModal = (props) => {
  const [locations, setLocations] = useState([]);

  const navigateToAddLocation = () => {
    props.navigation.navigate("AddLocation", { params: props.latLng });
    props.setModalVisible(false);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    const locationuser = await AsyncStorage.getItem("userLocations");
    if (locationuser) {
      const location = JSON.parse(locationuser);
      setLocations(location);
    }
  };

  useEffect(() => {
    const updateloc = EventRegister.addEventListener("locationUpdated", () => {
      getUserLocation();
    });
    return () => {
      EventRegister.removeEventListener(updateloc);
    };
  }, []);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => props.setModalVisible(false)}
          activeOpacity={0.9}
          style={styles.modalContainer}
        >
          <TouchableOpacity onPress={() => props.setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalInner}>
              <TouchableOpacity onPress={navigateToAddLocation} style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={require("../assets/images/Plus.png")} />
                <Text allowFontScaling={false} style={{ marginLeft: 10 }}>
                  Add New Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToAddLocation} style={styles.locationText}>
                <Image source={require("../assets/images/current_location.png")} />
                <Text allowFontScaling={false} style={{ color: "#797979", marginLeft: 8 }}>
                  Current Location
                </Text>
              </TouchableOpacity>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {locations?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        props.setModalVisible(false);
                        props.navigation.navigate("AddLocation", {
                          params: {
                            latitude: item.position.lat,
                            longitude: item.position.lng,
                          },
                        });
                      }}
                    >
                      <Text allowFontScaling={false} style={styles.homeText}>
                        {"\u2726"} {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = {
  modalContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  modalContent: {
    height: "30%",
    width: "95%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: wp(5),
    paddingLeft: wp(10),
    position: "absolute",
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  locationText: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  homeText: {
    color: "#797979",
    marginLeft: wp(8),
    paddingVertical: 10,
  },
};
export default LocationModal;
