import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import Fonts from "../../theme/fonts";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import PaymentStatus from "../../components/PaymentStatus";
import { getPayments, withdraw } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";

const Withdraw = (props) => {
  const [data, setData] = useState(props.route.params.data);
  const [requests, setRequests] = useState(false);

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0.0);
  const [pageLoad, setPageLoad] = useState(true);
  const [balance, setAvaibleBalance] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getPayments(async (res) => {
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            // alert(res.errors);
          } else {
            // alert(res.errors[0]);
          }
        } else {
          console.log("res.records.available_balanc---", res.records.record);
          setTotalEarning(res.records.record.total_earning);
          setPending(res.records.record.pending);
          setCompleted(res.records.record.completed);
          setAvaibleBalance(res.records.record.available_balance);
          setUser(res.records.record.user[0]);
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  const withdrawPayment = async () => {
    setLoading(true);
    await withdraw(async (res) => {
      setLoading(false);

      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        alert("Payment Withdraw Successfully!");
      }
    });
    // let formdata = new FormData();
    // formdata.append('message', message[0].text);
    // formdata.append('receiver_id');
    // nail2UDashboardApiService.sendMessage(formdata);
  };

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
      <Container>
        <Header {...props} title={"WITHDRAW"} />
        <ScrollView>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.container}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    style={{
                      position: "absolute",
                      top: -10,
                      left: 0,
                      width: wp(5),
                      height: wp(5),
                      resizeMode: "contain",
                    }}
                    source={require("../../assets/images/CurrencyDollar.png")}
                  />
                  <ResponsiveText
                    style={{
                      fontFamily: Fonts.NunitoBold,
                      fontSize: 14.93,
                      marginTop: wp(2),
                    }}
                  >
                    {balance}
                  </ResponsiveText>
                  <ResponsiveText style={{ fontSize: 5, fontFamily: Fonts.NunitoBold }}>
                    Available Balance
                  </ResponsiveText>
                </View>
              </View>
            </View>
            <ResponsiveText style={{ fontSize: 5, marginTop: wp(10) }}>From</ResponsiveText>
            <View
              style={{
                backgroundColor: "white",
                // width: wp(70.93),
                // height: wp(39.47),
                borderRadius: wp(2),
                marginTop: wp(3),
                marginBottom: wp(5),
                padding: wp(3),
                alignItems: "center",
                // justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                flexDirection: "row",
              }}
            >
              <Image
                style={{
                  width: wp(14.93),
                  height: wp(14.93),
                  borderRadius: wp(10),
                  marginRight: 15,
                }}
                source={{ uri: user?.image }}
              />
              <View>
                <ResponsiveText style={{ fontSize: 5 }}>{user?.username}</ResponsiveText>
                <ResponsiveText style={{ fontSize: 5, color: "#8E8E8E" }}>Current Customer</ResponsiveText>
              </View>
            </View>
            <ResponsiveText style={{ fontSize: 5, marginTop: wp(8), marginBottom: wp(3) }}>
              Choose Method
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddBank");
              }}
            >
              <Image
                style={{ width: wp(89.87), height: wp(20.8) }}
                source={require("../../assets/images/choose.png")}
              />
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: wp(10) }}>
              <TouchableOpacity
                // onPress={() => {
                //   props.navigation.navigate("AddBank");
                // }}
                style={{}}
              >
                <ResponsiveText style={{ color: "white" }}>Withdraw</ResponsiveText>
              </TouchableOpacity>

              <View style={{}}>
                {loading ? (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={[Colors.Primary, Colors.Primary]}
                      style={{
                        flexDirection: "row",

                        backgroundColor: "#313131",
                        width: wp(30),
                        height: wp(10),
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: wp(2),
                      }}
                    >
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Withdraw</ResponsiveText>
                      <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      withdrawPayment();
                    }}
                  >
                    <LinearGradient
                      colors={[Colors.Primary, Colors.Primary]}
                      style={{
                        backgroundColor: "#313131",
                        width: wp(30),
                        height: wp(10),
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: wp(2),
                      }}
                    >
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Withdraw</ResponsiveText>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
};
const styles = {
  container: {
    backgroundColor: "white",
    width: wp(70.93),
    height: wp(39.47),
    borderRadius: wp(2),
    marginVertical: wp(5),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(10),
    // marginTop: wp(10),
  },
  stateMan: {
    height: wp(8),
    maxWidth: wp(30),
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
};
export default Withdraw;
