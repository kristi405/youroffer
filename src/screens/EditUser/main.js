import React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';
import { getUser } from '../../services/auth'
import ValidateStore from '../../stores/validate'
import { VALIDATE_RULES } from '../../services/validate'
import AuthStore from '../../stores/auth'
import { REQUEST_STATUS } from '../../services/constants'
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
        rules: [VALIDATE_RULES.email]
    }
})

export const EditScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [bdate, setBirsday] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        getUser().then((user) => {
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setBirsday(user?.bdate ? dayjs(user?.bdate).format('DD.MM.YYYY'): '')
            setRole(user.role)
        })
    }, []);

    const pressHandler = async () => {
        const data =  {
            name,
            surname,
            bdate,
            email,
            login,
            password
        }
        
        if (!validateStroe.validate(data)) return;
        
        const status = await AuthStore.updateUser(data)
        if (status === REQUEST_STATUS.success) {
            navigation.goBack()
        }
    }

    const ChangePasswordView = () => {
        if (role == 'manager') return null
        return (
            <View style={styles.changePasswordBlock}>
            <Text style={styles.changePasswordText}>Сменить данные для входа</Text>
            <TextInput style={styles.passwordInputStyle}
                onChangeText={setLogin}
                value={login}
                keyboardType='default'
                placeholder="Новый логин"
                maxLength={20}
                placeholderTextColor={'grey'} />
            <TextInput style={styles.passwordInputStyle}
                onChangeText={setPassword}
                value={password}
                keyboardType='default'
                placeholder="Новый пароль"
                maxLength={20}
                placeholderTextColor={'grey'} />
        </View>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.createUserBlock}>
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setName}
                        value={name}
                        keyboardType='default'
                        placeholder="Имя"
                        maxLength={20}
                        placeholderTextColor={'grey'} />
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setSurname}
                        value={surname}
                        keyboardType='default'
                        placeholder="Фамилия"
                        maxLength={30}
                        placeholderTextColor={'grey'} />
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setBirsday}
                        value={bdate}
                        keyboardType='number-pad'
                        placeholder="Дата Рождения"
                        maxLength={20}
                        placeholderTextColor={'grey'} />
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        placeholder="e-mail"
                        maxLength={30}
                        placeholderTextColor={'grey'} />
                </View>
               <ChangePasswordView/>
                <TouchableOpacity style={[styles.buttonStyle]} onPress={pressHandler}>
                    <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    )
}

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
        paddingBottom: 10,
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
        paddingRight:'25%'
    }
})