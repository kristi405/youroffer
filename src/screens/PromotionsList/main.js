import React from "react";
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Coupons } from "./components/Coupons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  }
})

export const CouponScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Coupons navigation={navigation} />
    </SafeAreaView>
  )
}