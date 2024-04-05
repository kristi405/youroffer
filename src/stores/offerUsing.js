import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
import * as Sentry from 'sentry-expo';

class OfferUsingStore {
    count = 1;

    constructor() {
        makeAutoObservable(this)
    }

    plus() {
        runInAction(() => {
            this.count += l
        })
    }

    minus() {
        runInAction(() => {
            if (this.count > 1)
            this.count -= l
        })
    }

    async useOffer(ids, id_user, id_waiter, count) {
        let status = REQUEST_STATUS.success
        try {
            const resp = await api.patch('api/v1/offer/using', {ids, id_user, id_waiter, count })
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            Sentry.Native.captureException(e, (scope) => {
                scope.setTransactionName('OfferUsingStore:useOffer');
                return scope;
            });
        }
        return [];
    }

    async useBonus(id_offer, id_user, id_waiter, count) {
        let status = REQUEST_STATUS.success
        try {
            const resp = await api.patch('api/v1/offer/using', {ids, id_user, id_waiter, count })
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            Sentry.Native.captureException(e, (scope) => {
                scope.setTransactionName('OfferUsingStore:useOffer');
                return scope;
            });
        }
        return [];
    }

    async getOfferById(offerId) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get(`/api/v1/offer/${offerId}`)
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e)
            Sentry.Native.captureException(e, (scope) => {
                scope.setTransactionName('OfferUsingStore:getOfferById');
                return scope;
            });
        }
    }
}

export default new OfferUsingStore()