import React from "react";
import { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { SegmentsCompany } from "./components/SegmentsCompany";
import { observer } from "mobx-react-lite"
import BusinessPointsStore from "../../stores/businessPoints"

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

export const CompanyScreen = observer(({ navigation }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await BusinessPointsStore.getBusinessPoints();
      setIsPageLoading(false);
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isPageLoading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="white" />
      ) : (
      <SegmentsCompany />
      )}
    </SafeAreaView>
  )
})