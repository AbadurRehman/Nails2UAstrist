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
import { editProfile } from "../../utils/Actions";

const EditProfile = (props) => {
  const { image_url, username, phone_no, Email, Address } = props.route.params;

  const [uploadImage, setUploadImage] = useState(image_url);
  const [upImg, setupImg] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [user, setUser] = useState(username);
  const [errorName, setErrorName] = useState("");

  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const [email, setEmail] = useState(Email);
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [address, setAddress] = useState(Address);
  const [errorAddress, setErrorAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    let formattedNumber;
    // const { name, value } = e.target;
    let value = phone_no;
    value = value.slice(2);
    const length = value.length;

    // Filter non numbers
    const regex = () => value.replace(/[^0-9\.]+/g, "");
    // Set area code with parenthesis around it
    const areaCode = () => `(${regex().slice(0, 3)})`;

    // Set formatting for first six digits
    const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

    // Dynamic trail as user types
    const trailer = (start) => `${regex().slice(start, regex().length)}`;

    if (length <= 3) {
      // First 3 digits
      formattedNumber = regex();
    } else if (length === 4) {
      // After area codea
      formattedNumber = `${areaCode()} ${trailer(3)}`;
    } else if (length === 5) {
      // When deleting digits inside parenthesis
      formattedNumber = `${areaCode().replace(")", "")}`;
    } else if (length > 5 && length <= 9) {
      // Before dash
      formattedNumber = `${areaCode()} ${trailer(3)}`;
    } else if (length >= 10) {
      // After dash
      formattedNumber = `${firstSix()}-${trailer(6)}`;
    }

    setPhone(formattedNumber);
  }, []);

  const handleSubmitButton = async () => {
    if (
      user === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      (password.length > 0 && password.length < 8) ||
      validEmail === false ||
      errorName !== "" ||
      errorAddress !== "" ||
      errorPassword !== "" ||
      errorEmail !== "" ||
      errorPhone !== ""
    ) {
      setLoading(true);

      if (!user) {
        setErrorName("*Please fill name");
      }

      if (!email) {
        setErrorEmail("*Please fill email");
      } else {
        const emailCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailCheckRegex.test(String(email)) === true) {
          setValidEmail(true);
          setErrorEmail("");
        } else if (emailCheckRegex.test(String(email)) === false) {
          setValidEmail(false);
          setErrorEmail("*Please enter correct email");
        }
      }
      if (!phone) {
        setErrorPhone("*Please fill phone number");
      } else if (phone.length !== 14) {
        setErrorPhone("*Phone no must be 11 digits");
      }

      if (password.length > 0 && password.length < 8) {
        setErrorPassword("*Password length should be greater than 8");
      }

      if (!address) {
        setErrorAddress("*Please fill address");
      }

      setLoading(false);
    } else {
      setLoading(true);
      var phoneNum = "+1" + phone.replace(/[^0-9]/g, "");

      const data = {
        username: user,
        phone_no: phoneNum,
        email: email,
        address: address,
        image_url: uploadImage[0],
      };

      if (password != "") {
        data.password = password;
      }
      await editProfile(data, (res) => {
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
          alert("User profile edited successfully!");
          props.route.params.fetchData();
          // setUser(res.records?.username);
          // setPhone(res.records?.phone_no);
          // setAddress(res.records?.address);
          // setPassword(res.records?.address)
        }
      });
    }
  };

  const onChangeValue = (type, text) => {
    if (type === "name") {
      if (!text) {
        setErrorName("*Please fill name");
      } else {
        setErrorName("");
        setUser(text);
      }
    }

    if (type === "phone") {
      if (!text) {
        setErrorPhone("*Please fill phone");
      } else {
        if (text.length !== 11) {
          setErrorPhone("*Phone no must be 11 digits");
        }
        let formattedNumber;
        // const { name, value } = e.target;
        const value = text;
        const length = value.length;

        // Filter non numbers
        const regex = () => value.replace(/[^0-9\.]+/g, "");
        // Set area code with parenthesis around it
        const areaCode = () => `(${regex().slice(0, 3)})`;

        // Set formatting for first six digits
        const firstSix = () => `${areaCode()} ${regex().slice(3, 6)}`;

        // Dynamic trail as user types
        const trailer = (start) => `${regex().slice(start, regex().length)}`;

        if (length <= 3) {
          // First 3 digits
          formattedNumber = regex();
        } else if (length === 4) {
          // After area codea
          formattedNumber = `${areaCode()} ${trailer(3)}`;
        } else if (length === 5) {
          // When deleting digits inside parenthesis
          formattedNumber = `${areaCode().replace(")", "")}`;
        } else if (length > 5 && length <= 9) {
          // Before dash
          formattedNumber = `${areaCode()} ${trailer(3)}`;
        } else if (length >= 10) {
          // After dash
          formattedNumber = `${firstSix()}-${trailer(6)}`;
        }

        setErrorPhone("");

        setPhone(formattedNumber);
      }
    }

    if (type === "address") {
      if (!text) {
        setErrorAddress("*Please fill address");
      } else {
        setErrorAddress("");
        setAddress(text);
      }
    }

    if (type === "email") {
      if (!text) {
        setErrorEmail("*Please fill email");
      } else {
        setEmail(text);
        const emailCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailCheckRegex.test(String(text)) === true) {
          setValidEmail(true);
          setErrorEmail("");
        } else if (emailCheckRegex.test(String(text)) === false) {
          setValidEmail(false);
          setErrorEmail("*Please enter correct email");
        }
      }
    }

    if (type === "password") {
      if (text.length > 0 && text.length < 8) {
        setErrorPassword("*Password length should be greater than 8");
      } else {
        setErrorPassword("");
        setPassword(text);
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
          setModalVisible(false);
        } else {
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setModalVisible(false);
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
          setModalVisible(false);
        } else {
          setupImg(response["assets"]);
          setUploadImage(response["assets"]);
          setModalVisible(false);
        }
      }
    );
  };
  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content">
      <Header {...props} title={"EDIT PROFILE"} height />
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.profileImageContainer}>
            {uploadImage ? (
              <View style={styles.imageContainer}>
                {upImg ? (
                  <Image style={styles.profileImage} source={upImg} />
                ) : (
                  <Image style={styles.profileImage} source={{ uri: uploadImage }} />
                )}
                {/* <Image style={styles.profileImage} source={upImg ? upImg : { uri: uploadImage }} /> */}
              </View>
            ) : (
              <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={require("../../assets/images/profile_image.jpg")} />
              </View>
            )}
            <TouchableOpacity
              onPress={() => {
                // setImagePic(!imagePic);
                setModalVisible(true);
              }}
              style={styles.cameraContainer}
            >
              <Image style={styles.cameraImage} source={require("../../assets/images/camera.png")} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <EditField
            value={String(user)}
            onChangeText={(text) => onChangeValue("name", text)}
            title={"User Name"}
            image={require("../../assets/images/User.png")}
          />
          {errorName != "" ? <Text style={styles.errorTextStyle}>{errorName}</Text> : null}
          <View style={{ alignItems: "center" }}>
            <View style={styles.border} />
          </View>
          <EditField
            value={phone}
            phone
            onChangeText={(text) => onChangeValue("phone", text)}
            title={"Phone"}
            image={require("../../assets/images/profile_phone.png")}
          />
          {errorPhone != "" ? <Text style={styles.errorTextStyle}>{errorPhone}</Text> : null}
          <View style={{ alignItems: "center" }}>
            <View style={styles.border} />
          </View>
          {/* <EditField
            value={email}
            onChangeText={(text) => onChangeValue("email", text)}
            title={"Email"}
            image={require("../../assets/images/EnvelopeSimple.png")}
          /> */}
          {/* {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null} */}
          {/* <View style={{ alignItems: "center" }}>
            <View style={styles.border} />
          </View> */}
          <EditField
            value={password}
            onChangeText={(text) => onChangeValue("password", text)}
            title={"Password"}
            password
            image={require("../../assets/images/Lock.png")}
          />
          {errorPassword != "" ? <Text style={styles.errorTextStyle}>{errorPassword}</Text> : null}
          <View style={{ alignItems: "center" }}>
            <View style={styles.border} />
          </View>
          <EditField
            width
            value={address}
            onChangeText={(text) => onChangeValue("address", text)}
            title={"Address"}
            image={require("../../assets/images/MapPin1.png")}
          />
          {errorAddress != "" ? <Text style={styles.errorTextStyle}>{errorAddress}</Text> : null}
          <View style={{ alignItems: "center" }}>
            <View style={styles.border} />
          </View>
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
};
const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    marginTop: -wp(8),
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
  cameraImagewhite: {
    tintColor: "white",
    resizeMode: "contain",
    width: wp(5.5),
    height: wp(5.5),
    // marginRight: wp(2),
    marginBottom: wp(2),
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
};
export default EditProfile;
