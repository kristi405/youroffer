import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";
import { getSession } from '../../services/auth'

const sleep = ms => new Promise(r => setTimeout(r, ms));

export const OnboardingScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    getSession().then(async (session) => {
      await sleep(1000)
      setInterval(() => {
        setVisible(!visible);
      }, 1000);
      if (session && session.token) {
        console.log('1111111')
        navigation.navigate('CouponScreen')
      } else {
        navigation.navigate('LoginScreen')
      }
    })}, []);

    return (
      <View style={{ flex: 1, paddingTop: 0, backgroundColor: 'black' }}>
        <AnimatedLoader
          visible={visible}
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