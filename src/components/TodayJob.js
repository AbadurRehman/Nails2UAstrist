import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ResponsiveText from "../components/ResponsiveText";
import { wp } from "../components/Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import moment from "moment";
import Clock from "../assets/images/CheckCircle.png";
import LinearGradient from "react-native-linear-gradient";
import { postLocationStart } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";

const TodayJob = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");

  const handleSubmitButton = async (id, long, lat) => {
    if (id && long && lat) {
      setLoading(true);
      await postLocationStart(id, long, lat, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            setLoading(false);
            alert(res.errors);
          } else {
            setLoading(false);
            alert(res.errors[0]);
          }
        } else {
          setLoading(false);
          EventRegister.emit("JobAccept");
          props.navigation.navigate("StartService", {
            item: props?.item,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (props.item?.schedule_booking) {
      let t = props.item?.schedule_booking[0]?.time;
      setTime(t);
    }
  }, []);

  let endtime = props.item?.ended_at?.split(" ")[0];
  return (
    <View>
      {props?.item?.status == "new" ? (
        <View style={{}}>
          <TouchableOpacity
            disabled={props.ongoing ? true : false}
            onPress={() => {
              setOpen(!open);
            }}
            style={{ flexDirection: "row", flexWrap: "wrap" }}
          >
            <View style={{ flex: 5 }}>
              <View style={{ marginBottom: wp(1) }}>
                <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginRight: wp(5) }}>
                  Customer : {props.item?.client?.username}
                </ResponsiveText>
              </View>
              <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>
                {/* {props.item?.booking_service[0]?.service_name} klkdjsadks dlskdn lkasndlkasndz */}
                {props.item.booking_service &&
                  props.item.booking_service.map((service, index) => {
                    return (
                      <ResponsiveText key={index} style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>
                        {service?.service_name}
                        {index < props.item?.booking_service?.length - 1 ? ", " : ""}
                      </ResponsiveText>
                    );
                  })}
              </ResponsiveText>
              <View
                style={{
                  marginTop: wp(1),
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginRight: wp(5) }}>
                  {props.item?.ended_at ? String(moment(endtime).format("MMM Do, YYYY")) : ""} {time}
                  {}
                </ResponsiveText>
                <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>Today</ResponsiveText>
              </View>
            </View>
            <View style={{ flex: 2, alignItems: "flex-end" }}>
              <ResponsiveText style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, color: "red" }}>
                Pending
              </ResponsiveText>
            </View>
            <View style={{ marginTop: wp(1) }}>
              <Image
                style={{ width: wp(4), height: wp(4), transform: [{ rotate: open ? "180deg" : "0deg" }] }}
                source={require("../assets/images/arrow_down.png")}
              />
            </View>

            <View style={{ width: wp(90), alignItems: "flex-end" }}>
              <View>
                {props.item?.booking_location?.status == "standby" ? (
                  <View>
                    {loading ? (
                      <TouchableOpacity>
                        <LinearGradient
                          colors={[Colors.Primary, Colors.Primary]}
                          style={[
                            {
                              flexDirection: "row",
                              width: wp(18),
                              backgroundColor: Colors.Primary,
                              borderRadius: 10,
                              paddingHorizontal: wp(3),
                              paddingVertical: 5,
                            },
                          ]}
                        >
                          <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Start</ResponsiveText>
                          <ActivityIndicator color={Colors.White} size={wp(4)} style={{ paddingLeft: 4 }} />
                        </LinearGradient>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ width: wp(15), backgroundColor: Colors.Primary, borderRadius: 10 }}
                        onPress={() => {
                          handleSubmitButton(props?.item?.id, props?.latLng?.longitude, props?.latLng?.latitude);
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
                            paddingVertical: 5,
                            textAlign: "center",
                            borderWidth: 0,
                          }}
                        >
                          Start
                        </ResponsiveText>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : props.item?.booking_location?.status == "start" ? (
                  <TouchableOpacity
                    style={{ width: wp(22.5), backgroundColor: Colors.Primary, borderRadius: 10 }}
                    onPress={() => {
                      props.navigation.navigate("StartService", {
                        item: props?.item,
                      });
                      // handleSubmitButton(props?.item?.id, props?.latLng?.longitude, props?.latLng?.latitude);
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
                        paddingVertical: 5,
                        textAlign: "center",
                        borderWidth: 0,
                      }}
                    >
                      View Map
                    </ResponsiveText>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>

          {open ? (
            <View style={{ flex: 1, marginTop: wp(1) }}>
              <ResponsiveText
                style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, color: Colors.DarkGrey, fontSize: 3.5 }}
              >
                {props.item.client?.address}
              </ResponsiveText>
              <ResponsiveText
                style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, marginTop: wp(1), fontSize: 3.5 }}
              >
                ${props.item.total_price}
              </ResponsiveText>
              {props.item?.booking_location?.status == "reached" && (
                <ResponsiveText
                  style={{
                    fontSize: wp(1),
                    fontFamily: Fonts.NunitoRegular,
                    color: "#FF5050",
                    marginTop: wp(1),
                    fontStyle: "italic",
                  }}
                >
                  Waiting for customer’s approval
                </ResponsiveText>
              )}
            </View>
          ) : null}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.border,
              marginVertical: wp(2),
            }}
          />
        </View>
      ) : (
        <View>
          <View style={{ flexDirection: "row", marginTop: wp(3) }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5, flex: 1 }}>
              {props.item.booking_service[0]?.service_name}
            </ResponsiveText>
            <View>
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>{time}</ResponsiveText>
              <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginTop: 1 }}>
                {props.item.status == "in-process"
                  ? "Ongoing"
                  : props.item.status == "new"
                  ? "Pending"
                  : props.item.status == "done"
                  ? "Completed"
                  : ""}
              </ResponsiveText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <ResponsiveText style={{ fontSize: 3.5 }}>{props.item?.client?.username}</ResponsiveText>
              <ResponsiveText style={{ fontSize: 3.5, marginTop: 1 }}>{props.item?.client?.address}</ResponsiveText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: wp(2),
            }}
          >
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold }}>${props.item.total_price}</ResponsiveText>
            {props?.item?.status == "done" ? (
              <ResponsiveText
                style={{
                  fontSize: 3.3,
                  backgroundColor: Colors.Primary,
                  color: Colors.White,
                  borderRadius: 10,
                  paddingHorizontal: wp(3),
                  paddingVertical: 5,
                }}
              >
                Done
              </ResponsiveText>
            ) : null}

            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: wp(5.5), height: wp(5.5)}}
            source={require('../../assets/images/ChatText.png')}
          />
          <Image
            style={{width: wp(6), height: wp(6), marginLeft: 10}}
            source={require('../../assets/images/Phone.png')}
          />
        </View> */}
          </View>
          <View
            style={{
              backgroundColor: Colors.DarkGrey,
              height: 1,
              marginVertical: wp(3),
            }}
          />
        </View>
      )}
    </View>
  );
};

export default TodayJob;
