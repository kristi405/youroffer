import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from 'sentry-expo';

const CAHCE = {}
const keyPrefix = '$$MYOFFER$$:'

export const setUser = async (user) => {
    try {
        const key = keyPrefix + 'USER'
        CAHCE[key] = user
        await AsyncStorage.setItem(key, JSON.stringify(user));
    } catch (error) {
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:setUser');
            return scope;
        });
    }
}

export const getUser = async () => {
    try {
        const key = keyPrefix + 'USER'
        if (CAHCE[key]) return CAHCE[key];
        const user = await AsyncStorage.getItem(key);
        CAHCE[key] = JSON.parse(user)
        return CAHCE[key]
    } catch (error) {
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:getUser');
            return scope;
        });
    }
}

export const setSession = async (session) => {
    try {
        const key = keyPrefix + 'SESSION'
        CAHCE[key] = session
        await AsyncStorage.setItem(key, JSON.stringify(session));
    } catch (error) {
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:setSession');
            return scope;
        });
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
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:getSession');
            return scope;
        });
    }
}

export const getToken = async () => {
    try {
       return (await getSession())?.token
    } catch (error) {
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:getToken');
            return scope;
        });
    }
}

export const cleanAuthData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Cache cleared successfully');
    } catch (error) {
        Sentry.Native.captureException(error, (scope) => {
            scope.setTransactionName('service:auth:cleanAuthData');
            return scope;
        });
    }
}