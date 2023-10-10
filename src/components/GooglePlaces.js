import React from "react";
import { View, Text, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_APIKEY } from "../services/config";

function GooglePlaces({ latlng, setLatLng, LATITUDEDELTA, LONGITUDEDELTA }) {
  return (
    <View
      style={{
        flex: 0.4,
        padding: 10,
        position: "absolute",
        width: Dimensions.get("window").width,
        top: 55,
        zIndex: 999,
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true} //TO BRING ALL DETAILS ABOUT LOCAITON
        placeholder="Search Your Place"
        query={{
          key: "AIzaSyB1ATljOQdQSbKf_-icbQbfQqBqZlmwD0I",
          language: "en",
        }}
        style={{
          color: "black",
        }}
        textInputProps={{ placeholderTextColor: "#bebebe", color: "black" }}
        onPress={(data, details) => {
          setLatLng({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA,
          });
        }}
        onFail={(error) => console.error(error)}
      />
    </View>
  );
}
export default GooglePlaces;
