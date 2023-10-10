import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";

import Container from "../../components/Container";
import { wp } from "../../components/Responsiveness";
import LoginField from "../../components/LoginField";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";
import ResponsiveText from "../../components/ResponsiveText";
import { registerSalon, verifyPhoneNumber, verifyEmail } from "../../utils/Actions";
import DocumentPicker from "react-native-document-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const RegisterSalon = (props) => {
  const [showEye, setShowEye] = useState(true);

  const [userName, setUserName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [userPhone, setUserPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const [uploadImage, setUploadImage] = useState(null);
  const [errorUploadImage, setErrorUploadImage] = useState("");

  const [upImg, setupImg] = useState(null);

  const [userCV, setUserCV] = useState(null);
  const [errorCV, setErrorCV] = useState("");

  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validExperience, setValidExperience] = useState(false);

  const handleSubmitButton = () => {
    // console.log(validExperience === false);

    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (
      userName === "" ||
      userEmail === "" ||
      userPhone === "" ||
      userPassword === "" ||
      address === "" ||
      // userStreetName === "" ||
      // userCity === "" ||
      // userState === "" ||
      // userZipCode === "" ||
      // userExperience === "" ||
      // validExperience === false ||
      uploadImage == null ||
      validEmail === false ||
      errorName !== "" ||
      errorPassword !== "" ||
      errorEmail !== "" ||
      errorPhone !== "" ||
      errorAddress !== ""
      // errorStreetName !== "" ||
      // errorCity !== "" ||
      // errorState !== "" ||
      // errorZipCode !== "" ||
      // errorExperience !== ""
    ) {
      if (!userName) {
        setErrorName("*Please fill Name");
      }
      if (!userEmail) {
        setErrorEmail("*Please fill Email");
      } else {
        if (validEmail === false) {
          setErrorEmail("*Please enter correct email");
        }
      }

      if (!userPhone) {
        setErrorPhone("*Please fill Phone number");
      }

      if (!address) {
        setErrorAddress("*Please fill Business Address");
      }

      // if (!userStreetName) {
      //   setErrorStreetName("*Please fill Street Name");
      // }

      // if (!userCity) {
      //   setErrorCity("*Please fill City");
      // }

      // if (!userState) {
      //   setErrorState("*Please fill State");
      // }

      // if (!userZipCode) {
      //   setErrorZipCode("*Please fill ZipCode");
      // }

      if (!uploadImage) {
        setErrorUploadImage("*Please select Salon Logo");
      }

      // if (!userExperience) {
      //   setErrorExperience("*Please fill Experience");
      // } else {
      //   console.log("validExperience---", validExperience);
      //   if (validExperience === false) {
      //     setErrorExperience("*Experience must be numerical");
      //   }
      // }

      if (!userPassword) {
        setErrorPassword("*Please fill Password");
      } else {
        if (!passRegex.test(userPassword)) {
          setErrorPassword(
            "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
          );
        }
      }
    } else if (!passRegex.test(userPassword)) {
      setErrorPassword(
        "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
      );
    } else {
      setLoading(true);
      var phone = "+1" + userPhone.replace(/[^0-9]/g, "");
      registerSalon(
        userName,
        userEmail,
        phone,
        userPassword,
        address,

        // userStreetName,
        // userCity,
        // userState,
        // userZipCode,
        // userExperience,
        uploadImage[0],
        (res) => {
          console.log("res---", res);
          if (res.errors?.length) {
            if (typeof res.errors == "string") {
              alert(res.errors);
              setLoading(false);
            } else {
              alert(res.errors[0]);
              setLoading(false);
            }
          } else {
            setLoading(false);
            props.navigation.navigate("OtpVerification", {
              params: {
                phone_number: phone,
                type: "register",
                email: userEmail,
                password: userPassword,
              },
            });

            // props.navigation.navigate("Login");
          }
        }
      );
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

  const setPhoneNumber = (val) => {
    setUserPhone(val);

    var phone = "+1" + val.replace(/[^0-9]/g, "");
    if (val.length == 14) {
      verifyPhoneNumber(phone, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } else {
          if (res?._metadata?.httpResponseCode == 200) {
            setErrorPhone(res?._metadata?.message);
          }
        }
      });
    }
  };

  const setEmailValue = (val) => {
    setUserEmail(val);

    verifyEmail(val, (res) => {
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        if (res?._metadata?.httpResponseCode == 200) {
          setErrorEmail(res?._metadata?.message);
        }
      }
    });
  };

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content" style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={[styles.titleText, { marginVertical: wp(5) }]}>REGISTER</Text>
        <View>
          <Text style={[styles.titleText, { marginBottom: wp(15) }]}>You are about to Register</Text>
        </View>
      </View>

      <View style={styles.whiteSection}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={{ marginTop: wp(1) }}>
            <LoginField name setError={setErrorName} placeHolder={"Salon Name"} setValue={(val) => setUserName(val)} />
            {errorName != "" ? <Text style={styles.errorTextStyle}>{errorName}</Text> : null}
          </View>
          <View style={{ marginTop: wp(5) }}>
            <LoginField
              email
              setError={setErrorEmail}
              userEmail={userEmail}
              setValidEmail={setValidEmail}
              placeHolder={"Salon Business Email"}
              setValue={(val) => setEmailValue(val)}
            />
            {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null}
          </View>

          <View style={{ marginTop: wp(4) }}>
            {/* <LoginField placeHolder={"Drop your CV / Portfolio"} /> */}
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.cvcontainer}
              onPress={() => {
                launchGal();
              }}
            >
              <Text style={{ fontSize: 12, width: wp(50), color: "#999999" }}>
                {uploadImage ? "Salon Logo" : "Salon Logo"}
              </Text>
              <View>
                <Image source={require("../../assets//images/document_icon.png")} />
              </View>
            </TouchableOpacity>
            {errorUploadImage != "" ? <Text style={styles.errorTextStyle}>{errorUploadImage}</Text> : null}
          </View>
          <View style={{ marginTop: wp(5) }}>
            <LoginField
              phone
              setError={setErrorPhone}
              placeHolder={"Business Phone"}
              setValue={(val) => setPhoneNumber(val)}
            />
            {errorPhone != "" ? <Text style={styles.errorTextStyle}>{errorPhone}</Text> : null}
          </View>

          <View style={{ marginTop: wp(5) }}>
            <LoginField
              name
              setError={setErrorAddress}
              placeHolder={"Business Address"}
              setValue={(val) => setAddress(val)}
            />
            {errorAddress != "" ? <Text style={styles.errorTextStyle}>{errorAddress}</Text> : null}
          </View>
          <View style={{ marginTop: wp(5), alignItems: "center" }}>
            <LoginField
              setShowEye={setShowEye}
              showEye={showEye}
              show
              password1
              setError={setErrorPassword}
              setValue={(val) => setUserPassword(val)}
              placeHolder={"Password"}
            />
            <View style={{ width: wp(70) }}>
              {errorPassword != "" ? <Text style={styles.errorTextStyle}>{errorPassword}</Text> : null}
            </View>
          </View>

          <View>
            {loading ? (
              <TouchableOpacity>
                <LinearGradient
                  colors={[Colors.Primary, Colors.Primary]}
                  style={[styles.linearGradient, { flexDirection: "row" }]}
                >
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Register</ResponsiveText>
                  <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmitButton} style={{ flexDirection: "row" }}>
                <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Register</ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              color: Colors.DarkGrey,
              alignSelf: "flex-start",
              paddingHorizontal: wp(10),
              paddingTop: wp(8),
            }}
          >
            <ResponsiveText style={{ color: Colors.DarkGrey, fontSize: 3.2 }}>
              Please note that your credentials for the User app won't work here. For the best experience, register as
              an artist using a separate email or phone number.
            </ResponsiveText>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
  },
  imageStyle: {
    width: wp(30),
    height: wp(30),
    resizeMode: "contain",
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginVertical: 20,
  },

  titleText: {
    color: "white",
    fontSize: wp(5),
    paddingHorizontal: wp(5),
    // fontFamily: Fonts.NunitoRegular,
  },
  whiteSection: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
    paddingTop: wp(10),
  },

  signUpContainer: {
    flexDirection: "row",
    color: Colors.DarkGrey,
    alignSelf: "flex-start",
    paddingHorizontal: wp(10),
    paddingVertical: wp(5),
  },
  orwithText: {
    fontSize: 4,
    color: Colors.DarkGrey,
    paddingVertical: wp(5),
    paddingHorizontal: 20,
  },
  facebookContainer: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#1877F2",
    width: wp(30),
  },
  facebookImage: {
    marginRight: 15,
    width: wp(5),
    height: wp(5),
  },
  facebookText: {
    color: "#1877F2",
    fontSize: 3,
    paddingRight: 20,
  },
  googleContainer: {
    marginLeft: wp(15),
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "row",
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: "#C72227",
    width: wp(30),
  },
  googleImage: {
    marginRight: 15,
    width: wp(5),
    height: wp(5),
  },
  gooleText: {
    color: "#C72227",
    fontSize: 3,
    paddingRight: 20,
  },
  line: {
    width: wp(25),
    height: 1,
    backgroundColor: Colors.DarkGrey,
  },
  errorTextStyle: {
    color: "red",
    fontSize: 11,
    // height: 15,
    paddingLeft: 14,
  },
  cvcontainer: {
    paddingHorizontal: 20,
    borderRadius: wp(6),
    backgroundColor: "#F8F8F8",
    borderWidth: 1,
    borderColor: "#D4D3D3",
    width: wp(70),
    height: wp(11),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    height: "30%",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    // position: 'absolute',
    // bottom: wp(15),
  },
  modalInner: {
    justifyContent: "center",
    alignItems: "center",
  },

  imageUpload: {
    width: wp(40),
    height: wp(1),
    backgroundColor: "#2C3145",
    borderRadius: 10,
    marginVertical: wp(5),
  },
  font: {
    fontSize: 5,
  },
});
export default RegisterSalon;
