import messaging from '@react-native-firebase/messaging';
import { getRegion, getTopic, setTopic } from './auth'
import {PermissionsAndroid} from 'react-native';



export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
  }
}

export const subscribeToTopic = async () => {
  const region = await getRegion()
  const currentTopic = await getTopic()
  if (region?.id === currentTopic) return;

  if (currentTopic) {
    messaging()
    .unsubscribeFromTopic(currentTopic)
    .then(() => console.log('Unsubscribed fom the topic!'));
  }

  messaging()
  .subscribeToTopic(region.id)
  .then(() => console.log('Subscribed to topic!'));

  setTopic(region.id)
}