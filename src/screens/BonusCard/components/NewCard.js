import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { observer } from "mobx-react-lite"
import Barcode from 'react-native-barcode-svg';
import { Keyboard } from 'react-native';

export const NewCard = observer(({ navigation }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [code, setCode] = useState('')

    const save = async () => {
        console.log(number)
        setCode(number)
    }

    const BarcodeView = () => {
        if (code.length == 0) return null
        return (
            <View style={styles.barcodeView}>
                <Text><Barcode value={code} format="CODE128" height={75}/></Text>
                <Text style={styles.code}>{code}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/discontCard.png')} style={styles.imageContainer} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.createUserBlock}>
                    <TextInput style={[styles.codeInputStyle]}
                        onChangeText={(v) => { setType(v) }}
                        value={type}
                        keyboardType='default'
                        placeholder="список"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle]}
                        onChangeText={(v) => { setName(v) }}
                        value={name}
                        keyboardType='default'
                        placeholder="Наименование"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle,]}
                        onChangeText={(v) => { setNumber(v) }}
                        value={number}
                        keyboardType='number-pad'
                        placeholder="Номер дисконтной карты"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={save}>
                <View style={styles.saveButton}>
                    <Text style={styles.title}>Сохранить</Text>
                </View>
            </TouchableWithoutFeedback>
            <BarcodeView />
        </View>
    )
})

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
    createUserBlock: {
        width: '95%',
        flexDirection: 'column',
        gap: 12,
    },
    codeInputStyle: {
        color: 'white',
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: '#0EA47A',
        height: 50,
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500',
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
})