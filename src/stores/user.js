import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
import * as Sentry from 'sentry-expo';

class UserStore {
    role = []

    constructor() {
        makeAutoObservable(this)
    }

    async getUser() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get(`/api/v1/user/`)
            this.role = resp.data.role
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            Sentry.Native.captureException(e, (scope) => {
                scope.setTransactionName('UserStore:getUser');
                return scope;
            });
        }
    }
}

export default new UserStore()