import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
  Platform,
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
// import { store } from "../../redux/store";
import MapView, { Marker, PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import Header from "../../components/Header";
import { wp } from "../../components/Responsiveness";

import Colors from "../../theme/Colors";
import Fonts from "../../theme/fonts";
import LinearGradient from "react-native-linear-gradient";
import MapPin from "../../assets/images/MapPin.png";
import side_arrow from "../../assets/images/side_arrow.png";
import BurgerMenu from "../../assets/images/burger_menu.png";
import Stars from "../../assets/images/christmas-stars.png";
import ArrowDown from "../../assets/images/arrow_down.png";
// import GOOGLE_MAPS_APIKEY from "../../services/config";
// import { nail2UDashboardApiService } from "../../services/Nail2UDashboardApiService";
import { EventRegister } from "react-native-event-listeners";
import { getLocation, findAddress, hasLocationPermission } from "../../services/GoogleMap";
import moment from "moment";
import { locationReached, postLocationStart } from "../../utils/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

class StartService extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.route.params;
    this.state = {
      coordinate: {
        latitude: undefined,
        longitude: undefined,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      destination: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      animateCoord: new AnimatedRegion({
        latitude: 31.5194,
        longitude: 74.3228,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      routeCoordinates: [],

      time: 0,
      distance: 0,
      bookingDetail: {},
      modalVisible: false,
      locationName: "",
      letLng: "",
      loading: false,
      timeJob: "",
      chatmessge: false,
    };
  }

  async componentDidMount() {
    this.findLocation();
    this.getBookingDetail();
    this.checkPermissions();

    this.address = EventRegister.addEventListener("addressFound", (locationDetail) => {
      const { locationName, ...rest } = locationDetail;
      // setLocationName(locationName);
      // console.log("address found=--", locationName);
      this.setState({
        locationName: locationName,
        letLng: rest,
      });
    });

    this.newMessage = EventRegister.addEventListener("newMessage", (message: string) => {
      this.setState({
        chatmessge: true,
      });
    });

    this.readChat = EventRegister.addEventListener("ReadChat", (message: string) => {
      this.setState({
        chatmessge: false,
      });
    });

    const chat = await AsyncStorage.getItem("chat_message");
    if (chat) {
      this.setState({
        chatmessge: true,
      });
    }

    if (this.params?.item?.booking_location?.user_latitude && this.params?.item?.booking_location?.user_longitude) {
      // longitude: longitude ? longitude : 0,
      // latitude: latitude ? latitude : 0
      this.setState({
        destination: {
          latitude: this.params?.item?.booking_location?.user_latitude
            ? parseFloat(this.params?.item?.booking_location?.user_latitude)
            : 0,
          longitude: this.params?.item?.booking_location?.user_longitude
            ? parseFloat(this.params?.item?.booking_location?.user_longitude)
            : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      });
    }

    if (this.params?.item?.schedule_booking) {
      let t = this.params?.item?.schedule_booking[0]?.time;
      this.setState({
        timeJob: t,
      });
    }
    // this.timer = setInterval(() => {
    //   // console.log('work')
    //   const set = {
    //     latitude: this.state.coordinate.latitude + 0.001,
    //     longitude: this.state.coordinate.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421
    //   }
    //   this.setState({ coordinate: set })

    // }, 10000)

    this.interval = setInterval(() => {
      this.handleSubmitButtonnew(
        this.params?.item?.id,
        this.state.coordinate?.longitude,
        this.state.coordinate?.latitude
      );
    }, 30000);
  }

  handleSubmitButtonnew = async (id, long, lat) => {
    // console.log(id, long, lat);
    if (id && long && lat) {
      // setLoading(true);
      await postLocationStart(id, long, lat, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            // setLoading(false);
            alert(res.errors);
          } else {
            // setLoading(false);
            alert(res.errors[0]);
          }
        } else {
          // console.log("postLocationStart===", res);
          // setLoading(false);
          // EventRegister.emit("JobAccept");
          // props.navigation.navigate("StartService", {
          //   item: props?.item,
          // });
        }
      });
    }
  };

  checkPermissions = async () => {
    const status = await hasLocationPermission();
    if (status) {
      this.locationMethods();
    }
  };

  handleSubmitButton = async (id) => {
    if (id) {
      // setLoading(true);
      this.setState({
        loading: true,
      });
      await locationReached(id, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            // setLoading(false);
            this.setState({
              loading: false,
            });
            alert(res.errors);
          } else {
            // setLoading(false);
            this.setState({
              loading: false,
            });
            alert(res.errors[0]);
          }
        } else {
          this.setState({
            loading: false,
          });
          this.setState({
            modalVisible: false,
          });
          this.props.navigation.goBack();
          EventRegister.emit("JobAccept");

          // setLoading(false);
          // EventRegister.emit("JobAccept");
          // props.navigation.navigate("StartService", {
          //   item: props?.item,
          // });
        }
      });
    }
  };

  locationMethods = async () => {
    await getLocation();
    // setModalVisible2(props.modalState);
    // setModalVisible3(props.modalFeedback);
  };
  getBookingDetail = async () => {
    // const res = await nail2UDashboardApiService.getTrackingBooking(
    //   this.props.route.params.id
    // );
    // this.setState({ bookingDetail: res.data.records });
  };
  findLocation = async () => {
    // console.log("findLocation---");
    await Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = position;
        const { latitude, longitude } = initialPosition.coords;
        // console.log("findLocation---", latitude, longitude);
        const newPosition = {
          longitude: longitude ? longitude : 0,
          latitude: latitude ? latitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        this.setState({ coordinate: newPosition });
      },
      (error) => console.log("Error", JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
    );
    this.watchID = await Geolocation.watchPosition((position) => {
      const lastPosition = position;

      const { latitude, longitude } = lastPosition.coords;

      const newPosition = {
        longitude: longitude ? longitude : 0,
        latitude: latitude ? latitude : 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      const newCoordinate = {
        latitude,
        longitude,
      };
      const duration = 500;
      if (Platform.OS === "android") {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(newCoordinate, 500);
        }
      } else {
        // console.log(newCoordinate)
        // this.state.animateCoord.timing({
        //   newCoordinate,
        //   duration
        // }).start();
        //this.state.animateCoord.timing({newCoordinate,duration}).start();
      }

      this.setState({
        routeCoordinates: this.state.routeCoordinates.concat([newCoordinate]),
        animateCoord: newPosition,
        coordinate: newPosition,
      });
    });
  };
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    EventRegister.removeEventListener(this.address);
    EventRegister.removeEventListener(this.newMessage);
    EventRegister.removeEventListener(this.readChat);
    clearInterval(this.interval);
  }
  render() {
    return (
      <Container>
        {/* <Header {...this.props} title={"TRACKING"} /> */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{
              height: wp(10),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={side_arrow}
              style={{
                width: wp(5),
                height: wp(4),
              }}
              resizeMode="contain"
              tintColor="white"
            />
          </TouchableOpacity>

          <Image source={MapPin} />
          <View style={styles.headerInner}>
            <TouchableOpacity
            //   onPress={() => {
            //     setModalVisible(true);
            //   }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ResponsiveText style={styles.currentLocationText}>Current Location</ResponsiveText>
                <Image source={ArrowDown} style={styles.arrowDownImage} />
              </View>
              <ResponsiveText style={styles.addressText}>
                {this.state.locationName && this.state.locationName.length > 50
                  ? this.state.locationName.substr(0, 50) + "..."
                  : this.state.locationName}
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
              <Image source={BurgerMenu} style={styles.burgerMenuImage} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}>
            {this.state.coordinate?.latitude && (
              <MapView
                style={{ ...StyleSheet.absoluteFillObject }}
                onUserLocationChange={(e) => {
                  // console.log(
                  //   "onUserLocationChange---",
                  //   e.nativeEvent.coordinate.longitude,
                  //   e.nativeEvent.coordinate.longitude
                  // );

                  const newPosition = {
                    longitude: e.nativeEvent.coordinate.longitude ? e.nativeEvent.coordinate.longitude : 0,
                    latitude: e.nativeEvent.coordinate.latitude ? e.nativeEvent.coordinate.latitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  };
                  this.setState({ coordinate: newPosition });
                }}
                showsUserLocation={true}
                initialRegion={this.state.coordinate}
                onRegionChangeComplete={(e) => {
                  // console.log("onRegionChangeComplete---", e);
                }}
              >
                <Marker
                  ref={(marker) => (this.marker = marker)}
                  // draggable
                  // onDragEnd={e => {
                  //   var newCoordinate={
                  //     latitude: e.nativeEvent.coordinate.latitude,
                  //     longitude: e.nativeEvent.coordinate.longitude,
                  //     latitudeDelta: 0.0922,
                  //     longitudeDelta: 0.0421

                  //   }
                  //   this.setState({ coordinate: newCoordinate })

                  // }}
                  coordinate={this.state.coordinate}
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
                <Marker
                  // onDragEnd={e => {
                  //   console.log('dragEnd', e.nativeEvent.coordinate);
                  // }}
                  coordinate={this.state.destination}
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
                <MapViewDirections
                  origin={this.state.coordinate}
                  // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
                  destination={this.state.destination}
                  apikey={"AIzaSyB1ATljOQdQSbKf_-icbQbfQqBqZlmwD0I"}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  optimizeWaypoints={true}
                  onStart={(params) => {
                    // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                  }}
                  onReady={(result) => {
                    this.setState({
                      distance: result.distance,
                      time: result.duration,
                    });
                    if (!this.state.modalVisible && result.distance < 1) {
                      this.setState({
                        modalVisible: true,
                      });
                    }
                  }}
                  onError={(errorMessage) => {
                    // console.log("GOT AN ERROR", errorMessage);
                  }}
                />
              </MapView>
            )}
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() =>
            this.setState({
              modalVisible: false,
            })
          }
          style={{}}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                modalVisible: false,
              });
            }}
            activeOpacity={0.9}
            style={styles.modalContainer}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  modalVisible: true,
                });
              }}
              activeOpacity={1}
              style={styles.modalContent}
            >
              <View style={{}}>
                <View
                  style={{
                    backgroundColor: Colors.Primary,
                    height: wp(12),
                    width: wp(100),
                    borderTopStartRadius: wp(3),
                    borderTopEndRadius: wp(3),
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", marginRight: wp(8) }}
                    onPress={() =>
                      this.props.navigation.navigate("Chat", {
                        user_id: this.params?.item?.client_id,
                        item: this.params?.item,
                      })
                    }
                  >
                    <Image
                      style={{ width: wp(9), height: wp(9), tintColor: "white" }}
                      source={require("../../assets/images/ChatText.png")}
                      resizeMode="contain"
                    />
                    {this.state.chatmessge ? (
                      <View
                        style={{
                          width: wp(3),
                          height: wp(3),
                          borderRadius: wp(3),
                          backgroundColor: "red",
                          position: "absolute",
                          right: -2,
                        }}
                      ></View>
                    ) : null}
                  </TouchableOpacity>
                </View>
                <View style={{ backgroundColor: "white" }}>
                  <ResponsiveText
                    style={{ textAlign: "center", fontSize: wp(1.35), fontFamily: Fonts.NunitoBold, marginTop: wp(4) }}
                  >
                    You have arrived your destination at
                  </ResponsiveText>
                  <ResponsiveText
                    style={{ fontSize: wp(1.1), fontFamily: Fonts.NunitoBold, marginTop: wp(2), marginLeft: wp(14) }}
                  >
                    1:15 pm
                  </ResponsiveText>
                  <View>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: wp(10),
                        alignSelf: "center",
                      }}
                    >
                      <Image
                        style={{
                          width: wp(15),
                          height: wp(15),
                          borderRadius: wp(10),
                        }}
                        source={{ uri: "https://user.nail2u.net/" + this.params?.item?.client?.image_url }}
                      />
                    </View>
                    <ResponsiveText
                      style={{ textAlign: "center", fontSize: wp(1), fontFamily: Fonts.NunitoBold, marginTop: wp(2) }}
                    >
                      {this.params?.item?.client?.username}
                    </ResponsiveText>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                    <ResponsiveText style={{ fontSize: wp(1), fontFamily: Fonts.NunitoBold, marginTop: wp(2) }}>
                      {String(
                        moment(this.params?.item?.schedule_booking[0]?.pivot?.date, "DD-MM-YYYY").format("MMM Do, YYYY")
                      )}
                    </ResponsiveText>
                    <ResponsiveText style={{ fontSize: wp(1), fontFamily: Fonts.NunitoBold, marginTop: wp(2) }}>
                      {this.state.timeJob}
                    </ResponsiveText>
                  </View>

                  {/* <TouchableOpacity style={{ width: wp(48), alignSelf: "center", marginTop: wp(8) }}>
                    <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5, textAlign: "center" }}>
                        Start Your Service
                      </ResponsiveText>
                    </LinearGradient>
                  </TouchableOpacity> */}
                  {this.state.loading ? (
                    <TouchableOpacity style={{ alignSelf: "center", marginTop: wp(2) }}>
                      <LinearGradient
                        colors={[Colors.Primary, Colors.Primary]}
                        style={[
                          {
                            flexDirection: "row",
                            width: wp(48),
                            backgroundColor: Colors.Primary,
                            borderRadius: 10,
                            paddingHorizontal: wp(3),
                            paddingVertical: wp(3),
                            justifyContent: "center",
                          },
                        ]}
                      >
                        <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>
                          Start Your Service
                        </ResponsiveText>
                        <ActivityIndicator color={Colors.White} size={wp(4)} style={{ paddingLeft: 4 }} />
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: wp(48),
                        backgroundColor: Colors.Primary,
                        borderRadius: 10,
                        alignSelf: "center",
                        marginTop: wp(3),
                      }}
                      onPress={() => {
                        this.handleSubmitButton(this.params?.item?.id);
                      }}
                      // onPress={() => {
                      //   props.navigation.navigate("StartService");
                      //   handleSubmitButton
                      // }}
                    >
                      <ResponsiveText
                        style={{
                          fontSize: 3.3,
                          color: Colors.White,
                          paddingHorizontal: wp(3),
                          paddingVertical: wp(3),
                          textAlign: "center",
                          borderWidth: 0,
                        }}
                      >
                        Start Your Service
                      </ResponsiveText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

        {!this.state.modalVisible && (
          <View
            style={{
              backgroundColor: Colors.Primary,
              // height: wp(12),
              width: wp(100),
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: wp(2),

              paddingBottom: Platform.OS == "ios" ? wp(5) : wp(2),
            }}
          >
            <ResponsiveText
              style={{
                fontSize: wp(1.1),
                color: "white",
                marginLeft: wp(2),
                marginRight: wp(2),
              }}
            >
              You are moving towards your destination
            </ResponsiveText>
            <TouchableOpacity
              style={{ alignSelf: "center", marginRight: wp(8) }}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  user_id: this.params?.item?.client_id,
                  item: this.params?.item,
                })
              }
            >
              <Image
                style={{ width: wp(7), height: wp(7), tintColor: "white" }}
                source={require("../../assets/images/ChatText.png")}
                resizeMode="contain"
              />
              {this.state.chatmessge ? (
                <View
                  style={{
                    width: wp(2.5),
                    height: wp(2.5),
                    borderRadius: wp(3),
                    backgroundColor: "red",
                    position: "absolute",
                    right: -2,
                  }}
                ></View>
              ) : null}
            </TouchableOpacity>
          </View>
        )}
      </Container>
    );
  }
}

