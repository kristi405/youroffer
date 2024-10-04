import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { observer } from "mobx-react-lite"
import Barcode from 'react-native-barcode-svg';

export const BonusCardView = observer(({ navigation }) => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [code, setCode] = useState('')

    const save = async () => {
       console.log(number)
       setCode(number)
    }

    const BarcodeView = () => {
        // if (code.length == 0) return null
        return (
            <View style={styles.barcodeView}>
                <Text><Barcode value='2364581274871263987' format="CODE128" height={75}/></Text>
                <Text style={styles.code}>2364581274871263987</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/discontCard.png')} style={styles.imageContainer} />
            <BarcodeView/>
            <TouchableWithoutFeedback onPress={save}>
                <View style={styles.deleteButton}>
                    <Text style={styles.title}>Удалить</Text>
                </View>
            </TouchableWithoutFeedback>
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
})