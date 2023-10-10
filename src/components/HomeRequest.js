import React, { useState } from "react";
import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import ResponsiveText from "./ResponsiveText";
import { wp } from "./Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import moment from "moment";
import Clock from "../assets/images/CheckCircle.png";

import { acceptJobRequest } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";

const TodayJob = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const accept = async (id) => {
    setLoading(true);
    await acceptJobRequest(id, async (res) => {
      // console.log(res, "dddddd");
      // setPageLoad(false);
      setLoading(false);
      EventRegister.emit("JobAccept");
    });
  };

  return (
    <View>
      {props?.item?.status == "new" ? (
        <View style={{}}>
          <TouchableOpacity
            disabled={props.ongoing ? true : false}
            onPress={() => {
              setOpen(!open);
            }}
            style={{ flexDirection: "row" }}
          >
            <View style={{ flex: 2 }}>
              <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>
                {props.item?.post_service[0]?.service_name}
              </ResponsiveText>
              <View
                style={{
                  marginTop: wp(1),
                  flexDirection: "row",
                  // justifyContent: "space-between",
                }}
              >
                <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginRight: wp(5) }}>
                  {moment(props.item.created_at).format("h:mm a")}
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
          <View style={{ flexDirection: "row", marginTop: wp(3), flex: 1 }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5, flex: 1 }}>
              <ResponsiveText style={{ flexDirection: "row", flex: 1 }}>
                {props.item.post_service &&
                  props.item.post_service.map((service, index) => {
                    return (
                      <ResponsiveText key={index} style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>
                        {service?.name}
                        {index < props.item?.post_service?.length - 1 ? ", " : ""}
                      </ResponsiveText>
                    );
                  })}
              </ResponsiveText>
            </ResponsiveText>

            <View style={{}}>
              <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>
                {"  "}
                {props?.item?.schedule?.time}
              </ResponsiveText>
              {/* <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginTop: 1 }}>
                {props.item.status == "in-process"
                  ? "Ongoing"
                  : props.item.status == "new"
                  ? "Pending"
                  : props.item.status == "done"
                  ? "Completed"
                  : ""}
              </ResponsiveText> */}
            </View>
          </View>

          <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>
            {String(moment(props.item?.date).format("MMM Do, YYYY"))}
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <ResponsiveText style={{ fontSize: 3.5, marginTop: 5 }}>{props.item?.client?.username}</ResponsiveText>
              <ResponsiveText style={{ fontSize: 3.5, marginTop: 5 }}>{props.item?.location}</ResponsiveText>
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
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold }}>${props.item.price}</ResponsiveText>
            {props.request ? (
              <View>
                {loading ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      flexDirection: "row",
                      paddingHorizontal: wp(3),
                      paddingVertical: 5,
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.3,
                        color: Colors.White,
                      }}
                    >
                      Accept
                    </ResponsiveText>
                    <ActivityIndicator color="white" style={{ paddingLeft: 4 }} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      accept(props.item.id);
                    }}
                  >
                    <ResponsiveText
                      style={{
                        fontSize: 3.3,
                        backgroundColor: "red",
                        color: Colors.White,
                        borderRadius: 10,
                        paddingHorizontal: wp(3),
                        paddingVertical: 5,
                      }}
                    >
                      Accept
                    </ResponsiveText>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
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
            )}

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
