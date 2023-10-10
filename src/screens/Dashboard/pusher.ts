import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';
import {Platform} from 'react-native';
import { EventRegister } from "react-native-event-listeners";

// import EventEmitter from './EventEmitter';
const pusher = Pusher.getInstance();

function PusherConnection() {
  PusherConnection.prototype.handlePusherConnection = async function () {
    try {
      await pusher.init({
        apiKey: '73ead456e66df0eb225b',
        cluster: 'ap2',
        // authEndpoint: '<YOUR ENDPOINT URI>',
        onConnectionStateChange,
        onError,
        onEvent,
        onSubscriptionSucceeded,
        onSubscriptionError,
        onDecryptionFailure,
        onMemberAdded,
        onMemberRemoved,
      });

      await pusher.subscribe({
        channelName: 'userapp1',
      });
      await pusher.connect();
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };
  const handleNotification = (notification: any): void => {
    if (Platform.OS === 'ios') {
      console.log('CALLBACK: handleNotification (ios)');
    } else {
      console.log('CALLBACK: handleNotification (android)');
      console.log(notification);
    }
  };

  const onSubscriptionsChanged = (interests: string[]): void => {
    console.log('CALLBACK: onSubscriptionsChanged');
  };
  const onConnectionStateChange = (
    currentState: string,
    previousState: string,
  ) => {
    console.log('Previous State', previousState, 'Next State', currentState);
  };
  const onEvent = (event: PusherEvent) => {
    EventRegister.emit('newMessage', event.data);
    // EventEmitter.emit(Events.JobCreateEvent, event);
    // EventEmitter.off(Events.JobCreateEvent, () => {});
  };
  const onSubscriptionSucceeded = (channelName: string, data: any) => {
    console.log('subscription option changed', channelName, data);
  };
  const onSubscriptionError = (
    channelName: string,
    message: string,
    e: any,
  ) => {
    console.log('subscription error', channelName, message, e);
  };
  const onMemberAdded = () => {};
  const onMemberRemoved = () => {};

  const onDecryptionFailure = (eventName: string, reason: string) => {
    console.log('description error', eventName, 'reason', reason);
  };
  const onError = (message: string, code: Number, e: any) => {
    console.log(' pusher error', message, code, e);
  };
}

export default PusherConnection;
