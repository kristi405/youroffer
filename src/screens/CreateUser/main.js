import React from "react"
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import { Keyboard } from 'react-native'
import SwitchSelector from "react-native-switch-selector"
import AuthStore from '../../stores/auth'
import ValidateStore from '../../stores/validate'
import { getUser } from '../../services/auth'
import { REQUEST_STATUS, SEX_TO_NUMBER, SEX_TO_STIRNG } from '../../services/constants'
import { MaskedTextInput } from "react-native-mask-text"
import { VALIDATE_RULES } from '../../services/validate'
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
        rules: [VALIDATE_RULES.email]
    }
})

const SEX_OPTIONS = [
    { label: "Мужской", value: 1 },
    { label: "Женский", value: 2 }
];

export const CreateUserScreen = observer(({ navigation }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [bdate, setBirsday] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState(1);

    const pressHandler = async () => {
        const data =  {
            name,
            surname,
            bdate,
            email,
            sex
        }

        if (!validateStroe.validate(data)) return;

        const status = await AuthStore.updateUser(data)
        if (status === REQUEST_STATUS.success) {
            navigation.navigate('CouponScreen')
        }
    }

    useEffect(() => {
        getUser().then((user) => {
            setName(user?.name)
            setSurname(user?.surname)
            setEmail(user?.email)
            setBirsday(user?.bdate ? dayjs(user?.bdate).format('DD.MM.YYYY'): '')
            setSex(user?.sex)
        })
    }, []);

    function changeBorder(key) {
        return validateStroe.schema[key].isValid ? styles.validInput : styles.invalidInput;
    }

    function resetValidation(key) {
        validateStroe.resetValidationByKey(key)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Заполните ваши данные</Text>
                <View style={styles.createUserBlock}>
                    <TextInput style={[styles.codeInputStyle, changeBorder('name')]}
                        onChangeText={(v) => {setName(v); resetValidation('name')}}
                        value={name}
                        keyboardType='default'
                        placeholder="Имя"
                        maxLength={20}
                        placeholderTextColor={'grey'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('surname')]}
                        onChangeText={(v) => {setSurname(v); resetValidation('surname')}}
                        value={surname}
                        keyboardType='default'
                        placeholder="Фамилия"
                        maxLength={30}
                        placeholderTextColor={'grey'} />
                    <SwitchSelector style={styles.switcherStyle}
                        initial={sex}
                        onPress={(value) => { console.log('0000', value); setSex(value) }}
                        backgroundColor='black'
                        textColor='gray'
                        selectedColor='black'
                        buttonColor='gray'
                        borderColor='gray'
                        borderRadius={8}
                        hasPadding
                        options={SEX_OPTIONS} />
                    <MaskedTextInput style={[styles.codeInputStyle, changeBorder('bdate')]}
                        mask="99.99.9999"
                        type="date"
                        options={{
                            dateFormat: 'DD.MM.YYYY',
                        }}
                        onChangeText={(v) => {setBirsday(v); resetValidation('bdate')}}
                        value={bdate}
                        keyboardType='number-pad'
                        placeholder="Дата Рождения (дд.мм.гггг)"
                        placeholderTextColor={'grey'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('email')]}
                        onChangeText={(v) => {setEmail(v); resetValidation('email')}}
                        value={email}
                        keyboardType='email-address'
                        placeholder="e-mail"
                        maxLength={30}
                        placeholderTextColor={'grey'} />
                </View>
                <TouchableOpacity
                    style={[styles.buttonStyle]}
                    onPress={pressHandler}
                >
                    <Text style={styles.buttonText}>Вход</Text>
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
    textStyle: {
        color: 'white',
        fontSize: 30,
        paddingBottom: 20,
        paddingTop: 30
    },
    createUserBlock: {
        width: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    codeInputStyle: {
        color: 'white',
        margin: 5,
        width: '90%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    codeInputError: {
        borderColor: 'red',
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
        backgroundColor: '#57A167',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    validInput: {
        borderColor: 'gray',
    },
    invalidInput: {
        borderColor: 'red'
    },
})