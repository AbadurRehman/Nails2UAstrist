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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import { addService, addNewService } from "../utils/Actions";
const Data = [
  {
    id: 1,
    title: "Acrylic Nailart",
  },
  {
    id: 2,
    title: "French manicure",
  },
  {
    id: 3,
    title: "Parafin mask",
  },
  {
    id: 4,
    title: "Acrylic Nailart",
  },
];
const AddServiceModal = (props) => {
  const [show, setShow] = useState(false);
  const [userService, setuserService] = useState("");
  const [errorService, seterrorService] = useState("");
  const [select, setSelect] = useState({ name: undefined, id: undefined });
  const [userPrice, setuserPrice] = useState("");
  const [errorPrice, seterrorPrice] = useState("");

  const [userName, setUserName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [loading, setLoading] = useState(false);

  const [btnVisible, setBtnVisible] = useState(true);
  const [adminVisible, setAdminVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);

  const [uploadImage, setUploadImage] = useState("");
  const [upImg, setupImg] = useState(null);
  const [errorImg, setErrorImage] = useState("");

  const [modalVisibleImg, setModalVisibleImg] = useState(false);

  const handleSubmitButton = async () => {
    if (select.id === "" || select.name == "" || userPrice === "" || errorService !== "" || errorPrice !== "") {
      // if (!select) {
      //   seterrorService("*Please fill Name");
      // }

      if (!userPrice) {
        seterrorPrice("*Please fill price");
      }
    } else {
      setLoading(true);
      await addService(select, userPrice, (res) => {
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
          setuserPrice("");
          setSelect({ name: undefined, id: undefined });
          props.setModalVisible(false);
          props.reloadServices();
          alert("Service created successfully");
        }
      });
    }
  };

  const handleSubmitButtonNew = async () => {
    if (userName == "" || userPrice === "" || errorName !== "" || errorPrice !== "" || uploadImage === "") {
      if (!userName) {
        setErrorName("*Please fill Service Name");
      }

      if (!userPrice) {
        seterrorPrice("*Please fill Price");
      }

      if (!uploadImage) {
        setErrorImage("*Please Upload Image");
      }
    } else {
      setLoading(true);
      await addNewService(userName, userPrice, uploadImage[0], (res) => {
        console.log("addNewService----", res);
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
          setuserPrice("");
          setUserName("");
          setUploadImage("");
          setupImg(null);
          setBtnVisible(true);
          setAdminVisible(false);
          setCustomVisible(false);
          props.setModalVisible(false);
          props.reloadServices();
          alert("We received your custom service offering request Once it is approved by admin we will notify you");
        }
      });
    }
  };

  const onChangeValue = (type, text) => {
    if (type === "Service") {
      if (!text) {
        seterrorService("*Please fill Service");
      } else {
        seterrorService("");
        setuserService(text);
      }
    }

    if (type === "Price") {
      if (!text) {
        seterrorPrice("*Please fill Price");
      } else {
        seterrorPrice("");
        setuserPrice(text);
      }
    }

    if (type === "Name") {
      if (!text) {
        setErrorName("*Please fill Service Name");
      } else {
        setErrorName("");
        setUserName(text);
      }
    }
  };

  const launchCam = () => {
    // setupImg(null);
    launchCamera(
      {
        mediaType: "photo",
        storageOptions: {
          // skipBackup: true,
          // path: 'Pictures/myAppPicture/', //-->this is neccesary
          privateDirectory: true,
        },
      },
      (response) => {
        if (response["didCancel"]) {
          setModalVisibleImg(false);
        } else {
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setErrorImage("");

          setModalVisibleImg(false);
        }
      }
    );
  };
  const launchGal = () => {
    // setupImg(null);
    launchImageLibrary(
      {
        mediaType: "photo",
        storageOptions: {
          // skipBackup: true,
          // path: 'Pictures/myAppPicture/', //-->this is neccesary
          privateDirectory: true,
        },
      },
      (response) => {
        if (response["didCancel"]) {
          setModalVisibleImg(false);
        } else {
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setErrorImage("");
          setModalVisibleImg(false);
        }
      }
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
        setShow(false);
        setBtnVisible(true);
        setCustomVisible(false);
        setAdminVisible(false);
        setUploadImage("");
        setupImg(null);
      }}
    >
      <KeyboardAvoidingView style={styles.modalContainer} enabled behavior="padding">
        <TouchableOpacity
          onPress={() => {
            props.setModalVisible(false);
            setShow(false);
            setBtnVisible(true);
            setCustomVisible(false);
            setAdminVisible(false);
            setUploadImage("");
            setupImg(null);
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
            {btnVisible && (
              <View style={styles.modalInner}>
                <TouchableOpacity
                  onPress={() => {
                    setBtnVisible(false);
                    setCustomVisible(true);
                  }}
                  style={{
                    flexDirection: "row",
                    backgroundColor: Colors.Primary,
                    paddingHorizontal: wp(10),
                    paddingVertical: 10,
                    borderRadius: wp(2),
                    width: wp(58),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ResponsiveText style={styles.font}>Custom Service</ResponsiveText>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.line}></View>
                  <View>
                    <ResponsiveText style={styles.orwithText}>OR</ResponsiveText>
                  </View>
                  <View style={styles.line}></View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setBtnVisible(false);
                    setAdminVisible(true);
                  }}
                  style={{
                    flexDirection: "row",
                    backgroundColor: Colors.Primary,
                    paddingHorizontal: wp(10),
                    paddingVertical: 10,
                    borderRadius: wp(2),
                    alignItems: "center",
                    width: wp(58),
                    justifyContent: "center",
                  }}
                >
                  <ResponsiveText style={styles.font}>Admin Offer Services</ResponsiveText>
                </TouchableOpacity>
              </View>
            )}

            {adminVisible && (
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setShow(!show);
                  }}
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
                  <ResponsiveText style={{ color: Colors.lightGrey }}>{select?.name ?? "Service"}</ResponsiveText>
                  <Image style={{ width: wp(4), height: wp(4) }} source={require("../assets/images/arrow_down.png")} />
                </TouchableOpacity>
                {show && (
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
                      Object.keys(props?.data).length !== 0 &&
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
                )}

                {errorService != "" ? <Text style={styles.errorTextStyle}>{errorService}</Text> : null}
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
            )}

            {customVisible && (
              <View style={{ alignItems: "center" }}>
                <TextInput
                  placeholder={"Service Name"}
                  name
                  onChangeText={(text) => onChangeValue("Name", text)}
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
                {errorName != "" ? <Text style={styles.errorTextStyle}>{errorName}</Text> : null}

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

                <TouchableOpacity
                  onPress={() => {
                    // setImagePic(!imagePic);
                    setModalVisibleImg(true);
                  }}
                >
                  {uploadImage ? (
                    <View
                      style={{
                        width: wp(70),
                        height: wp(30),
                        borderRadius: wp(2),
                        marginTop: wp(4),
                      }}
                    >
                      {upImg ? (
                        <Image
                          style={{
                            width: wp(70),
                            height: wp(30),
                            borderRadius: wp(2),
                          }}
                          source={upImg}
                        />
                      ) : (
                        <Image
                          style={{
                            width: wp(70),
                            height: wp(30),
                            borderRadius: wp(2),
                          }}
                          source={{ uri: uploadImage }}
                        />
                      )}
                      {/* <Image style={styles.profileImage} source={upImg ? upImg : { uri: uploadImage }} /> */}
                    </View>
                  ) : (
                    <View
                      style={{
                        width: wp(70),
                        height: wp(30),
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "lightgray",
                        borderRadius: wp(2),
                        marginTop: wp(4),
                      }}
                    >
                      <Image style={styles.drivingImage} source={require("../assets/images/camera.png")} />
                    </View>
                  )}
                </TouchableOpacity>

                {errorImg != "" ? <Text style={styles.errorTextStyle}>{errorImg}</Text> : null}

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
                    onPress={handleSubmitButtonNew}
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
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleImg}
        onRequestClose={() => setModalVisibleImg(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisibleImg(false)}
          activeOpacity={0.9}
          style={styles.modalContainerImg}
        >
          <TouchableOpacity onPress={() => setModalVisibleImg(true)} activeOpacity={1} style={styles.modalContentImg}>
            <View style={styles.modalInnerImg}>
              <TouchableOpacity
                onPress={() => {
                  launchCam();
                  setModalVisibleImg(false);
                }}
                style={{
                  backgroundColor: Colors.Primary,
                  paddingVertical: 10,
                  borderRadius: wp(2),
                  width: wp(30),
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: wp(2),
                }}
              >
                <Image style={styles.cameraImagewhite} source={require("../assets/images/camera.png")} />
                <ResponsiveText style={styles.font}>Picture</ResponsiveText>
              </TouchableOpacity>
              <View style={styles.imageUpload} />
              <TouchableOpacity
                onPress={() => {
                  launchGal();
                  setModalVisibleImg(false);
                }}
                style={{
                  backgroundColor: Colors.Primary,
                  paddingVertical: 10,
                  borderRadius: wp(2),
                  alignItems: "center",
                  width: wp(30),
                  justifyContent: "center",
                  marginLeft: wp(2),
                }}
              >
                <Image style={styles.cameraImagewhite} source={require("../assets/images/gallery.png")} />
                <ResponsiveText style={styles.font}>Gallery</ResponsiveText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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

  font: {
    fontSize: 4,
    color: "white",
  },

  imageUpload: {
    width: wp(0.5),
    height: wp(22),
    backgroundColor: "#2C3145",
    borderRadius: 10,
    marginVertical: wp(5.5),
    marginHorizonal: wp(4),
  },

  modalInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalInnerImg: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  line: {
    width: wp(22),
    height: 1,
    backgroundColor: Colors.DarkGrey,
  },
  orwithText: {
    fontSize: 4,
    color: Colors.DarkGrey,
    paddingVertical: wp(5),
    paddingHorizontal: 20,
  },
  drivingImage: {
    width: wp(10),
    height: wp(10),
  },

  cameraImagewhite: {
    tintColor: "white",
    resizeMode: "contain",
    width: wp(5.5),
    height: wp(5.5),
    // marginRight: wp(2),
    marginBottom: wp(2),
  },
  modalContainerImg: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  modalContentImg: {
    height: "26%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    // position: 'absolute',
    // bottom: wp(15),
  },
};
export default AddServiceModal;
