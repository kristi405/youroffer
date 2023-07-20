import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS, SEX } from '../services/constants'
import MainStore from './main'
import { setSession, setUser, getUser } from '../services/auth'
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens'

const sleep = ms => new Promise(r => setTimeout(r, ms));

class AuthStore {
    phone = null
    user = null
    session = null

    constructor() {
        makeAutoObservable(this)
    }

    async getPin(phone) {
        /// MainStore.loaderStart()
        let status =  REQUEST_STATUS.success
        try {
            this.phone = phone
            const resp = await api.post('api/v1/auth/login/phone', {phone})
            console.log('1',resp.data)
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e.message)
        }
        /// MainStore.loaderStop()
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
            console.log(e)
        }
        return status
    }

    async updateUser(user) {
        let status =  REQUEST_STATUS.success
        try {
            const userToUpdate = await userToApi(user)
            console.log('eeeeee', userToUpdate)
            const resp = await api.patch('/api/v1/user/update', userToUpdate)
            await setUser(resp.data)
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e)
        }
        return status
    }
}

async function userToApi(user) {
    const id = (await getUser()).id
    return {
        ...user,
        id
    }
}

async function userFromApi(user) {
    const id = (await getUser()).id
    return {
        ...user,
        id,
        sex: SEX[user.sex]
    }
}

export default new AuthStore()
