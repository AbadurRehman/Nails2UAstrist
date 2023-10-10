import { Platform, PermissionsAndroid, Linking, ToastAndroid } from "react-native";
import Geocoder from "react-native-geocoder";
import Geolocation from "react-native-geolocation-service";
// import EventEmitter from "../services/EventEmitter";
// import { userLocation } from "../redux/user/dashboardReducer";
import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocation = async () => {
  await Geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const Location = {
        lat: latitude,
        lng: longitude,
      };
      const address = await findAddress(Location);
      const locationDetail = {
        latitude,
        longitude,
        locationName: address,
      };
      EventRegister.emit("addressFound", locationDetail);
    },
    (error) => console.log("Error", JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
  );
};
export const findAddress = async (Location) => {
  let placeName = "";
  await Geocoder.geocodePosition(Location)
    .then(async (res) => {
      placeName = res[0].formattedAddress;

      const locationuser = await AsyncStorage.getItem("userLocations");
      // console.log("userLocations---", locationuser, res[0].formattedAddress);
      let location = [];

      if (locationuser) {
        location = JSON.parse(locationuser);
      }

      if (location.length == 0) {
        location.push({
          name: res[0].formattedAddress,
          position: res[0].position,
        });
        await AsyncStorage.setItem("userLocations", JSON.stringify(location));
      } else {
        const find = location?.some((i) => i.name == res[0].formattedAddress);
        if (!find) {
          location.push({
            name: res[0].formattedAddress,
            position: res[0].position,
          });
          await AsyncStorage.setItem("userLocations", JSON.stringify(location));
        }
      }

      //   if (store.getState().dashboardReducer.userLocations.length == 0) {
      //     store.dispatch(
      //       userLocation({
      //         name: res[0].formattedAddress,
      //         position: res[0].position,
      //       })
      //     );
      //   } else {
      //     const find = store.getState().dashboardReducer.userLocations?.some((i) => i.name == res[0].formattedAddress);
      //     if (!find) {
      //       store.dispatch(
      //         userLocation({
      //           name: res[0].formattedAddress,
      //           position: res[0].position,
      //         })
      //       );
      //     }
      //   }
    })
    .catch((err) => console.log(err));
  return placeName;
};
export const hasLocationPermission = async () => {
  if (Platform.OS === "ios") {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === "android" && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show("Location permission denied by user.", ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show("Location permission revoked by user.", ToastAndroid.LONG);
  }

  return false;
};
const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert("Unable to open settings");
    });
  };
  const status = await Geolocation.requestAuthorization("whenInUse");

  if (status === "granted") {
    return true;
  }

  if (status === "denied") {
    Alert.alert("Location permission denied");
  }

  if (status === "disabled") {
    Alert.alert(`Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`, "", [
      { text: "Go to Settings", onPress: openSetting },
      { text: "Don't Use Location", onPress: () => {} },
    ]);
  }

  return false;
};
