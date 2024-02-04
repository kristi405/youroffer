import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { getSession } from '../../services/auth'
import AuthStore from '../../stores/auth'
import BusinessPointsStore from '../../stores/businessPoints'


export const OnboardingScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
      init()
  }, []);

    const init = async () => {
      const session = await getSession()
      if (!session) {
        await AuthStore.createUser()
      }
      setTimeout(() => {
        setVisible(false);
        AuthStore.updateCoord()
        BusinessPointsStore.getAll()
        navigation.replace('CouponScreen')
      }, 1000);
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
      </View>
    );
};

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
  },
});