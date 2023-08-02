import { Text, View, StyleSheet } from 'react-native';
import { useEffect } from 'react'
import AnimatedLoader from "react-native-animated-loader";
import { getSession } from '../../services/auth'

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const OnboardingScreen = ({navigation}) => {
  useEffect(() => {
    getSession().then(async (session) => {
      await sleep(1000)
      if (session && session.token) {
        navigation.navigate('CouponScreen')
      } else {
        navigation.navigate('LoginScreen')
      }
    })}, []);

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
        <AnimatedLoader
          visible={true}
          animationStyle={styles.lottie}
          source={require("../../../assets/loader.json")}
          speed={1}
        >
          <Text>Doing something...</Text>
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