import React from "react";
import { SafeAreaView, Image, Dimensions, StatusBar, View } from "react-native";
import Colors from "../theme/Colors";

export default class Container extends React.Component {
  render() {
    const { backgroundImageStyle } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <SafeAreaView style={{ backgroundColor: Colors.Primary }} />
        <StatusBar backgroundColor={this.props.statusBarColor} barStyle={this.props.barStyle} translucent={false} />

        {this.props.backgroundImage && (
          <Image source={this.props.backgroundImage} style={[styles.backgroundImage, backgroundImageStyle]} />
        )}
        {this.props.overlay && <View style={styles.overlayStyle} />}
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};
