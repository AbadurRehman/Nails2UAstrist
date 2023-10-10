import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, AndroidStyle } from "@notifee/react-native";
import { Platform } from "react-native";
import { postUserdevicetoken, checkNotificationSettings } from "../utils/Actions";
import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseIntegration = async () => {
  // ? WHEN APP LOAD FIRST TIME WE WILL REMOVE BADGE COUNT AS PER STANDARD
  await notifee.requestPermission();
  const permissionsStatus = await requestUserPermission();
  var token = "";
  if (typeof permissionsStatus == "boolean") {
    if (permissionsStatus) {
      token = await messaging().getToken();
      // console.log("🚀 ~ file: firebaseIntegeration.ts:18 ~ firebaseIntegration ~ token:", token);

      await checkNotificationSettings(async (res) => {
        // console.log("---res.errors---", res);
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {
          if (res.records.app_notification == 1) {
            await postUserdevicetoken(token, async (res) => {
              if (res.errors.length) {
                if (typeof res.errors == "string") {
                  alert(res.errors);
                } else {
                  alert(res.errors[0]);
                }
              } else {
                // console.log("resdata=---111", res);
              }
            });

            if (typeof token == "string") {
            } else {
              console.warn("TOKEN IS NOT FOUND SOMETHING GOES WRONG HERE");
            }
          } else {
            await postUserdevicetoken("1122", async (res) => {
              if (res.errors.length) {
                if (typeof res.errors == "string") {
                  alert(res.errors);
                } else {
                  alert(res.errors[0]);
                }
              } else {
                // console.log("resdata=---22", res);
              }
            });

            if (typeof token == "string") {
            } else {
              console.warn("TOKEN IS NOT FOUND SOMETHING GOES WRONG HERE");
            }
          }
        }
      });

      // console.log("token---", token);
    } else {
      console.warn("PERMISSIONS ISSUE");
    }
  } else {
    console.warn("PERMISSION RETURN TYPE IS NOT SUPPORTED");
  }
  return token;
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return !!enabled;
}

messaging().onMessage(onMessageReceived);
// messaging().setBackgroundMessageHandler(async (data) => {
//   const response = await data;
//   console.log(
//     "🚀 ~ file: firebaseIntegration.ts:43 ~ messaging ~ response:",
//     response
//   );
// });

async function onMessageReceived(notification) {
  // console.log("🚀 ~ file: firebaseIntegeration.ts:56 ~ onMessageReceived ~ notification:", notification);
  const channelId = await notifee.createChannel({
    id: "appchanel",
    name: "appchanel",
    vibration: true,
    sound: "default",
    importance: AndroidImportance.HIGH,
    vibrationPattern: [300, 500],
  });
  notifee.displayNotification({
    title:
      Platform.OS == "ios"
        ? String(notification?.notification?.title)
        : `<p style="color: #3578DB;"><b>${String(notification?.notification?.title)}</span></p></b></p>`,
    // subtitle: "&#128576;",
    body:
      Platform.OS == "ios"
        ? String(notification?.notification?.body)
        : `<p style="text-decoration: line-through;word-wrap: break-word; ">${String(
            notification?.notification?.body ?? "Message is not found"
          )}</p> &#3578DB;!`,
    android: {
      channelId,
      color: "#A9382A",
      style: {
        type: AndroidStyle.BIGTEXT,
        text: notification?.notification?.body,
      },
    },
  });
  // console.log("newMessage---", notification?.data?.status);
  if (notification?.data?.status == "chat") {
    EventRegister.emit("newMessage", notification.data);
    await AsyncStorage.setItem("chat_message", JSON.stringify(notification.data));
  }

  if (notification?.data?.status == "3") {
    EventRegister.emit("jobDoneNotification", notification.data);
  }
  EventRegister.emit("JobAccept");
}

export { firebaseIntegration };
