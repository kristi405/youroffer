import { makeAutoObservable, runInAction } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
import { getLocation, distanceBetweenGeoPoints } from '../services/geo'
// import * as Sentry from 'sentry-expo';

// максимальное количесвто акций получаемых при одном запросе
const COUNT_PER_ONE_REQUEST = 10
class BusinessPointsStore {
    list = []
    page = 1
    // флаг указывающий что мы получили все акции
    finishScroll = false
    isLoading = false
    isFavorite = false
    searchSrting = ""

    constructor() {
        makeAutoObservable(this)
    }

    get all() {
        if (this.isFavorite && this.searchSrting) {
            return this.list?.filter(bp => bp.favorite && bp.name?.toLowerCase().includes(this.searchSrting)) || []
        }

        if (this.isFavorite) {
            return this.list?.filter(bp => bp.favorite) || []
        }

        if (this.searchSrting) {
            return this.list?.filter(bp => bp.name?.toLowerCase().includes(this.searchSrting?.toLowerCase())) || []
        }

        return this.list || []
    }

    setIsFavorite(isFavorite) {
        runInAction(() => {
            this.isFavorite = !!isFavorite
        })
    }

    favoriteList() {
        let favorite = this.all.filter(bp => bp.favorite) || []
        return favorite
    }

    setSearchString(searchSrting) {
        runInAction(() => {
            this.searchSrting = searchSrting
        })
    }

    setList(list) {
        runInAction(() => {
            this.list = list ? [...list] : []
            this.isLoading = false
        })
    }

    setIsLoading(isLoading) {
        runInAction(() => {
            this.isLoading = !!isLoading
        })
    }

    async getAll() {
        this.isLoading = true
        try {
            const resp = await api.get('/api/v1/business_point/all')
            let data = resp.data
            if (Array.isArray(data)) {
                data = await this.sortByDistance(resp.data)
            }
            this.setList(data)
        } catch (e) {
            console.error(e)
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('BusinessPointsStore:getAll');
            //     return scope;
            // });
        }
        setIsLoading(false)
    }

    async sortByDistance(businessPoints) {
        const userCoord = await getLocation()
        if (!userCoord?.latitude || !userCoord?.latitude) return businessPoints;
        businessPoints.forEach(bp => {
            if (bp.lng && bp.lat) {
                const dist = distanceBetweenGeoPoints(
                    {latitude: bp.lat, longitude: bp.lng},
                    userCoord
                )
                bp.dist = dist
            }
        });

        businessPoints.sort((a, b) => {
            if (a.dist > b.dist) return 1
            if (a.dist < b.dist) return -1
            return 0
        })

        return businessPoints
    }

    async addToFavorite(id, favorite) {
        let status =  REQUEST_STATUS.success
        try {
           api.patch('/api/v1/business_point/favorite', {id, favorite})
           this.list.forEach(item => {
                if (item.id === id) {
                    item.favorite = favorite
                }
           })
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('BusinessPointsStore:addToFavorite');
            //     return scope;
            // });
        }
        return status
    }
}

export default new BusinessPointsStore()