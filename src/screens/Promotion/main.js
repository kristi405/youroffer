import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { PromotionView } from "./components/PromotionView";
import { BonusView } from "./components/BonusView";
import { getUser } from "../../services/auth"
import OfferUsingStore from '../../stores/offerUsing'
import { FILE_URL } from '../../services/constants'
import PromotionStore from "../../stores/promotion"

let fromQR = false;
let timers = []
export const CouponDetailScreen = ({ navigation, route }) => {
    const [item, setItem] = useState(route?.params?.data)
    const [offer, setOffer] = useState('');
    const [ids, setIds] = useState(null)

    useEffect(() => {
        const newIds = [...item.related] || []
        if (!newIds.includes(item.id)) {
            newIds.push(item.id);
        }
        setIds(newIds)
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            init()
            // если у нас есть незакрыте таймеры - очищаем их
            if (timers.length) {
                for (timer of timers) {
                    clearTimeout(timer)
                }
                timers = []
            }
            // если мы вернулись из QR делаем еще несколько запросов
            if (fromQR && item.type === 'accumulative') {
                fromQR = false
                timers.push(init(3000))
                timers.push(init(6000))
                timers.push(init(12000))
                timers.push(init(24000))
                timers.push(init(40000))
            }
        }, [])
    );

    const init = (time) => {
        return setTimeout(async () => {
            let offer = await OfferUsingStore.getOfferById(item.id)
            if (offer) {
                setOffer(offer)
                setItem(offer)
            } else {
                Alert.alert('', 'Акция была удалена');
            }
        }, time || 300)
    }

    const openQr = async (props) => {
        const user = await getUser()
        fromQR = true
        navigation.navigate('QrCodeScreen', { data: {
            userId: user.id,
            itemId: ids,
            name: item.name,
            type: item.type,
            bonuses: offer.bonuses,
            max_count: item.max_count,
            use_count: item.use_count || 0,
            is_active_for_user:  item.is_active_for_user
        }})
    }

    const AccumulativePromotionView = () => {
        if (item.type != 'accumulative') return null
        return (
            <PromotionView data={item} />
        )
    }

    const AccumulativeBonusView = () => {
        if (item.type == 'accumulative' && item.bonuses)  {
            return (
                <BonusView data={item}/>
            )
        }
        return null
    }

    const SubscriptionPromotionView = () => {
        if (item.type == 'subscription' && item.is_active_for_user)  {
            return (
                <PromotionView data={item} />
            )
        }
        return null
    }

    const ButtonView = ({buttonTitle}) => {
        if (item.type == 'default' && !item.generate_qr) return null
        if (item.type == 'discount' && item.is_active_for_user) return buttonTitle
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={openQr}>
                <Text style={styles.showPromotionText}> {buttonTitle} </Text>
            </TouchableOpacity>
        )
    }

    const QuantitativePromotionView = () => {
        if (item.type != 'quantitative') return null
        return (
            <Text style={styles.quantitativeStyle}>* Количество оставшихся акций: {offer?.max_count || 0}</Text>
        )
    }

    let timer;
    const addToFavorite = (offer) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setOffer({...offer, favorite: !offer.favorite})
            PromotionStore.addToFavorite(offer.id, !offer.favorite)
        }, 200)
    }


    const btnText = () => {
        if (item.type === 'subscription' && !item.is_active_for_user)  {
            return 'Активировать подписку'
        }

        if (item.type === 'subscription' && item.is_active_for_user)  {
            return 'Воспользоваться подпиской'
        }

        if (item.type === 'discount' && !item.is_active_for_user)  {
            return 'Активировать скидку'
        }

        if (item.type === 'discount' &&
            item.is_active_for_user &&
            item.reset_after_days &&
            item.days_to_reset)  {
            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.activeDiscountText}>
                    <Text style={styles.activeDiscountText}>Ваша скидка активна</Text>
                    <Text style={styles.activeDiscountText}>до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'

                    })}</Text>
                </View>
            )
        }

        if (item.type === 'discount' && item.is_active_for_user)  {
            return (
                <View style={styles.activeDiscountText}>
                    <Text style={styles.activeDiscountText}>Ваша скидка активна</Text>
                </View>
            )
        }

        return 'Воспользоваться акцией'
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
                <Text style={styles.descriptionText}>Описание акции:</Text>
                <Text style={styles.contentText}>{item.description}</Text>
                <View style={styles.button}>
                    <ButtonView buttonTitle = {btnText()} />
                </View>
                <View style={styles.circle}>
                    <AccumulativePromotionView />
                    <AccumulativeBonusView />
                    <QuantitativePromotionView />
                    <SubscriptionPromotionView />
                </View>
                <Text style={styles.addressTitle}>Акция доступна по адресу:</Text>
                {item.business_points?.map(bp => {
                    return (
                    <View style={styles.addressList} key={bp.id}>
                        <Image source={require('../../../assets/mapIcon.png')} />
                        <Text style={styles.address}>{bp.name}: {bp.address}</Text>
                    </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    activeDiscountText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0EA47A',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingHorizontal: 15,
        paddingTop: 5,
        paddingBottom: 15
    },
    button: {
        paddingTop: 10,
    },
    circle: {
        paddingTop: 20,
        gap: 20
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
    },
    headerView: {
        flexDirection: 'row',
        paddingTop: 15,
        gap: 3
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
        width: '85%'
    },
    showPromotionText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#fff',
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
        paddingHorizontal: 10,
    },
    address: {
        fontSize: 13,
        color: '#fff',
        paddingTop: 5,
        paddingHorizontal: 10,
        opacity: 0.6
    },
    descriptionText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.6,
        paddingTop: 5
    },
    contentText: {
        paddingTop: 8,
        fontSize: 15,
        color: '#fff',
        opacity: 1
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
        paddingVertical: 20,
        paddingRight: 5
    },
})