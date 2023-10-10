import React, { useState } from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, Platform } from "react-native";
import { wp } from "../components/Responsiveness";
import Fonts from "../theme/fonts";
import EyeIcon from "../assets/images/eye.png";
import HideEyeIcon from "../assets/images/hide_eye.png";
import Colors from "../theme/Colors";

const LoginField = (props) => {
  const [value, setValue] = useState("");
  return (
    <View
      style={
        props.phone
          ? {
              paddingHorizontal: 20,
              borderRadius: wp(6),
              backgroundColor: "#F8F8F8",
              borderWidth: 1,
              borderColor: "#D4D3D3",
              width: wp(70),
              height: wp(11),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }
          : {
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
            }
      }
    >
      {props.phone ? (
        <View>
          <Text
            style={{
              fontSize: 12,
              color: "black",
              marginRight: Platform.OS == "ios" ? wp(2) : 0,
            }}
          >
            +1
          </Text>
        </View>
      ) : null}

      <TextInput
        style={{
          // fontFamily: Fonts.NunitoRegular,
          fontSize: 12,
          width: wp(50),
          color: "black",
        }}
        value={value}
        placeholderTextColor={Colors.lightGrey}
        keyboardType={
          props.phone
            ? "phone-pad"
            : props.email
            ? "email-address"
            : props.experience || props.zipcode
            ? "numeric"
            : "default"
        }
        onChangeText={(text) => {
          if (props.name) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.street) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.city) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.state) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.zipcode) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.experience) {
            if (!text) {
              // props.setError('*Please fill Name')
              props.setValue("");
              setValue("");
            } else {
              const expcheck = /^\d+$/;
              if (expcheck.test(String(text)) === false) {
                props.setValidExperience(false);
                // props.setError("");
              } else {
                props.setValidExperience(true);
                props.setError("");
                props.setValue(text);
                setValue(text);
              }
            }
          }

          if (props.phone) {
            // console.log("phone----", text);

            if (!text) {
              // props.setError('*Please fill Phone')
              props.setValue("");
              setValue("");
            } else {
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

              props.setError("");
              props.setValue(formattedNumber);
              setValue(formattedNumber);

              // const formattedObject = {
              //    target: { value: formattedNumber }
              // };
              // handleChange(formattedObject);

              // this.setState({
              //     phoneNum: text
              // });

              // props.setError("");
              // props.setValue(text);
            }
          }

          if (props.password) {
            if (!text) {
              // props.setError('*Please fill Password')
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);
            }
          }

          if (props.password1) {
            if (!text) {
              // props.setError('*Please fill Password')
              props.setValue("");
              setValue("");
            } else {
              const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
              if (!passRegex.test(text)) {
                // props.setValue("");
                // setValue("");
                props.setValue(text);
                setValue(text);
              } else {
                props.setError("");
                props.setValue(text);
                setValue(text);
              }
            }
          }

          if (props.email) {
            if (!text) {
              // props.setError('*Please fill Email');
              props.setValue("");
              setValue("");
            } else {
              props.setError("");
              props.setValue(text);
              setValue(text);

              const emailCheckRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (emailCheckRegex.test(String(text)) === true) {
                props.setValidEmail(true);
                props.setError("");
              } else if (emailCheckRegex.test(String(text)) === false) {
                props.setValidEmail(false);
                // props.setError('*Please enter correct email')
              }
            }
          }
        }}
        placeholder={props.placeHolder}
        maxLength={props.phone ? 14 : 500}
        secureTextEntry={props.showEye && true}
      ></TextInput>
      {props.show && (
        <TouchableOpacity
          onPress={() => {
            props.setShowEye(!props.showEye);
          }}
          style={{ padding: wp(2) }}
        >
          <Image
            style={{ width: wp(4), height: wp(4), tintColor: "#555555" }}
            source={!props.showEye ? EyeIcon : HideEyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LoginField;
