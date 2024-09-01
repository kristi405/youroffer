import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, Image, Alert, FlatList, TouchableWithoutFeedback, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import OfferUsingStore from "../../stores/offerUsing"
import { useFocusEffect } from '@react-navigation/native';
import UserStore from '../../stores/user'
import Modal from "react-native-modal"
import { setCamerAccess, getCamerAccess } from "../../services/auth"
import { ModalPromotion } from "./components/ModalPromotion";
import { ModalBonuses } from "./components/ModalBonuses";
import { Camera } from "expo-camera";
import { Audio } from 'expo-av';

export const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState('waiting');
    const [scanned, setScanned] = useState(false);
    const [isManagerView, setIsManagerView] = useState(false);
    const [idManager, setIdManager] = useState(null);
    const [managers, setManagers] = useState();
    const [offers, setOffers] = useState([]);
    const [isModalSelect, setIsModalSelect] = React.useState(false);
    const [isModalPromo, setIsModalPromo] = React.useState(false);
    const [isModalBonuses, setIsModalBonuses] = React.useState(false);
    const [isModalDefault, setIsModalDefault] = React.useState(false);
    const [isActiveForUser, setIsActiveForUser] = React.useState(false);
    const [currentOfferName, setCurrentOfferName] = React.useState('')
    const [currentUserId, setCurrentUserId] = React.useState('')
    const [currentOfferId, setCurrentOfferId] = React.useState('')
    const [currentOfferType, setCurrentOfferType] = React.useState('')
    const [maxCount, setMaxCount] = React.useState(0)
    const [bonuses, setBonuses] = React.useState(0)
    const [useCount, setUseCount] = React.useState(0)

    const Errors = {
        "permission": "Вы не можете использовать данную акцию!",
        "type": "Данный тип акции не подходит для использования сейчас это только тип default!",
        "offer_count": "Количество акций уже закончилось!",
        "user_count": "Пользователь уже использовал эту акцию!",
        "subscription_is_already_active": "Подписка уже активна, пользователь должен назжать кнопку 'Воспользоваться подпиской'",
        "discount_is_already_active": "Скидка уже активна",
    }

    useFocusEffect(
        React.useCallback(() => {
            UserStore.getUser().then(user => {
                if (user?.offers?.length) {
                    setOffers(user?.offers)
                }
                if (user?.managers?.length) {
                    setIsManagerView(true)
                    setManagers(user.managers)
                } else {
                    getCameraPermission()
                }
            })
            setScanned(false)
        }, [])
    );

    getCameraPermission = async (manager) => {
        if (manager?.id_waiter) setIdManager(manager?.id_waiter);
        setIsManagerView(false);
        setScanned(false);
        setHasPermission('waiting');
        const currentStatus = await getCamerAccess()
        if (currentStatus === 'granted') {
            setHasPermission('access');
            return;
        }
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCamerAccess(status);
        setHasPermission(status === 'granted' ? 'access' : 'noAccess');
    }

    const cancelAction = () => {
        closeAllModal()
        setTimeout(() => {
            setScanned(false)
        }, 600)
    }

    const closeAllModal = () => {
        setIsModalBonuses(false)
        setIsModalPromo(false)
        setIsModalSelect(false)
        setIsModalDefault(false)
    }

    let isUsing  = false;
    const onPressHandler = () => {
        isUsing = false;
        setScanned(false)
    }


    const useOffer = async (count) => {
        if (isUsing) return;
        isUsing = true;
        const response = await OfferUsingStore.useOffer({
            number_client: currentUserId,
            id_offer: currentOfferId,
            id_waiter: idManager,
            count
        })
        closeAllModal()
        if (!response?.length) {
            Alert.alert('', "Произошла ошибка",
                [
                    {
                        text: 'ОК',
                        onPress: onPressHandler,
                        style: 'cancel',
                    },
                ])
            return;
        }

        let isError = false
        let errorText = 'Ошибка: '
        for (resp of response) {
            if (resp.error) {
                isError = true
                errorText += `${Errors[resp.error] || resp.error} `
            }
        }

        if (isError) {
            Alert.alert('', errorText,
                [
                    {
                        text: 'ОК',
                        onPress: onPressHandler,
                        style: 'cancel',
                    },
                ]
            );
        } else {
            Alert.alert('', "Готово! Вы успешно отсканировали QR код",
                [
                    {
                        text: 'ОК',
                        onPress: onPressHandler,
                        style: 'cancel',
                    },
                ]
            )
        }
    }

    const useBonuses = async (bonuses) => {
        if (isUsing) return;
        isUsing = true;
        const response = await OfferUsingStore.useBonuses({
            number_client: currentUserId,
            id_offer: currentOfferId,
            id_waiter: idManager,
            bonuses
        })
        closeAllModal()
        if (!response || response.error) {
            Alert.alert('', "Произошла ошибка",
                [
                    {
                        text: 'ОК',
                        onPress: onPressHandler,
                        style: 'cancel',
                    },
                ])
            return;
        }

        Alert.alert('', "Бонусы успешно списаны!",
        [
            {
                text: 'ОК',
                onPress: onPressHandler,
                style: 'cancel',
            },
        ])

    }

    const managersView = () => {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.navigationTitle}>Выберите менеджера:</Text>
                    <FlatList
                        style={styles.flatList}
                        data={managers}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        numColumns={1}
                        keyExtractor={(item) => item.id_waiter}
                        renderItem={({ item }) =>
                            <TouchableWithoutFeedback onPress={() => { getCameraPermission(item) }}>
                                <View style={styles.item}>
                                    <View style={styles.header}>
                                        <Image source={require('../../../assets/editProfile.png')} style={styles.image} />
                                        <Text style={styles.title}>{item.manager_name}</Text>
                                    </View>
                                    <Image source={require('../../../assets/arrow.png')} style={styles.icon} />
                                </View>
                            </TouchableWithoutFeedback>
                        }>
                    </FlatList>
                </View>
            </View>
        )
    }

    const ModalSelect = () => {
        return (<Modal isVisible={isModalSelect}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalView}>
                <View style={styles.buttonStyleSelect}>
                    <Button onPress={() => { setIsModalPromo(true); setIsModalSelect(false)}}
                        title="Применить акцию"
                        color='#0EA47A' />
                    <Button onPress={() => { setIsModalBonuses(true); setIsModalSelect(false)}}
                        title="Списать бонусы"
                        disabled={!bonuses}
                        color='#0EA47A' />
                     <Button onPress={cancelAction}
                        title="Отмена"
                        color='red' />
                </View>
            </View>
        </Modal>)
    }

    const modalDefaultTitle = () => {
        if (isActiveForUser && currentOfferType === 'discount') {
            return 'Применить скидку'
        }

        if (currentOfferType === 'discount') {
            return 'Активировать скидку'
        }

        if (currentOfferType === 'subscription') {
            return 'Активировать подписку'
        }

        if (currentOfferType === 'present') {
            return 'Использовать подарок'
        }

        return 'Применить акцию'
    }

    const modalDefaultText = () => {
        return `"${currentOfferName}"`
    }

    const ModalDefault = () => {
        return (<Modal isVisible={isModalDefault}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalView}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '600' }}>{ modalDefaultTitle() }</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{ modalDefaultText() }</Text>
                <View style={styles.buttonStyle}>
                    <Button onPress={cancelAction}
                        title="Отмена"
                        color='red' />
                    <Button onPress={() => { useOffer() }}
                        title="Применить"
                        color='#0EA47A' />
                </View>
            </View>
        </Modal>)
    }

    const showAccessModal = () => {
        Alert.alert('Нет доступа',
            "Проверьте акцию, которую вам показывает клиент. Если это акция вашей компании - то перейдите на любую другую вкладку и вернитесь обратно на экран сканирования.",
            [
                {
                    text: 'ОК',
                    onPress: () => {
                        setTimeout(() => {
                            setScanned(false)
                        }, 300)
                    },
                    style: 'cancel',
                },
            ]
        )
    }

    async function playSound() {
        try {
            await Audio.Sound.createAsync(
                require('../../../assets/scan.mp3'),
                { shouldPlay: true }
            );
        } catch (e) {
            console.log(e)
        }

    }

    let isCanScan = true;
    const handleBarCodeScanned = async ({ type, data }) => {
        if(!isCanScan) return;
        isCanScan = false;
        setScanned(true);
        await playSound()
        let qrData;
        let offer;
        try {
            // 0 - user_number
            // 1 - offer_number
            // 2 - is_active_for_user
            // 3 - bonusess
            // 4 - use_count
            qrData = JSON.parse(data.trim())
            offer = offers.find(o => o.number == qrData[1])
        } catch (e) {
            showAccessModal();
            return;
        }

        if (!offer || !qrData) {
            showAccessModal();
            return;
        }

        setCurrentOfferName(offer.name)
        setCurrentUserId(qrData[0]) // не id а number
        setCurrentOfferId(offer.id)
        setBonuses(qrData[3])
        setCurrentOfferType(offer.type)
        setMaxCount(offer.max_count)
        setIsActiveForUser(qrData[2])
        setUseCount(qrData[4] || 0)
        if (offer.type === 'accumulative') {
            setTimeout(() => {
                setIsModalSelect(true)
            }, 300)
        }  else if (offer.type === 'subscription' && qrData[2]) {
            setTimeout(() => {
                setIsModalPromo(true)
            }, 300)
        } else {
            setTimeout(() => {
                setIsModalDefault(true)
            }, 300)
        }

        setTimeout(() => {
            isCanScan = true;
        }, 2000)
    };

    const scanView = () => {
        if (hasPermission === 'waiting') {
            return <View style={styles.waiting}><Text style={styles.waitingText}>Ожидание доступа к камере.</Text></View>;
        }
        if (hasPermission === 'noAccess') {
            return <View style={styles.waiting}><Text style={styles.waitingText}>Вы запретили приложению доступ к камере.</Text></View>;
        }

        return (
            <View style={styles.containerCamera}>
                <Camera
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                        BarcodeSize: {
                            height: 180,
                            width: 180
                        }
                    }}
                    onBarCodeScanned={(e) => {
                        if (!scanned) {
                            handleBarCodeScanned(e)
                        }
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
                <ModalSelect/>
                <ModalPromotion
                    isVisible={isModalPromo}
                    useOffer={useOffer}
                    currentOfferId={currentOfferId}
                    currentUserId={currentUserId}
                    idManager={idManager}
                    currentOfferName={currentOfferName}
                    currentOfferType={currentOfferType}
                    maxCount={maxCount}
                    useCount={useCount}
                    cancelAction={cancelAction}
                />
                <ModalBonuses
                    isVisible={isModalBonuses}
                    useBonuses={useBonuses}
                    currentOfferId={currentOfferId}
                    currentUserId={currentUserId}
                    idManager={idManager}
                    currentOfferName={currentOfferName}
                    cancelAction={cancelAction}
                    bonuses={bonuses}
                />
                <ModalDefault/>
            </View>
        );
    }

    const view = () => {
        if (isManagerView) {
            return managersView()
        } else {
            return scanView()
        }
    }

    return view()
}

