import React, { useState } from "react";
import { View, Image, TouchableOpacity, TextInput, Text, ActivityIndicator, Alert } from "react-native";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";

import { wp } from "./Responsiveness";
import ResponsiveText from "./ResponsiveText";
import DatePicker from "react-native-date-picker";
import { editService, deleteService } from "../utils/Actions";

const AddService = (props) => {
  const [select, setSelect] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(false);
  const [editPrice, setEditPrice] = useState("");
  const [errorPrice, seterrorPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeValue = (text) => {
    if (!text) {
      setEditPrice("");
      seterrorPrice("*Please fill price");
    } else {
      seterrorPrice("");
      setEditPrice(text);
    }
  };

  const handleSubmitButton = async () => {
    if (select === "" || editPrice === "" || errorPrice !== "") {
      // if (!select) {
      //   seterrorService("*Please fill Name");
      // }

      if (!editPrice) {
        seterrorPrice("*Please fill price");
      }
    } else {
      setLoading(true);
      // console.log("select---", select, userPrice);
      await editService(select, editPrice, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            setLoading(false);
            alert(res.errors);
          } else {
            setLoading(false);
            alert(res.errors[0]);
          }
        } else {
          setLoading(false);
          props.setShow(undefined);
          setSelect(undefined);
          setEditPrice("");
          props.reloadServices();
          alert("Service Updated successfully");
        }
      });
    }
  };
  const deleteButtonAlert = (id) =>
    Alert.alert("Delete Service", "Are you sure you want to delete this service?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleDeleteBtn(id);
        },
      },
    ]);

  const handleDeleteBtn = async (id) => {
    setLoading(true);
    // console.log("select---", select, userPrice);
    await deleteService(id, (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          setLoading(false);
          alert(res.errors);
        } else {
          setLoading(false);
          alert(res.errors[0]);
        }
      } else {
        setLoading(false);
        props.setShow(undefined);
        setSelect(undefined);
        setEditPrice("");
        props.reloadServices();
        alert("Service Deleted successfully");
      }
    });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5 }}>{props.item.name}</ResponsiveText>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 3.5, color: "black" }}>
            ${props.item.price}
          </ResponsiveText>
          <TouchableOpacity
            onPress={() => {
              if (select && select == props.show) {
                props.setShow(undefined);
                setSelect(undefined);
                setEditPrice("");
              } else {
                setSelect(props.item.id);
                setEditPrice(props.item.price);
                props.setShow(props.item.id);
              }
            }}
            style={{ paddingBottom: wp(2) }}
          >
            <Image style={{ marginLeft: wp(10) }} source={require("../assets/images/Pencil.png")} />
          </TouchableOpacity>
        </View>
      </View>
      {select && select == props.show ? (
        <View>
          <ResponsiveText style={{ fontSize: 3, paddingVertical: wp(2) }}>Edit Price</ResponsiveText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1.5,
              }}
            >
              <TextInput
                placeholderTextColor={Colors.lightGrey}
                value={editPrice}
                onChangeText={(text) => {
                  // setEditPrice(text);
                  onChangeValue(text);
                }}
                keyboardType="number-pad"
                style={{
                  backgroundColor: "#F8F8F8",
                  width: wp(23),
                  height: wp(11),
                  paddingLeft: wp(5),
                  borderColor: Colors.lightGrey,
                  borderWidth: 1,
                  fontSize: 15,
                  marginRight: wp(2),
                  color: "black",
                }}
              />
            </View>
          </View>
          {errorPrice != "" ? (
            <Text
              style={{
                color: "red",
                fontSize: 10,
                width: wp(65),
                marginTop: wp(1),
              }}
            >
              {errorPrice}
            </Text>
          ) : null}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: wp(2),
        }}
      >
        {select && select == props.show ? (
          <View>
            {loading ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.Primary,
                  width: wp(20),
                  height: wp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: wp(2),
                  flexDirection: "row",
                }}
              >
                <ResponsiveText style={{ color: Colors.White }}>Save</ResponsiveText>
                <ActivityIndicator color="#fff" style={{ paddingLeft: 4 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleSubmitButton}
                style={{
                  backgroundColor: Colors.Primary,
                  width: wp(15),
                  height: wp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: wp(2),
                }}
              >
                <ResponsiveText style={{ color: Colors.White }}>Save</ResponsiveText>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          // <TouchableOpacity
          //   style={{
          //     backgroundColor: Colors.Primary,
          //     width: wp(15),
          //     height: wp(8),
          //     justifyContent: "center",
          //     alignItems: "center",
          //     // marginTop: wp(8),
          //     borderRadius: wp(2),
          //   }}
          // >
          //   <ResponsiveText style={{ color: Colors.White }}>Save</ResponsiveText>
          // </TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../assets/images/Plus.png")} />
            <ResponsiveText style={{ fontSize: 3, marginLeft: 10 }}>Add Discounts</ResponsiveText>
          </View>
        )}

        <TouchableOpacity
          style={{ padding: wp(2), paddingRight: 0 }}
          onPress={() => {
            deleteButtonAlert(props.item.id);
          }}
        >
          <Image source={require("../assets/images/Trash.png")} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: Colors.lightGrey,
          marginVertical: wp(3),
        }}
      />
    </View>
  );
};

export default AddService;
