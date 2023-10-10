import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import PaymentStatus from "../../components/PaymentStatus";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import Fonts from "../../theme/fonts";
import { getJobHistory } from "../../utils/Actions";
import LottieView from "lottie-react-native";

const JobHistory = (props) => {
  const [active, setActive] = useState(true);
  const [requests, setRequests] = useState(false);
  const [jobHistory, setJobHistory] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [activeData, setActiveData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  // const [activeData, setActiveData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getJobHistory("in-process", async (res) => {
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          if (Object.keys(res.records).length === 0) {
            setActiveData([]);
          } else {
            setActiveData(res.records);
          }
        }
      });

      await getJobHistory("new", async (res) => {
        // console.log("getJobHistory---", res);
        // setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          if (Object.keys(res.records).length === 0) {
            setPendingData([]);
          } else {
            setPendingData(res.records);
          }
        }
      });

      await getJobHistory("done", async (res) => {
        // setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          if (Object.keys(res.records).length === 0) {
            setCompletedData([]);
          } else {
            setCompletedData(res.records);
          }
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  if (pageLoad) {
    return (
      <View
        style={{ flex: 1, borderRadius: 10, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}
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
        <Header {...props} title={"JOB HISTORY"} />
        <ScrollView>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, marginBottom: wp(5) }}>
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
                <ResponsiveText style={{ color: active ? Colors.White : "black", fontSize: 3.5 }}>
                  Ongoing
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
                  Pending
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
                  Completed
                </ResponsiveText>
              </TouchableOpacity>
            </View>

            {active && (
              <View style={{ paddingVertical: wp(5) }}>
                {activeData.map((item, index) => (
                  <View key={index}>
                    <PaymentStatus ongoing index={index} item={item} />
                  </View>
                ))}
              </View>
            )}
            {requests && (
              <View style={{ paddingVertical: wp(5) }}>
                {pendingData.map((item, index) => (
                  <View key={index}>
                    <PaymentStatus pending index={index} item={item} />
                  </View>
                ))}
              </View>
            )}
            {jobHistory && (
              <View style={{ paddingVertical: wp(5) }}>
                {completedData.map((item, index) => (
                  <View key={index}>
                    <PaymentStatus completed index={index} item={item} />
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
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: wp(2),
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
export default JobHistory;
