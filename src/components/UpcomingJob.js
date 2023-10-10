import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { wp } from "./Responsiveness";
import Colors from "../theme/Colors";
import ResponsiveText from "./ResponsiveText";
import Fonts from "../theme/fonts";
import { acceptJobRequest } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";

const UpcomingJob = (props) => {
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
      setLoading(false);
      EventRegister.emit("JobAccept");
    });
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ResponsiveText style={styles.bookingText}>Your Upcoming Job</ResponsiveText>
        <ResponsiveText
          style={{
            fontFamily: Fonts.NunitoBold,
            color: "#FF5050",
            marginBottom: 5,
          }}
        >
          Time Left : 23:02:33
        </ResponsiveText>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: wp(100) }}>
          <ResponsiveText style={{ fontSize: 3.5, color: Colors.Primary, marginTop: wp(1), fontSize: wp(0.9) }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: wp(0.95) }}>Service :</ResponsiveText>{" "}
            Acrylic fill,Acrylic Full set, Marble paint
          </ResponsiveText>

          <ResponsiveText style={{ fontSize: 3.5, color: Colors.Primary, marginTop: wp(1), fontSize: wp(0.9) }}>
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: wp(0.95) }}>Location :</ResponsiveText> 123
            ferozpur road, xyz street
          </ResponsiveText>
        </View>
        <View>
          {props.item && (
            <ResponsiveText style={{ fontSize: 3, color: Colors.White }}>
              {String(moment(props.item?.date).format("MMM Do, YYYY"))}
              {"   "} {props?.item?.schedule?.time}
            </ResponsiveText>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: wp(3),
          marginBottom: wp(1),
        }}
      >
        <View>
          {loading ? (
            <TouchableOpacity
              style={{
                backgroundColor: Colors.White,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                width: wp(30),
                height: wp(9),
                flexDirection: "row",
              }}
            >
              <ResponsiveText
                style={{
                  fontSize: 3.3,
                  color: Colors.White,
                }}
              >
                Start this Job
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
                  color: Colors.White,
                }}
              >
                Start this Job
              </ResponsiveText>
            </TouchableOpacity>
          )}
        </View>
        <View></View>
      </View>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: "#F5E7E8",
    borderTopColor: Colors.lightGrey,
    borderTopWidth: 1,
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
  },
  bookingText: {
    fontFamily: Fonts.NunitoBold,
    color: Colors.Primary,
    marginBottom: 5,
  },
  trackArtist: {
    backgroundColor: Colors.Primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: wp(30),
    height: wp(9),
  },
};
export default UpcomingJob;
