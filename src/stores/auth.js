import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { getLocation } from '../services/geo'
import { REQUEST_STATUS, SEX, SEX_TO_STIRNG } from '../services/constants'
import { setSession, setUser, getUser, cleanAuthData } from '../services/auth'

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
            console.log('1',resp.data)
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e.message)
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
            console.log(e.message)
        }
        return status
    }

    async loginByGoogle(user) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/auth/login/google', {
                google_id: user.id,
                name: user.given_name,
                surname: user.family_name,
                google_locale: user.locale,
                google_img: user.picture,
                email: user.email,
                google_verified_email: user.verified_email
            })
            setSession(resp.data.session)
            await setUser(resp.data.user)
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e.message)
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
            console.log(e.message)
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
            console.log(e)
            status =  REQUEST_STATUS.error
            console.log(e.message)
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
            console.log(e.message)
        }
        return status
    }

    async clearUser() {
        try {
            await cleanAuthData()
        } catch (e) {
            console.log(e.message)
        }
    }
}

async function userToApi(user) {
    const id = (await getUser()).id
    const sex = SEX_TO_STIRNG[user.sex]
    if (user.bdate) {
        const [day, month, year] = user.bdate.split('.');
        user.bdate = `${year}-${month}-${day}`
    }

    return {
        ...user,
        sex,
        id
    }
}

async function userFromApi(user) {
    const id = (await getUser()).id
    const [day, month, year] = user.bdate.split('.');

    return {
        ...user,
        id,
        sex: SEX[user.sex]
    }
}

export default new AuthStore()
