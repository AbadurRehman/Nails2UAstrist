import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import Colors from "../../theme/Colors";
import GooglePacesAutoComplete from "../../components/GooglePlaces";
// import EventEmitter from "../../services/EventEmitter";
import { EventRegister } from "react-native-event-listeners";

const LATITUDEDELTA = 0.0922;
const LONGITUDEDELTA = 0.0421;

const AddLocation = (props) => {
  const [latlng, setLatLng] = React.useState(props.route.params.params);

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content">
      <Header {...props} title={"LOCATION"} />

      <GooglePacesAutoComplete
        latlng={latlng}
        setLatLng={setLatLng}
        LATITUDEDELTA={LATITUDEDELTA}
        LONGITUDEDELTA={LONGITUDEDELTA}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {latlng?.latitude && (
          <MapView
            style={{ ...StyleSheet.absoluteFillObject }}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            region={{
              latitude: latlng.latitude,
              longitude: latlng.longitude,
              latitudeDelta: LATITUDEDELTA,
              longitudeDelta: LONGITUDEDELTA,
            }}
          >
            <Marker
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setLatLng({
                  latitude,
                  longitude,
                  LATITUDEDELTA,
                  LONGITUDEDELTA,
                });
              }}
              coordinate={{
                latitude: latlng.latitude,
                longitude: latlng.longitude,
                latitudeDelta: LONGITUDEDELTA,
                longitudeDelta: LATITUDEDELTA,
              }}
            >
              <View style={{ width: 55, height: 55 }}>
                <Image
                  source={require("../../assets/images/Map.png")}
                  style={{
                    height: 55,
                    width: 55,
                  }}
                />
              </View>
            </Marker>
          </MapView>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            width: 100,
            height: 50,
            zIndex: 999,
            position: "absolute",
            bottom: 20,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            props.navigation.goBack();
            EventRegister.emit("locationChanged", latlng);
          }}
        >
          <ResponsiveText style={{ color: Colors.White }}>Select</ResponsiveText>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default AddLocation;
