import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import { BusinessPoints } from "./components/BusinessPoints";

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

export const CompanyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <BusinessPoints navigation={navigation} />
    </SafeAreaView>
  )
}