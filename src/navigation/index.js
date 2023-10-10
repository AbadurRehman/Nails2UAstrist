import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import { navigationRef } from "../utils/NavigationService";

const Navigation = (props) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigation;