const styles = {
  container: {
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
  },
  arriveContainer: {
    backgroundColor: Colors.Primary,
    height: wp(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
  },
  bookingText: {
    fontSize: 4,
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
    marginBottom: wp(3),
  },
  bookingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingNumText: {
    fontSize: 3.5,
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
    marginBottom: wp(5),
  },
  bookingArtText: {
    marginBottom: wp(2),
    fontSize: 3.5,
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
  },
  viewProfileContainer: {
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  viewProfileText: {
    fontSize: 2.5,
    color: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textStyle: {
    fontSize: 3.5,
  },
  sehContainer: {
    marginTop: wp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  mainText: {
    fontSize: 3.5,
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
  },
  addressText: {
    color: Colors.White,
    fontSize: 3,
  },
  currentLocationText: {
    color: Colors.White,
    fontSize: 3,
    marginRight: 5,
  },
  burgerMenuImage: {
    resizeMode: "contain",
    width: wp(7),
    height: wp(7),
    tintColor: Colors.White,
  },
  cardContainer: {
    marginTop: wp(5),
    fontSize: 3.5,
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
  },
  okContainer: {
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(5),
    borderRadius: 8,
    width: wp(20),
    height: wp(10),
  },
  okText: {
    fontSize: 5,
    color: Colors.White,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    // backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",

    paddingBottom: wp(6),
    // position: 'absolute',
    // bottom: wp(15),
  },
  headerContainer: {
    backgroundColor: Colors.Primary,
    flexDirection: "row",
    height: wp(18),
    alignItems: "center",
    paddingHorizontal: wp(3),
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "86%",
    borderColor: "white",
  },
  currentLocationText: {
    color: Colors.White,
    fontSize: 3,
    marginRight: 5,
  },
  arrowDownImage: {
    width: wp(3),
    height: wp(3),
    tintColor: Colors.White,
  },
};
export default StartService;
