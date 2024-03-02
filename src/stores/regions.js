import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
import * as Sentry from 'sentry-expo';

class RegionStore {
    list = []
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    get optionsList() {
        return this.list.map(item => ({
            id: item.id,
            lable: item.name,
            value: item.id
        }))
    }

    async getRegions() {
        let status =  REQUEST_STATUS.success
        this.loading = true
        try {
            const resp = await api.get(`/api/v1/region/list`)
            this.list = resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            Sentry.Native.captureException(e, (scope) => {
                scope.setTransactionName('RegionStore:getRegions');
                return scope;
            });
        }
        this.loading = false
        return status;
    }
}

export default new RegionStore()