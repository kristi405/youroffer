import React from "react"
import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import { Keyboard } from 'react-native'
import ValidateStore from '../../stores/validate'
import { VALIDATE_RULES } from '../../services/validate'
import { observer } from "mobx-react-lite"
import AuthStore from '../../stores/auth'

const validateStroe = new ValidateStore({
    email: {
        isValid: true,
        rules: [VALIDATE_RULES.email]
    },
    password: {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    }
})

export const Registration = observer(({ navigation }) => {
    const [email, setEmail] = useState('');
    const [repeatEmail, setRepeatEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const Errors = {
        "email exists": "Пользователь с таким email уже существует!",
        "body/email must match format \"email\"": "Неверный формат email!"
    }

    function changeBorder(key) {
        return validateStroe.schema[key].isValid ? styles.validInput : styles.invalidInput;
    }

    function resetValidation(key) {
        validateStroe.resetValidationByKey(key)
    }

    const signUp = async () => {
        const data = {
            email,
            password,
        }

        if (!validateStroe.validate(data)) return;

        if (email == repeatEmail, password == repeatPassword) {
            createUser()
        } else {
            Alert.alert('', "Email или пароль не совпадают!",
                [{
                    text: 'ОК',
                    style: 'cancel',
                },])
        }
    }

    const createUser = async () => {
        const response = await AuthStore.signUpByEmail(email, password)
        let isError = false
        let errorText = ''
        if (response.statusCode == 400) {
            isError = true
            errorText += `${Errors[response.message] || response.message} `
        }

        if (isError) {
            Alert.alert('', errorText,
                [{
                    text: 'ОК',
                    style: 'cancel',
                },])
        } else {
            navigation.navigate('CreateUserScreen')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Регистрация</Text>
                <View style={styles.createUserBlock}>
                    <TextInput style={[styles.codeInputStyle, changeBorder('email')]}
                        onChangeText={(v) => { setEmail(v), resetValidation('email') }}
                        value={email}
                        keyboardType='default'
                        placeholder="Email"
                        maxLength={40}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('email')]}
                        onChangeText={(v) => { setRepeatEmail(v), resetValidation('email') }}
                        value={repeatEmail}
                        keyboardType='default'
                        placeholder="Повторите email"
                        maxLength={40}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('password')]}
                        onChangeText={(v) => { setPassword(v), resetValidation('password') }}
                        value={password}
                        keyboardType='default'
                        placeholder="Пароль"
                        maxLength={10}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('password')]}
                        onChangeText={(v) => { setRepeatPassword(v), resetValidation('password') }}
                        value={repeatPassword}
                        keyboardType='default'
                        placeholder="Повторите пароль"
                        maxLength={10}
                        placeholderTextColor={'#474A51'} />
                    <TouchableOpacity
                        style={[styles.buttonStyle]}
                        onPress={signUp}>
                        <Text style={styles.buttonText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingTop: 10,
    },
    textStyle: {
        color: 'white',
        fontSize: 30,
        paddingBottom: 20,
        paddingTop: 30
    },
    createUserBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        paddingTop: 20,
        gap: 35,
    },
    codeInputStyle: {
        color: 'white',
        margin: -10,
        width: '90%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    buttonStyle: {
        width: '90%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff'
    },
    validInput: {
        borderColor: 'gray',
    },
    invalidInput: {
        borderColor: 'red'
    },
})