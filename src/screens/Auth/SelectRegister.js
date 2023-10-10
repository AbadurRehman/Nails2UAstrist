import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Text } from "react-native";
import Container from "../../components/Container";
import { wp } from "../../components/Responsiveness";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";
import SplashLogo from "../../assets/images/main_logo.png";
import ResponsiveText from "../../components/ResponsiveText";
import { forgotPasswordEmail } from "../../utils/Actions";

const SelectRegister = (props) => {
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
          <ResponsiveText style={styles.titleText}>REGISTERED</ResponsiveText>
        </View>
      </View>
      <View style={styles.whiteSection}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            >
              <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                <ResponsiveText style={{ color: Colors.White, fontSize: 3.5, textAlign: "center" }}>
                  Register as Artist
                </ResponsiveText>
              </LinearGradient>
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
                props.navigation.navigate("RegisterSalon");
              }}
            >
              <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                <ResponsiveText style={{ color: Colors.White, fontSize: 3.5, textAlign: "center" }}>
                  Register as Salon
                </ResponsiveText>
              </LinearGradient>
            </TouchableOpacity>
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
    alignSelf: "center",
    width: wp(50),
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    // marginBottom: 20,
    marginVertical: wp(5),
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
export default SelectRegister;
