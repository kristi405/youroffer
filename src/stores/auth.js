import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { getLocation } from '../services/geo'
import { REQUEST_STATUS } from '../services/constants'
import { setSession, setUser, getUser, cleanAuthData } from '../services/auth'
// import * as Sentry from 'sentry-expo';
import Constants from "expo-constants"

class AuthStore {
    phone = null
    user = null
    session = null

    constructor() {
        makeAutoObservable(this)
    }

    async getPin(phone) {
        let status =  REQUEST_STATUS.success
        try {
            this.phone = phone
            const resp = await api.post('api/v1/auth/login/phone', {phone})
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:getPin');
            //     return scope;
            // });
        }

        return status
    }

    async setPin(pin) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/phone/code', {phone: this.phone, pin})
            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:setPin');
            //     return scope;
            // });
        }
        return status
    }

    async signUpByEmail(email, password) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/create', {
                password: password,
                email: email
            })

            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:signUpByEmail');
            //     return scope;
            // });
            return e.response.data
        }
        return status
    }

    async loginByEmail(email, password) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/email', {
                password: password,
                email: email
            })

            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:loginByEmail');
            //     return scope;
            // });
            return e.response.data
        }
        return status
    }

    async loginByGoogle(user) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/google', {
                google_id: user.id,
                name: user.givenName,
                surname: user.familyName,
                google_locale: user.locale,
                google_img: user.photo,
                email: user.email
            })

            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:loginByGoogle');
            //     return scope;
            // });
        }
        return status
    }

    async loginByApple(user) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/apple', {
                apple_id: user.user,
                name: user.fullName?.givenName || undefined,
                surname: user.fullName?.familyName || undefined,
                email: user.email ||  undefined,
            })
            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:loginByApple');
            //     return scope;
            // });
        }
        return status
    }

    async updateUser(user) {
        let status =  REQUEST_STATUS.success
        try {
            const userToUpdate = await userToApi(user)
            const resp = await api.patch('/api/v1/user/update', userToUpdate)
            await setUser(resp.data)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:updateUser');
            //     return scope;
            // });
        }
        return status
    }

    async updateCoord() {
        let status =  REQUEST_STATUS.success
        try {
            const location = await getLocation()
            if (!location) return
            await api.patch('/api/v1/user/coordinates', {
                lng: location.longitude,
                lat: location.latitude
            })
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:updateCoord');
            //     return scope;
            // });
        }
        return status
    }

    async clearUser() {
        try {
            await cleanAuthData()
        } catch (e) {
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:clearUser');
            //     return scope;
            // });
        }
    }

    async createUser() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/create/client')
            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('AuthStore:createUser');
            //     return scope;
            // });
            return e.response.data
        }
        return status
    }

    async checkVersion({ os, osVersion, model }) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get(`/api/v1/version/check`, {
                params: {
                    version: Constants.easConfig.version,
                    osVersion,
                    os,
                    model: model
                }
            })
            return resp.data;
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('UserStore:getUser');
            //     return scope;
            // });
        }
    }
}

async function userToApi(user) {
    const id = (await getUser()).id
    if (user.bdate) {
        const [day, month, year] = user.bdate.split('.');
        user.bdate = `${year}-${month}-${day}`
    }
    return {
        ...user,
        id
    }
}

export default new AuthStore()
