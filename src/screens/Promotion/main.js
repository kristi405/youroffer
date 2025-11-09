import React, { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Linking } from 'react-native';
import { Image } from "expo-image";
import { PromotionView } from "./components/PromotionView";
import { BonusView } from "./components/BonusView";
import { getUser } from "../../services/auth"
import OfferUsingStore from '../../stores/offerUsing'
import { FILE_URL, BLURHASH } from '../../services/constants'
import PromotionStore from "../../stores/promotion"

// import * as Brightness from 'expo-brightness';

let fromQR = false;
let timers = []
export const CouponDetailScreen = ({ navigation, route }) => {
    const [item, setItem] = useState(route?.params?.data)
    const [offer, setOffer] = useState('');
    const [ids, setIds] = useState(null)

    useEffect(() => {
        const newIds = item?.related ? [...item?.related] : []
        if (!newIds.includes(item.id)) {
            newIds.unshift(item.id);
        }
        setIds(newIds)
    }, [item]);

    // const setBrightness = async () => {
    //     try {
    //         const brightness = await Brightness.getSystemBrightnessAsync()
    //         await Brightness.setBrightnessAsync(brightness)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    // setBrightness()

    const handler = React.useCallback(() => {
        setItem(route?.params?.data)
        init()
        // если у нас есть незакрыте таймеры - очищаем их
        if (timers.length) {
            for (timer of timers) {
                clearTimeout(timer)
            }
            timers = []
        }
        // если мы вернулись из QR делаем еще несколько запросов
        if (fromQR && ['accumulative', 'subscription', 'discount', 'present', 'coupon'].includes(item?.type)) {
            fromQR = false
            timers.push(init(3000))
            timers.push(init(6000))
            timers.push(init(12000))
            timers.push(init(24000))
            timers.push(init(40000))
        }
    }, [route?.params?.data])

    useFocusEffect(handler);

    const init = (time) => {
        return setTimeout(async () => {
            let offer = await OfferUsingStore.getOfferById(route?.params?.data.id)
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
        navigation.navigate('QrCodeScreen', {
            data: {
                user_number: user.number,
                offer_number: offer.number,
                userId: user.id,
                itemId: ids,
                name: item.name,
                type: item.type,
                bonuses: offer.bonuses,
                max_count: item.max_count,
                use_count: item.use_count || 0,
                is_active_for_user: item.is_active_for_user
            }
        })
    }

    const AccumulativePromotionView = () => {
        if (item.type != 'accumulative') return null
        return (
            <PromotionView data={item} />
        )
    }

    const AccumulativeBonusView = () => {
        if (item.type == 'accumulative' && item.bonuses) {
            return (
                <BonusView data={item} />
            )
        }
        return null
    }

    const SubscriptionPromotionView = () => {
        if (item.type == 'subscription' && item.is_active_for_user) {
            return (
                <PromotionView data={item} />
            )
        }
        return null
    }

    const ButtonView = ({ buttonTitle }) => {
        if (item.type == 'default' && !item.generate_qr) return null
        if (item.type == 'discount' && item.is_active_for_user && !item.one_time) return null
        if (item.type == 'present' && item.is_active_for_user && !item.one_time) return null

        if (item.type == 'present' && !item.is_active_for_user) return buttonTitle
        if (offer.type == 'subscription' && offer.use_count === offer.max_count) {
            return (
                <TouchableOpacity style={styles.buttonStyleDisabed} disabled={true}>
                    <Text style={styles.showPromotionText}> {buttonTitle} </Text>
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={openQr}>
                <Text style={styles.showPromotionText}> {buttonTitle} </Text>
            </TouchableOpacity>
        )
    }

    const QuantitativePromotionView = () => {
        if (item.type === 'quantitative') {
            return (
                <Text style={styles.quantitativeStyle}>* Количество оставшихся акций: {offer?.max_count || 0}</Text>
            )
        }

        if (item.type === 'coupon' && item.is_quantitative_limit) {
            return (
                <Text style={styles.quantitativeStyle}>* Количество оставшихся акций: {offer?.max_count || 0}</Text>
            )
        }

        return null
    }

    let timer;
    const addToFavorite = (offer) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            item.favorite = !offer.favorite
            setOffer({ ...offer, favorite: !offer.favorite })
            PromotionStore.addToFavorite(offer.id, !offer.favorite)
        }, 200)
    }

    const openMap = bp => {
        navigation.navigate('BusinessPointOnMap', { data: bp, name: bp.name })
    }

    const btnText = () => {
        if (item.type === 'subscription' && !item.is_active_for_user) {
            return 'Активировать подписку'
        }

        if (item.type === 'subscription' && item.is_active_for_user) {
            return 'Воспользоваться подпиской'
        }

        if (item.type === 'discount' && !item.is_active_for_user) {
            return 'Активировать скидку'
        }

        if (item.type === 'coupon' && !item.is_active_for_user) {
            return 'Активировать купон'
        }

        if (item.type === 'discount' && item.is_active_for_user) {
            const currentStyle = item.one_time ? styles.activeDiscountTextBtn : styles.activeDiscountText
            return (
                <View style={currentStyle}>
                    <Text style={currentStyle}>{item.one_time ? 'Воспользоваться скидкой' : 'Скидка активна'}</Text>
                </View>
            )
        }

        if (item.type === 'coupon' && item.is_active_for_user) {
            return 'Воспользоваться купоном'
        }

        if (item.type === 'present' && item.is_active_for_user) {
            return (
                <View style={styles.activeDiscountTextBtn}>
                    <Text style={styles.activeDiscountTextBtn}>Воспользоваться подарком</Text>
                </View>
            )
        }

        if (item.type === 'present' && !item.is_active_for_user) {
            return (
                <View style={styles.activeDiscountText}>
                    <Text style={styles.activeDiscountText}>Вы уже использовали подарок</Text>
                </View>
            )
        }

        return 'Воспользоваться акцией'
    }

    const AdditionalInfo = () => {
        if (item.type === 'subscription' && item.is_active_for_user && item.reset_after_days && item.days_to_reset) {
            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>Действует до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'
                    })}</Text>
                </View>
            )
        }

        if (item.type === 'accumulative' && item.reset_after_days && item.days_to_reset && item.use_count > 0) {
            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>Действует до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'
                    })}</Text>
                </View>
            )
        }

        if (item.type === 'discount' &&
                item.is_active_for_user &&
                item.reset_after_days &&
                item.days_to_reset) {

            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАША СКИДКА АКТИВНА</Text>
                    <Text style={styles.timeToText}>Действует до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'
                    })}</Text>
                </View>
            )
        }

        if (item.type === 'discount' && item.is_active_for_user) {
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАША СКИДКА АКТИВНА</Text>
                </View>
            )
        }

        if (item.type === 'coupon' &&
                item.is_active_for_user &&
                item.reset_after_days &&
                item.days_to_reset) {

            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАШ КУПОН АКТИВЕН</Text>
                    <Text style={styles.timeToText}>Действует до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'
                    })}</Text>
                </View>
            )
        }

        if (item.type === 'coupon' && item.is_active_for_user) {
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАШ КУПОН АКТИВЕН</Text>
                </View>
            )
        }

        if (item.type === 'present' && item.is_active_for_user && item.reset_after_days) {
            const date = new Date(item.start_offer_time);
            date.setDate(date.getDate() + item.days_to_reset);
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАШ ПОДАРОК АКТИВЕН</Text>
                    <Text style={styles.timeToText}>Действует до: {date.toLocaleString('Ru', {
                        hour: 'numeric',
                        minute: 'numeric',
                        year: 'numeric',
                        month: "long",
                        day: 'numeric'
                    })}</Text>
                </View>
            )
        }

        if (item.type === 'present' && item.is_active_for_user) {
            return (
                <View style={styles.button}>
                    <Text style={styles.timeToText}>ВАШ ПОДАРОК АКТИВЕН</Text>
                </View>
            )
        }

        return null
    }

    const OpenLink = () => {
        if (offer.link?.trim()) {
            return (
                <TouchableWithoutFeedback onPress={() => {openLinkHandler()}}>
                    <View style={styles.linkBody}>
                        <Image source={require('../../../assets/web.png')} style={styles.imageLink} />
                        <Text style={styles.titleLink}>Перейти по сслыке</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        return null
    };

    const openLinkHandler = async () => {
        try {
            await Linking.openURL(offer.link)
        } catch (e) {
            console.log('openLinkHandler')
        }
    }

    const ShowImg = () => {
        if (item?.business_points && item?.business_points[0] ) {
            return <Image
                source={{ uri: `${FILE_URL}${item?.business_points[0]?.img}.${item?.business_points[0]?.img_ext}` }}
                style={styles.avatar}
                cachePolicy="disk"
            />
        }
        return null
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image
                    source={{ uri: `${FILE_URL}${item.img}.${item.img_ext}` }}
                    style={styles.imageContainer}
                    cachePolicy="disk"
                    placeholder={{ blurhash: BLURHASH }}
                    transition={500}
                    contentFit="cover"
                />
                <View style={styles.headerContainerView}>
                    <View style={styles.headerView}>
                        <ShowImg />
                        <Text style={styles.headerText}>{item.name}</Text>
                    </View>
                    {/* <TouchableWithoutFeedback onPress={() => { addToFavorite(offer) }}>
                        <View style={styles.touch}>
                            <Image source={offer.favorite ? require('../../../assets/saveSelected.png') : require('../../../assets/save.png')} />
                        </View>
                    </TouchableWithoutFeedback> */}
                </View>
                <Text style={styles.descriptionText}>Описание акции:</Text>
                <Text style={styles.contentText}>{item.description}</Text>
                <Text style={styles.contentLink}>Перейти по ссылке</Text>
                <OpenLink style={styles.contentLink}/>
                <View style={styles.button}>
                    <ButtonView buttonTitle={btnText()} />
                </View>
                <AdditionalInfo />
                <View style={styles.circle}>
                    <AccumulativePromotionView />
                    <AccumulativeBonusView />
                    <QuantitativePromotionView />
                    <SubscriptionPromotionView />
                </View>
                <Text style={styles.addressTitle}>Акция доступна по адресу:</Text>
                {item.business_points?.sort((a, b) => {
                    return b?.address.localeCompare(a?.address)
                }).map(bp => {
                    return (
                        <TouchableWithoutFeedback key={bp.id} style={styles.addressList} onPress={() => { openMap(bp) }}>
                            <View style={styles.addressList} key={bp.id}>
                                <Image style={styles.mapIcon} source={require('../../../assets/mapIcon.png')} />
                                <Text style={styles.address}>{bp.name}: {bp.address}</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
    activeDiscountTextBtn: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff',
        fontWeight: '700',
    },
    timeToText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#ece164',
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
        marginBottom: 10,
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
        marginBottom: 10,
        marginTop: 10
    },
    addressList: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        gap: 3,
        marginBottom: 15
    },
    address: {
        fontSize: 14,
        color: '#0EA47A',
        paddingHorizontal: 10,
        textDecorationLine: 'underline',
        opacity: 0.9,
    },
    mapIcon: {
        height: 27,
        width: 27,
        tintColor: '#0EA47A',
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
        height: 45,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyleDisabed: {
        height: 40,
        borderRadius: 8,
        backgroundColor: 'grey',
        opacity: 0.5,
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
    titleLink: {
        fontSize: 16,
        color: '#0EA47A',
        opacity: 0.8,
        textDecorationLine: 'underline'
    },
    imageLink: {
        tintColor: '#0EA47A',
        width: 20,
        height: 20,
        borderRadius: 5
    },
    linkBody: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
    }
})