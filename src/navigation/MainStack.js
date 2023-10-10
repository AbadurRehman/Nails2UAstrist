import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../screens/Auth/Splash";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import RegisterSalon from "../screens/Auth/RegisterSalon";
import SelectRegister from "../screens/Auth/SelectRegister";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import ForgotPasswordEmail from "../screens/Auth/ForgotPasswordEmail";
import ResetPassword from "../screens/Auth/ResetPassword";
import OtpVerification from "../screens/Auth/OtpVerification";
import DrawerNavigation from "./DrawerNavigation";
import { UserContext } from "../utils/UserContext";
import PaymentDetails from "../screens/Drawer/PaymentDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Drawer"}
      screenOptions={{ headerShown: false }}
      // headerMode={"none"}
    >
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  const { logintime, isloggedIn, expireIn, token, userData, setUser } = React.useContext(UserContext);

  if (!isloggedIn) {
    // console.log(expireIn);
    const LoginTime = logintime.getTime();
    const currentDate = new Date();
    let currentTime = currentDate.getTime();
    const expireTime = expireIn * 1000;
    const timeDiff = currentTime - LoginTime;
    if (expireTime < timeDiff) {
      AsyncStorage.clear().then(() => {
        setUser("expire", {});
      });
    }
  }

  if (isloggedIn) {
    return (
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{ headerShown: false }}
        // headerMode={"none"}
      >
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterSalon" component={RegisterSalon} />
        <Stack.Screen name="SelectRegister" component={SelectRegister} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{ headerShown: false }}
        // headerMode={"none"}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterSalon" component={RegisterSalon} />
        <Stack.Screen name="SelectRegister" component={SelectRegister} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPasswordEmail" component={ForgotPasswordEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    );
  }
};

export default MainStack;
