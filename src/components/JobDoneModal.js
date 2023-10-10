import React, { useState, useEffect } from "react";
import { View, Modal, TouchableOpacity, Image, TextInput, Touchable, ActivityIndicator } from "react-native";
import { wp } from "../components/Responsiveness";
import Colors from "../theme/Colors";
import Fonts from "../theme/fonts";
import ResponsiveText from "./ResponsiveText";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import LinearGradient from "react-native-linear-gradient";
import { postUploadImage } from "../utils/Actions";

const JobDoneModal = (props) => {
  const [uploadImage, setUploadImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(props.modalVisible);

  useEffect(() => {
    setModalVisible(props.modalVisible);
  }, [props.modalVisible]);
  const launchCam = () => {
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
        // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', response.assets[4].uri);
        // console.log(response["assets"]);
        setUploadImage(response["assets"]);
        // setModalVisible(false);
      }
    );
  };

  const onUploadImage = async (imageObj) => {
    setLoading(true);
    const data = {
      title: "Job Done",
      image_url: imageObj[0],
    };

    await postUploadImage(data, async (res) => {
      setLoading(false);
      // setModalVisible(false);
      props.setModalVisible(false);
      setUploadImage("");
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
      }
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
        setUploadImage("");
      }}
    >
      <TouchableOpacity
        onPress={() => {
          props.setModalVisible(false);
          setUploadImage("");
        }}
        activeOpacity={0.9}
        style={styles.modalContainer}
      >
        <TouchableOpacity onPress={() => props.setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
          <View style={{ paddingHorizontal: wp(10), paddingVertical: wp(10) }}>
            <ResponsiveText
              style={{
                fontFamily: Fonts.NunitoBold,
              }}
            >
              Good Job !
            </ResponsiveText>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                launchCam();
              }}
            >
              {uploadImage ? (
                <View style={{ alignItems: "center" }}>
                  <Image style={{ width: wp(70), height: wp(50) }} source={uploadImage} />

                  {loading ? (
                    <TouchableOpacity>
                      <LinearGradient
                        colors={[Colors.Primary, Colors.Primary]}
                        style={[
                          {
                            flexDirection: "row",
                            width: wp(20),
                            backgroundColor: Colors.Primary,
                            borderRadius: 10,
                            paddingHorizontal: wp(3),
                            paddingVertical: 10,
                            marginTop: wp(5),
                          },
                        ]}
                      >
                        <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Save</ResponsiveText>
                        <ActivityIndicator color={Colors.White} size={wp(4)} style={{ paddingLeft: 4 }} />
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        width: wp(20),
                        borderRadius: wp(2),
                        backgroundColor: "#EF206B",
                        // paddingHorizontal: wp(10),
                        paddingVertical: 5,
                        // marginBottom: 20,
                        marginTop: wp(5),

                        backgroundColor: Colors.Primary,
                      }}
                      onPress={() => {
                        console.log("uploadImage---", uploadImage);
                        onUploadImage(uploadImage);
                      }}
                      // onPress={() => {
                      //   props.navigation.navigate("StartService");
                      //   handleSubmitButton
                      // }}
                    >
                      <ResponsiveText
                        style={{
                          fontSize: 3.3,
                          color: Colors.White,
                          paddingHorizontal: wp(3),
                          paddingVertical: 5,
                          textAlign: "center",
                          borderWidth: 0,
                        }}
                      >
                        Save
                      </ResponsiveText>
                    </TouchableOpacity>
                  )}
                  {/* <TouchableOpacity>
                    <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                      <ResponsiveText style={{ color: Colors.White, fontSize: 3.5, textAlign: "center" }}>
                        Save
                      </ResponsiveText>
                    </LinearGradient>
                  </TouchableOpacity> */}
                </View>
              ) : (
                <View>
                  <ResponsiveText
                    style={{
                      fontSize: 3.5,
                      marginTop: wp(2),
                      marginBottom: wp(4),
                    }}
                  >
                    Click to Capture Your Work
                  </ResponsiveText>
                  <View
                    style={{
                      backgroundColor: "lightgrey",
                      padding: wp(10),
                      borderRadius: wp(25),
                      borderWidth: 1,
                      borderColor: "gray",
                    }}
                  >
                    <Image
                      style={{ width: wp(25), height: wp(25), resizeMode: "contain" }}
                      source={require("../assets/images/Camera1.png")}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible(false);
              }}
            >
              <ResponsiveText style={{ marginTop: wp(15), marginBottom: wp(10), textDecorationLine: "underline" }}>
                Not Now
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = {
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(196, 196, 196, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    // height: "60%",
    width: "85%",
    backgroundColor: "white",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    // justifyContent: 'center',
    // alignItems: 'center',
  },
  linearGradient: {
    width: wp(20),
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    // paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: wp(5),
  },
};
export default JobDoneModal;
