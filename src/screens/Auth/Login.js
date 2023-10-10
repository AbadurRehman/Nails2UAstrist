import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";

import Container from "../../components/Container";
import { wp } from "../../components/Responsiveness";
import LoginField from "../../components/LoginField";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";

import SplashLogo from "../../assets/images/main_logo.png";
import FaceBookLogo from "../../assets/images/facebook_logo.png";
import GoogleLogo from "../../assets/images/google_logo.png";
import ResponsiveText from "../../components/ResponsiveText";
import { userLogin, verifyEmailLogin } from "../../utils/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../utils/UserContext";
import Geolocation from "react-native-geolocation-service";
import { hasLocationPermission } from "../../services/GoogleMap";

const Login = (props) => {
  const { setUser } = React.useContext(UserContext);
  const [tick, setTick] = useState(false);
  const [showEye, setShowEye] = useState(true);

  const [userEmail, setUserEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [userPassword, setUserPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const _storeData = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data.records.access_token));
    await AsyncStorage.setItem("userdata", JSON.stringify(data.records.user));
    setLoading(false);
  };

  const handleSubmitButton = () => {
    if (userEmail === "" || userPassword === "" || validEmail === false || errorPassword !== "" || errorEmail !== "") {
      if (!userEmail) {
        setErrorEmail("*Please fill Email");
      } else {
        if (validEmail === false) {
          setErrorEmail("*Please enter correct email");
        }
      }

      if (!userPassword) {
        setErrorPassword("*Please fill Password");
      } else {
        if (userPassword.length < 8) {
          setErrorPassword("*Password length should be greater than 8");
        }
      }
    } else {
      setLoading(true);
      userLogin(userEmail, userPassword, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            setLoading(false);
          } else {
            alert(res.errors[0]);
            setLoading(false);
          }
        } else if (res.records.access_token) {
          _storeData(res);
          setUser("login", res);
          props.navigation.navigate("Home");
        } else {
          alert("Something went wrong");
          setLoading(false);
        }
      });
    }
  };

  const setEmailValue = (val) => {
    setUserEmail(val);

    verifyEmailLogin(val, (res) => {
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

  useEffect(() => {
    async function permissionRequest() {
      // You can await here
      const response = await hasLocationPermission();
      // ...
    }
    permissionRequest();
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS != "ios") {
      let grantCamera = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      let grantRead = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      if (!grantCamera || !grantRead) {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);
        return;
      }
    }
  };

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content" style={styles.container}>
      <View style={{ paddingHorizontal: wp(5) }}>
        <Image style={styles.imageStyle} source={SplashLogo} />
        <ResponsiveText style={styles.logoText}>Nails2U</ResponsiveText>
        <View>
          <ResponsiveText style={styles.titleText}>Welcome to Nails2U for Artist</ResponsiveText>
        </View>
      </View>

      <View style={styles.whiteSection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
          <ResponsiveText style={styles.signInText}>SIGN IN</ResponsiveText>
          <View style={{ marginTop: wp(1) }}>
            <LoginField
              placeHolder={"Enter Email"}
              email
              setError={setErrorEmail}
              userEmail={userEmail}
              setValidEmail={setValidEmail}
              setValue={(val) => setEmailValue(val)}
            />
            {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null}
          </View>
          <View style={{ marginTop: wp(5) }}>
            <LoginField
              setShowEye={setShowEye}
              showEye={showEye}
              show
              password
              setError={setErrorPassword}
              setValue={(val) => setUserPassword(val)}
              placeHolder={"Password"}
            />
            {errorPassword != "" ? <Text style={styles.errorTextStyle}>{errorPassword}</Text> : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-start",
              paddingLeft: wp(18),
              marginTop: wp(3),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setTick(!tick);
              }}
              style={{
                borderColor: Colors.lightGrey,
                borderWidth: 1,
                width: wp(4),
                height: wp(4),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {tick && (
                <Image
                  style={{
                    tintColor: Colors.lightGrey,
                    height: wp(2.5),
                    width: wp(2.5),
                  }}
                  source={require("../../assets/images/tick.png")}
                />
              )}
            </TouchableOpacity>
            <ResponsiveText
              style={{
                color: Colors.DarkGrey,
                fontSize: 3.5,
                marginLeft: wp(2),
              }}
            >
              Remember Me
            </ResponsiveText>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPasswordEmail")} style={styles.forgetText}>
            <ResponsiveText style={{ color: Colors.DarkGrey, fontSize: 3.5 }}>Forgot Password ?</ResponsiveText>
          </TouchableOpacity>
          <View>
            {loading ? (
              <TouchableOpacity>
                <LinearGradient
                  colors={[Colors.Primary, Colors.Primary]}
                  style={[styles.linearGradient, { flexDirection: "row" }]}
                >
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Login</ResponsiveText>
                  <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmitButton}>
                <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Login</ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.line}></View>
            <View>
              <ResponsiveText style={styles.orwithText}>OR WITH</ResponsiveText>
            </View>
            <View style={styles.line}></View>
          </View> */}
          {/* <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.facebookContainer}>
              <Image source={FaceBookLogo} style={styles.facebookImage} />
              <ResponsiveText style={styles.facebookText}>FACEBOOK</ResponsiveText>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.googleContainer}>
              <Image source={GoogleLogo} style={styles.googleImage} />
              <ResponsiveText style={styles.gooleText}>GOOGLE</ResponsiveText>
            </TouchableOpacity>
          </View> */}

          <View style={styles.signUpContainer}>
            <ResponsiveText style={{ color: Colors.DarkGrey, fontSize: 3.5 }}>Don't have an ID ? </ResponsiveText>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("SelectRegister");
              }}
            >
              <ResponsiveText style={{ color: Colors.DarkGrey, fontSize: 3.5 }}>Register Here</ResponsiveText>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              color: Colors.DarkGrey,
              alignSelf: "flex-start",
              paddingHorizontal: wp(10),
              paddingTop: wp(20),
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
    // tintColor: Colors.Secondary,
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
  },
  logoText: {
    textAlign: "center",
    width: wp(30),
    marginTop: -19,
    color: Colors.Secondary,
    fontSize: 4,
  },
  titleText: {
    color: "white",
    fontSize: 5,
    paddingHorizontal: wp(5),
    marginTop: wp(5),
    marginBottom: wp(5),
    width: wp(80),
  },
  whiteSection: {
    backgroundColor: Colors.White,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: "100%",
  },
  signInText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 5,
    color: Colors.DarkGrey,
    paddingVertical: wp(5),
  },
  forgetText: {
    alignSelf: "flex-start",
    paddingLeft: wp(18),
    paddingVertical: wp(5),
  },
  signUpContainer: {
    flexDirection: "row",
    color: Colors.DarkGrey,
    alignSelf: "flex-start",
    paddingHorizontal: wp(10),
    paddingTop: wp(10),
  },
  line: {
    width: wp(25),
    height: 1,
    backgroundColor: Colors.DarkGrey,
  },
  orwithText: {
    fontSize: 4,
    color: Colors.DarkGrey,
    paddingVertical: wp(5),
    paddingHorizontal: 20,
  },
  facebookContainer: {
    alignItems: "center",
    // justifyContent: 'center',
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
    // backgroundColor: 'red',
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
  errorTextStyle: {
    color: "red",
    fontSize: 12,
    height: 15,
    paddingLeft: 14,
  },
});
export default Login;
