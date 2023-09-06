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

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
    const discovery = AuthSession.useAutoDiscovery('https://demo.identityserver.io');
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "431628664212-giaeh0eb4u6ptkmc2nahsa0mpbcobpab.apps.googleusercontent.com", 
        redirectUri: "https://auth.expo.io/@kristina_gyk/youoffer",
        androidClientId: "431628664212-ncgb1pcdupvjm1o2h9ahqm55birluvsh.apps.googleusercontent.com",
        iosClientId: "834107509512-4ml4fiue0sovdee82fuj67900vglpsdc.apps.googleusercontent.com",  
        scopes: ['profile', 'email'], discovery});

    const openSettings = async () => {
        navigation.navigate('CreateUserScreen')
    }

    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
            accessToken && fetchUserInfo();
            openSettings()
        }
        console.log("response: ", response);
      }, [response, accessToken]);

     async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${(accessToken)}`
            }
        })
        const userInfo = await response.json();
        console.log('3333333', userInfo)
        setUser(userInfo)
     }

    const handleAppleSignIn = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL, AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
            });
            // Handle the credential (e.g., send it to your server for authentication)
            // openSettings()
            console.log(credential);
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
                // Handle user cancellation
            } else {
                // Handle other errors
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logo.png')} style={styles.imageStyle} />
            <Text style={styles.textStyle}>Регистрация</Text>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={5}
                style={styles.button}
                onPress={handleAppleSignIn} />
            <TouchableHighlight style={styles.googleButton} color={'black'} title="Sign In with Google" onPress={() => promptAsync({ useProxy: true })}>
                <View style={styles.containerForGoogleButton}>
                    <Image source={require('../../../assets/google.png')} style={styles.googleImage} />
                    <Text style={styles.buttonText}>Sign In with Google</Text>
                </View>
            </TouchableHighlight>
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