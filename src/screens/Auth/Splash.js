import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Animated, Text } from "react-native";

import Container from "../../components/Container";
import SplashLogo from "../../assets/images/splash_logo.png";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../theme/Colors";
import Fonts from "../../theme/fonts";
import ResponsiveText from "../../components/ResponsiveText";
import { wp } from "../../components/Responsiveness";

function Splash(props) {
  const [ballAnimation, setBallAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    animateBall();
  }, []);

  const animateBall = () => {
    Animated.timing(ballAnimation, {
      toValue: -100,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(ballAnimation, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });
  };
  const balllAnimation = {
    transform: [
      {
        translateY: ballAnimation,
      },
    ],
  };
  return (
    <Container statusBarColor={Colors.Primary} barStyle="light-content" style={styles.container}>
      <Animated.View style={[styles.container, balllAnimation]}>
        <Image style={styles.imageStyle} source={SplashLogo} />
        <ResponsiveText style={styles.textStyle}>Nails2U For Artist</ResponsiveText>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Login");
            }}
          >
            <LinearGradient colors={[Colors.Secondary, Colors.Secondary]} style={styles.linearGradient}>
              <ResponsiveText
                style={{
                  color: Colors.Primary,
                  fontFamily: Fonts.NunitoRegular,
                }}
              >
                GET STARTED
              </ResponsiveText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Container>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: wp(2),
    paddingHorizontal: wp(10),
    paddingVertical: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
  },
  imageStyle: {
    height: wp(50),
    width: wp(50),
    resizeMode: "contain",
    marginBottom: wp(10),
    // tintColor: Colors.Secondary,
  },
  textStyle: {
    color: Colors.White,
    fontSize: 5,
    paddingHorizontal: wp(20),
    marginBottom: wp(10),
    // fontFamily: Fonts.NunitoRegular,
  },
});

export default Splash;
