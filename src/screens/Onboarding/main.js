import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { getSession, getRegion, getUser } from '../../services/auth'
import AuthStore from '../../stores/auth'
import BusinessPointsStore from '../../stores/businessPoints'
import { ModalUpdate } from "./components/ModalUpdate";

const NOT_WORKING_STATUSES = ['not_working_soft', 'not_working_hard']

export const OnboardingScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [versionStatus, setVersionStatus] = useState(null);
  const [isVisibleModal, setisVisibleModal] = useState(false);
  let navigateTo = 'CouponScreen';
  let showScan = false;

  useEffect(() => {
    init()
  }, []);

    const init = async () => {
      const session = await getSession()
      if (!session) {
        await AuthStore.createUser()
      }

      const currentRegion = await getRegion()
      if (!currentRegion) {
        navigateTo = 'Region'
      }

      const user = await getUser()
      if (['admin', 'manager'].includes(user?.role) && navigateTo === 'CouponScreen' ) {
        showScan = true;
      }

      const stauts = await AuthStore.checkVersion({
        os: Platform?.OS,
        osVersion: Platform?.Version || Platform?.osVersion,
        model: Platform?.constants?.Model
      });

      setVersionStatus(stauts);
      if (NOT_WORKING_STATUSES.includes(stauts)) {
        BusinessPointsStore.getAll()
        setVisible(false);
        setisVisibleModal(true)
        return;
      }

      setTimeout(() => {
        setVisible(false);
        AuthStore.updateCoord()
        BusinessPointsStore.getAll()
        navigation.replace(navigateTo, { screen: showScan ? 'Скан' : 'Акции' })
      });
    }

    const closeModal = () => {
      setisVisibleModal(false)
      setTimeout(async () => {
        const user = await getUser()
        if (['admin', 'manager'].includes(user?.role) && navigateTo === 'CouponScreen') {
          showScan = true;
        }
        navigation.replace(navigateTo, { screen: showScan ? 'Скан' : 'Акции' })
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