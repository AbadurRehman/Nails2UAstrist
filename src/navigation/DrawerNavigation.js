import * as React from "react";
import DrawerContent from "../components/DrawerContent";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Dashboard/Home";
import Chat from "../screens/Dashboard/Chat";
import StartService from "../screens/Dashboard/StartService";
import ContactUs from "../screens/Drawer/ContactUs";
import Settings from "../screens/Drawer/Settings";
import Payments from "../screens/Drawer/Payments";
import JobHistory from "../screens/Drawer/JobHistory";
import Documents from "../screens/Drawer/Douments";
import Potfolio from "../screens/Drawer/Potfolio";
import Reviews from "../screens/Drawer/Reviews";
import Services from "../screens/Drawer/Services";
import Profile from "../screens/Drawer/Profile";
import EditProfile from "../screens/Drawer/EditProfile";
import ServiceDiscount from "../screens/Drawer/ServiceDiscount";
import Withdraw from "../screens/Drawer/Withdraw";
import AddBank from "../screens/Drawer/AddBank";
import AddLocation from "../screens/Drawer/AddLocation";
// import Chat from "../screens/Drawer/Chat";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const stack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Dashboard"}
      // headerMode={"none"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard" component={Home} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="AddBank" component={AddBank} />
      <Stack.Screen name="JobHistory" component={JobHistory} />
      <Stack.Screen name="Potfolio" component={Potfolio} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="ServiceDiscount" component={ServiceDiscount} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="StartService" component={StartService} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
    </Stack.Navigator>
  );
};

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        drawerPosition: "right",
      }}
      // headerMode={"none"}
      drawerPosition="right"
      drawerType={"slide"}
      overlayColor="transparent"
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName={"Home"}
    >
      <Drawer.Screen name="Home" component={stack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
