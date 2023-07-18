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
                <Image source={item.image.props.source} style={styles.imageContainer} />
                <View style={styles.headerContainerView}>
                    <View style={styles.headerView}>
                        <Image source={item.avatar.props.source} style={styles.avatar} />
                        <Text style={styles.headerText}>{item.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.buttonPromotionStyle}>
                            <Text style={styles.showPromotionText}>все акции</Text>
                        </TouchableOpacity>
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
    buttonPromotionStyle: {
        width: 80,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EA47A',
        borderRadius: 4,
        opacity: 0.8,
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
        paddingTop: 10
    },
    descriptionText: {
        fontSize: 15,
        color: '#fff',
        paddingTop: 8,
        opacity: 0.6
    },
    contentText: {
        fontSize: 12,
        color: '#fff',
        opacity: 0.6
    },
    showPromotionText: {
        fontSize: 13,
        color: 'black',
        fontWeight: '600'
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