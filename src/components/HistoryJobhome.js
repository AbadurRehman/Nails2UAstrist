import React, { useState } from "react";
import { View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import ResponsiveText from "./ResponsiveText";
import { wp } from "./Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import moment from "moment";
import LinearGradient from "react-native-linear-gradient";
import JobDoneModal from "../components/JobDoneModal";

const TodayJob = (props) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  let endtime = props.item?.ended_at?.split(" ")[0];

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(3) }}>
        <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>
          {props.item.booking_service[0]?.service_name}
        </ResponsiveText>
        <View>
          <ResponsiveText style={{ fontFamily: Fonts.NunitoBold }}>${props.item.total_price}</ResponsiveText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", flex: 1, marginTop: wp(2) }}>
          <ResponsiveText style={{ fontSize: 3.5, marginTop: 1 }}>{props.item?.client?.username}</ResponsiveText>
          {/* <ResponsiveText style={{ fontSize: 3.5, marginTop: 3 }}>{props.item?.client?.address}</ResponsiveText> */}
          {props?.item?.status == "done" ? (
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
                    <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Done</ResponsiveText>
                    <ActivityIndicator color={Colors.White} size={wp(4)} style={{ paddingLeft: 4 }} />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ width: wp(15), backgroundColor: Colors.Primary, borderRadius: 10 }}
                  onPress={() => {
                    setModalVisible(true);
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
                    Done
                  </ResponsiveText>
                </TouchableOpacity>
              )}
            </View>
          ) : // <ResponsiveText
          //   style={{
          //     fontSize: 3.3,
          //     backgroundColor: Colors.Primary,
          //     color: Colors.White,
          //     borderRadius: 10,
          //     paddingHorizontal: wp(3),
          //     paddingVertical: 5,
          //   }}
          // >
          //   Done
          // </ResponsiveText>
          null}
        </View>
        <View></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 1,
        }}
      >
        <ResponsiveText style={{ fontSize: 3.5 }}>
          {`${endtime} `} {props.item?.schedule_booking[0]?.time}
        </ResponsiveText>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Potfolio");
          }}
        >
          <ResponsiveText
            style={{
              fontSize: 3,
              color: Colors.Primary,
              fontFamily: Fonts.NunitoBold,
              borderRadius: 10,
              paddingHorizontal: wp(3),
              paddingVertical: 5,
              textDecorationLine: "underline",
            }}
          >
            View in Portfolio
          </ResponsiveText>
        </TouchableOpacity>

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

      <JobDoneModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default TodayJob;
