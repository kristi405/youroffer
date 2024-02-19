import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import OfferUsingStore from "../../stores/offerUsing"
import { useFocusEffect } from '@react-navigation/native';
import UserStore from '../../stores/user'

export const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState('waiting');
    const [scanned, setScanned] = useState(false);
    const [isManagerView, setIsManagerView] = useState(false);
    const [idManager, setIdManager] = useState(null);
    const [managers, setManagers] = useState();
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
        Alert.alert('', `Применить акцию "${jsonData.name_offer}"?`,
            [
                {
                    text: 'Отменить',
                    onPress: () => setScanned(false),
                    style: 'cancel',
                },
                {
                    text: 'Применить',
                    onPress: () => { useOffer(jsonData.id_offer, jsonData.id_user, idManager) },
                },
            ],
            { cancelable: false }
        )
    };

    const useOffer = async (id_offer, id_user, id_manager) => {
        const response = await OfferUsingStore.useOffer(id_offer, id_user, id_manager)
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
        } else {
            Alert.alert('', "Акция успешно применена!",
                [
                    {
                        text: 'ОК',
                        onPress: () => setScanned(false),
                        style: 'cancel',
                    },
                ])
        }
    }

    const managersView = () => {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.navigationTitle}>Выберите менеджера:</Text>
                    <FlatList
                        style={styles.flatList}
                        data={managers}
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
});