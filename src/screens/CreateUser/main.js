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
import { validate, VALIDATE_RULES } from '../../services/validate'

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

export const CreateUserScreen = ({ navigation }) => {
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
            sex: SEX_TO_STIRNG[sex]
        }
        const test = validateStroe.validate(data)

        console.log('CreateUserScreen', test, validateStroe.schema)


        // const status = await AuthStore.updateUser(data)

        // if (status === REQUEST_STATUS.success) {
        //     navigation.navigate('CouponScreen')
        // }
    }

    useEffect(() => {
        getUser().then((user) => {
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setBirsday(user.bdate)
            setSex(SEX_TO_NUMBER[user.sex] ? SEX_TO_NUMBER[user.sex] : 1)
        })
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>Заполните ваши данные</Text>
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
                    <SwitchSelector style={styles.switcherStyle}
                        initial={0}
                        onPress={(value) => { setSex(value) }}
                        backgroundColor='black'
                        textColor='gray'
                        selectedColor='black'
                        buttonColor='gray'
                        borderColor='gray'
                        borderRadius={8}
                        hasPadding
                        options={SEX_OPTIONS} />
                    <MaskedTextInput style={styles.codeInputStyle}
                        mask="99.99.9999"
                        type="date"
                        options={{
                            dateFormat: 'DD.MM.YYYY',
                        }}
                        onChangeText={setBirsday}
                        value={bdate}
                        keyboardType='number-pad'
                        placeholder="Дата Рождения (дд.мм.гггг)"
                        placeholderTextColor={'grey'} />
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        placeholder="e-mail"
                        maxLength={30}
                        placeholderTextColor={'grey'} />
                </View>
                <TouchableOpacity
                    style={[styles.buttonStyle, {opacity: name != null && surname != null && email != null && bdate != null  ? 1 : 0.3}]}
                    // disabled={name != null && surname != null && email != null && bdate != null ? false : true}
                    onPress={pressHandler}
                >
                    <Text style={styles.buttonText}>Вход</Text>
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
        opacity: 0.3,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
})