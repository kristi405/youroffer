import AsyncStorage from '@react-native-async-storage/async-storage';

const CAHCE = {}
const keyPrefix = '$$MYOFFER$$:'

export const setUser = async (user) => {
    try {
        const key = keyPrefix + 'USER'
        CAHCE[key] = user
        await AsyncStorage.setItem(key, JSON.stringify(user));
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async () => {
    try {
        const key = keyPrefix + 'USER'
        if (CAHCE[key]) return CAHCE[key];
        const user = await AsyncStorage.getItem(key);
        CAHCE[key] = JSON.parse(user)
        console.log('33333333333333', user)
        return CAHCE[key]
    } catch (error) {
        console.log(error)
    }
}

export const setSession = async (session) => {
    try {
        const key = keyPrefix + 'SESSION'
        CAHCE[key] = session
        await AsyncStorage.setItem(key, JSON.stringify(session));
    } catch (error) {
        console.log(error)
    }
}

export const getSession = async () => {
    try {
        const key = keyPrefix + 'SESSION'
        if (CAHCE[key]) return CAHCE[key];
        const session = await AsyncStorage.getItem(key);
        CAHCE[key] = JSON.parse(session)
        return CAHCE[key]
    } catch (error) {
        console.log(error)
    }
}

export const getToken = async () => {
    try {
       return (await getSession()).token
    } catch (error) {
        console.log(error)
    }
}