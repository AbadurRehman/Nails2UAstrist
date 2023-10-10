import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import LinearGradient from "react-native-linear-gradient";

import Container from '../../components/Container';
import { wp } from "../../components/Responsiveness";

import Colors from '../../theme/Colors';

import SplashLogo from '../../assets/images/main_logo.png';
import ResponsiveText from '../../components/ResponsiveText';
// import Loader from '../../ui/Loader';;
import Fonts from '../../theme/fonts';
import RnOtpTimer from '../../components/RnOtpTimer';
import AuthButton from '../../components/AuthButton';
import { verifyCode } from "../../utils/Actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

import { UserContext } from "../../utils/UserContext";
import { userLogin } from "../../utils/Actions";

interface Props {
  route?: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}
const CELL_COUNT = 6;
const OtpVerification = (props: Props) => {

  const { setUser } = React.useContext(UserContext);

  const {params} = props.route?.params as {
    params: {token: string; message: string; phone_number: string, type: string, email: string, password: string};
  };

  const [otpExpired, setOtpExpired] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  // const [loader, setLoader] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [data, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const timerRef = React.useRef<{onFocus: () => {}; timerActive: () => {}}>(
    null,
  );

  const _storeData = async (data) => {
    await AsyncStorage.setItem("user", JSON.stringify(data.records.access_token));
    await AsyncStorage.setItem("userdata", JSON.stringify(data.records.user));
    // setLoading(false);
  };

  const verifyOtp = async () => {
    if (otpExpired) {
      return Alert.alert('OTP has been expired');
    }
    if (value.length == 6) {
      setLoading(true)
      // const formData: FormData = new FormData();
      // formData.append('email', params.email);
      // formData.append('code', value);
      // console.log("verifyCode----", params.email,value )
      verifyCode(params.phone_number ,value ,params.type, (res) => {
        if (res?.errors?.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
            setLoading(false);
          } else {
            alert(res.errors[0]);
            setLoading(false);
          }
        } else if (res.records.otp_value) {

            if(params.type == "register"){
              userLogin(params.email, params.password, (res) => {
                if (res.errors.length) {
                  if (typeof res.errors == "string") {
                    alert(res.errors);
                    setLoading(false);
                  } else {
                    alert(res.errors[0]);
                    setLoading(false);
                  }
                } else if (res.records.access_token) {
                  setLoading(false);
                  _storeData(res);
                  setUser("login", res);
                  props.navigation.navigate("Home");
                } else {
                  alert("Something went wrong");
                  setLoading(false);
                }
              });
            }else{
            // alert("Email for resetting password has been sent!");
            setLoading(false);

              props.navigation.navigate("ResetPassword", {
                token: params.token,
                email: params.phone_number,
                otp: res.records.otp_value,
              }); 
            }
                
          } else {
            if(res?._metadata?.httpResponseCode ==  10){
              alert(res?._metadata?.message)
            }else{
              alert("Something went wrong");

            }
            setLoading(false);
          }
        });
      // const res = await
    }

   

    //   setLoading(true);
    //   let res: any = dispatch(
    //     verifyOTP(
    //       otp,
    //       props.navigation,
    //       props.route?.params?.moveToDashBoard ?? false,
    //       props.route?.params.values,
    //       props.route?.params.type!,
    //     ),
    //   );
    //   res = await res;
    //   console.log(res);

    //   if (res) {
    //     setLoading(false);
    //   }
    // } else {
    //   Alert.alert('Please enter otp.');
    // }
    
  };
  return (
    <Container
      statusBarColor={Colors.Primary}
      barStyle="light-content"
      style={styles.container}>
      <View
        style={{
          paddingHorizontal: wp(5),
          alignItems: 'center',
          marginBottom: wp(5),
        }}>
        <Image style={styles.imageStyle} source={SplashLogo} />
        <ResponsiveText style={styles.logoText}>Nails2U</ResponsiveText>
      </View>

      <View style={styles.whiteSection}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp(10),
            paddingVertical: wp(15),
          }}>
          <ResponsiveText
            style={{
              fontSize: 6,
              fontFamily: Fonts.NunitoBold,
              marginBottom: wp(2),
            }}>
            OTP Code
          </ResponsiveText>
          <ResponsiveText>
            Kindly input the 6- digit code we have sent to {params?.phone_number}
          </ResponsiveText>
          <CodeField
            key={1}
            ref={ref}
            {...data}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View style={styles.cellStyle}>
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: wp(5),
            }}>
            <RnOtpTimer
              ref={timerRef}
              navigation={props.navigation}
              email={params?.phone_number}
              mobileNo={'92323232'}
              minutes={2}
              seconds={0}
              timerStyle={{
                marginLeft: wp(2),
                marginTop: 2,
                color: '#828282',
                fontSize: 16,
              }}
              setValue={setValue}
              // resendButtonStyle={styles.button}
              // resendButtonTextStyle={styles.buttonText}
              resendButtonAction={() => {
                setValue("")
              }}
              setOtpExpired={setOtpExpired}
            />
          </View>
          <View style={{paddingVertical: wp(20), alignItems: 'center'}}>
            {/* <AuthButton
              disabled={value.length == 6 ? false : true}
              onPress={verifyOtp}
              title={'Verify OTP'}
            /> */}

          {loading ? (
              <TouchableOpacity>
                <LinearGradient
                  colors={[Colors.Primary, Colors.Primary]}
                  style={[styles.linearGradient, { flexDirection: "row" }]}
                >
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Verify OTP</ResponsiveText>
                  <ActivityIndicator color={Colors.White} style={{ paddingLeft: 4 }} />
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={verifyOtp}>
                <LinearGradient colors={[Colors.Primary, Colors.Primary]} style={styles.linearGradient}>
                  <ResponsiveText style={{ color: Colors.White, fontSize: 3.5 }}>Verify OTP</ResponsiveText>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      {/* <Loader visible={loader} /> */}
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
    // resizeMode: "contain",
    // tintColor: Colors.Secondary,
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: '#EF206B',
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
  },
  logoText: {
    textAlign: 'center',
    width: wp(30),
    marginTop: -10,
    color: Colors.Secondary,
    fontSize: 4,
  },
  titleText: {
    color: 'white',
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
    height: '100%',
  },
  signInText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 5,
    color: Colors.DarkGrey,
    paddingVertical: wp(5),
  },
  forgetText: {
    alignSelf: 'flex-start',
    paddingLeft: wp(18),
    paddingVertical: wp(3),
  },
  signUpContainer: {
    flexDirection: 'row',
    color: Colors.DarkGrey,
    alignSelf: 'flex-start',
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
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#1877F2',
    width: wp(30),
  },
  facebookImage: {
    marginRight: 15,
    width: wp(5),
    height: wp(5),
  },
  facebookText: {
    color: '#1877F2',
    fontSize: 3,
    paddingRight: 20,
  },
  googleContainer: {
    marginLeft: wp(15),
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#C72227',
    // backgroundColor: 'red',
    width: wp(30),
  },
  googleImage: {
    marginRight: 15,
    width: wp(5),
    height: wp(5),
  },
  gooleText: {
    color: '#C72227',
    fontSize: 3,
    paddingRight: 20,
  },
  errorField: {
    color: 'red',
    padding: 5,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginVertical: wp(10)},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    paddingBottom: 10,
  },
  focusCell: {
    borderColor: '#000',
  },
  cellStyle: {
    borderColor: '#545454',
    borderWidth: 1,
    marginTop: wp(10),
    borderRadius: wp(1),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: wp(10),
    height: wp(16),
  },
  linearGradient: {
    borderRadius: wp(2),
    backgroundColor: "#EF206B",
    paddingHorizontal: wp(10),
    paddingVertical: 10,
    marginBottom: 20,
  },
});
export default OtpVerification;
