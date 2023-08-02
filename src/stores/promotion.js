import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'

class PromotionStore {
    list = []

    constructor() {
        makeAutoObservable(this)
    }

    async getList() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/offer/list')
            this.list = resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e.message)
        }
        return status
    }
}

export default new PromotionStore()
