import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Linking, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import ContactUsStore from '../../stores/contactUs'
import { useFocusEffect } from '@react-navigation/native';
import ValidateStore from '../../stores/validate'
import { VALIDATE_RULES } from '../../services/validate'
import { observer } from "mobx-react-lite"
import { getUser } from '../../services/auth'

const validateStroe = new ValidateStore({
    name: {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    },
    contact: {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    },
    text:  {
        isValid: true,
        rules: [VALIDATE_RULES.required]
    }
})

export const ForBusiness = observer(({ navigation }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [text, setText] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web, setWeb] = useState('');
    const [instagram, setInstagram] = useState('');
    const [textForClients, setTextForClients] = useState('');
    const [presentation, setPresentation] = useState('');


    useFocusEffect(
        React.useCallback(() => {
            getUser().then((user) => {
                setPhone(user?.settings?.phone)
                setWeb(user?.settings?.web)
                setInstagram(user?.settings?.instagram)
                setTextForClients(user?.settings?.text_for_clients)
                setPresentation(user?.settings?.presentation)
                setEmail(user?.settings?.email)
            })
            validateStroe.resetValidation()
        }, [])
    );

    const handleScreenPress = () => {
        Keyboard.dismiss();
    };

    const sendRequest = async () => {
        const data = { name, text, contact };
        if (!validateStroe.validate(data)) return;

        ContactUsStore.sendMail(name, text, contact)
        Alert.alert(
            '', 'Спасибо, мы свяжемся с вами в ближайшее время',
            [
                {
                    text: 'Закрыть',
                    onPress: () => { setName('');  setContact(''); setText(''); },
                    style: 'cancel',
                },

            ],
            { cancelable: false }
        )
    };

    function changeBorder(key) {
        return validateStroe.schema[key].isValid ? styles.validInput : styles.invalidInput;
    }

    function resetValidation(key) {
        validateStroe.resetValidationByKey(key)
    }

    const OpenInstagramButton = () => {
        // https://www.instagram.com/myoffersapp/
        return (
            <TouchableWithoutFeedback onPress={() => {openInstagram()}}>
                <View style={styles.header}>
                    <Image source={require('../../../assets/instagram3.png')} style={styles.instagramImg} />
                    <Text style={styles.titleInstagram}>Напишите нам в Instagram</Text>
                </View>
            </TouchableWithoutFeedback>
        )

    };

    const openInstagram = async () => {
        tempInstagram = instagram.trim();
        tempInstagram = tempInstagram.split('?')[0];
        tempInstagram = tempInstagram.replace("https://", '')
        tempInstagram = tempInstagram.replace("www.", '')
        tempInstagram = tempInstagram.replace("instagram.com/", '')
        tempInstagram = tempInstagram.replace("/", '')
        if (tempInstagram) {
            try {
                await Linking.openURL(`instagram://user?username=${tempInstagram}`)
            } catch (e) {
                await Linking.openURL(instagram)
            }
        }
    };

    const openPresentation = async() => {
        await Linking.openURL(presentation)
    }

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titleText}>{textForClients}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => {openPresentation()}}>
                    <View style={styles.header}>
                        <Text style={styles.titleLink}>Ознакомьтесь с нашей презентацией</Text>
                    </View>
                </TouchableWithoutFeedback>
                <OpenInstagramButton/>
                <View style={styles.header}>
                    <Image source={require('../../../assets/phone.png')} style={styles.image} />
                    <Text style={styles.title}>mob: { phone }</Text>
                </View>
                <View style={styles.header}>
                    <Image source={require('../../../assets/mail.png')} style={styles.image} />
                    <Text style={styles.title}>e-mail: {email}</Text>
                </View>

                <View style={styles.requestBlock}>
                    <Text style={styles.requestTitle}>Оставить заявку: </Text>
                    <TextInput style={[styles.codeInputStyle, changeBorder('name')]}
                        onChangeText={(val) => { setName(val); resetValidation('name'); }}
                        value={name}
                        keyboardType='default'
                        placeholder="Ваше имя"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('contact')]}
                        onChangeText={(val) => { setContact(val); resetValidation('contact'); }}
                        value={contact}
                        keyboardType='default'
                        placeholder="Ваши контактные данные"
                        maxLength={50}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.messageInputStyle, changeBorder('text')]}
                        onChangeText={(val) => { setText(val); resetValidation('text'); }}
                        value={text}
                        keyboardType='default'
                        placeholder="Оставьте нам сообщение и мы свяжемся с Вами в ближайшее время"
                        multiline
                        maxLength={150}
                        placeholderTextColor={'#474A51'} />
                    <TouchableOpacity style={[styles.buttonStyle]} onPress={sendRequest}>
                        <Text style={styles.buttonText}>Отправить</Text>
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
        paddingTop: 20,
        gap: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 10,
        gap: 10
    },
    title: {
        fontSize: 14,
        color: 'white',
        opacity: 0.7
    },
    titleText: {
        fontSize: 16,
        color: 'white',
        opacity: 0.7
    },
    titleLink: {
        fontSize: 16,
        color: '#0EA47A',
        opacity: 0.8,
        textDecorationLine: 'underline'
    },
    titleInstagram: {
        fontSize: 14,
        color: '#0EA47A',
        opacity: 0.8,
        textDecorationLine: 'underline'
    },
    requestTitle: {
        fontSize: 20,
        color: 'white',
        opacity: 0.9,
        paddingBottom: 10
    },
    image: {
        tintColor: '#0EA47A',
        width: 20,
        height: 20,
        borderRadius: 5
    },
    instagramImg:  {
        tintColor: '#0EA47A',
        width: 25,
        opacity: 0.7,
        height: 25,
        borderRadius: 5,
        marginLeft: -5,
    },
    codeInputStyle: {
        color: 'white',
        width: '85%',
        height: 40,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    messageInputStyle: {
        color: 'white',
        width: '85%',
        height: 140,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 8,
    },
    requestBlock: {
        width: '100%',
        gap: 10,
        flexDirection: 'column',
        paddingTop: 25,
        alignItems: 'center'
    },
    buttonStyle: {
        width: '40%',
        paddingVertical: 10,
        margin: 20,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
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