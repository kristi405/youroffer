import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { PromotionView } from "./components/PromotionView";
import { getUser } from "../../services/auth"
import OfferUsingStore from '../../stores/offerUsing'
import { FILE_URL } from '../../services/constants'
import PromotionStore from "../../stores/promotion"

export const CouponDetailScreen = ({ navigation, route }) => {
    const [item, setItem] = useState(route?.params?.data)
    const [offer, setOffer] = useState('');
    const [ids, setIds] = useState(null)

    useEffect(() => {
        const newIds = item.related
        newIds.push(item.id)
        setIds(newIds)
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            init()
        }, [])
    );

    const init = () => {
        setTimeout(async () => {
            let offer = await OfferUsingStore.getOfferById(item.id)
            if (offer) {
                setOffer(offer)
                setItem(offer)
            } else {
                Alert.alert('', 'Акция была удалена');
            }
        }, 300)
    }

    const openQr = async (props) => {
        const user = await getUser()
        navigation.navigate('QrCodeScreen', { data: { userId: user.id, itemId: ids, name: item.name } })
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

    const QuantitativePromotionView = () => {
        if (item.type != 'quantitative') return null
        return (
            <Text style={styles.quantitativeStyle}>* Количество оставшихся акций: {offer?.max_count || 0}</Text>
        )
    }

    const addToFavorite = (offer) => {
        setOffer({offer, favorite: !offer.favorite})
        PromotionStore.addToFavorite(offer.id, !offer.favorite)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: `${FILE_URL}${item.img}.${item.img_ext}` }} style={styles.imageContainer} />
                <View style={styles.headerContainerView}>
                    <View style={styles.headerView}>
                        <Image source={{ uri: `${FILE_URL}${item.business_points[0].img}.${item.business_points[0].img_ext}` }} style={styles.avatar} />
                        <Text style={styles.headerText}>{item.name}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => { addToFavorite(offer) }}>
                        <View style={styles.touch}>
                            <Image source={offer.favorite ? require('../../../assets/saveSelected.png') : require('../../../assets/save.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.descriptionText}>Описание акции:</Text>

                <Text style={styles.contentText}>{item.description}</Text>
                <Text style={styles.addressTitle}>Акция доступна по адресу:</Text>
                {item.business_points?.map(bp => {
                    return (
                    <View style={styles.addressList} key={bp.id}>
                        <Image style={styles.addressImg} source={require('../../../assets/mapIcon.png')} />
                        <Text style={styles.address}>{bp.name}: {bp.address}</Text>
                    </View>
                    )
                })}
                <View style={styles.button}>
                    <DefaultPromotionView />
                </View>
                <View style={styles.circle}>
                    <AccumulativePromotionView />
                    <QuantitativePromotionView />
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
        paddingBottom: 15
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
    profile: {
        flexDirection: 'row',
    },
    headerContainerView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 5,
    },
    headerView: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 0,
    },
    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13
    },
    headerText: {
        fontSize: 17,
        color: '#fff',
        paddingLeft: 10,
        width: '82%'
    },
    showPromotionText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#fff',
    },
    titleText: {
        fontSize: 17,
        color: '#fff',
        paddingTop: 3
    },
    addressTitle: {
        fontSize: 15,
        color: '#fff',
        paddingTop: 5,
        opacity: 0.6,
        marginBottom: 10,
        marginTop: 10
    },
    addressList: {
        flexDirection: 'row',
    },
    addressImg: {
        marginRight: 10,
    },
    address: {
        fontSize: 15,
        color: '#fff',
        paddingTop: 5,
        opacity: 0.6
    },
    descriptionText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.6
    },
    contentText: {
        paddingTop: 8,
        fontSize: 15,
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
    quantitativeStyle: {
        fontSize: 18,
        color: 'white',
        opacity: 0.9,
        fontWeight: '600',
    },
    touch: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
})