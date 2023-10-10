import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, ScrollView } from "react-native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import ResponsiveText from "../../components/ResponsiveText";
import { wp } from "../../components/Responsiveness";
import Colors from "../../theme/Colors";
import { postContactData } from "../../utils/Actions";

const ContactUs = (props) => {
  const [userName, setUserName] = useState("");
  const [errorName, setErrorName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [userPhone, setUserPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const [userMessage, setUserMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  const handleSubmitButton = async () => {
    if (
      userName === "" ||
      userEmail === "" ||
      userPhone === "" ||
      userMessage === "" ||
      validEmail === false ||
      errorName !== "" ||
      errorMessage !== "" ||
      errorEmail !== "" ||
      errorPhone !== ""
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

      if (!userMessage) {
        setErrorMessage("*Please fill Message");
      } else {
        if (userPassword.length < 8) {
          setErrorPassword("*Password length should be greater than 8");
        }
      }
    } else {
      setLoading(true);
      await postContactData(userName, userEmail, userPhone, userMessage, (res) => {
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
          alert("Message sent successfully!");
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
        setUserName(text);
      }
    }

    if (type === "phone") {
      if (!text) {
        setErrorPhone("*Please fill phone");
      } else if (text.length !== 11) {
        setErrorPhone("*Phone no must be 11 digits");
      } else {
        setErrorPhone("");
        setUserPhone(text);
      }
    }

    if (type === "message") {
      if (!text) {
        setErrorMessage("*Please fill message");
      } else if (text.length < 10) {
        setErrorMessage("*Message length should be greater");
      } else {
        setErrorMessage("");
        setUserMessage(text);
      }
    }

    if (type === "email") {
      if (!text) {
        setErrorEmail("*Please fill email");
      } else {
        setUserEmail(text);
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
  };

  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content">
      <Header {...props} title={"CONTACT US"} />
      <ScrollView>
        <View style={styles.container}>
          <ResponsiveText style={styles.sendText}>Send Us a Message</ResponsiveText>
          <TextInput
            style={styles.textInput}
            placeholder={"Full Name"}
            placeholderTextColor={Colors.Primary}
            onChangeText={(text) => onChangeValue("name", text)}
          />
          {errorName != "" ? (
            <Text style={styles.errorTextStyle}>{errorName}</Text>
          ) : (
            <Text style={{ marginBottom: wp(3) }}></Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder={"Email"}
            placeholderTextColor={Colors.Primary}
            keyboardType={"email-address"}
            onChangeText={(text) => onChangeValue("email", text)}
          />
          {errorEmail != "" ? (
            <Text style={styles.errorTextStyle}>{errorEmail}</Text>
          ) : (
            <Text style={{ marginBottom: wp(3) }}></Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder={"Mobile"}
            placeholderTextColor={Colors.Primary}
            keyboardType={"phone-pad"}
            onChangeText={(text) => onChangeValue("phone", text)}
          />
          {errorPhone != "" ? (
            <Text style={styles.errorTextStyle}>{errorPhone}</Text>
          ) : (
            <Text style={{ marginBottom: wp(3) }}></Text>
          )}
          <TextInput
            style={styles.textInput}
            placeholder={"Message"}
            placeholderTextColor={Colors.Primary}
            onChangeText={(text) => onChangeValue("message", text)}
          />
          {errorMessage != "" ? (
            <Text style={styles.errorTextStyle}>{errorMessage}</Text>
          ) : (
            <Text style={{ marginBottom: wp(3) }}></Text>
          )}
          <View style={{ alignItems: "center", marginTop: wp(5) }}>
            {loading ? (
              <TouchableOpacity style={[styles.saveChangesContainer, { flexDirection: "row" }]}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>Submit</ResponsiveText>
                <ActivityIndicator color="#fff" style={{ paddingLeft: 4 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmitButton} style={styles.saveChangesContainer}>
                <ResponsiveText style={{ fontSize: 4, color: Colors.White }}>Submit</ResponsiveText>
              </TouchableOpacity>
            )}
            <Image style={{ marginTop: wp(15) }} source={require("../../assets/images/call_center.png")} />
            <ResponsiveText style={{ textAlign: "center" }}>
              You can <ResponsiveText style={{ color: "#FF5050" }}>GET IN TOUCH</ResponsiveText> with our{"\n"}
              Customer Service Representatives 24/7.
            </ResponsiveText>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};
const styles = {
  saveChangesContainer: {
    backgroundColor: Colors.Primary,
    width: wp(25),
    height: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
  },
  container: {
    paddingHorizontal: wp(5),
    marginVertical: wp(5),
  },
  sendText: {
    marginBottom: wp(5),
    color: Colors.Primary,
    fontWeight: "bold",
  },
  textInput: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    marginBottom: wp(1),
  },
  errorTextStyle: {
    color: "red",
    fontSize: 12,
    marginBottom: wp(4),
  },
};
export default ContactUs;
