import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { wp } from "../components/Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import ResponsiveText from "./ResponsiveText";
import { addService } from "../utils/Actions";

const AddServiceModal = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [userService, setuserService] = useState("");
  const [errorService, seterrorService] = useState("");
  // const [select, setSelect] = useState({ name: undefined, id: undefined });
  const [userPrice, setuserPrice] = useState("");
  const [errorPrice, seterrorPrice] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmitButton = async () => {
    if (id === "" || userPrice === "" || errorPrice !== "") {
      // if (!select) {
      //   seterrorService("*Please fill Name");
      // }

      if (!userPrice) {
        seterrorPrice("*Please fill price");
      }
    } else {
      setLoading(true);
      await addService(id, userPrice, (res) => {
        console.log(res, "res");
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
          props.setModalVisible(false);
          props.reloadServices();
          alert("Service created successfully");
        }
      });
    }
  };

  const openModal = (id, name, price) => {
    setId(id);
    setName(name);
    setuserPrice(price);
  };

  const onChangeValue = (type, text) => {
    if (type === "Service") {
      if (!text) {
        seterrorService("*Please fill service");
      } else {
        seterrorService("");
        setuserService(text);
      }
    }

    if (type === "Price") {
      if (!text) {
        seterrorPrice("*Please fill price");
      } else {
        seterrorPrice("");
        setuserPrice(text);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(false)}
    >
      <KeyboardAvoidingView style={styles.modalContainer} enabled behavior="padding">
        <TouchableOpacity
          onPress={() => {
            props.setModalVisible(false);
            setShow(false);
          }}
          activeOpacity={0.9}
          // style={{ backgroundColor: "r/ed" }}
          style={[styles.modalContainer, { width: wp(100), padding: wp(10) }]}
        >
          <TouchableOpacity onPress={() => props.setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
            <View style={styles.primaryContainer}></View>
            <ResponsiveText
              style={{
                paddingHorizontal: wp(10),
                paddingVertical: wp(3),
                fontFamily: Fonts.NunitoBold,
              }}
            >
              Add Service
            </ResponsiveText>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#F8F8F8",
                  width: wp(70),
                  height: wp(11),
                  paddingHorizontal: wp(5),
                  borderColor: Colors.lightGrey,
                  borderWidth: 1,
                  borderRadius: wp(10),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* <TextInput
                placeholder={"Service"}
                onChangeText={(text) => onChangeValue("Service", text)}
                placeholderTextColor={Colors.lightGrey}
                style={{
                  fontSize: 15,
                }}
              /> */}
                <ResponsiveText style={{ color: Colors.lightGrey }}>{name}</ResponsiveText>
              </View>
              {/* {show && (
                <ScrollView
                  style={{
                    position: "absolute",
                    top: wp(10),
                    zIndex: 10,
                    height: wp(50),
                    width: wp(70),
                    backgroundColor: "#F8F8F8",

                    paddingHorizontal: wp(5),
                    paddingVertical: wp(2),
                    borderColor: Colors.lightGrey,
                    borderWidth: 1,
                    borderRadius: wp(2),
                  }}
                  contentContainerStyle={{
                    // backgroundColor: "#F8F8F8",
                    width: wp(68),
                  }}
                >
                  {show &&
                    props?.data?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          style={{ marginBottom: wp(4.5) }}
                          onPress={() => {
                            setSelect({ name: item.name, id: item.id });
                            setShow(false);
                          }}
                        >
                          <ResponsiveText>{item.name}</ResponsiveText>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              )} */}

              <TextInput
                placeholder={"Price"}
                keyboardType="number-pad"
                onChangeText={(text) => onChangeValue("Price", text)}
                placeholderTextColor={Colors.lightGrey}
                style={{
                  marginTop: wp(5),
                  backgroundColor: "#F8F8F8",
                  width: wp(70),
                  height: wp(11),
                  paddingLeft: wp(5),
                  borderColor: Colors.lightGrey,
                  borderWidth: 1,
                  borderRadius: wp(10),
                  fontSize: 15,
                  color: Colors.lightGrey,
                }}
              />

              {errorPrice != "" ? <Text style={styles.errorTextStyle}>{errorPrice}</Text> : null}
              {loading ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.Primary,
                    width: wp(20),
                    height: wp(8),
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: wp(8),
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
                    marginTop: wp(8),
                    borderRadius: wp(2),
                  }}
                >
                  <ResponsiveText style={{ color: Colors.White }}>Save</ResponsiveText>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "rgba(196, 196, 196, 0.5)",
    alignItems: "center",
    // justifyContent: 'center',
  },
  modalContent: {
    // height: wp(70),
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingBottom: wp(5),
    // justifyContent: 'center',
    // alignItems: 'center',

    // position: "absolute",
    // bottom: wp(40),
  },
  primaryContainer: {
    backgroundColor: Colors.Primary,
    height: wp(8),
    width: "100%",
    borderTopRightRadius: wp(5),
    borderTopLeftRadius: wp(5),
  },
  errorTextStyle: {
    color: "red",
    fontSize: 10,
    width: wp(65),
  },
};
export default AddServiceModal;
