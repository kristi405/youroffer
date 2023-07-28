import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import AuthStore from '../../stores/auth'
import {  REQUEST_STATUS } from '../../services/constants'

export const LoginScreen = ({ navigation }) => {

    const [number, setNumbet] = React.useState('');

    const setNumber = async() => {
        // const status = await AuthStore.getPin(number)
        console.log(number)
        // if (status ===  REQUEST_STATUS.success) {
            navigation.navigate('CodeScreen')
        // }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}>
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>Регистрация</Text>
                <View style={styles.phoneBlock}>
                    <TextInput style={styles.codeTextInputStyle}
                        placeholder='+375'
                        placeholderTextColor={'white'}
                        editable={false} />
                    <TextInput style={styles.phoneTextInputStyle}
                        onChangeText={setNumbet}
                        value={number}
                        keyboardType='numeric'
                        placeholder="Номер телефона"
                        maxLength={9}
                        placeholderTextColor={'grey'} />
                </View>
                <TouchableOpacity
                    style={[styles.buttonStyle, { opacity: number.length == 9 ? 1 : 0.3 }]}
                    disabled={number.length == 9 ? false : true}
                    onPress={setNumber}
                >
                    <Text style={styles.buttonText}>Вход</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 120,
        height: 120,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 80
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        paddingBottom: 10,
        paddingTop: 30
    },
    phoneBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    codeTextInputStyle: {
        color: 'white',
        width: '20%',
        height: 50,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 8,
        margin: 15,
        textAlign: 'center',
    },
    phoneTextInputStyle: {
        color: 'white',
        width: '60%',
        height: 50,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'white',
        borderRadius: 8
    },
    buttonStyle: {
        width: '40%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#57A167',
        opacity: 0.3,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
})