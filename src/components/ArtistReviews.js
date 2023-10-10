import React from "react";
import { View, Text, Image } from "react-native";
import { wp } from "../components/Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import ResponsiveText from "./ResponsiveText";
import moment from "moment";

const ArtistReviews = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <View>
          <ResponsiveText style={styles.titleText}>{props.item.username}</ResponsiveText>
          <ResponsiveText style={{ fontSize: 3.2 }}>
            {moment(props.item.created_at).format("MMM Do, YYYY")}
          </ResponsiveText>
        </View>

        <View style={styles.starContainer}>
          <Image style={{ width: wp(4), height: wp(4) }} source={require("../assets/images/red_star.png")} />
          <ResponsiveText style={{ marginLeft: 5, fontSize: 3.5 }}>{props.item.rating}</ResponsiveText>
        </View>
      </View>
      <ResponsiveText style={{ marginVertical: wp(5), fontSize: 3.5 }}>{props.item.review}</ResponsiveText>
      <View style={styles.border} />
    </View>
  );
};
const styles = {
  border: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: wp(5),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titletext: {
    color: Colors.Primary,
    fontFamily: Fonts.NunitoBold,
    fontSize: 4,
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
};
export default ArtistReviews;
