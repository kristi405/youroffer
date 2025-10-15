import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Coupons } from "./components/Coupons";
import Modal from "react-native-modal"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})

export const CouponScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Coupons navigation={navigation} isCompanyPromotions={false} />
    </SafeAreaView>
  )
}