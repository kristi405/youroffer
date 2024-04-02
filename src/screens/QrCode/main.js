import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';

export const QrCodeScreen = ({navigation, route}) => {
    const data = route?.params?.data
    const json = JSON.stringify({
        id_offer: data.itemId,
        id_user: data.userId,
        name_offer: data.name,
        type: data.type,
        bonuses: data.bonuses
    })

    return (
        <View style={styles.container}>
            <View style={styles.qrCode}>
                <SvgQRCode value={json} size={290} />
            </View>
            <Text style={styles.acseptPromotion}> * Для применения акции менеджер должен отсканировать ваш QR code</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 70,
    },
    qrCode: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    acseptPromotion: {
        paddingTop: 40,
        paddingHorizontal: 30,
        paddingBottom: 30,
        fontSize: 14,
        color: 'white',
        fontWeight: '500'
    },
})