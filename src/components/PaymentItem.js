import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { wp } from "./Responsiveness";
import ResponsiveText from "./ResponsiveText";
import CheckCircle from "../assets/images/CheckCircle.png";
import Clock from "../assets/images/Clock.png";
import Fonts from "../theme/fonts";
import Colors from "../theme/Colors";

const PaymentItem = (props) => {
  return (
    <>
      <TouchableOpacity disabled={props.ongoing ? true : false} style={{ flexDirection: "row" }}>
        <View style={{ flex: 2 }}>
          {props.item?.services_name && (
            <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>
              {props.item?.services_name[0].name}
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
              {props.item?.created_time}
            </ResponsiveText>
            <ResponsiveText style={{ fontSize: 3.5, fontFamily: Fonts.NunitoBold }}>
              {props.item?.created_day}
            </ResponsiveText>
          </View>
        </View>
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold }}>${props.item?.price}</ResponsiveText>

            {/* <ResponsiveText style={{ marginRight: wp(5), fontFamily: Fonts.NunitoBold }}></ResponsiveText> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: wp(7),
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
              {props.pending ? (
                <Image
                  style={{
                    width: wp(6),
                    height: wp(6),
                    tintColor: props.pending ? "#FF5050" : Colors.Primary,
                    marginTop: -wp(2.4),
                    marginLeft: -wp(1.8),
                  }}
                  resizeMode="contain"
                  source={Clock}
                />
              ) : (
                <Image
                  style={{
                    width: wp(4),
                    height: wp(4),
                    tintColor: props.pending ? "#FF5050" : Colors.Primary,
                  }}
                  resizeMode="contain"
                  source={CheckCircle}
                />
              )}
            </View>
          </>
        </View>
      </TouchableOpacity>

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

export default PaymentItem;
