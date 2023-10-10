import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import { wp } from "../../components/Responsiveness";
import Fonts from "../../theme/fonts";
import Colors from "../../theme/Colors";
import AddService from "../../components/AddService";
import AddServiceModal from "../../components/AddServiceModal";
import EditServiceModal from "../../components/EditServiceModal";
import { getAllRaw, getAllServices } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ServiceDiscount from "./ServiceDiscount";

const Services = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [show, setShow] = useState(undefined);

  const [allServices, setAllServices] = useState([]);
  const [allRaw, setAllRaw] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem("userdata");
      const Data = JSON.parse(userData);
      setUsername(Data?.username);

      await getAllRaw(async (res) => {
        if (res?.errors?.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setAllRaw(res.records);
        }
      });
      await getAllServices(async (res) => {
        setPageLoad(false);
        if (res?.errors?.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          if (Object.keys(res.records).length === 0) {
            setAllServices([]);
          } else {
            setAllServices(res.records);
          }
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  const reloadServices = async () => {
    await getAllRaw(async (res) => {
      if (res?.errors?.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setAllRaw(res.records);
      }
    });
    await getAllServices(async (res) => {
      setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        if (Object.keys(res.records).length === 0) {
          setAllServices([]);
        } else {
          setAllServices(res.records);
        }
      }
    });
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
        <Header {...props} title={"SERVICES"} />
        <ScrollView>
          <View style={{ paddingHorizontal: wp(5), paddingVertical: wp(5) }}>
            {/* <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("ServiceDiscount");
              }}
              style={{}}
            >
              <ResponsiveText>Service Discount</ResponsiveText>
            </TouchableOpacity> */}

            <ResponsiveText>
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>{username}</ResponsiveText> You
              Have Done
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>
                {" "}
                {allServices?.length ?? 0} services{" "}
              </ResponsiveText>
              Till Today
            </ResponsiveText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: wp(5),
                paddingHorizontal: wp(5),
              }}
            >
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.5 }}>
                Services You Provide
              </ResponsiveText>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{
                  borderStyle: "dashed",
                  borderRadius: 1,
                  borderWidth: 1,
                  borderColor: Colors.DarkGrey,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: wp(1),
                  width: wp(15),
                  height: wp(7),
                }}
              >
                <Image source={require("../../assets/images/Plus.png")} />
                <ResponsiveText style={{ fontSize: 3.5 }}>Add</ResponsiveText>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: wp(5), paddingHorizontal: wp(5) }}>
              {allServices?.map((item, index) => (
                <View key={index}>
                  <AddService show={show} setShow={setShow} item={item} reloadServices={reloadServices} />
                </View>
              ))}
            </View>
          </View>
          <View>
            <ServiceDiscount />
          </View>
        </ScrollView>
        <AddServiceModal
          data={allRaw}
          modalVisible={modalVisible}
          reloadServices={reloadServices}
          setModalVisible={setModalVisible}
        />
      </Container>
    );
  }
};

export default Services;
