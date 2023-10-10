import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text, ActivityIndicator } from "react-native";

import Container from "../../components/Container";
import { wp } from "../../components/Responsiveness";
import LoginField from "../../components/LoginField";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";
import SplashLogo from "../../assets/images/main_logo.png";
import ResponsiveText from "../../components/ResponsiveText";
import { resetPassword } from "../../utils/Actions";

const ResetPassword = (props) => {
  const [showEye, setShowEye] = useState(true);
  const [showEye1, setShowEye1] = useState(true);

  const [userPassword, setUserPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const [emailToken, setEmailToken] = useState("");
  const [errorEmailToken, setErrorEmailToken] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmitButton = () => {
    if (userPassword == "" || errorPassword !== "" || errorConfirmPassword !== "" || confirmPassword == "") {
      if (!userPassword) {
        setErrorPassword("*Please fill Password");
      } else {
        if (userPassword.length < 8) {
          setErrorPassword("*Password length should be greater than 8");
        }
      }

      if (!confirmPassword) {
        setErrorConfirmPassword("*Please fill Password");
      } else {
        if (userPassword !== confirmPassword) {
          setErrorConfirmPassword("*Passwords donot match");
        }
      }
    } else {
      setLoading(true);
      const email = props.route.params.email;
      const otp = props.route.params.otp;
      resetPassword(email, userPassword, confirmPassword, otp, (res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        if (res?.errors?.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            setLoading(false);
          } else {
            alert(res.errors[0]);
            setLoading(false);
          }
        } else if (res?.records?.message) {
          setLoading(false);
          props.navigation.navigate("Login");
        } else {
          alert("Something went wrong");
          setLoading(false);
        }
      });
    }
  };

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content" style={styles.container}>
      <View style={{ paddingHorizontal: wp(5) }}>
        <Image style={styles.imageStyle} source={SplashLogo} />
        <ResponsiveText style={styles.logoText}>Nails2UArtist</ResponsiveText>
        <View>
          <ResponsiveText style={styles.titleText}>
            Please Enter your new password and confirm new password
          </ResponsiveText>
        </View>
      </View>
      <View style={styles.whiteSection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
          <View>
            <ResponsiveText style={styles.signInText}>Reset Password</ResponsiveText>
            <LoginField
              setShowEye={setShowEye}
              showEye={showEye}
              show
              password
              setError={setErrorPassword}
              setValue={(val) => setUserPassword(val)}
              placeHolder={"New Password"}
            />
            {errorPassword != "" ? <Text style={styles.errorTextStyle}>{errorPassword}</Text> : null}
            <View style={{ marginTop: wp(5) }}>
              <LoginField
                setShowEye={setShowEye1}
                showEye={showEye1}
                show
                password
                userPassword={userPassword}
                setError={setErrorConfirmPassword}
                setValue={(val) => setConfirmPassword(val)}
                placeHolder={"Confirm New Password"}
              />
              {errorConfirmPassword != "" ? <Text style={styles.errorTextStyle}>{errorConfirmPassword}</Text> : null}
            </View>
          </View>
          <View>
            {loading ? (
              <TouchableOpacity>
                <LinearGradient
                  colors={[Colors.Primary, Colors.Primary]}
                  style={[styles.linearGradient, { flexDirection: "row" }]}
                >
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Update</ResponsiveText>
                  <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmitButton}>
                <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Update</ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            )}
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
    marginVertical: wp(10),
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
    width: wp(90),
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
    marginBottom: wp(5),
    marginTop: wp(15),
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
    paddingVertical: wp(5),
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
  errorField: {
    color: "red",
    padding: 5,
  },
  errorTextStyle: {
    color: "red",
    fontSize: 12,
    height: 13,
    paddingLeft: 14,
  },
});
export default ResetPassword;
