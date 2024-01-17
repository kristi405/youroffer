import React from "react";
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Keyboard } from 'react-native';
import ValidateStore from '../../stores/validate'
import { VALIDATE_RULES } from '../../services/validate'
import AuthStore from '../../stores/auth'
import { REQUEST_STATUS } from '../../services/constants'
import UserStore from '../../stores/user'
import { observer } from "mobx-react-lite"
import dayjs from 'dayjs'

const validateStroe = new ValidateStore({
    name: {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    },
    surname: {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    },
    bdate: {
        isValid: true,
        rules: [VALIDATE_RULES.required, VALIDATE_RULES.date]
    },
    email: {
        isValid: true,
        rules: [VALIDATE_RULES.required, VALIDATE_RULES.email]
    }
})

export const EditScreen = observer(({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [bdate, setBirsday] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            init()
        }, [])
    );

    const init = () => {
        validateStroe.resetValidation()
        setTimeout(async () => {
            let user = await UserStore.getUser()
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setBirsday(user?.bdate ? dayjs(user?.bdate).format('DD.MM.YYYY') : '')
        }, 300)
    }

    const pressHandler = async () => {
        const data = {
            name,
            surname,
            bdate,
            email,
            password
        }

        if (!validateStroe.validate(data)) return;

        const status = await AuthStore.updateUser(data)
        if (status === REQUEST_STATUS.success) {
            Alert.alert(
                '', 'Данные успешно сохранены',
                [
                    {
                        text: 'Закрыть',
                        style: 'cancel',
                    },

                ],
                { cancelable: true }
            )
            init()
        } else {
            Alert.alert(
                '', 'Пользователь с таким Email уже существует',
                [
                    {
                        text: 'Закрыть',
                        style: 'cancel',
                    },

                ],
                { cancelable: true }
            )
            init()
        }
    }

    function changeBorder(key) {
        return validateStroe.schema[key].isValid ? styles.validInput : styles.invalidInput;
    }

    function resetValidation(key) {
        validateStroe.resetValidationByKey(key)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.createUserBlock}>
                    <TextInput style={[styles.codeInputStyle, changeBorder('name')]}
                        onChangeText={(v) => {setName(v); resetValidation('name')}}
                        value={name}
                        keyboardType='default'
                        placeholder="Имя"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('surname')]}
                        onChangeText={(v) => {setSurname(v); resetValidation('surname')}}
                        value={surname}
                        keyboardType='default'
                        placeholder="Фамилия"
                        maxLength={30}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('bdate')]}
                        onChangeText={(v) => {setBirsday(v); resetValidation('bdate')}}
                        value={bdate}
                        keyboardType='number-pad'
                        placeholder="Дата Рождения"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('email')]}
                        onChangeText={(v) => {setEmail(v); resetValidation('email')}}
                        value={email}
                        keyboardType='email-address'
                        placeholder="e-mail"
                        maxLength={30}
                        placeholderTextColor={'#474A51'} />
                </View>
                <View style={styles.changePasswordBlock}>
                    <Text style={styles.changePasswordText}>Сменить пароль для входа</Text>
                    <TextInput style={styles.passwordInputStyle}
                        onChangeText={setPassword}
                        value={password}
                        keyboardType='default'
                        placeholder="Новый пароль"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                </View>
                <TouchableOpacity style={[styles.buttonStyle]} onPress={pressHandler}>
                    <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        paddingTop: 20
    },
    createUserBlock: {
        width: '90%',
        flexDirection: 'column',
        paddingBottom: 20
    },
    codeInputStyle: {
        color: 'white',
        margin: 5,
        width: '95%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    switcherStyle: {
        margin: 5,
        width: '90%',
        height: 40
    },
    buttonStyle: {
        width: '40%',
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    changePasswordBlock: {
        width: '95%',
        flexDirection: 'column',
        paddingBottom: 30,
        alignItems: 'center',
    },
    passwordInputStyle: {
        color: 'white',
        margin: 5,
        width: '90%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    changePasswordText: {
        fontSize: 16,
        color: '#0EA47A',
        paddingTop: 30,
        paddingBottom: 10,
        paddingRight: '25%'
    },
    validInput: {
        borderColor: 'gray',
    },
    invalidInput: {
        borderColor: 'red'
    },
})