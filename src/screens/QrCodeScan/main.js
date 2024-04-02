import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert, FlatList, TouchableWithoutFeedback, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import OfferUsingStore from "../../stores/offerUsing"
import { useFocusEffect } from '@react-navigation/native';
import UserStore from '../../stores/user'
import Modal from "react-native-modal"

export const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState('waiting');
    const [scanned, setScanned] = useState(false);
    const [isManagerView, setIsManagerView] = useState(false);
    const [idManager, setIdManager] = useState(null);
    const [managers, setManagers] = useState();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [currentOfferType, setCurrentOfferType] = React.useState('')
    const [currentOfferName, setCurrentOfferName] = React.useState('')
    const [currentUserId, setCurrentUserId] = React.useState('')
    const [currentOfferId, setCurrentOfferId] = React.useState('')
    const [currentNumber, setCurrentNumber] = React.useState(1)
    const Errors = {
        "permission": "Текущий менеджер не может пробить данную акцию!",
        "type": "Данный тип акции не подходит для пробития сейчас это только тип default!",
        "offer_count": "Количество акций уже закончилось!",
        "user_count": "Пользователь уже использовал эту акцию!"
    }

    useFocusEffect(
        React.useCallback(() => {
            UserStore.getUser().then(user => {
                if (user?.managers?.length) {
                    setIsManagerView(true)
                    setManagers(user.managers)
                } else {
                    getCameraPermission()
                }
            })
        }, [])
    );

    getCameraPermission = async (manager) => {
        if (manager?.id_waiter) setIdManager(manager?.id_waiter);
        setIsManagerView(false);
        setScanned(false);
        setHasPermission('waiting');
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted' ? 'access' : 'noAccess');
    }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setScanned(false);
    //         setHasPermission('waiting');
    //         (async () => {
    //             const { status } = await BarCodeScanner.requestPermissionsAsync();
    //             setHasPermission(status === 'granted' ? 'access' : 'noAccess');
    //         })();
    //     });
    //     return unsubscribe;
    // }, [navigation])

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const jsonData = JSON.parse(data.trim())
        setIsModalVisible(true)
        setCurrentOfferName(jsonData.name_offer)
        setCurrentUserId(jsonData.id_user)
        setCurrentOfferId(jsonData.id_offer)
        setCurrentOfferType(jsonData.type)
    };

    const cancelAction = () => {
        setScanned(false)
        setIsModalVisible(false)
    }

    const plusOne = () => {
        setCurrentNumber(currentNumber + 1)
    }

    const minusOne = () => {
        if (currentNumber > 1) {
            setCurrentNumber(currentNumber - 1)
        }
    }

    const useOffer = async (id_offer, id_user, id_manager, count) => {
        const response = await OfferUsingStore.useOffer(id_offer, id_user, id_manager, count)
        if (!response?.length) {
            Alert.alert('', "Произошла ошибка",
                [
                    {
                        text: 'ОК',
                        onPress: () => setScanned(false),
                        style: 'cancel',
                    },
                ])
            return;
        }
        let isError = false
        let errorText = ''
        for (resp of response) {
            if (resp.error) {
                isError = true
                errorText += `${Errors[resp.error] || resp.error} `
            }
        }

        if (isError) {
            Alert.alert('', errorText);
            setScanned(false)
            setCurrentNumber(1)
        } else {
            Alert.alert('', "Акция успешно применена!",
                [
                    {
                        text: 'ОК',
                        onPress: () => {
                            setScanned(false)
                            setCurrentNumber(1)
                        },
                        style: 'cancel',
                    },
                ])
        }
        setIsModalVisible(false)
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

    const countView = () => {

    }

    const scanView = () => {
        if (hasPermission === 'waiting') {
            return <View style={styles.waiting}><Text style={styles.waitingText}>Ожидание доступа к камере.</Text></View>;
        }
        if (hasPermission === 'noAccess') {
            return <View style={styles.waiting}><Text style={styles.waitingText}>Вы запретили приложению доступ к камере.</Text></View>;
        }

        return (
            <View style={styles.containerCamera}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <Modal isVisible={isModalVisible}
                    animationType="slide"
                    transparent={true}>
                    <View style={styles.modalView}>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>Применить акцию "{currentOfferName}"?</Text>
                        <View style={styles.countStyle}>
                            <TouchableWithoutFeedback onPress={minusOne}>
                                <Image source={require('../../../assets/minus.png')} />
                            </TouchableWithoutFeedback>
                            <Text style={styles.countText}>{currentNumber}</Text>
                            <TouchableWithoutFeedback onPress={plusOne}>
                                <Image source={require('../../../assets/plus.png')} />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.buttonStyle}>
                            <Button onPress={cancelAction}
                                title="Отмена"
                                color='red' />
                            <Button onPress={() => { useOffer(currentOfferId, currentUserId, idManager, currentNumber) }}
                                title="Применить"
                                color='#0EA47A' />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    const ModalView = () => {
        <Modal isVisible={isModalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalView}>
                <Text style={{ color: 'red', fontSize: 20 }}>I am the modal content!</Text>
            </View>
        </Modal>
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
        justifyContent: 'flex-end',
        paddingBottom: 50,
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