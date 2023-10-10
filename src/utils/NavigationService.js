// import { NavigationContainerRef } from "@react-navigation/native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";

// export const navigationRef =
export const navigationRef = createNavigationContainerRef();
/**
 * @param  {never} name
 * @param  {never} params
 */
export function navigate(name, params) {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(name, params);
  }
}

// add other navigation functions that you need and export them

export function setParams(params) {
  if (navigationRef?.isReady()) {
    navigationRef.current?.setParams(params);
  }
}
export function dispatch(args) {
  if (navigationRef?.isReady()) {
    navigationRef.dispatch(StackActions.push(args));
  }
}
export function setTopLevelNavigator(navigatorRef) {}

export default {
  navigate,
  setTopLevelNavigator,

  setParams,
};
