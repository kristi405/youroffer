import { makeAutoObservable, runInAction } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
// import * as Sentry from 'sentry-expo';

// максимальное количесвто акций получаемых при одном запросе
const COUNT_PER_ONE_REQUEST = 10
class PromotionStore {
    list = []
    page = 1
    // флаг указывающий что мы получили все акции
    finishScroll = false
    isLoding = false
    isFavoriteBlock = false

    constructor() {
        makeAutoObservable(this)
    }

    resetLists() {
        runInAction(() => {
            this.page = 1
            this.finishScroll = false
            this.list = []
        })
    }

    addToList(chunck) {
        runInAction(() => {
            this.list = [...this.list, ...chunck]
            this.page += 1
            this.isLoding = false
        })
    }

    setLoading(isLoding) {
        runInAction(() => {           
            this.isLoding = isLoding
        })
    }

    async getList(favorite, businessPointId) {
        // Если мы уже получили все акции
        if (this.finishScroll) return
        // если у нас 1 старница - то не нужно пказывать лоадер
        // и если страница 1 то нам не нужна задержка , иначе ставим задержку на 1 секунду         
        this.setLoading(true)
        let status = REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v1/offer/list', {
                params: {
                    page: this.page,
                    favorite: favorite ? favorite : undefined,
                    businessPointId: businessPointId ? businessPointId : undefined
                }
            })
            if (resp.data.length < COUNT_PER_ONE_REQUEST) {
                this.finishScroll = true
            }
            this.addToList(resp.data || [])
            this.setLoading(false)
        } catch (error) {
            this.setLoading(false)             
            console.error(error)
            status = REQUEST_STATUS.error
            // Sentry.Native.captureException(error, (scope) => {
            //     scope.setTransactionName('PromotionStore:getList');
            //     return scope;
            // });
        }
        return status
    }

    async addToFavorite(id, favorite) {
        let status =  REQUEST_STATUS.success
        try {
           await api.patch('/api/v1/offer/favorite', {id, favorite})
        } catch (error) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(error, (scope) => {
            //     scope.setTransactionName('PromotionStore:addToFavorite');
            //     return scope;
            // });
        }
        return status
    }
}

export default new PromotionStore()
