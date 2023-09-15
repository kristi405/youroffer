import React from "react";
import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Segments } from "./components/Segments";
import { observer } from "mobx-react-lite"
import PromotionStore from "../../stores/promotion"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    gap: 16
  },
  baseText: {
    color: 'white',
    fontFamily: 'Cochin',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export const CouponScreen = observer(({ navigation }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
        await PromotionStore.getList();
        setIsPageLoading(false);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isPageLoading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="white" />
      ) : (
        <Segments />
      )}
    </SafeAreaView>
  )
})