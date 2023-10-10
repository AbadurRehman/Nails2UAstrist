import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  Text,
} from "react-native";
import Container from "../../components/Container";
import ResponsiveText from "../../components/ResponsiveText";
import Header from "../../components/Header";
import { wp } from "../../components/Responsiveness";
import AccountSetting from "../../components/AccountSetting";
import Colors from "../../theme/Colors";
import Fonts from "../../theme/fonts";
import { getSettings, updateSettings, deleteAccount, settingresetPassword } from "../../utils/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginField from "../../components/LoginField";
import LinearGradient from "react-native-linear-gradient";

const Settings = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [showEye, setShowEye] = useState(true);
  const [showEye1, setShowEye1] = useState(true);
  const [showEye2, setShowEye2] = useState(true);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPassword1, setErrorPassword1] = useState("");
  const [errorPassword2, setErrorPassword2] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await getSettings(async (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          setData({
            app_notification: res.records.app_notification,
            language: res.records.language,
            private_account: res.records.private_account,
            secure_payment: res.records.secure_payment,
            sync_contact_no: res.records.sync_contact_no,
          });
        }
      });
    };
    fetchData().catch(console.error);
  }, []);

  const toggleSwitch = async (key, value) => {
    const updatedObject = Object.assign({}, data);
    updatedObject[key] = value;
    setData(updatedObject);
    handleSubmit(updatedObject);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    await updateSettings(data, async (res) => {
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
      }
    });
  };

  const handleSubmitPass = async () => {
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === "" ||
      errorPassword !== "" ||
      errorPassword1 !== "" ||
      errorPassword2 !== ""
    ) {
      if (!currentPassword) {
        setErrorPassword("*Please fill Password");
      }

      if (!newPassword) {
        setErrorPassword1("*Please fill Password");
      } else {
        if (!passRegex.test(newPassword)) {
          setErrorPassword1(
            "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
          );
        }
      }
      if (!confirmPassword) {
        setErrorPassword2("*Please fill Password");
      } else {
        if (!passRegex.test(confirmPassword)) {
          setErrorPassword2(
            "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
          );
        }
      }
    } else if (!passRegex.test(newPassword)) {
      setErrorPassword1(
        "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
      );

      if (!passRegex.test(confirmPassword)) {
        setErrorPassword2(
          "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
        );
      }
    } else if (!passRegex.test(confirmPassword)) {
      setErrorPassword2(
        "* Password must contain at least 8 characters including one uppercase, one lowercase, one number and one special character."
      );
    } else {
      setLoading(true);
      await settingresetPassword(currentPassword, newPassword, confirmPassword, async (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            setLoading(false);
            alert(res.errors);
          } else {
            setLoading(false);
            alert(res.errors[0]);
          }
        } else {
          setModalVisible(false);
          setLoading(false);
          if (res?.records?.message) {
            alert("The password has been reset");
          }
        }
      });
    }
  };

  async function deleteAccountApiCall() {
    await deleteAccount(async (res) => {
      if (res?.errors?.length) {
        if (typeof res.errors == "string") {
          // alert(res.errors);
        } else {
          // alert(res.errors[0]);
        }
      } else {
        await AsyncStorage.clear().then(() => {
          setUser("expire", {});
          props.navigation.navigate("Splash");
          // setTimeout(function () {
          // navigation.closeDrawer();
          // }, 3000);
        });
      }
    });
  }

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content">
      <Header {...props} title={"ACCOUNT SETTINGS"} />
      <ScrollView>
        <View style={styles.container}>
          <ResponsiveText style={styles.settingText}>Settings</ResponsiveText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.imageStyle} source={require("../../assets/images/User.png")} />
            <ResponsiveText style={styles.mainText}>Account</ResponsiveText>
          </View>
          <View style={styles.border} />
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          >
            <AccountSetting title={"Edit Profile"} arrow />
          </TouchableOpacity>
          <AccountSetting title={"Account"} switch data={data} privateAccount toggleSwitch={toggleSwitch} />
          <AccountSetting title={"Secure Payment"} switch data={data} securePayment toggleSwitch={toggleSwitch} />
          {/* <AccountSetting
            title={"Sync your contact number"}
            switch
            data={data}
            syncContactNumber
            toggleSwitch={toggleSwitch}
          /> */}

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.imageStyle} source={require("../../assets/images/Bell.png")} />
            <ResponsiveText style={styles.mainText}>Notifications</ResponsiveText>
          </View>
          <View style={styles.border} />
          <AccountSetting title={"Notifications"} switch appNotification data={data} toggleSwitch={toggleSwitch} />
          {/* <AccountSetting title={'Sound & Vibration'} switch soundAndVibration/> */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image style={styles.imageStyle} source={require("../../assets/images/ChatTeardropDots.png")} />
            <ResponsiveText style={styles.mainText}>Language</ResponsiveText>
          </View>
          <View style={styles.border} />
          <ResponsiveText style={{ fontSize: 3.5, marginTop: 10 }}>{data.language}</ResponsiveText>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: wp(10) }}>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginTop: wp(2),
                backgroundColor: Colors.Primary,
                padding: 12,
                borderRadius: 5,
                marginBottom: wp(5),
              }}
              onPress={() => {
                Alert.alert("", "Are you sure you want to delete this account.", [
                  {
                    text: "Cancel",
                    onPress: () => {},
                  },
                  {
                    text: "Delete",
                    onPress: () => deleteAccountApiCall(),
                    style: "destructive",
                  },
                ]);
              }}
            >
              <ResponsiveText style={{ color: "white", fontFamily: Fonts.NunitoBold }}>Delete Account</ResponsiveText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginTop: wp(2),
                backgroundColor: Colors.Primary,
                padding: 12,
                borderRadius: 5,
                marginBottom: wp(5),
              }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <ResponsiveText style={{ color: "white", fontFamily: Fonts.NunitoBold }}>Change Password</ResponsiveText>
            </TouchableOpacity>
          </View>

          {/* <View style={{ alignItems: "center", marginTop: wp(5) }}>
            {loading ? (
              <TouchableOpacity style={[styles.saveChangesContainer, { flexDirection: "row" }]}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>OK</ResponsiveText>
                <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmit} style={styles.saveChangesContainer}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>OK</ResponsiveText>
              </TouchableOpacity>
            )}
          </View> */}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView style={styles.modalContainer} enabled behavior="padding">
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            activeOpacity={0.9}
            // style={{ backgroundColor: "r/ed" }}
            style={[styles.modalContainer, { width: wp(100), padding: wp(10), paddingBottom: 0 }]}
          >
            <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={1} style={styles.modalContent}>
              <ResponsiveText
                style={{
                  fontSize: 4.5,
                  color: Colors.Primary,
                  fontFamily: Fonts.NunitoBold,
                  textAlign: "center",
                  marginTop: wp(5),
                }}
              >
                Change Password
              </ResponsiveText>

              <View style={{ marginTop: wp(5), alignItems: "center" }}>
                <LoginField
                  setShowEye={setShowEye}
                  showEye={showEye}
                  show
                  password
                  setError={setErrorPassword}
                  setValue={(val) => setCurrentPassword(val)}
                  placeHolder={"Current Password"}
                />
                {errorPassword != "" ? <Text style={styles.errorTextStyle}>{errorPassword}</Text> : null}
              </View>

              <View style={{ marginTop: wp(5), alignItems: "center" }}>
                <LoginField
                  setShowEye={setShowEye1}
                  showEye={showEye1}
                  show
                  password1
                  setError={setErrorPassword1}
                  setValue={(val) => setNewPassword(val)}
                  placeHolder={"New Password"}
                />
                {errorPassword1 != "" ? <Text style={styles.errorTextStyle}>{errorPassword1}</Text> : null}
              </View>

              <View style={{ marginTop: wp(5), alignItems: "center" }}>
                <LoginField
                  setShowEye={setShowEye2}
                  showEye={showEye2}
                  show
                  password1
                  setError={setErrorPassword2}
                  setValue={(val) => setConfirmPassword(val)}
                  placeHolder={"Confirm Password"}
                />
                {errorPassword2 != "" ? <Text style={styles.errorTextStyle}>{errorPassword2}</Text> : null}
              </View>

              {loading ? (
                <TouchableOpacity>
                  <LinearGradient
                    colors={[Colors.Primary, Colors.Primary]}
                    style={[styles.linearGradient, { flexDirection: "row" }]}
                  >
                    <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Save</ResponsiveText>
                    <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleSubmitPass}>
                  <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                    <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Save</ResponsiveText>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  );
};
const styles = {
  saveChangesContainer: {
    backgroundColor: Colors.Primary,
    width: wp(20),
    height: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
  },
  mainText: {
    fontSize: 4.5,
    color: Colors.Primary,
    fontFamily: Fonts.NunitoBold,
  },
  container: {
    paddingHorizontal: wp(5),
    marginVertical: wp(5),
  },
  settingText: {
    marginBottom: wp(5),
    color: Colors.Primary,
    fontFamily: Fonts.NunitoBold,
  },
  imageStyle: {
    marginRight: 10,
    width: wp(6),
    height: wp(6),
    resizeMode: "contain",
  },
  border: {
    backgroundColor: "#C4C4C4",
    height: 1,
    marginVertical: wp(2),
  },
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
    // paddingTop: wp(5),
    // padding: wp(10),
    // justifyContent: 'center',
    // alignItems: 'center',

    // position: "absolute",
    // bottom: wp(40),
  },
  linearGradient: {
    alignSelf: "center",
    alignItems: "center",
    width: wp(30),
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: wp(5),
  },
  errorTextStyle: {
    color: "red",
    fontSize: 10,
    // height: 15,
    paddingLeft: 14,
    width: wp(70),
  },
};
export default Settings;
