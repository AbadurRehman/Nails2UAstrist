import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {wp} from '../components/Responsiveness';
import Colors from '../theme/Colors';
import Fonts from '../theme/fonts';
import ResponsiveText from './ResponsiveText';
const HomeRatting = props => {
  return (
    <View style={styles.container}>
      <ResponsiveText style={{fontSize: 3}}>{props.item.title}</ResponsiveText>
      <ResponsiveText
        style={{fontFamily: Fonts.NunitoBold, fontSize: 5, marginTop: wp(2)}}>
        {props.item.amount}
      </ResponsiveText>
      {/* <View style={{position: 'absolute'}}> */}
      <Image
        style={{
          position: 'absolute',
          top: -10,
          right: -10,
          width: wp(6),
          height: wp(6),
          resizeMode: 'contain',
        }}
        source={props.item.image}
      />
      {/* </View> */}
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: 'white',
    width: wp(40),
    height: wp(18),
    borderRadius: wp(2),
    marginTop: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default HomeRatting;
