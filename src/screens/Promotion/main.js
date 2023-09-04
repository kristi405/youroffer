import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PromotionView } from "./components/PromotionView";

export const CouponDetailScreen = ({ navigation, route }) => {
    const openQr = props => {
        navigation.navigate('QrCodeScreen')
    }
    const item = route?.params?.data
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer}>
                <Image source={{ uri: `http://192.168.0.112:8888/api/v1/file/${item.img}.${item.img_ext}` }} style={styles.imageContainer} />
                <View style={styles.headerContainerView}>
                    <View style={styles.headerView}>
                        <Image source={{ uri: `http://192.168.0.112:8888/api/v1/file/${item.bp_img}.${item.img_ext}` }} style={styles.avatar} />
                        <Text style={styles.headerText}>{item.name}</Text>
                    </View>
                </View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>Описание акции:</Text>

                <Text style={styles.contentText}>{item.description}</Text>
                <View style={styles.circle}>
                    <PromotionView />
                </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle} onPress={openQr}>
                <Text style={styles.showPromotionText}>Сгенерировать QR код</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingBottom: 40,
        paddingTop: 5
    },
    descriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 10,
    },
    circle: {
        paddingTop: 10,
        flexDirection: 'row'
    },
    imageContainer: {
        width: '100%',
        height: '40%',
        borderRadius: 10,
    },
    headerContainerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 30,
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13
    },
    headerText: {
        fontSize: 15,
        color: '#fff',
        paddingLeft: 10,
    },
    titleText: {
        fontSize: 17,
        color: '#fff',
        paddingTop: 3
    },
    descriptionText: {
        fontSize: 15,
        color: '#fff',
        paddingTop: 3,
        opacity: 0.6
    },
    contentText: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.6
    },
    buttonStyle: {
        height: 40,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})