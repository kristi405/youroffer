import messaging from '@react-native-firebase/messaging';
import { getRegion, getTopic, setTopic } from './auth'
import {PermissionsAndroid, Platform} from 'react-native';
import { setPushAccess } from "./globals"


export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (Platform.OS !== 'ios') {
    const granted =  await PermissionsAndroid?.request(PermissionsAndroid?.PERMISSIONS?.POST_NOTIFICATIONS);
    setPushAccess(granted)
  } else {
    setPushAccess(enabled)
  }

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