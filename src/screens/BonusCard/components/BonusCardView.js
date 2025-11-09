import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import BonusCardStore from '../../../stores/bonusCard'
import { BarcodeCreatorView, BarcodeFormat } from "react-native-barcode-creator";
import { FILE_URL } from '../../../services/constants'
import { setNeedToReloadBonusCardsLisr } from '../../../services/globals'
// import * as Brightness from 'expo-brightness';

export const BonusCardView = ({ navigation, route }) => {
    const [item, setItem] = useState(route?.params?.data)

    // const setBrightness = async () => {
    //     try {
    //         await Brightness.setBrightnessAsync(1)
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    // setBrightness();


    const remove = async () => {
        Alert.alert('Удаление',
        "Вы действительно хотите удалить бонусную карту?",
        [
            {
                text: 'Удалить',
                onPress: () => {
                    BonusCardStore.removeCard(item.id)
                    setNeedToReloadBonusCardsLisr(true)
                    navigation.goBack()
                },
            },
            {
                text: 'Отмена',
                style: 'cancel',
            },
        ]
        )
    }

    const BarcodeView = () => {
        // if (code.length == 0) return null
        return (
            <View style={styles.barcodeView}>
                <Text>
                    <BarcodeCreatorView
                        value={item.code}
                        background={'#FFFFFF'}
                        style={styles.barcode}
                        foregroundColor={'#000000'}
                        format={BarcodeFormat.CODE128}
                    />
                </Text>
                <Text style={styles.code}>{item.code}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image source={
                item?.img
                ? { uri: `${FILE_URL}${item?.img}.${item?.img_ext}`}
                : require('../../../../assets/discontCard.png')}
                style={styles.imageContainer}
            />
            <BarcodeView/>
            <TouchableWithoutFeedback onPress={remove}>
                <View style={styles.deleteButton}>
                    <Text style={styles.title}>Удалить</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 30,
    },
    imageContainer: {
        width: '95%',
        height: 200,
        borderRadius: 10,
        backgroundColor: 'red',
    },
    barcodeView: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '95%',
        padding: 5,
        paddingTop: 10,
        gap: 5,
        alignItems: 'center',
    },
    code: {
        fontSize: 17,
        color: 'black',
        fontWeight: '400',
    },
    deleteButton: {
        backgroundColor: '#1A1A1A',
        height: 50,
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'red',
        fontWeight: '500',
    },
    barcode: {
        width: 300,
        height: 80,
    },
})