import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
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
            <PromotionView data={item}/>
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
            <View style={styles.descriptionContainer}>
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
                <View style={styles.circle}>
                    <AccumulativePromotionView />
                </View>
            </View>
            <DefaultPromotionView />
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