import React from "react";
import { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, Image } from 'react-native';
import { Segments } from "./components/Segments";
import { observer } from "mobx-react-lite"

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

export const CouponScreen = observer(({ navigation }) => {
    useEffect(() => {
    }, []);

    return (
      <SafeAreaView style={styles.container}>
          <Segments/>
      </SafeAreaView>
    )
})