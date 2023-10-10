import React, { useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { wp } from "../components/Responsiveness";
import ResponsiveText from "./ResponsiveText";
import Colors from "../theme/Colors";

const EditField = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={{ width: wp(6), height: wp(6) }} source={props.image} />
        <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginLeft: 10 }}>{props.title}</ResponsiveText>
      </View>

      <View style={{ flexDirection: "row" }}>
        {props.phone ? (
          <View style={{ height: wp(11), justifyContent: "center", paddingBottom: wp(1) }}>
            <Text
              style={{
                fontSize: 16,
                alignSelf: "center",
                color: Colors.Primary,
                marginRight: Platform.OS == "ios" ? wp(2) : 0,
              }}
            >
              +1
            </Text>
          </View>
        ) : null}
        <TextInput
          style={{
            fontSize: 16,
            width: props.width ? wp(60) : null,
            color: Colors.Primary,
            height: wp(11),
          }}
          keyboardType={
            props.phone
              ? "phone-pad"
              : props.email
              ? "email-address"
              : props.experience || props.zipcode
              ? "numeric"
              : "default"
          }
          maxLength={props.phone ? 14 : 500}
          // numberOfLines={1}
          placeholderTextColor={Colors.Primary}
          multiline={true}
          numberOfLines={2}
          placeholder={props.password ? "***********" : ""}
          defaultValue={props.value}
          onChangeText={props.onChangeText}
        />
      </View>
    </View>
  );
};
const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
  },
};

export default EditField;
