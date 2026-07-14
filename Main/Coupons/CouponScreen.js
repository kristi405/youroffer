import React from "react";
import { TouchableHighlight, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Category } from "./Category";
import { Coupon } from "../Coupons";
import { Segments } from "./Segments";



export const CouponScreen = ({ navigation }) => {
    const openDetail = item => {
        navigation.navigate('CouponDetailScreen', {data: item})
    }

    return (
        <View style={styles.container}>
            {/* <Category style={styles.category} /> */}
            <Segments/>
            <Coupon style={styles.coupon} openDetail={openDetail} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 35,
        paddingHorizontal: 10,
        gap: 16
    },
})