import React from "react";
import { View, Image } from "react-native";
import { wp } from "../components/Responsiveness";
import ResponsiveText from "./ResponsiveText";

const ProfileField = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <Image style={{ marginRight: 20 }} source={props.image} />
        <ResponsiveText>{props.text}</ResponsiveText>
      </View>
    </View>
  );
};
const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: wp(5),
    marginRight: 20,
  },
};
export default ProfileField;
