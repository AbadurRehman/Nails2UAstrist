import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import Fonts from "../../theme/fonts";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import PaymentStatus from "../../components/PaymentItem";
import { getPayments } from "../../utils/Actions";
import LottieView from "lottie-react-native";

const Payments = (props) => {
  const [active, setActive] = useState(true);
  const [requests, setRequests] = useState(false);

  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0.0);
  const [pageLoad, setPageLoad] = useState(true);
  const [data, setData] = useState("");
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
          setData(res.records.record);
          setTotalEarning(res.records.record.total_earning);
          setPending(res.records.record.pending);
          setCompleted(res.records.record.completed);
        }
      });
    };
    fetchData().catch(console.error);
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
      <Container>
        <Header {...props} title={"PAYMENTS"} />
        <ScrollView>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold }}>Your Payment Status</ResponsiveText>
            <View style={{ alignItems: "center" }}>
              <View style={styles.container}>
                <ResponsiveText style={{ fontSize: 3.5 }}>Total Earning</ResponsiveText>

                <ResponsiveText
                  style={{
                    fontFamily: Fonts.NunitoBold,
                    fontSize: 6,
                    marginTop: wp(2),
                  }}
                >
                  {totalEarning}
                </ResponsiveText>
                <TouchableOpacity
                  style={{ position: "absolute", bottom: 10, right: 10 }}
                  onPress={() => {
                    props.navigation.navigate("Withdraw", {
                      data: data,
                    });
                  }}
                >
                  <ResponsiveText
                    style={{
                      textDecorationLine: "underline",
                      fontSize: 3,
                      color: "red",
                    }}
                  >
                    Withdraw
                  </ResponsiveText>
                </TouchableOpacity>

                <Image
                  style={{
                    position: "absolute",
                    top: -12,
                    right: -12,
                    width: wp(7),
                    height: wp(7),
                    resizeMode: "contain",
                  }}
                  source={require("../../assets/images/CurrencyDollar.png")}
                />
              </View>
            </View>
            <View style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => {
                  setActive(true);
                  setRequests(false);
                }}
                style={[styles.stateMan, { backgroundColor: active ? Colors.Primary : "white" }]}
              >
                <ResponsiveText
                  style={{
                    color: active ? Colors.White : "black",
                    fontSize: 3.5,
                  }}
                >
                  Pending
                </ResponsiveText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActive(false);
                  setRequests(true);
                }}
                style={[styles.stateMan, { backgroundColor: requests ? Colors.Primary : "white" }]}
              >
                <ResponsiveText
                  style={{
                    color: requests ? Colors.White : "black",
                    fontSize: 3.5,
                  }}
                >
                  Completed
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            {active && (
              <View style={{ paddingVertical: wp(5) }}>
                {pending &&
                  pending.map((item, index) => (
                    <View key={index}>
                      <PaymentStatus pending index={index} item={item} />
                    </View>
                  ))}
              </View>
            )}
            {requests && (
              <View style={{ paddingVertical: wp(5) }}>
                {completed.map((item, index) => (
                  <View key={index}>
                    <PaymentStatus index={index} item={item} />
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </Container>
    );
  }
};
const styles = {
  container: {
    backgroundColor: "white",
    width: wp(50),
    height: wp(25),
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
export default Payments;
