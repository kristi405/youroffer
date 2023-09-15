import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'

class PromotionStore {
    list = []
    favoriteList = []
    page = 1

    constructor() {
        makeAutoObservable(this)
    }

    async getList() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/offer/list', {
                params: {
                  page: this.page
                }
              })
            this.list = [...this.list, ...resp.data]
            this.page += 1;
        } catch (e) {
            status =  REQUEST_STATUS.errorr
        }
        return status
    }

    async getFavoriteList() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/offer/list', {
                params: {
                  page: this.page,
                  favorite: true
                }
              })
            this.favoriteList = resp.data
            this.page += 1;
        } catch (e) {
            status =  REQUEST_STATUS.error
        }
        return status
    }

    async addToFavorite(id, favorite) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.patch('/api/v1/offer/favorite', {id, favorite})
        } catch (e) {
            status =  REQUEST_STATUS.error
        }
        return status
    }
}

export default new PromotionStore()
