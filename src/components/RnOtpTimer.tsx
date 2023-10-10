import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useTheme,
} from '@react-navigation/native';
// import {nail2UApiService} from '../services/Nail2UApiService';
import ResponsiveText from '../components/ResponsiveText';
import { wp } from "../components/Responsiveness";
import { forgotPassword } from "../utils/Actions";

interface OtpTimerProps {
  ref: any;
  setValue: (value: any) => void;
  /**
   * timer showing minutes
   */
  mobileNo: string | undefined;
  minutes?: number;
  email: string;
  navigation: NavigationProp<ParamListBase>;
  /**
   * timer showing seconds
   */
  seconds?: number;
  /**
   * styling of otp timer
   */
  timerStyle?: StyleProp<TextStyle>;
  /**
   * text content of resend button
   */
  resendButtonText?: string;
  /**
   * styling of resend button
   */
  resendButtonStyle?: StyleProp<ViewStyle>;
  /**
   * styling of resend button text
   */
  resendButtonTextStyle?: StyleProp<TextStyle>;
  /**
   * action to perform after clicking resend button
   */
  resendButtonAction: () => void;
  setOtpExpired: (args: boolean) => void;
}

const RnOtpTimer = React.forwardRef(
  (props: OtpTimerProps, ref): JSX.Element => {
    React.useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            handleButton();
          },
        };
      },
      [],
    );

    const [minutes, setMinutes] = useState<number>(
      props.minutes ? props.minutes : 0,
    );
    const [seconds, setSeconds] = useState<number>(
      props.seconds ? props.seconds : 0,
    );
    const [loader, setLoader] = useState<boolean>(false);

    const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
    const {colors} = useTheme();

    useEffect(() => {
      let countDown: NodeJS.Timeout;
      if (isTimerActive) {
        countDown = setInterval(() => {
          if (!seconds) {
            if (!minutes) {
              clearInterval(countDown);
              setIsTimerActive(false);
              props.setOtpExpired(true);
            } else {
              setMinutes(minutes => minutes - 1);
              setSeconds(59);
            }
          }

          if (seconds > 0) {
            setSeconds(seconds => seconds - 1);
          }
        }, 1000);
      }

      // if (!minutes && !seconds) {
      // setIsTimerActive(false);

      // }
      return () => clearInterval(countDown);
    }, [seconds, minutes, isTimerActive]);
    const handleButton = async () => {
      // const formData = new FormData();
      // formData.append('email', props.email);
      // props?.setValue('');
      // setLoader(true);
      // const res = await nail2UApiService.forgotPassword(formData);

      // if (res.status == 200) {
      //   props.setOtpExpired(false);
      //   setLoader(false);
      //   setMinutes(props.minutes ? props.minutes : 2);
      //   setSeconds(props.seconds ? props.seconds : 0);
      //   setIsTimerActive(true);
      //   props.resendButtonAction();
      // } else {
      //   setLoader(false);
      //   console.log('something went wrong');
      // }

      const phone = props?.email?.slice(2);
      forgotPassword(phone, (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            // setLoading(false);
          } else {
            alert(res.errors[0]);
            // setLoading(false);
          }
        } else if (res.records.phone_number) {
          // setLoading(false);
          // alert("Email for resetting password has been sent!");

          props.setOtpExpired(false);
        // setLoader(false);
        setMinutes(props.minutes ? props.minutes : 2);
        setSeconds(props.seconds ? props.seconds : 0);
        setIsTimerActive(true);
        props.resendButtonAction();
          // props.navigation.navigate("OtpVerification", { params: res.records });
        } else {
          alert("Something went wrong");
          // setLoading(false);
        }
      });
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <ResponsiveText style={{color: '#B7B7B7'}}>
          {!minutes && !seconds
            ? 'OTP has been expired!'
            : 'This code will be expire in'}
        </ResponsiveText>
        {!minutes && !seconds ? (
          props.resendButtonText ? (
            <TouchableOpacity
              style={props.resendButtonStyle}
              onPress={handleButton}>
              <Text style={props.resendButtonTextStyle}>
                {props.resendButtonText}
              </Text>
            </TouchableOpacity>
          ) : null
        ) : (
          // <TouchableOpacity
          //   style={props.resendButtonStyle}
          //   onPress={handleButton}
          // >
          //   <Text style={props.resendButtonTextStyle}></Text>
          // </TouchableOpacity>
          <Text style={props.timerStyle}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}>
          {loader ? (
            <ActivityIndicator
              style={{
                marginTop: wp(-2),
                right: !minutes && !seconds ? -wp(34) : -wp(16.5),
              }}
              size={'small'}
              color={'red'}
            />
          ) : (
            <TouchableOpacity
              disabled={!minutes && !seconds ? false : true}
              onPress={handleButton}
              style={{
                marginTop: wp(-2),
                right: !minutes && !seconds ? -wp(30) : -wp(10.5),
              }}>
              <ResponsiveText
                style={{
                  color: !minutes && !seconds ? 'red' : '#B7B7B7',
                  marginLeft: 3,
                  textDecorationLine: 'underline',
                }}>
                Resend
              </ResponsiveText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

export default RnOtpTimer;

interface Styles {
  otpViewStyle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  otpViewStyle: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
