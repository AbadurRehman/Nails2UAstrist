import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text } from "react-native";

import Container from "../../components/Container";
import { wp } from "../../components/Responsiveness";
import LoginField from "../../components/LoginField";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";
import SplashLogo from "../../assets/images/main_logo.png";
import ResponsiveText from "../../components/ResponsiveText";
import { forgotPasswordEmail } from "../../utils/Actions";

const ForgotPasswordEmail = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const handleSubmitButton = () => {
    if (userEmail === "" || errorEmail !== "") {
      if (!userEmail) {
        setErrorEmail("*Please fill Email Address");
      }
    } else {
      setLoading(true);
      // const res = {
      //   _metadata: {
      //     httpResponseCode: 200,
      //     message: "Email for sending resetting password sent successfully!",
      //     numOfRecords: 1,
      //     outcome: "SUCCESS",
      //     outcomeCode: 0,
      //   },
      //   errors: [],
      //   records: {
      //     email: "abadurrehman98@gmail.com",
      //     message: "Email for resetting password has been sent!",
      //     token:
      //       "jmeZxtrpcVkWQyMinNehRDBX6jjVFlM2NuLL55pGkEdMjzf0DKwXbNM2c4MwhbA1WSnOqLM776znOkwIOdApugSsIp03d485yw0WcivW8BrhVRjR6juRVcHJlj1Mg18D1Id4ceUw0Eds",
      //   },
      // };

      // console.log("userEmail--", userEmail);

      forgotPasswordEmail(userEmail, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            setLoading(false);
          } else {
            alert(res.errors[0]);
            setLoading(false);
          }
        } else if (res.records.digit) {
          setLoading(false);
          // alert(res.records?.message);
          const rec = res.records;
          rec.type = "forgot";
          props.navigation.navigate("ForgotPassword", { params: rec });
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
          <ResponsiveText style={styles.titleText}>FORGOT PASSWORD</ResponsiveText>
        </View>
      </View>
      <View style={styles.whiteSection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
          <View>
            <ResponsiveText style={styles.signInText}>Registered Email</ResponsiveText>

            <LoginField
              // onChangeText={(text) => {
              //   var x = text.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
              //   const maskedPhone = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
              //   setUserEmail(maskedPhone);
              // }}
              placeHolder={"Enter Email Address"}
              // value={userEmail}
              // maxLength={14}
              email
              setError={setErrorEmail}
              setValue={(val) => setUserEmail(val)}
              setValidEmail={setValidEmail}

              // style={{ paddingLeft: wp(4) }}
            />
            {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null}

            {/* <LoginField
              placeHolder={"Enter Email"}
              email
              setError={setErrorEmail}
              userEmail={userEmail}
              setValidEmail={setValidEmail}
              setValue={(val) => setUserEmail(val)}
            /> */}
            {/* {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null} */}
            {/* <View style={{ marginTop: wp(5) }} />
            <ResponsiveText
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 5,
                color: Colors.DarkGrey,
              }}
            >
              OR
            </ResponsiveText>
            <View style={{ marginTop: wp(5) }} />
            <LoginField
              placeHolder={"Enter Phone Number"}
              phone
              setError={setErrorEmail}
              userEmail={userEmail}
              setValidEmail={setValidEmail}
              setValue={(val) => setUserEmail(val)}
            />
            {errorEmail != "" ? <Text style={styles.errorTextStyle}>{errorEmail}</Text> : null} */}
          </View>
          <View>
            {loading ? (
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate("ForgotPassword");
                }}
              >
                <LinearGradient
                  colors={[Colors.Primary, Colors.Primary]}
                  style={[styles.linearGradient, { flexDirection: "row" }]}
                >
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Recover Now</ResponsiveText>
                  <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmitButton}>
                <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Recover Now</ResponsiveText>
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
export default ForgotPasswordEmail;
