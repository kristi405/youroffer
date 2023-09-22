import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
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
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const jsonData = JSON.parse(data.trim())
        const offer = await OfferUsingStore.getOfferById(jsonData.id_offer)
        Alert.alert('', `Применить акцию "${offer.name}"?`,
        [
            {
              text: 'Отменить',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Применить',
              onPress: () => {useOffer(jsonData.id_offer, jsonData.id_user)},
            },
          ],
          { cancelable: false }
        )
    };

    const useOffer = async (id_offer, id_user) => {
        const response = await OfferUsingStore.useOffer(id_offer, id_user)
        if (response.error) {
            Alert.alert('', Errors[`${response.error}`]);
        } else {
            Alert.alert('', "Акция успешно применена!");
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
        paddingBottom: 50
    },
});