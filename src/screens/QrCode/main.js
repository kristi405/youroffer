import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import * as Asset from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const QrCodeScreen = navigation => {
    return (
        <View style={styles.container}>
            <View style={styles.qrCode}>
                <SvgQRCode value='http://apple.com' size={290} />
            </View>
            <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.acseptPromotion}>Применить QR код</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: 'black',
        paddingVertical: 40,
    },
    qrCode: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        width: '100%',
        height: 40,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    acseptPromotion: {
        fontSize: 13,
        color: 'black',
        fontWeight: '600'
    },
})