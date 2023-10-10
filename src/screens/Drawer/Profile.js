import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Modal, ScrollView } from "react-native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { wp } from "../../components/Responsiveness";
import ResponsiveText from "../../components/ResponsiveText";
import Colors from "../../theme/Colors";
import ProfileField from "../../components/ProfileField";
import Fonts from "../../theme/fonts";
import { Rating, AirbnbRating } from "react-native-ratings";
import { getProfileDetails, getCoverPhoto, postCoverPhoto } from "../../utils/Actions";
import LottieView from "lottie-react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const Profile = (props) => {
  const [data, setData] = useState({});
  const [pageLoad, setPageLoad] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [upImg, setupImg] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    await getProfileDetails(async (res) => {
      setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        // console.log("getProfileDetails---", res.records);
        setData(res.records);
      }
    });

    await getCoverPhoto(async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setUploadImage("https://artist.nail2u.net/" + res.records);
      }
    });
  };

  const onUploadImage = async (imageObj) => {
    const data = {
      image_url: imageObj[0],
    };

    await postCoverPhoto(data, async (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        // console.log("upload image cover--", res);
        await getCoverPhoto(async (res) => {
          // setPageLoad(false);
          if (res.errors.length) {
            if (typeof res.errors == "string") {
              alert(res.errors);
            } else {
              alert(res.errors[0]);
            }
          } else {
            setUploadImage("https://artist.nail2u.net/" + res.records);
          }
        });
      }
    });
  };

  const launchCam = () => {
    setupImg(null);
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
          onUploadImage(response["assets"]);
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setModalVisible(false);
        }
      }
    );
  };
  const launchGal = () => {
    setupImg(null);
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
          onUploadImage(response["assets"]);
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setModalVisible(false);
        }
      }
    );
  };

  if (pageLoad) {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{ width: wp(20), height: wp(20) }}
          source={require("../../assets/loader.json")}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    return (
      <Container statusBarColor={Colors.Primary} barStyle="light-content">
        <Header {...props} title={"PROFILE"} />
        <View>
          {uploadImage ? (
            <View style={styles.coverContainer}>
              <Image style={styles.coverImage} source={upImg ? upImg : { uri: uploadImage }} />
            </View>
          ) : (
            <View style={styles.coverContainer}>
              <Image style={styles.coverImage} source={require("../../assets/images/profile_image.jpg")} />
            </View>
          )}

          {/* {!data.absolute_image_url ? (
            <View style={styles.coverContainer}>
              <Image style={styles.coverImage} source={{ uri: data.absolute_image_url }} />
            </View>
          ) : (
            <View style={styles.coverContainer}>
              <Image
                style={styles.coverImage}
                resizeMode={"stretch"}
                source={require("../../assets/images/profile_image.jpg")}
              />
            </View>
          )} */}
          {/* <View style={{ borderWidth: 1 }}> */}
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              position: "absolute",
              top: 15,
              right: 12,
              borderBottomWidth: 1,
              borderBottomColor: Colors.Primary,
            }}
          >
            <ResponsiveText style={{ fontSize: 3 }}>Change Cover</ResponsiveText>
          </TouchableOpacity>
          {/* </View> */}
        </View>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            {data.absolute_image_url ? (
              <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={{ uri: data.absolute_image_url }} />
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={require("../../assets/images/profile_image.jpg")} />
              </View>
            )}
            <ResponsiveText style={{ fontFamily: Fonts.NunitoBold, fontSize: 4.8 }}>{data.username}</ResponsiveText>
            <ResponsiveText style={{ fontSize: 4.3, color: Colors.DarkGrey, marginTop: wp(1) }}>
              {data.expert}
            </ResponsiveText>
            <View style={{ flexDirection: "row", marginTop: wp(1) }}>
              <ResponsiveText>{Number(data.rating).toFixed(1)}</ResponsiveText>
              <AirbnbRating
                size={15}
                defaultRating={Number(data.rating).toFixed(1)}
                showRating={false}
                selectedColor={"#FF5050"}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: wp(1) }}>
              <ResponsiveText style={{ fontSize: 3.5 }}>{data.phone_no}</ResponsiveText>
              <Image style={{ marginLeft: 5 }} source={require("../../assets/images/tick_i.png")} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("EditProfile", {
                image_url: data.absolute_image_url,
                username: data.username,
                phone_no: data.phone_no,
                Email: data.email,
                Address: data.address,
                fetchData: fetchData,
              });
            }}
            style={styles.editProfile}
          >
            <ResponsiveText style={{ fontSize: 3.5 }}>Edit Profile</ResponsiveText>
          </TouchableOpacity>
          <ScrollView>
            <View style={styles.margin}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: wp(15),
                }}
              >
                <ProfileField
                  text={data.email}
                  // text={"jkjdkwldkwdkwdjnwkjdn"}
                  image={require("../../assets/images/EnvelopeSimple.png")}
                />
                <Image style={{ marginLeft: 5, marginTop: wp(5) }} source={require("../../assets/images/tick_i.png")} />
              </View>
              <View style={styles.border} />
              <ProfileField text={"***********"} image={require("../../assets/images/Lock.png")} />
              <View style={styles.border} />
              <ProfileField
                text={`${data.street_name} ${data.city} ${data.state}`}
                image={require("../../assets/images/MapPin1.png")}
              />
              <View style={styles.border} />
              <ProfileField text={data.zipcode} image={require("../../assets/images/MapPin1.png")} />
              <View style={styles.border} />
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
                    launchCam();
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
                    launchGal();
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
  }
};
const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    marginTop: -wp(8),
  },
  imageContainer: {
    borderWidth: 10,
    borderColor: Colors.Primary,
    borderRadius: wp(28),
    width: wp(30),
    height: wp(30),
    alignItems: "center",
    justifyContent: "center",
    marginTop: -wp(16),
    marginBottom: wp(3),
  },
  coverContainer: {
    width: wp(100),
    height: wp(40),
    borderWidth: 1,
  },
  coverImage: {
    // borderRadius: wp(28),
    width: wp(100),
    height: wp(40),
  },
  profileImage: {
    borderRadius: wp(28),
    width: wp(28),
    height: wp(28),
  },
  editProfile: {
    position: "absolute",
    top: 20,
    right: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
  },
  margin: {
    paddingLeft: wp(10),
    marginTop: wp(2),
  },
  border: {
    backgroundColor: "#C4C4C4",
    width: wp(80),
    height: 1,
    marginTop: wp(5),
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
  cameraImagewhite: {
    tintColor: "white",
    resizeMode: "contain",
    width: wp(5.5),
    height: wp(5.5),
    // marginRight: wp(2),
    marginBottom: wp(2),
  },
};
export default Profile;
