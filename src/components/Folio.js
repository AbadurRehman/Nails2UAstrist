import React from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { wp } from "../components/Responsiveness";
import ResponsiveText from "./ResponsiveText";
import Colors from "../theme/Colors";

const Folio = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.editPotfoilo(props?.item?.id, props?.item?.title);
        }}
        style={{
          zIndex: 100,
          position: "absolute",
          top: 10,
          right: 15,
          backgroundColor: "white",
          borderRadius: wp(2.5),
          justifyContent: "center",
          alignItems: "center",
          width: wp(5),
          height: wp(5),
        }}
      >
        <Image source={require("../assets/images/Pencil.png")} />
      </TouchableOpacity>
      {props.index + 1 === props.lastIndex && props.uploadImage ? (
        <Image style={styles.imageStyle} source={props.uploadImage} />
      ) : (
        <Image style={styles.imageStyle} source={{ uri: props?.item?.absolute_image_url }} />
      )}
      <View style={styles.titleContainer}>
        <ResponsiveText style={{ fontSize: 3.5 }}>{props?.item?.title}</ResponsiveText>
        {props.Imageindex !== null && props.Imageindex === props.index && props.pageLoadDelete ? (
          <ActivityIndicator color={Colors.Primary} />
        ) : (
          <TouchableOpacity onPress={() => props.deleteImage(props.item.id, props.index)}>
            <Image source={require("../assets/images/Trash.png")} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: "#EBEBEB",
    width: wp(40),
    height: wp(45),
    borderRadius: 25,
    marginTop: wp(5),
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleContainer: {
    backgroundColor: "white",
    width: "100%",
    height: wp(10),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(3),
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  imageStyle: {
    width: wp(40),
    height: wp(40),
    resizeMode: "cover",
    // position: 'absolute',
    // overflow: 'hidden',
    // top: 0,
  },
};

export default Folio;
