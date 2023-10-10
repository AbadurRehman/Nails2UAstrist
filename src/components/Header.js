import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../theme/Colors";
import SideArrow from "../assets/images/side_arrow.png";
import BurgerMenu from "../assets/images/burger_menu.png";
import { wp } from "../components/Responsiveness";
import ResponsiveText from "./ResponsiveText";
const Header = (props) => {
  // console.log(props);
  return (
    <View
      style={{
        backgroundColor: Colors.Primary,
        flexDirection: "row",
        alignItems: props.height ? null : "center",
        paddingTop: props.height ? wp(6) : 0,
        justifyContent: "space-between",
        height: props.height ? wp(40) : wp(18),
        paddingHorizontal: wp(4),
        width: "100%",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
      >
        <Image style={{ tintColor: Colors.White }} source={SideArrow} />
      </TouchableOpacity>
      <ResponsiveText style={{ fontSize: 5, color: "white", fontWeight: "bold" }}>{props.title}</ResponsiveText>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image style={{ width: wp(7), height: wp(7), tintColor: Colors.White }} source={BurgerMenu} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
