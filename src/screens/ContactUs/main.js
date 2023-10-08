import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import ContactUsStore from '../../stores/contactUs'

export const ContactUs = ({ navigation }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [text, setText] = useState('');

    const handleScreenPress = () => {
        Keyboard.dismiss();
    };

    const sendRequest = async (props) => {
        await ContactUsStore.sendMail(name, text, contact)
    };

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../../assets/phone.png')} style={styles.image} />
                    <Text style={styles.title}>тел. +375 (29) 550-71-51</Text>
                </View>
                <View style={styles.header}>
                    <Image source={require('../../../assets/mail.png')} style={styles.image} />
                    <Text style={styles.title}>email: myOffer@gmail.com</Text>
                </View>
                <View style={styles.header}>
                    <Image source={require('../../../assets/web.png')} style={styles.image} />
                    <Text style={styles.title}>сайт: </Text>
                </View>

                <View style={styles.requestBlock}>
                    <Text style={styles.requestTitle}>Оставить заявку: </Text>
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setName}
                        value={name}
                        keyboardType='default'
                        placeholder="Ваше имя"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={styles.codeInputStyle}
                        onChangeText={setContact}
                        value={contact}
                        keyboardType='default'
                        placeholder="Ваши контактные данные"
                        maxLength={50}
                        placeholderTextColor={'#474A51'} />
                        <TextInput style={styles.messageInputStyle}
                        onChangeText={setText}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
        gap: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 20,
        gap: 10
    },
    title: {
        fontSize: 14,
        color: 'white',
        opacity: 0.7
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
        paddingTop: 65,
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
})