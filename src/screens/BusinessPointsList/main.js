import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';
import { SegmentsCompany } from "./components/SegmentsCompany";

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
            <SegmentsCompany/>
        </SafeAreaView>
    )
}