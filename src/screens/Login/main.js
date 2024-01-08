import React, { useState } from 'react'
import { Keyboard } from 'react-native'
import { StyleSheet, Text, View, Image, TouchableHighlight, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import AuthStore from '../../stores/auth'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, API_URL, FILE_URL } from '../../services/constants'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import ValidateStore from '../../stores/validate'
import { VALIDATE_RULES } from '../../services/validate'
import * as Sentry from 'sentry-expo';

WebBrowser.maybeCompleteAuthSession();

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

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Errors = {
        "password is invalid": "Неверный пароль!",
        "email is invalid": "Пользователя с таким email не существует!",
        "body/email must match format \"email\"": "Неверный формат email!"
    }

    const signIn = async () => {
        const response = await AuthStore.loginByEmail(email, password)
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
            openSettings()
        }
    }

    const signUp = async () => {
        navigation.navigate('Registration')
    }

    function resetValidation(key) {
        validateStroe.resetValidationByKey(key)
    }

    function changeBorder(key) {
        return validateStroe.schema[key].isValid ? styles.validInput : styles.invalidInput;
    }

    GoogleSignin.configure({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        forceConsentPrompt: true,
    });

    const googleSignin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            await AuthStore.loginByGoogle(userInfo.user);
            openSettings()
        } catch (error) {
            console.log(error)
            Sentry.Native.captureException(error, (scope) => {
                scope.setTransactionName('LoginScreen:googleSignin');
                return scope;
            });
        }
    }

    const openSettings = () => {
        navigation.navigate('CreateUserScreen')
    }

    const handleAppleSignIn = async () => {
        try {
            const userInfo = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL, AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
            });
            await AuthStore.loginByApple(userInfo)
            openSettings()
        } catch (error) {
            Sentry.Native.captureException(error, (scope) => {
                scope.setTransactionName('LoginScreen:handleAppleSignIn');
                return scope;
            });
        }
    };

    const GoogleBtn = () => {
        return (
            <TouchableHighlight style={styles.googleButton} color={'black'} title="Sign In with Google" onPress={() => { googleSignin() }}>
                <View style={styles.containerForGoogleButton}>
                    <Image source={require('../../../assets/google.png')} style={styles.googleImage} />
                    <Text style={styles.buttonText}>Вход с Google</Text>
                </View>
            </TouchableHighlight>
        )
    }

    const AppleBtn = () => {
        if (Platform.OS === 'android') return null
        return (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={styles.button}
                onPress={handleAppleSignIn} />
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../../assets/logoOnly.png')} style={styles.imageStyle} />
                <Text style={styles.title}>Все акции</Text>
                </View>
                <View style={styles.signUpContainer}>
                    <TextInput style={[styles.codeInputStyle, changeBorder('email')]}
                        onChangeText={(v) => { setEmail(v), resetValidation('email') }}
                        value={email}
                        keyboardType='default'
                        placeholder="Email"
                        maxLength={20}
                        placeholderTextColor={'#474A51'} />
                    <TextInput style={[styles.codeInputStyle, changeBorder('password')]}
                        onChangeText={(v) => { setPassword(v), resetValidation('password') }}
                        value={password}
                        keyboardType='default'
                        placeholder="Пароль"
                        maxLength={10}
                        placeholderTextColor={'#474A51'} />
                    <TouchableOpacity
                        style={[styles.buttonStyle]}
                        onPress={signIn}>
                        <Text style={styles.enterButtonText}>Вход</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <AppleBtn />
                    <GoogleBtn />
                </View>
                <TouchableOpacity
                        onPress={signUp}>
                        <Text style={styles.signUpButtonText}>Зарегистрироваться</Text>
                    </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 210,
        height: 220,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 30
    },
    googleImage: {
        width: 13,
        height: 13,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 40,
        gap: 10
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: (Platform.OS == 'android') ? 95 : 45,
        gap: 15
    },
    signUpContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
        paddingTop: 30,
        gap: 35,
    },
    textStyle: {
        color: 'white',
        fontSize: 35,
    },
    button: {
        width: 180,
        height: 40,
    },
    googleButton: {
        backgroundColor: '#293133',
        width: 150,
        height: 38,
        borderRadius: 8
    },
    title: {
        color: '#0EA47A',
        fontSize: 23,
        fontWeight: '400',
        marginTop: -50
    },
    buttonText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '400',
        paddingLeft: 7
    },
    containerForGoogleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        paddingVertical: 9,
        borderRadius: 8,
        backgroundColor: '#0EA47A',
        alignItems: 'center',
    },
    enterButtonText: {
        fontSize: 19,
        color: '#fff'
    },
    signUpButtonText: {
        fontSize: 15,
        fontWeight: '500',
        letterSpacing: 0.4,
        paddingBottom: 20,
        color: '#0EA47A',
        textDecorationLine: 'underline',
    },
})