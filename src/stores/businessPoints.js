import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'

class BusinessPointsStore {
    businessPoint = []
    favoriteBusinessPoint = []
    page = 1
    
    async getBusinessPoints() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/business_point/client/list', {
                params: {
                  page: this.page
                }
              })
            this.businessPoint = [...this.businessPoint, ...resp.data]
            this.page += 1;
        } catch (e) {
            status =  REQUEST_STATUS.error
        }
        return status
    }

    async getFavoriteBusinessPoints() {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/business_point/client/list', {
                params: {
                  page: this.page,
                  favorite: true
                }
              })
            this.favoriteBusinessPoint = resp.data
            this.page += 1;
        } catch (e) {
            status =  REQUEST_STATUS.error
        }
        return status
    }

    async addToFavorite(id, favorite) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.patch('/api/v1/business_point/favorite', {id, favorite})
        } catch (e) {
            status =  REQUEST_STATUS.error
        }
        return status
    }
}

export default new BusinessPointsStore()