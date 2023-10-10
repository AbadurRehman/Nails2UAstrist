import React, { useState, useEffect, useCallback } from "react";
import { View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Content from "../../components/Content";
import Colors from "../../theme/Colors";
import MapPin from "../../assets/images/MapPin.png";
import BurgerMenu from "../../assets/images/burger_menu.png";
import Stars from "../../assets/images/christmas-stars.png";
import ArrowDown from "../../assets/images/arrow_down.png";
import { wp } from "../../components/Responsiveness";
import Fonts from "../../theme/fonts";
import HomeRatting from "../../components/HomeRatting";
import TodayJob from "../../components/TodayJob";
import UpcomingJob from "../../components/UpcomingJob";
import HomeRequest from "../../components/HomeRequest";
import JobHistory from "../../components/HistoryJobhome";
import JobRequest from "../../components/JobRequest";
// import Stars from '../../assets/images/christmas-stars.png';
import { getDashboard, getProfileDetails } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import { getLocation, findAddress, hasLocationPermission } from "../../services/GoogleMap";
import { EventRegister } from "react-native-event-listeners";
import { firebaseIntegration } from "../../services/firebaseIntegeration";
import LinearGradient from "react-native-linear-gradient";
import LocationModal from "../../components/LocationModal";
import { useFocusEffect } from "@react-navigation/native";
import JobDoneModal from "../../components/JobDoneModal";

const Home = (props) => {
  const [active, setActive] = useState(true);
  const [requests, setRequests] = useState(false);
  const [jobHistory, setJobHistory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisibleDone, setModalVisibleDone] = useState(false);

  const [data, setData] = useState({
    // latest_jobs_notification: [
    //   {
    //     id: 3154,
    //     artist_id: "347",
    //     client_id: "1",
    //     started_at: "7",
    //     ended_at: null,
    //     status: "new",
    //     total_price: "60.00",
    //     created_at: "2023-04-16T10:16:17.000000Z",
    //     updated_at: "2023-04-16T10:16:35.000000Z",
    //     deleted_at: null,
    //     booking_service: [
    //       {
    //         id: 7,
    //         service_name: "Organic Powder Full Set",
    //         pivot: {
    //           booking_id: "3154",
    //           service_id: "7",
    //         },
    //       },
    //       {
    //         id: 8,
    //         service_name: "Ombre",
    //         pivot: {
    //           booking_id: "3154",
    //           service_id: "8",
    //         },
    //       },
    //     ],
    //     client: {
    //       id: 1,
    //       username: "Test",
    //       phone_no: "72377737373",
    //       address: "Adress",
    //       image_url: "storage/profileImages/profile-image.png",
    //       absolute_cv_url: null,
    //       absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //     },
    //     schedule_booking: [
    //       {
    //         id: 7,
    //         name: "time",
    //         time: "03:00:00",
    //         created_at: "2022-05-18T00:51:47.000000Z",
    //         updated_at: "2022-05-18T00:51:47.000000Z",
    //         pivot: {
    //           booking_id: "3154",
    //           scheduler_id: "7",
    //           date: "04-16-2023",
    //         },
    //       },
    //     ],
    //   },
    // ],
    // user_data: {
    //   id: 347,
    //   username: "Abad",
    //   experience: null,
    //   total_balance: "221.00",
    // },
    // rating_reviews: "4.3333",
    // jobs_done: 1,
    // jobs_details: {
    //   today: [
    //     {
    //       id: 3154,
    //       artist_id: "347",
    //       client_id: "1",
    //       total_price: "60.00",
    //       started_at: "7",
    //       ended_at: null,
    //       status: "new",
    //       booking_service: [
    //         {
    //           id: 7,
    //           service_name: "Organic Powder Full Set",
    //           pivot: {
    //             booking_id: "3154",
    //             service_id: "7",
    //           },
    //         },
    //         {
    //           id: 8,
    //           service_name: "Ombre",
    //           pivot: {
    //             booking_id: "3154",
    //             service_id: "8",
    //           },
    //         },
    //       ],
    //       client: {
    //         id: 1,
    //         username: "Test",
    //         phone_no: "72377737373",
    //         address: "Adress",
    //         image_url: "storage/profileImages/profile-image.png",
    //         absolute_cv_url: null,
    //         absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //       },
    //     },
    //   ],
    //   requested: [
    //     {
    //       id: 3154,
    //       artist_id: "347",
    //       client_id: "1",
    //       started_at: "7",
    //       ended_at: null,
    //       status: "new",
    //       booking_service: [
    //         {
    //           id: 7,
    //           service_name: "Organic Powder Full Set",
    //           pivot: {
    //             booking_id: "3154",
    //             service_id: "7",
    //           },
    //         },
    //         {
    //           id: 8,
    //           service_name: "Ombre",
    //           pivot: {
    //             booking_id: "3154",
    //             service_id: "8",
    //           },
    //         },
    //       ],
    //       client: {
    //         id: 1,
    //         username: "Test",
    //         phone_no: "72377737373",
    //         address: "Adress",
    //         image_url: "storage/profileImages/profile-image.png",
    //         absolute_cv_url: null,
    //         absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //       },
    //     },
    //     {
    //       id: 3153,
    //       artist_id: "347",
    //       client_id: "1",
    //       started_at: "7",
    //       ended_at: null,
    //       status: "new",
    //       booking_service: [
    //         {
    //           id: 7,
    //           service_name: "Organic Powder Full Set",
    //           pivot: {
    //             booking_id: "3153",
    //             service_id: "7",
    //           },
    //         },
    //       ],
    //       client: {
    //         id: 1,
    //         username: "Test",
    //         phone_no: "72377737373",
    //         address: "Adress",
    //         image_url: "storage/profileImages/profile-image.png",
    //         absolute_cv_url: null,
    //         absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //       },
    //     },
    //     {
    //       id: 3151,
    //       artist_id: "347",
    //       client_id: "1",
    //       started_at: "7",
    //       ended_at: null,
    //       status: "new",
    //       booking_service: [
    //         {
    //           id: 7,
    //           service_name: "Organic Powder Full Set",
    //           pivot: {
    //             booking_id: "3151",
    //             service_id: "7",
    //           },
    //         },
    //       ],
    //       client: {
    //         id: 1,
    //         username: "Test",
    //         phone_no: "72377737373",
    //         address: "Adress",
    //         image_url: "storage/profileImages/profile-image.png",
    //         absolute_cv_url: null,
    //         absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //       },
    //     },
    //   ],
    //   job_history: [
    //     {
    //       id: 3150,
    //       artist_id: "347",
    //       client_id: "1",
    //       total_price: "60.00",
    //       started_at: "6",
    //       ended_at: null,
    //       status: "done",
    //       booking_service: [
    //         {
    //           id: 7,
    //           service_name: "Organic Powder Full Set",
    //           pivot: {
    //             booking_id: "3150",
    //             service_id: "7",
    //           },
    //         },
    //       ],
    //       client: {
    //         id: 1,
    //         username: "Test",
    //         phone_no: "72377737373",
    //         address: "Adress",
    //         image_url: "storage/profileImages/profile-image.png",
    //         absolute_cv_url: null,
    //         absolute_image_url: "https://artist.nail2u.net/storage/profileImages/profile-image.png",
    //       },
    //     },
    //   ],
    // },
  });
  const [pageLoad, setPageLoad] = useState(true);
  const [DataSet2, setDataSet2] = useState([]);

  const [latLng, setLatLng] = useState();
  const [locationName, setLocationName] = useState(undefined);

  const [status, setStatus] = useState(1);

  const getDashboardData = async () => {
    await getDashboard(props.navigation, async (res) => {
      setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setData(res.records);
        setDataSet2([
          {
            id: "1",
            title: "Total Earning",
            amount: Number(res.records?.user_data.total_balance).toFixed(1),
            image: require("../../assets/images/CurrencyDollar.png"),
          },
          {
            id: "2",
            title: "Rating & Reviews",
            amount: Number(res.records?.rating_reviews).toFixed(1),
            image: require("../../assets/images/home_heart.png"),
          },
          {
            id: "3",
            title: "Jobs Done",
            amount: res.records?.jobs_done,
            image: require("../../assets/images/CurrencyDollar.png"),
          },
          {
            id: "4",
            title: "Your Experience",
            amount: res.records.user_data?.experience ?? 0 + " Years",
            image: require("../../assets/images/home_star.png"),
          },
        ]);
      }
    });
  };

  const onRefresh = useCallback(async () => {
    getDashboardData();
    getadditionalStatus();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDashboardData();
      getadditionalStatus();
    }, [])
  );

  useEffect(() => {
    const fetchData = async () => {
      await getDashboard(props.navigation, async (res) => {
        // console.log(res, "dddddd");
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setData(res.records);
          setDataSet2([
            {
              id: "1",
              title: "Total Earning",
              amount: Number(res.records?.user_data.total_balance).toFixed(1),
              image: require("../../assets/images/CurrencyDollar.png"),
            },
            {
              id: "2",
              title: "Rating & Reviews",
              amount: Number(res.records?.rating_reviews).toFixed(1),
              image: require("../../assets/images/home_heart.png"),
            },
            {
              id: "3",
              title: "Jobs Done",
              amount: res.records?.jobs_done,
              image: require("../../assets/images/CurrencyDollar.png"),
            },
            {
              id: "4",
              title: "Your Experience",
              amount: res.records.user_data?.experience ?? 0 + " Years",
              image: require("../../assets/images/home_star.png"),
            },
          ]);
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    getadditionalStatus();
    firebaseIntegration();
    checkPermissions();
  }, []);

  async function checkPermissions() {
    const status = await hasLocationPermission();
    if (status) {
      locationMethods();
    }
  }

  const locationMethods = async () => {
    await getLocation();
    // setModalVisible2(props.modalState);
    // setModalVisible3(props.modalFeedback);
  };

  const setNewLocation = async ({ latitude, latitudeDelta, longitude, longitudeDelta }) => {
    const updatedLocation = {
      lat: latitude,
      lng: longitude,
    };
    const locationName = await findAddress(updatedLocation);
    setLocationName(locationName);
    setLatLng({ latitude, longitude });

    EventRegister.emit("locationUpdated");
  };

  const getadditionalStatus = async () => {
    await getProfileDetails(async (res) => {
      setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setStatus(res.records?.additional_info_status);
      }
    });
  };

  useEffect(() => {
    const locationChanged = EventRegister.addEventListener("locationChanged", (data) => {
      setNewLocation(data);
    });

    const jobDoneNotification = EventRegister.addEventListener("jobDoneNotification", (data) => {
      setModalVisibleDone(true);
    });
    const address = EventRegister.addEventListener("addressFound", (locationDetail) => {
      const { locationName, ...rest } = locationDetail;
      setLocationName(locationName);
      setLatLng(rest);
    });

    const updatestatus = EventRegister.addEventListener("updatestatus", () => {
      getadditionalStatus();
    });

    const reloadjobs = EventRegister.addEventListener("JobAccept", async () => {
      await getDashboard(props.navigation, async (res) => {
        // console.log(res, "dddddd");
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setData(res.records);
          setDataSet2([
            {
              id: "1",
              title: "Total Earning",
              amount: Number(res.records?.user_data.total_balance).toFixed(1),
              image: require("../../assets/images/CurrencyDollar.png"),
            },
            {
              id: "2",
              title: "Rating & Reviews",
              amount: Number(res.records?.rating_reviews).toFixed(1),
              image: require("../../assets/images/home_heart.png"),
            },
            {
              id: "3",
              title: "Jobs Done",
              amount: res.records?.jobs_done,
              image: require("../../assets/images/CurrencyDollar.png"),
            },
            {
              id: "4",
              title: "Your Experience",
              amount: res.records.user_data?.experience ?? 0 + " Years",
              image: require("../../assets/images/home_star.png"),
            },
          ]);
        }
      });
    });
    return () => {
      // address.remove();
      // reloadjobs.remove();
      EventRegister.removeEventListener(address);
      EventRegister.removeEventListener(reloadjobs);
      EventRegister.removeEventListener(updatestatus);
      EventRegister.removeEventListener(locationChanged);
      EventRegister.removeAllListeners(jobDoneNotification);
      // EventEmitter.off("locationChanged");
      // EventEmitter.off("addressFound");
    };
  }, []);

  if (pageLoad) {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{ width: wp(20), height: wp(20) }}
          source={require("../../assets/loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    return (
      <Container style={styles.container}>
        <View style={styles.headerContainer}>
          <Image source={MapPin} />
          <View style={styles.headerInner}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ResponsiveText style={styles.currentLocationText}>Current Location</ResponsiveText>
                <Image source={ArrowDown} style={styles.arrowDownImage} />
              </View>
              <ResponsiveText style={styles.addressText}>
                {locationName && locationName.length > 50 ? locationName.substr(0, 50) + "..." : locationName}
              </ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Image source={BurgerMenu} style={styles.burgerMenuImage} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          // style={{ paddingHorizontal: wp(5), flex: 1 }}
        >
          {status == 0 ? (
            <View
              style={{
                backgroundColor: Colors.Primary,
                borderTopColor: Colors.lightGrey,
                borderTopWidth: 1,
                paddingVertical: wp(3),
                paddingHorizontal: wp(5),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ResponsiveText style={{ color: "white", fontSize: wp(1) }}>
                Please Fill Info to continue...
              </ResponsiveText>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Documents");
                }}
                style={{ flexDirection: "row", alignSelf: "flex-end" }}
              >
                <LinearGradient colors={[Colors.White, Colors.White]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.Primary, fontSize: 3 }}>Fill Document </ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : null}

          {data?.latest_jobs_notification?.length > 0 && (
            <JobRequest item={data?.latest_jobs_notification[data?.latest_jobs_notification?.length - 1]} />
          )}
          {/* <UpcomingJob /> */}
          {/* modal 
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <ResponsiveText>modal</ResponsiveText>
      </TouchableOpacity> */}

          <View style={{ paddingHorizontal: wp(5), flex: 1 }}>
            <View style={styles.welcomeContainer}>
              <View>
                <ResponsiveText style={styles.welcomeText}>Welcome, {data?.user_data?.username}</ResponsiveText>
                <ResponsiveText style={{ color: Colors.Primary }}>More Jobs Awaiting For You Today</ResponsiveText>
              </View>
              <Image source={Stars} style={{ width: wp(13), height: wp(13) }} resizeMode="contain" />
            </View>
            <View style={styles.cardContainer}>
              {DataSet2.map((item, index) => (
                <View key={index}>
                  <HomeRatting item={item} />
                </View>
              ))}
            </View>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, marginVertical: wp(5) }}>
              Your Job Status
            </ResponsiveText>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => {
                  setActive(true);
                  setRequests(false);
                  setJobHistory(false);
                }}
                style={[styles.stateMan, { backgroundColor: active ? Colors.Primary : "white" }]}
              >
                <ResponsiveText
                  style={{
                    color: active ? Colors.White : "black",
                    fontSize: 3.5,
                  }}
                >
                  Today's Job
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive(false);
                  setRequests(true);
                  setJobHistory(false);
                }}
                style={[styles.stateMan, { backgroundColor: requests ? Colors.Primary : "white" }]}
              >
                <ResponsiveText
                  style={{
                    color: requests ? Colors.White : "black",
                    fontSize: 3.5,
                  }}
                >
                  Requests
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive(false);
                  setRequests(false);
                  setJobHistory(true);
                }}
                style={[styles.stateMan, { backgroundColor: jobHistory ? Colors.Primary : "white" }]}
              >
                <ResponsiveText
                  style={{
                    color: jobHistory ? Colors.White : "black",
                    fontSize: 3.5,
                  }}
                >
                  Job History
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              {active && data?.jobs_details?.today ? (
                <FlatList
                  // style={{ height: "100%" }}
                  contentContainerStyle={{ paddingVertical: wp(5) }}
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={data?.jobs_details?.today}
                  renderItem={({ item, index }) => {
                    return <TodayJob navigation={props.navigation} index={index} item={item} latLng={latLng} />;
                  }}
                  keyExtractor={(item, index) => "item" + index}
                />
              ) : null}
              {requests && data?.jobs_details?.jobs ? (
                <FlatList
                  contentContainerStyle={{ paddingVertical: wp(5) }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={data?.jobs_details?.jobs}
                  renderItem={({ item, index }) => {
                    return <HomeRequest request index={index} item={item} />;
                  }}
                  keyExtractor={(item, index) => "item" + index}
                />
              ) : null}
              {jobHistory && data?.jobs_details?.job_history ? (
                <FlatList
                  contentContainerStyle={{ paddingVertical: wp(5) }}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={data?.jobs_details?.job_history}
                  renderItem={({ item, index }) => {
                    return <JobHistory index={index} item={item} navigation={props.navigation} />;
                  }}
                  keyExtractor={(item, index) => "item" + index}
                />
              ) : null}
            </View>
          </View>
        </ScrollView>

        <LocationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          //  setLocationName={setLocation}
          latLng={latLng}
          navigation={props.navigation}
        />

        <JobDoneModal modalVisible={modalVisibleDone} setModalVisible={setModalVisibleDone} />
      </Container>
    );
  }
};

const styles = {
  container: {
    backgroundColor: Colors.White,
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
    width: "90%",
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
  addressText: {
    color: Colors.White,
    fontSize: 3,
  },
  burgerMenuImage: {
    resizeMode: "contain",
    width: wp(7),
    height: wp(7),
    tintColor: Colors.White,
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: wp(5),
    // paddingHorizontal: wp(8),
    // backgroundColor: 'red',
  },
  welcomeText: {
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
    fontSize: 4.5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp(2),
  },

  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stateMan: {
    height: wp(8),
    maxWidth: wp(30),
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "white",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    // marginVertical: 20,
  },
};
export default Home;
