import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
// import * as Sentry from 'sentry-expo';
import { setUser, cleanAuthData } from '../services/auth'

class UserStore {
    role;

    constructor() {
        makeAutoObservable(this)
    }

    async getUser() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get(`/api/v1/user/`)
            this.role = resp.data.role
            setUser(resp.data)
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('UserStore:getUser');
            //     return scope;
            // });
        }
    }

    async removeUser() {
        let status =  REQUEST_STATUS.success
        try {
            console.log('removeUser')
            const data = await api.delete(`/api/v1/user/remove`)
            await cleanAuthData();
            console.log('removeUser data', data)   
        } catch (e) {
            status =  REQUEST_STATUS.error
            await cleanAuthData();
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('UserStore:getUser');
            //     return scope;
            // });
        }
    }
}

export default new UserStore()