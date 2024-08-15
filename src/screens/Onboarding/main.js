import React, {useState, useEffect, Alert} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { getSession, getRegion, getUser } from '../../services/auth'
import { getLocation } from '../../services/geo'
import { requestUserPermission } from '../../services/fcm'
import AuthStore from '../../stores/auth'
import BusinessPointsStore from '../../stores/businessPoints'
import PromotionStore from '../../stores/promotion'
import { ModalUpdate } from "./components/ModalUpdate"
import { FIRST_PAGE, setFirstPage, PUSH_ACCESS } from "./../../services/globals"
import messaging from '@react-native-firebase/messaging';

const NOT_WORKING_STATUSES = ['not_working_soft', 'not_working_hard']
export const OnboardingScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [versionStatus, setVersionStatus] = useState(null);
  const [isVisibleModal, setisVisibleModal] = useState(false);

  function getMessage() {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   navigation.navigate('CouponDetailScreen', { data: { id: remoteMessage?.data?.id_offer } })
    // });
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('setBackgroundMessageHandler', remoteMessage?.data?.id_offer)
    //   navigation.navigate('CouponDetailScreen', { data: { id: remoteMessage?.data?.id_offer } })
    // });

    // Обработка уведомления, когда приложение закрыто
    // messaging().getInitialNotification().then(async (initialMessage) => {
    //   console.log('getInitialNotification', initialMessage?.data?.id_offer)
    //   if (initialMessage?.data?.id_offer) {
    //     navigation.navigate('CouponDetailScreen', { data: { id: remoteMessage?.data?.id_offer } })
    //   }
    // }).catch(e => console.log('2'))

    // Обработка уведомления, когда приложение находится в фоновом режиме или закрыто
    messaging().onNotificationOpenedApp(initialMessage => {
      console.log('onNotificationOpenedApp', initialMessage?.data?.id_offer)
      if (initialMessage?.data?.id_offer) {
        navigation.navigate('CouponDetailScreen', { data: { id: initialMessage?.data?.id_offer } })
      }
    });
    // return unsubscribe;
  }

  useEffect(() => {
    init()
  }, []);

    const init = async () => {
      getMessage()
      await getLocation()
      await requestUserPermission()
      const session = await getSession()
      if (!session) {
        await AuthStore.createUser()
      }

      const currentRegion = await getRegion()
      if (!currentRegion) {
        setFirstPage('Region')
      } else {
        setFirstPage('CouponScreen')
      }
      const stauts = await AuthStore.checkVersion({
        os: Platform?.OS,
        osVersion: Platform?.Version || Platform?.osVersion,
        model: Platform?.constants?.Model,
        pushAccess: PUSH_ACCESS
      });

      setVersionStatus(stauts);
      if (NOT_WORKING_STATUSES.includes(stauts)) {
        BusinessPointsStore.getAll()
        setVisible(false);
        setisVisibleModal(true)
        return;
      }

      await PromotionStore.getList();

      setTimeout(async () => {
        setVisible(false);
        AuthStore.updateCoord()
        BusinessPointsStore.getAll()
        const initialMessage = await messaging().getInitialNotification()
        if (initialMessage?.data?.id_offer) {
          navigation.replace('CouponDetailScreen', { data: { id: initialMessage?.data?.id_offer } })
        } else {
          navigation.replace(FIRST_PAGE, { screen: 'Акции' })
        }
      });
    }

    const closeModal = () => {
      setisVisibleModal(false)
      setTimeout(async () => {
        navigation.replace(FIRST_PAGE, { screen: 'Акции' })
      }, 500);
    }

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
        <AnimatedLoader
          visible={visible}
          animationStyle={styles.lottie}
          source={require("../../../assets/loader.json")}
          speed={1}
        >
        </AnimatedLoader>
        <ModalUpdate
          isVisible={isVisibleModal}
          versionStatus={versionStatus}
          cancelAction={closeModal}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});