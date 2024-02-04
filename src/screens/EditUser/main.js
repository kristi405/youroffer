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
        rules: []
    },
    surname: {
        isValid: true,
        rules: []
    },
})

export const EditScreen = observer(({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    // const [bdate, setBirsday] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [user, setUser] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            init()
        }, [])
    );

    const init = () => {
        validateStroe.resetValidation()
        setTimeout(async () => {
            let user = await UserStore.getUser()
            setUser(user)
            setName(user.name)
            setSurname(user.surname)
            setLogin(user.login)
            // setBirsday(user?.bdate ? dayjs(user?.bdate).format('DD.MM.YYYY') : '')
        }, 300)
    }

    const pressHandler = async () => {
        const data = {
            name,
            surname,
            login,
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
                '', 'Данные не сохранены',
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

    // function ChangePassword({setPassword, setLogin}) {
    //     // if (user.role != 'admin') return null
    //     return (
    //         <View style={styles.changePasswordBlock}>
    //             <Text style={styles.changePasswordText}>Данные для входа в админ панель</Text>
    //             <Text style={styles.changePasswordTextInfo}>Для входа в админ панель создайте логин и пароль</Text>
    //             <Text style={styles.changePasswordTextInfo}>Если вы забыли пароль, можете создать новый</Text>
    //             <TextInput style={styles.passwordInputStyle}
    //                 onChangeText={setLogin}
    //                 value={login}
    //                 keyboardType='default'
    //                 placeholder="Логин"
    //                 maxLength={20}
    //                 placeholderTextColor={'#474A51'} />
    //             <TextInput style={styles.passwordInputStyle}
    //                 onChangeText={setPassword}
    //                 value={password}
    //                 keyboardType='default'
    //                 placeholder="Пароль"
    //                 maxLength={20}
    //                 placeholderTextColor={'#474A51'} />
    //         </View>
    //     )
    // }

    const rolesToSetPassword = ['admin', 'super_admin'];
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
                    {/* <TextInput style={[styles.codeInputStyle, changeBorder('bdate')]}
                        onChangeText={(v) => {setBirsday(v); resetValidation('bdate')}}
                        value={bdate}
                        keyboardType='number-pad'
                        placeholder="Дата Рождения"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} /> */}
                </View>
                {
                    rolesToSetPassword.includes(user.role) &&
                    <View style={styles.changePasswordBlock}>
                        <Text style={styles.changePasswordText}>Данные для входа в админ панель</Text>
                        <Text style={styles.changePasswordTextInfo}>Для входа в админ панель создайте логин и пароль</Text>
                        <Text style={styles.changePasswordTextInfo}>Если вы забыли пароль, можете создать новый</Text>
                        <TextInput style={styles.passwordInputStyle}
                            onChangeText={setLogin}
                            value={login}
                            keyboardType='default'
                            placeholder="Логин"
                            maxLength={20}
                            placeholderTextColor={'#474A51'} />
                        <TextInput style={styles.passwordInputStyle}
                            onChangeText={setPassword}
                            value={password}
                            keyboardType='default'
                            placeholder="Пароль"
                            maxLength={20}
                            placeholderTextColor={'#474A51'} />
                    </View>
                }
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
        textAlign: 'center',
        fontSize: 16,
        color: '#0EA47A',
        paddingTop: 30,
        paddingBottom: 5
    },
    changePasswordTextInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: '#0EA47A',
    },
    validInput: {
        borderColor: 'gray',
    },
    invalidInput: {
        borderColor: 'red'
    },
})