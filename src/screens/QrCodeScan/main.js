import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import OfferUsingStore from "../../stores/offerUsing"

export const Scan = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const Errors = {
        "permission": "Текущий менеджер не может пробить данную акцию!",
        "type": "Данный тип акции не подходит для пробития сейчас это только тип default!",
        "offer_count": "Количество акций уже закончилось!",
        "user_count": "Пользователь уже использовал эту акцию!"
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setScanned(false);
            setHasPermission(false);
            (async () => {
                const { status } = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        });
        return unsubscribe;
    }, [navigation])

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
                    onPress: () => { useOffer(jsonData.id_offer, jsonData.id_user) },
                },
            ],
            { cancelable: false }
        )
    };

    const useOffer = async (id_offer, id_user) => {
        const response = await OfferUsingStore.useOffer(id_offer, id_user)
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

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
        backgroundColor: '#000000',
    },
});