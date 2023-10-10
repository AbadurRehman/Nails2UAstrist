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
import { getAllDeals, joinDeals } from "../../utils/Actions";
import LottieView from "lottie-react-native";

const ServiceDiscount = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [show, setShow] = useState(undefined);

  const [allDeals, setAllDeals] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);

  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      await getAllDeals(async (res) => {
        setPageLoad(false);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setAllDeals(res.records);
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  const reloadDeals = async () => {
    await getAllDeals(async (res) => {
      setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setAllDeals(res.records);
      }
    });
  };

  const joinDeal = async (id) => {
    setLoading(true);

    await joinDeals(id, async (res) => {
      // setPageLoad(false);
      setSelect(undefined);
      if (res.errors.length) {
        setLoading(false);

        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setLoading(false);
        reloadDeals();
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
      <Container style={{ marginTop: 0 }}>
        <ResponsiveText
          style={{
            marginBottom: wp(8),
            marginLeft: 0,
            marginLeft: wp(5),
            fontSize: 5,
            fontFamily: Fonts.NunitoBold,
          }}
        >
          Discount on Services
        </ResponsiveText>
        <View
          style={{
            alignItems: "center",
            // backgroundColor: "red",
            flex: 1,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {allDeals?.map((deal) => {
              return (
                <View key={deal.id}>
                  <View
                    style={{
                      width: wp(59.47),
                      height: wp(35.73),
                      flexDirection: "row",
                      borderTopLeftRadius: wp(3),
                      borderTopRightRadius: wp(4),
                      borderBottomLeftRadius: wp(3),
                      borderBottomRightRadius: wp(4),
                      overflow: "hidden",
                    }}
                  >
                    <View>
                      <Image style={{ height: wp(35.73), width: wp(25.33) }} source={{ uri: deal.image_url }} />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#F4E7E8",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 5 }}>
                        {parseInt(deal.discount_percentage)}%
                      </ResponsiveText>
                      <ResponsiveText>Discount on {deal.name}</ResponsiveText>

                      <View>
                        {loading && select == deal.id ? (
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#313131",
                              paddingVertical: 3,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                              marginTop: 5,
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <ActivityIndicator color="#fff" style={{ paddingLeft: 4 }} />

                            <ResponsiveText style={{ color: "#F4E7E8", fontSize: 3 }}>Join Now</ResponsiveText>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              setSelect(deal.id);
                              joinDeal(deal.id);
                            }}
                            style={{
                              backgroundColor: "#313131",
                              paddingVertical: 3,
                              paddingHorizontal: 10,
                              borderRadius: 5,
                              marginTop: 5,
                            }}
                          >
                            <ResponsiveText style={{ color: "#F4E7E8", fontSize: 3 }}>Join Now</ResponsiveText>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#C5C5C5",
                      height: 1,
                      marginVertical: wp(5),
                    }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Container>
    );
  }
};

export default ServiceDiscount;
