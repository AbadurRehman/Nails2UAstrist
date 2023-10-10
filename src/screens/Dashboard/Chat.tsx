import React, {useState, useCallback, useEffect} from 'react';
import {Bubble, Day, GiftedChat, Time,  TouchableOpacity} from 'react-native-gifted-chat';
import {Platform, SafeAreaView, StatusBar, View, Image} from 'react-native';
// import {useSelector} from 'react-redux';
import Colors from '../../theme/Colors';
// import {nail2UDashboardApiService} from '../../services/Nail2UDashboardApiService';
import { getAllMessages, sendMessage } from "../../utils/Actions";
import { wp } from "../../components/Responsiveness";

import Header from '../../components/Header';
import { EventRegister } from "react-native-event-listeners";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MessageModel {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: User;
}
interface PreviousMessageModel {
  created_at: Date;
  from: string;
  id: string | number;
  is_read: boolean;
  message: string;
  to: string;
  updated_at: Date;
}
declare type renderFunction = (x: any) => JSX.Element;
export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | renderFunction;
}

const Chat = props => {
  const loaded = React.useRef(false);
  console.log(new Date().toLocaleString());

  // const user = useSelector(state => state.authReducer.userData);

  const [messages, setMessages] = useState<MessageModel[]>([]);

  useEffect(() => {
    
    const newMessage =   EventRegister.addEventListener('newMessage', (message: string) => {
      // const parseMessage: {from: number; message: string; to: string} =
        // JSON.parse(message);
      const packet = [
        {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          text: message.message,
          received: true,
          user: {
            _id: props.route.params.user_id,
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ];
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, packet),
      );
    });

    return () => {
      EventRegister.removeEventListener(newMessage);
    };
  }, []);

  useEffect(() => {
    const removeChat = async () => {
      EventRegister.emit("ReadChat")
      await AsyncStorage.removeItem("chat_message");
    };
    removeChat();
  }, []);
  

  //   useEffect(() => {

  //     var channel = pusher.subscribe('channel2');
  //     if (!loaded.current) {
  //       loaded.current = true;
  //       // callme()
  //     }

  //     if (loaded.current) {
  //       channel.bind('message2', data => {
  //         const packet = [
  //           {
  //             _id: Math.round(Math.random() * 1000000),
  //             createdAt: new Date(new Date().toLocaleString().toString()),
  //             text: data.message,
  //             received: true,
  //             user: {
  //               _id: user.userId,
  //               avatar: 'https://placeimg.com/140/140/any',
  //             },
  //           },
  //         ];
  //         setMessages(previousMessages =>
  //           GiftedChat.append(previousMessages, packet),
  //         );
  //         // callme();
  //       });
  //     }

  //     return () => {
  //       if (loaded.current) {
  //         channel.unbind();
  //       }
  //     };
  //   }, []);

  useEffect(() => {
    const getAllMessage = async () => {
      // nail2UDashboardApiService.setAuth(user.access_token);
      // const previousMessages = await nail2UDashboardApiService.getAllMessages();
      await getAllMessages(props.route.params.user_id, async (res) => {
        console.log("res.records---", res.records)
        if (res.errors.length) {
          if (typeof res.errors == "string") {
            alert(res.errors);
          } else {
            alert(res.errors[0]);
          }
        } else {

          const messagesModel: PreviousMessageModel[] =
          res.records;
        const messageArray: MessageModel[] = [];
        messagesModel.map(item => {
          const packet = {
            _id: item.id,
            createdAt: item.created_at,
            text: item.message,
            user: {
              _id: item.sender_id,
              avatar: 'https://placeimg.com/140/140/any',
            },
          };
          messageArray.unshift(packet);
        });
        setMessages(messageArray);
        }
      });

     
    };
    getAllMessage();
  }, []);

  const sendAndRecieveMessage = async (message) => {
    console.log("message---", message)
    await sendMessage(props.route.params.user_id, message[0].text ,async (res) => {
      console.log("sendMessage=---", res);
      if (res.errors.length) {
        if (typeof res.errors == "string") {
          alert(res.errors);
        } else {
          alert(res.errors[0]);
        }
      } else {
        console.log("sendMessage=---111", res);
      }
    });
    // let formdata = new FormData();
    // formdata.append('message', message[0].text);
    // formdata.append('receiver_id');
    // nail2UDashboardApiService.sendMessage(formdata);
  };

  const onSend = useCallback((messages = []) => {
    sendAndRecieveMessage(messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'white',
            borderWidth:1
          },
          left: {
            backgroundColor: 'white',
            borderWidth:1
          },
        }}
        textStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
          },
        }}
      />
    );
  };
  const renderTime = (props: any) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'black',
          },
          right: {
            color: 'black',
          },
        }}
      />
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.Primary}}>
      <SafeAreaView style={{ backgroundColor: Colors.Primary,}} />
      <StatusBar translucent={false} />
      <Header {...props} title={"CHAT"} height />
      <View style={{   borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8), 
    backgroundColor: "white"
    }}>
        {/* <View style={{borderWidth:1, borderColor: "yellow", marginTop: -wp(16)}}></View> */}
        <View style={{width: wp(100), alignItems: "center",
       borderTopLeftRadius: wp(8),
       borderTopRightRadius: wp(8),
      }}>
        <View style={styles.profileImageContainer}>
          <View style={{
             borderWidth: 10,
             borderColor: "white",
             borderRadius: wp(28),
          }}>
        <View style={{
          borderWidth:5,
          borderRadius: wp(28),
          borderColor: Colors.Primary,

        }}>
          {props.route?.params?.item?.client?.image_url ? (
                  <Image
                    style={styles.profileImage}
                    source={{ uri: "https://user.nail2u.net/" + props.route?.params?.item?.client?.image_url }}
                  />
                ) : null}
          
          </View>
          </View>
        </View>
         
        </View>
    
        </View>
        <View style={{ backgroundColor:"white", flex:1}}>
        <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        renderTime={renderTime}
        textInputStyle={{color:"black"}}
        user={{
          _id: props.route?.params?.item?.artist_id,
        }}
      />
        </View>
    </View>
  );
};
export default Chat;
const styles = {
  container: {
    backgroundColor: "white",
    flex: 1,
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    marginTop: -wp(8),
    paddingBottom: wp(3),
  },
  profileImageContainer: {
   
    width: wp(32),
    height: wp(32),
    alignItems: "center",
    justifyContent: "center",
    marginTop: -wp(16),
    marginBottom: wp(10),
  },
  profileImage: {
    borderRadius: wp(28),
    width: wp(30),
    height: wp(30),
    
  },
 
};