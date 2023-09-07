import React, { useEffect, useState }  from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableHighlight } from 'react-native';
import { Keyboard } from 'react-native';
import AuthStore from '../../stores/auth'
import { REQUEST_STATUS } from '../../services/constants'
import { getSession } from '../../services/auth'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "431628664212-giaeh0eb4u6ptkmc2nahsa0mpbcobpab.apps.googleusercontent.com",
        redirectUri: "https://auth.expo.io/@kristina_gyk/youoffer",
        androidClientId: "431628664212-ncgb1pcdupvjm1o2h9ahqm55birluvsh.apps.googleusercontent.com",
        iosClientId: "834107509512-4ml4fiue0sovdee82fuj67900vglpsdc.apps.googleusercontent.com",
        scopes: ['profile', 'email']});

    const openSettings = async () => {
        navigation.navigate('CreateUserScreen')
    }

    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
        }
      }, [response, accessToken]);

     async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${(accessToken)}`
            }
        })
        const userInfo = await response.json();
        await AuthStore.loginByGoogle(userInfo)
        openSettings()
     }

    const handleAppleSignIn = async () => {
        try {
            const userInfo = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL, AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
            });
            await AuthStore.loginByApple(userInfo)
            openSettings()
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
            } else {
            }
        }
    };

    const GoogleBtn = () => {
        return (
            <TouchableHighlight style={styles.googleButton} color={'black'} title="Sign In with Google" onPress={() => promptAsync({ useProxy: true })}>
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
            <Text style={styles.textStyle}>Вход</Text>
            <AppleBtn/>
            <GoogleBtn/>
        </View>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 120,
        height: 120,
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
        paddingTop: 80,
        gap: 20
    },
    textStyle: {
        color: 'white',
        fontSize: 40,
        paddingBottom: 200,
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