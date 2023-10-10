import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Modal, ActivityIndicator, ScrollView } from "react-native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { wp } from "../../components/Responsiveness";
import ResponsiveText from "../../components/ResponsiveText";
import Colors from "../../theme/Colors";
import ProfileField from "../../components/ProfileField";
import EditField from "../../components/EditField";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { documents } from "../../utils/Actions";
import LoginField from "../../components/LoginField";
import { EventRegister } from "react-native-event-listeners";

const Documents = (props) => {
  const [userStreetName, setUserStreetName] = useState("");
  const [errorStreetName, setErrorStreetName] = useState("");

  const [userCity, setUserCity] = useState("");
  const [errorCity, setErrorCity] = useState("");

  const [userState, setUserState] = useState("");
  const [errorState, setErrorState] = useState("");

  const [userZipCode, setUserZipCode] = useState("");
  const [errorZipCode, setErrorZipCode] = useState("");

  const [loading, setLoading] = useState(false);

  const [uploadImage, setUploadImage] = useState("");
  const [upImg, setupImg] = useState(null);
  const [errorImg, setErrorImage] = useState("");

  const [uploadImage1, setUploadImage1] = useState("");
  const [upImg1, setupImg1] = useState(null);
  const [errorImg1, setErrorImage1] = useState("");

  const [uploadImage2, setUploadImage2] = useState("");
  const [upImg2, setupImg2] = useState(null);
  const [errorImg2, setErrorImage2] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [side, setSide] = useState("front");
  // const [validEmail, setValidEmail] = useState(false);

  const handleSubmitButton = () => {
    if (
      userStreetName === "" ||
      userCity === "" ||
      userState === "" ||
      userZipCode === "" ||
      errorStreetName !== "" ||
      errorCity !== "" ||
      errorState !== "" ||
      errorZipCode !== "" ||
      uploadImage === "" ||
      uploadImage1 === "" ||
      uploadImage2 === ""
    ) {
      if (!userStreetName) {
        setErrorStreetName("*Please fill Street Name");
      }

      if (!userCity) {
        setErrorCity("*Please fill City");
      }

      if (!userState) {
        setErrorState("*Please fill State");
      }

      if (!userZipCode) {
        setErrorZipCode("*Please fill ZipCode");
      }

      if (!uploadImage) {
        setErrorImage("*Please upload image");
      }

      if (!uploadImage1) {
        setErrorImage1("*Please upload image");
      }

      if (!uploadImage2) {
        setErrorImage2("*Please upload image");
      }
    } else {
      setLoading(true);
      documents(
        userStreetName,
        userCity,
        userState,
        userZipCode,
        uploadImage[0],
        uploadImage1[0],
        uploadImage2[0],
        (res) => {
          if (res.errors.length) {
            if (typeof res.errors == "string") {
              alert(res.errors);
              setLoading(false);
            } else {
              alert(res.errors[0]);
              setLoading(false);
            }
          } else {
            EventRegister.emit("updatestatus");
            setLoading(false);
            props.navigation.navigate("Dashboard");
          }
        }
      );
    }
  };

  const launchCam = (sideImg) => {
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
          setModalVisible(false);
        } else {
          if (sideImg == "front") {
            setupImg(response["assets"]);
            setUploadImage(response["assets"]);
            setErrorImage("");
          } else if (sideImg == "back") {
            setupImg1(response["assets"]);
            setUploadImage1(response["assets"]);
            setErrorImage1("");
          } else {
            setupImg2(response["assets"]);
            setUploadImage2(response["assets"]);
            setErrorImage2("");
          }

          setModalVisible(false);
        }
      }
    );
  };
  const launchGal = (sideImg) => {
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
          setModalVisible(false);
        } else {
          if (sideImg == "front") {
            setupImg(response["assets"]);
            setUploadImage(response["assets"]);
            setErrorImage("");
          } else if (sideImg == "back") {
            setupImg1(response["assets"]);
            setUploadImage1(response["assets"]);
            setErrorImage1("");
          } else {
            setupImg2(response["assets"]);
            setUploadImage2(response["assets"]);
            setErrorImage2("");
          }
          setModalVisible(false);
        }
      }
    );
  };

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content">
      <Header {...props} title={"DOCUMENTS"} />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={{ marginTop: wp(4) }}>
            <LoginField
              street
              placeHolder={"Street Name"}
              setError={setErrorStreetName}
              setValue={(val) => setUserStreetName(val)}
            />
            {errorStreetName != "" ? <Text style={styles.errorTextStyle}>{errorStreetName}</Text> : null}
          </View>
          <View style={{ marginTop: wp(4) }}>
            <LoginField city placeHolder={"City"} setError={setErrorCity} setValue={(val) => setUserCity(val)} />
            {errorCity != "" ? <Text style={styles.errorTextStyle}>{errorCity}</Text> : null}
          </View>
          <View style={{ marginTop: wp(4) }}>
            <LoginField state placeHolder={"State"} setError={setErrorState} setValue={(val) => setUserState(val)} />
            {errorState != "" ? <Text style={styles.errorTextStyle}>{errorState}</Text> : null}
          </View>
          <View style={{ marginTop: wp(4) }}>
            <LoginField
              zipcode
              placeHolder={"Zip Code"}
              setError={setErrorZipCode}
              setValue={(val) => setUserZipCode(val)}
            />
            {errorZipCode != "" ? <Text style={styles.errorTextStyle}>{errorZipCode}</Text> : null}
          </View>
          <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginTop: wp(4) }}>
            Driving License
          </ResponsiveText>
          <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginTop: wp(2) }}>Front</ResponsiveText>

          <TouchableOpacity
            onPress={() => {
              // setImagePic(!imagePic);
              setModalVisible(true);
              setSide("front");
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
                <Image style={styles.drivingImage} source={require("../../assets/images/camera.png")} />
              </View>
            )}
          </TouchableOpacity>

          {errorImg != "" ? <Text style={styles.errorTextStyle}>{errorImg}</Text> : null}
          <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginTop: wp(2) }}>Back</ResponsiveText>

          <TouchableOpacity
            onPress={() => {
              // setImagePic(!imagePic);
              setModalVisible(true);
              setSide("back");
            }}
          >
            {uploadImage1 ? (
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
                    source={upImg1}
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
                <Image style={styles.drivingImage} source={require("../../assets/images/camera.png")} />
              </View>
            )}
          </TouchableOpacity>

          {errorImg1 != "" ? <Text style={styles.errorTextStyle}>{errorImg1}</Text> : null}

          <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginTop: wp(4) }}>
            Nail/Hair/Estetician License
          </ResponsiveText>

          <TouchableOpacity
            onPress={() => {
              // setImagePic(!imagePic);
              setModalVisible(true);
              setSide("nail");
            }}
          >
            {uploadImage2 ? (
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
                    source={upImg2}
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
                <Image style={styles.drivingImage} source={require("../../assets/images/camera.png")} />
              </View>
            )}
          </TouchableOpacity>

          {/* <ResponsiveText style={{ fontSize: 4, color: Colors.Primary, marginTop: wp(2) }}>Back</ResponsiveText> */}
          {errorImg2 != "" ? <Text style={styles.errorTextStyle}>{errorImg2}</Text> : null}

          <View style={{ alignItems: "center" }}>{/* <View style={styles.border} /> */}</View>
          <View style={{ alignItems: "center", marginTop: wp(5) }}>
            {loading ? (
              <TouchableOpacity style={[styles.saveChangesContainer, { flexDirection: "row" }]}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>Save</ResponsiveText>
                <ActivityIndicator color="#fff" style={{ paddingLeft: 4 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleSubmitButton()} style={styles.saveChangesContainer}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>Save</ResponsiveText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.9} style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
            <View style={styles.modalInner}>
              <TouchableOpacity
                onPress={() => {
                  launchCam(side);
                  setModalVisible(false);
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
                <Image style={styles.cameraImagewhite} source={require("../../assets/images/camera.png")} />
                <ResponsiveText style={styles.font}>Picture</ResponsiveText>
              </TouchableOpacity>
              <View style={styles.imageUpload} />
              <TouchableOpacity
                onPress={() => {
                  launchGal(side);
                  setModalVisible(false);
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
                <Image style={styles.cameraImagewhite} source={require("../../assets/images/gallery.png")} />
                <ResponsiveText style={styles.font}>Gallery</ResponsiveText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};
const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    marginTop: wp(8),
    paddingBottom: wp(3),
  },
  profileImageContainer: {
    borderWidth: 10,
    borderColor: Colors.Primary,
    borderRadius: wp(28),
    width: wp(32),
    height: wp(32),
    alignItems: "center",
    justifyContent: "center",
    marginTop: -wp(16),
    marginBottom: wp(10),
  },
  profileImage: {
    borderRadius: wp(28),
    width: wp(30),
    height: wp(30),
  },
  drivingImage: {
    width: wp(10),
    height: wp(10),
  },
  cameraContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    width: 25,
    height: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraImage: {
    tintColor: Colors.Primary,
    resizeMode: "contain",
    width: wp(4.5),
    height: wp(4.5),
  },
  border: {
    backgroundColor: "#C4C4C4",
    width: wp(90),
    height: 1,
    marginVertical: wp(2),
  },
  saveChangesContainer: {
    backgroundColor: Colors.Primary,
    width: wp(20),
    height: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
  },

  imageUpload: {
    width: wp(0.5),
    height: wp(22),
    backgroundColor: "#2C3145",
    borderRadius: 10,
    marginVertical: wp(5.5),
    marginHorizonal: wp(4),
  },
  font: {
    fontSize: 4,
    color: "white",
  },
  modalInner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
  modalContent: {
    height: "26%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    // position: 'absolute',
    // bottom: wp(15),
  },
  errorTextStyle: {
    color: "red",
    alignSelf: "flex-end",
    marginRight: wp(5),
    fontSize: 12,
  },

  cameraImagewhite: {
    tintColor: "white",
    resizeMode: "contain",
    width: wp(5.5),
    height: wp(5.5),
    // marginRight: wp(2),
    marginBottom: wp(2),
  },
};
export default Documents;
