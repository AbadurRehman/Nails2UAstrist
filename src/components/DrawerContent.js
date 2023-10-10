import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, StatusBar } from "react-native";
import Container from "./Container";
import Content from "./Content";
import ResponsiveText from "./ResponsiveText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../theme/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogout } from "../utils/Actions";
import { UserContext } from "../utils/UserContext";
import { getProfileDetails } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";

const drawerItems = [
  {
    icon: require("../assets/images/home.png"),
    name: "Home",
    navigateTo: "Dashboard",
  },
  {
    icon: require("../assets/images/UserCircle.png"),
    name: "Profile",
    navigateTo: "Profile",
  },
  {
    icon: require("../assets/images/Note.png"),
    name: "Documents",
    navigateTo: "Documents",
  },
  {
    icon: require("../assets/images/apply_artist.png"),
    name: "Services",
    navigateTo: "Services",
  },
  {
    icon: require("../assets/images/star.png"),
    name: "Reviews",
    navigateTo: "Reviews",
  },
  {
    icon: require("../assets/images/Note.png"),
    name: "Portfolio",
    navigateTo: "Potfolio",
  },
  {
    icon: require("../assets/images/Tag.png"),
    name: "Job History ",
    navigateTo: "JobHistory",
  },
  {
    icon: require("../assets/images/Money.png"),
    name: "Payment",
    navigateTo: "Payments",
  },
  {
    icon: require("../assets/images/setting.png"),
    name: "Settings",
    navigateTo: "Settings",
  },
  {
    icon: require("../assets/images/Phone.png"),
    name: "Contact Us",
    navigateTo: "ContactUs",
  },
  {
    icon: require("../assets/images/logout.png"),
    name: "Logout",
    navigateTo: "Splash",
  },
];

function DrawerContent({ navigation }) {
  const { setUser } = React.useContext(UserContext);
  const [status, setStatus] = useState(1);

  useEffect(() => {
    // navigation.closeDrawer();
  }, [navigation]);

  useEffect(() => {
    getadditionalStatus();
  }, []);
  useEffect(() => {
    const updatestatus = EventRegister.addEventListener("updatestatus", () => {
      getadditionalStatus();
    });
    return () => {
      EventRegister.removeEventListener(updatestatus);
    };
  }, []);

  const getadditionalStatus = async () => {
    await getProfileDetails(async (res) => {
      // setPageLoad(false);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        setStatus(res?.records?.additional_info_status);
      }
    });
  };

  const Navigator = async (item) => {
    if (item.name === "Logout") {
      const token = await AsyncStorage.getItem("user");
      await userLogout(navigation, token, async (res) => {
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            if (res?._metadata?.outcomeCode == "401") {
              await AsyncStorage.clear().then(() => {
                setUser("expire", {});
              });
            } else {
              alert(res.errors[0]);
            }
          }
        } else {
          await AsyncStorage.clear().then(() => {
            setUser("expire", {});
            navigation.navigate(`${item.navigateTo}`);
          });
        }
      });
    } else {
      navigation.navigate(`${item.navigateTo}`);
      setTimeout(function () {
        navigation.closeDrawer();
      }, 3000);
    }
  };
  return (
    <Container>
      <StatusBar backgroundColor={Colors.Primary} barStyle={"light-content"} translucent={false} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
          }}
        >
          <Image
            style={{ width: wp(4), height: wp(4), tintColor: Colors.White }}
            source={require("../assets/images/close.png")}
          />
        </TouchableOpacity>
        <ResponsiveText style={{ color: Colors.White, fontSize: 5, fontWeight: "bold" }}>MENU</ResponsiveText>
      </View>
      <Content>
        <View style={styles.content}>
          <View style={styles.bottomContainer}>
            {drawerItems.map((item, idx) => {
              return (
                <TouchableOpacity
                  disabled={
                    status == 0
                      ? item.name == "Documents" || item.name == "Logout" || item.name == "Contact Us"
                        ? false
                        : true
                      : false
                  }
                  style={[
                    {
                      display: item.name == "Documents" && status == 1 ? "none" : "flex",
                    },
                    styles.drawerItemContainer,
                  ]}
                  key={idx}
                  onPress={() => Navigator(item)}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={item.icon} resizeMode="contain" style={styles.itemGraphic} />
                    <ResponsiveText
                      style={
                        status == 0
                          ? item.name == "Documents" || item.name == "Logout" || item.name == "Contact Us"
                            ? {
                                fontSize: wp("1"),
                                color: Colors.Primary,
                              }
                            : {
                                fontSize: wp("1"),
                                color: "lightgrey",
                              }
                          : {
                              fontSize: wp("1"),
                              color: Colors.Primary,
                            }
                      }
                    >
                      {item.name}
                    </ResponsiveText>
                  </View>

                  <View style={styles.border}></View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </Content>
    </Container>
  );
}
const styles = StyleSheet.create({
  border: {
    backgroundColor: "#C5C5C5",
    // width: wp(40),
    height: 1,
    marginVertical: wp(4),
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: wp(18),
    backgroundColor: Colors.Primary,
    paddingHorizontal: wp(8),
  },
  content: {
    flex: 1,
    elevation: 8,
    backgroundColor: "white",
  },

  bottomContainer: {
    flex: 1,
    // backgroundColor: 'red',
    paddingVertical: wp(5),
    paddingHorizontal: wp(10),
  },
  drawerItemContainer: {
    flexDirection: "column",
    // paddingVertical: -20,
    // alignItems: 'center',
  },
  itemGraphic: {
    height: wp(9),
    width: wp(9),
    marginRight: wp(5),
    // tintColor: "black",
    resizeMode: "contain",
    opacity: 1,
  },
  name: {
    fontSize: wp("1"),
    color: Colors.Primary,
  },
});
export default DrawerContent;
