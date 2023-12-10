import React from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';
import AuthStore from '../../stores/auth'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '../../services/constants'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
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
            <TouchableHighlight style={styles.googleButton} color={'black'} title="Sign In with Google" onPress={() => {googleSignin()}}>
                <View style={styles.containerForGoogleButton}>
                    <Image source={require('../../../assets/google.png')} style={styles.googleImage} />
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </View>
            </TouchableHighlight>
        )
    }

    const AppleBtn = () => {
        if (Platform.OS === 'android') return null
        return (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={5}
                style={styles.button}
                onPress={handleAppleSignIn} />
        )
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.imageStyle} />
            <View style={styles.buttonContainer}>
                <Text style={styles.textStyle}></Text>
                <AppleBtn />
                <GoogleBtn />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 230,
        height: 240,
        tintColor: '#0EA47A'
    },
    googleImage: {
        width: 12,
        height: 12,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 120,
        gap: 20
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingTop: 100,
        gap: 20
    },
    textStyle: {
        color: 'white',
        fontSize: 35,
    },
    button: {
        width: 200,
        height: 40,
    },
    googleButton: {
        backgroundColor: 'white',
        width: 200,
        height: 40,
        borderRadius: 5
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 5
    },
    containerForGoogleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})