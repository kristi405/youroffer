import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PromotionView } from "./components/PromotionView";
import { getUser } from "../../services/auth"

export const CouponDetailScreen = ({ navigation, route }) => {
    const item = route?.params?.data

    const openQr = async (props) => {
        const user = await getUser()
        navigation.navigate('QrCodeScreen', { data: { userId: user.id, itemId: item.id } })
    }

    const AccumulativePromotionView = () => {
        if (item.type != 'accumulative') return null
        return (
            <PromotionView data={item} />
        )
    }

    const DefaultPromotionView = () => {
        if (item.type == 'default') return null
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={openQr}>
                <Text style={styles.showPromotionText}>Сгенерировать QR код</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.descriptionContainer}>
                <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${item.img}.${item.img_ext}` }} style={styles.imageContainer} />
                <View style={styles.headerContainerView}>
                    <View style={styles.headerView}>
                        <Image source={{ uri: `http://31.220.77.203:8888/api/v1/file/${item.bp_img}.${item.img_ext}` }} style={styles.avatar} />
                        <Text style={styles.headerText}>{item.name}</Text>
                    </View>
                </View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>Описание акции:</Text>

                <Text style={styles.contentText}>{item.description}</Text>
                <View style={styles.button}>
                    <DefaultPromotionView />
                </View>
                <View style={styles.circle}>
                    <AccumulativePromotionView />
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 10
    },
    descriptionContainer: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        gap: 10,
        paddingBottom: 10
    },
    button: {
        paddingTop: 30,
    },
    circle: {
        paddingTop: 20,
    },
    imageContainer: {
        width: '100%',
        height: 200,
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
    showPromotionText: {
        fontSize: 15,
        fontWeight: 800,
        color: '#fff',
    },
    titleText: {
        fontSize: 17,
        color: '#fff',
        paddingTop: 3
    },
    descriptionText: {
        fontSize: 15,
        color: '#fff',
        opacity: 0.6
    },
    contentText: {
        paddingTop: 8,
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