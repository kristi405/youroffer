import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
// import * as Sentry from 'sentry-expo';

class BonusCardStore {
    list = []
    userList = []
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    get activeList() {
        return this.list.filter(v => v.active)
    }

    async getList() {
        let status =  REQUEST_STATUS.success
        this.loading = true
        try {
            const resp = await api.get(`/api/v1/bonus_card/list`)
            this.list = resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('RegionStore:getRegions');
            //     return scope;
            // });
        }
        this.loading = false
        return status;
    }

    async getUserList() {
        let status =  REQUEST_STATUS.success
        this.loading = true
        try {
            const resp = await api.get(`/api/v1/bonus_card/user_list`)
            this.userList = resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('RegionStore:getRegions');
            //     return scope;
            // });
        }
        this.loading = false
        return status;
    }


    async saveCard({name, code, id}) {
        let status =  REQUEST_STATUS.success
        try {
            await api.post(`/api/v1/bonus_card/add`, {
                id, name, code,
            })                 
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('UserStore:saveRegion');
            //     return scope;
            // });
        }

        return status;
    }

    async removeCard(id) {
        let status =  REQUEST_STATUS.success
        try {
            await api.delete(`/api/v1/bonus_card/remove/${id}`)                 
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('UserStore:saveRegion');
            //     return scope;
            // });
        }

        return status;
    }
}

export default new BonusCardStore()