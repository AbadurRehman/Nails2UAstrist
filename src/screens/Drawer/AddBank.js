import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import Fonts from "../../theme/fonts";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import PaymentStatus from "../../components/PaymentStatus";
import { getPayments } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { linkAccount } from "../../utils/Actions";

const AddBank = (props) => {
  const [active, setActive] = useState(true);
  const [requests, setRequests] = useState(false);

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0.0);
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
  const [radioButton, setRadioButton] = useState(true);
  const [radioButton1, setRadioButton1] = useState(false);

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
          setTotalEarning(res.records.record.total_earning);
          setPending(res.records.record.pending);
          setCompleted(res.records.record.completed);
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  const link = async (type, routing, account) => {
    setLoading(true);
    await linkAccount(type, routing, account, async (res) => {
      setLoading(false);

      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        alert("Account Linked Successfully!");
        setAccountNumber("");
        setRoutingNumber("");
        setRadioButton(true);
        setRadioButton1(false);
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
          <View
            style={{
              paddingHorizontal: wp(5),
              paddingVertical: wp(5),
              flex: 1,
              // backgroundColor: "red",
            }}
          >
            <View style={{}}>
              <Image style={{ width: wp(73.6), height: wp(11.73) }} source={require("../../assets/images/addB.png")} />
            </View>

            <View style={{ marginTop: wp(10) }}>
              <Image
                style={{ width: wp(80), height: wp(44), alignSelf: "center" }}
                resizeMode="contain"
                source={require("../../assets/images/credit-card.jpg")}
              />
            </View>

            <View style={{ alignItems: "center", marginTop: wp(10), width: wp(90) }}>
              <View style={{ width: wp(70) }}>
                <ResponsiveText style={{ fontSize: wp(1.1) }}>Account Type</ResponsiveText>
                <View style={styles.radioButtonContainer}>
                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      onPress={() => {
                        setRadioButton(true);
                        setRadioButton1(false);
                      }}
                      style={styles.radioInner}
                    >
                      <View style={[styles.radio, { backgroundColor: radioButton ? Colors.Primary : "white" }]} />
                    </TouchableOpacity>
                    <ResponsiveText style={{ fontSize: wp(1) }}>Checking</ResponsiveText>
                  </View>

                  <View style={styles.radioMain}>
                    <TouchableOpacity
                      onPress={() => {
                        setRadioButton(false);
                        setRadioButton1(true);
                      }}
                      style={styles.radioInner}
                    >
                      <View
                        style={[
                          styles.radio,
                          {
                            backgroundColor: radioButton1 ? Colors.Primary : "white",
                          },
                        ]}
                      />
                    </TouchableOpacity>
                    <ResponsiveText style={{ fontSize: wp(1) }}>Saving</ResponsiveText>
                  </View>
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: 20,
                  borderRadius: wp(6),
                  backgroundColor: "#F8F8F8",
                  borderWidth: 1,
                  borderColor: "#D4D3D3",
                  width: wp(70),
                  height: wp(11),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: wp(5),
                }}
              >
                <TextInput
                  style={{
                    // fontFamily: Fonts.NunitoRegular,
                    fontSize: 12,
                    width: wp(50),
                    color: "black",
                  }}
                  value={routingNumber}
                  placeholderTextColor={Colors.lightGrey}
                  onChangeText={(text) => {
                    setRoutingNumber(text);
                  }}
                  placeholder={"Routing Number"}
                  keyboardType="number-pad"
                  // maxLength={props.phone ? 14 : 500}
                  // secureTextEntry={props.showEye && true}
                ></TextInput>
              </View>

              <View
                style={{
                  paddingHorizontal: 20,
                  borderRadius: wp(6),
                  backgroundColor: "#F8F8F8",
                  borderWidth: 1,
                  borderColor: "#D4D3D3",
                  width: wp(70),
                  height: wp(11),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: wp(5),
                }}
              >
                <TextInput
                  style={{
                    // fontFamily: Fonts.NunitoRegular,
                    fontSize: 12,
                    width: wp(50),
                    color: "black",
                  }}
                  value={accountNumber}
                  placeholderTextColor={Colors.lightGrey}
                  onChangeText={(text) => {
                    setAccountNumber(text);
                  }}
                  placeholder={"Account Number"}
                  keyboardType="number-pad"
                  // maxLength={props.phone ? 14 : 500}
                  // secureTextEntry={props.showEye && true}
                ></TextInput>
              </View>

              <View style={{ marginTop: wp(10) }}>
                {loading ? (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={[Colors.Primary, Colors.Primary]}
                      style={[styles.linearGradient, { flexDirection: "row" }]}
                    >
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Agree & Link</ResponsiveText>
                      <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                    </LinearGradient>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      let type = radioButton ? "Checking" : "Saving";
                      link(type, routingNumber, accountNumber);
                    }}
                  >
                    <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Agree & Link</ResponsiveText>
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
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
  },

  radioButtonContainer: {
    flexDirection: "row",
    width: wp(40),
    justifyContent: "space-between",
    marginVertical: wp(2),
  },
  radioInner: {
    backgroundColor: Colors.White,
    width: wp(6),
    height: wp(6),
    borderRadius: wp(5),
    borderColor: Colors.Primary,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radio: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.5),
  },
  radioMain: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(10),
  },
};
export default AddBank;
