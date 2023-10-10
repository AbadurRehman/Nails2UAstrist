import React, { useEffect } from "react";
import Navigation from "./src/navigation/index";
import { Text } from "react-native";
import { UserContext } from "./src/utils/UserContext";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const App = () => {
  const [expireIn, setExpireIn] = React.useState(new Date());
  const [token, setToken] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [logintime, setLoginTime] = React.useState(new Date());
  const [isloggedIn, setIsloggedIn] = React.useState(false);

  useEffect(() => {
    async function getToken() {
      const Token = await AsyncStorage.getItem("user");
      setIsloggedIn(Token ? true : false);
    }

    getToken();
  }, []);

  useEffect(() => {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }, []);

  const userContext = React.useMemo(
    () => ({
      setUser: (condi, res) => {
        if (condi === "expire") {
          setToken("");
          setIsloggedIn(false);
          setUserData({});
          setExpireIn(new Date());
          setLoginTime(new Date());
        } else {
          setToken(res.records.access_token);
          setIsloggedIn(true);
          setUserData(res.records.user);
          setExpireIn(res.records.expires_in);
          setLoginTime(new Date());
        }
      },
      isloggedIn: isloggedIn,
      expireIn: expireIn,
      token: token,
      userData: userData,
      logintime: logintime,
    }),
    [isloggedIn]
  );

  return (
    <UserContext.Provider value={userContext}>
      <Navigation />
    </UserContext.Provider>
  );
};

export default App;
