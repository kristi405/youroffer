import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Sentry from 'sentry-expo';

const CAHCE = {}
const keyPrefix = '$$MYOFFER$$:'

export const setCamerAccess = async (status) => {
    try {
        const key = keyPrefix + 'CAMERA'
        CAHCE[key] = status
        await AsyncStorage.setItem(key, status);
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:setCamerAccess');
        //     return scope;
        // });
    }
}

export const getCamerAccess = async () => {
    try {
        const key = keyPrefix + 'CAMERA'
        if (CAHCE[key]) return CAHCE[key];
        const status = await AsyncStorage.getItem(key);
        CAHCE[key] = status
        return CAHCE[key]
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getCamerAccess');
        //     return scope;
        // });
    }
}

export const setUser = async (user) => {
    try {
        const key = keyPrefix + 'USER'
        CAHCE[key] = user
        await AsyncStorage.setItem(key, JSON.stringify(user));
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:setUser');
        //     return scope;
        // });
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
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getUser');
        //     return scope;
        // });
    }
}

export const setSession = async (session) => {
    try {
        const key = keyPrefix + 'SESSION'
        CAHCE[key] = session
        await AsyncStorage.setItem(key, JSON.stringify(session));
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:setSession');
        //     return scope;
        // });
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
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getSession');
        //     return scope;
        // });
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

export const setRegion = async (region) => {
    try {
        const key = keyPrefix + 'REGION'
        CAHCE[key] = region
        await AsyncStorage.setItem(key, JSON.stringify(region));
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:setRegion');
        //     return scope;
        // });
    }
}

export const getRegion = async () => {
    try {
        const key = keyPrefix + 'REGION'
        if (CAHCE[key]) return CAHCE[key];
        const region = await AsyncStorage.getItem(key);
        CAHCE[key] = JSON.parse(region)
        return CAHCE[key]
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getRegion');
        //     return scope;
        // });
    }
}

export const getTopic = async () => {
    try {
        const key = keyPrefix + 'TOPIC'
        if (CAHCE[key]) return CAHCE[key];
        const topic = await AsyncStorage.getItem(key);
        CAHCE[key] = topic
        return CAHCE[key]
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getTopic');
        //     return scope;
        // });
    }
}

export const setTopic = async (topic) => {
    try {
        const key = keyPrefix + 'TOPIC'
        CAHCE[key] = topic
        await AsyncStorage.setItem(key, topic);
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:getTopic');
        //     return scope;
        // });
    }
}


export const cleanAuthData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Cache cleared successfully');
    } catch (error) {
        // Sentry.Native.captureException(error, (scope) => {
        //     scope.setTransactionName('service:auth:cleanAuthData');
        //     return scope;
        // });
    }
}