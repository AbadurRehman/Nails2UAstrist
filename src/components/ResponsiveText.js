import React from "react";
import { Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../theme/Colors";

import Fonts from "../theme/fonts";

export default class ResponsiveText extends React.Component {
  render() {
    const { style, children } = this.props;
    let fontSize = wp("4%");
    let lineHeight = wp("5.5%");

    if (style && style.fontSize) {
      fontSize = wp(style.fontSize);
    }
    if (style && style.fontSize) {
      lineHeight = wp(style.fontSize) + wp("1%");
    }
    if (style && style.lineHeight) {
      lineHeight = style.lineHeight;
    }
    return (
      <Text
        style={{
          ...styles.text,
          ...this.props.style,
          ...{ fontSize, lineHeight },
        }}
      >
        {children}
      </Text>
    );
  }
}

const styles = {
  text: {
    color: Colors.Primary,
    // fontFamily: Fonts.NunitoRegular,
  },
};