const styles = StyleSheet.create({
    containerCamera: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        color: '#FFF'
    },
    waiting: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        backgroundColor: '#000000',
    },
    waitingText: {
        color: '#FFF',
    },
    loader: {

    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    navigationTitle: {
        fontSize: 25,
        color: '#0EA47A',
        fontWeight: '700',
        paddingLeft: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 19,
        color: 'white',
        opacity: 0.5
    },
    flatList: {
        width: '100%',
        flexGrow: 0,
        backgroundColor: 'black',
        paddingTop: 15,
        marginBottom: 50
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    logout: {
        width: 23,
        height: 23,
        borderRadius: 5,
        tintColor: 'white',
        backgroundColor: '#0EA47A'
    },
    item: {
        flexDirection: 'row',
        height: 55,
        margin: 5,
        backgroundColor: '#1A1A1A',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    buttonStyle: {
        flexDirection: 'row',
        paddingTop: 25,
        gap: 20,
    },
    buttonStyleSelect: {
        flexDirection: 'column',
        paddingTop: 25,
        gap: 20,
    },
    countText: {
        color: 'black',
        fontSize: 26,
        fontWeight: '600',
        paddingTop: 5,
        paddingLeft: 4
    },
    countStyle: {
        flexDirection: 'row',
        paddingTop: 20,
        gap: 15,
    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 15,
        paddingBottom: 25,
        paddingHorizontal: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});