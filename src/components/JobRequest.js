import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { wp } from "../components/Responsiveness";
import Colors from "../theme/Colors";
import ResponsiveText from "../components/ResponsiveText";
import Fonts from "../theme/fonts";
import { acceptJobRequest } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";
import moment from "moment";

const JobRequest = (props) => {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.item?.schedule_booking) {
      let t = props.item?.schedule_booking[0]?.time;
      setTime(t);
    }
  }, []);

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
    <View style={styles.container}>
      <ResponsiveText style={styles.bookingText}>Job Request</ResponsiveText>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: wp(50) }}>
          <ResponsiveText style={{ fontSize: 3.5, color: Colors.White }}>
            Customer : {props.item?.client?.username}
          </ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              marginTop: wp(1),
              width: wp(90),
              flexWrap: "wrap",
            }}
          >
            {props.item.post_service &&
              props.item.post_service.map((service, index) => {
                return (
                  <ResponsiveText
                    key={index}
                    style={{ color: Colors.White, fontFamily: Fonts.NunitoBold, fontSize: 3 }}
                  >
                    {service?.name}
                    {index < props.item?.post_service?.length - 1 ? ", " : ""}
                  </ResponsiveText>
                );
              })}
          </View>
        </View>
        <View>
          {props.item && (
            <ResponsiveText style={{ fontSize: 3, color: Colors.White }}>
              {String(moment(props.item?.date).format("MMM Do, YYYY"))}
              {"   "} {props?.item?.schedule?.time}
            </ResponsiveText>
          )}

          {/* <TouchableOpacity onPress={props.onPress} style={styles.trackArtist}>
            <ResponsiveText style={{fontSize: 3.2, color: Colors.White}}>
              Track your artist
            </ResponsiveText>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: wp(1) }}>
        <ResponsiveText style={{ fontSize: 3, color: Colors.White, marginRight: wp(1.2), width: wp(75) }}>
          {props.item?.location}
        </ResponsiveText>

        <ResponsiveText style={{ fontSize: 3.5, color: Colors.White }}>${props.item?.price}</ResponsiveText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: wp(3),
        }}
      >
        {/* <TouchableOpacity onPress={props.onPress} style={styles.trackArtist}>
          <ResponsiveText style={{ fontSize: 3.2, color: Colors.Primary }}>Accept</ResponsiveText>
        </TouchableOpacity> */}

        <View>
          {loading ? (
            <TouchableOpacity
              // style={{
              //   backgroundColor: "red",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   borderRadius: 10,
              //   flexDirection: "row",
              //   paddingHorizontal: wp(3),
              //   paddingVertical: 5,
              // }}
              style={{
                backgroundColor: Colors.White,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                // marginHorizontal: wp(5),
                width: wp(20),
                // marginLeft: wp(5),

                height: wp(8),
                flexDirection: "row",
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.3,
                  color: Colors.Primary,
                }}
              >
                Accept
              </ResponsiveText>
              <ActivityIndicator color={Colors.Primary} style={{ paddingLeft: 4 }} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                accept(props.item.id);
              }}
              style={styles.trackArtist}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.3,
                  color: Colors.Primary,
                }}
                // style={{
                //   fontSize: 3.3,
                //   backgroundColor: "red",
                //   color: Colors.White,
                //   borderRadius: 10,
                //   paddingHorizontal: wp(3),
                //   paddingVertical: 5,
                // }}
              >
                Accept
              </ResponsiveText>
            </TouchableOpacity>
          )}
        </View>
        <View></View>
        {/* <ResponsiveText style={{ fontSize: 3.2, color: Colors.White, textDecorationLine: "underline" }}>
          Pass on to other artist
        </ResponsiveText> */}
      </View>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: Colors.Primary,
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
  },
  bookingText: {
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
    marginBottom: 5,
    color: Colors.White,
  },
  trackArtist: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: wp(5),
    width: wp(20),
    // marginLeft: wp(5),

    height: wp(8),
  },
};
export default JobRequest;
