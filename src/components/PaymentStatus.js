import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { wp } from "./Responsiveness";
import ResponsiveText from "./ResponsiveText";
import Clock from "../assets/images/CheckCircle.png";
import Fonts from "../theme/fonts";
import Colors from "../theme/Colors";
import moment from "moment";

const PaymentStatus = (props) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (props.item?.schedule_booking) {
      let t = props.item?.schedule_booking[0]?.time;
      setTime(t);
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        disabled={props.ongoing ? true : false}
        onPress={() => {
          setOpen(!open);
        }}
        style={{ flexDirection: "row" }}
      >
        <View style={{ flex: 2 }}>
          {props.item?.booking_service && (
            <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>
              {props.item?.booking_service[0]?.name}
            </ResponsiveText>
          )}

          <View
            style={{
              marginTop: wp(1),
              flexDirection: "row",
              // justifyContent: "space-between",
            }}
          >
            <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold, marginRight: wp(5) }}>
              {time}
            </ResponsiveText>
            <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>Today</ResponsiveText>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          {props.ongoing ? (
            <ResponsiveText style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold }}>Ongoing</ResponsiveText>
          ) : props.pending ? (
            <ResponsiveText style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, color: "red" }}>
              Pending
            </ResponsiveText>
          ) : (
            <>
              <ResponsiveText style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold }}></ResponsiveText>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: wp(5),
                  marginRight: -4,
                }}
              >
                <ResponsiveText
                  style={{
                    fontFamily: Fonts.NunitoBold,
                    fontSize: 2.8,
                    marginRight: 5,
                    color: props.pending ? "#FF5050" : Colors.Primary,
                  }}
                >
                  Payment
                </ResponsiveText>
                <Image
                  style={{
                    tintColor: props.pending ? "#FF5050" : Colors.Primary,
                  }}
                  source={Clock}
                />
              </View>
            </>
          )}
        </View>
        {props.pending || props.completed ? (
          <View style={{ marginTop: wp(1) }}>
            <Image
              style={{ width: wp(4), height: wp(4), transform: [{ rotate: open ? "180deg" : "0deg" }] }}
              source={require("../assets/images/arrow_down.png")}
            />
          </View>
        ) : null}
      </TouchableOpacity>
      {(props.pending || props.completed) && open ? (
        <View style={{ flex: 1, marginTop: wp(1) }}>
          <ResponsiveText
            style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, color: Colors.DarkGrey, fontSize: 3.5 }}
          >
            {props.item.client?.address}
          </ResponsiveText>
          {props.item.booking_service && (
            <ResponsiveText
              style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold, marginTop: wp(1), fontSize: 3.5 }}
            >
              ${props.item?.total_price}
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
    </>
  );
};

export default PaymentStatus;
