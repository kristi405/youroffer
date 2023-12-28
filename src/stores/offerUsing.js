import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
import * as Sentry from 'sentry-expo';

class OfferUsingStore {
    constructor() {
        makeAutoObservable(this)
    }

    async useOffer(ids, id_user) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.patch('api/v1/offer/using', {ids, id_user})
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            Sentry.Native.captureException(error, (scope) => {
                scope.setTransactionName('OfferUsingStore:useOffer');
                return scope;
            });
        }
    }

    async getOfferById(offerId) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get(`/api/v1/offer/${offerId}`)
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e)
            Sentry.Native.captureException(error, (scope) => {
                scope.setTransactionName('OfferUsingStore:getOfferById');
                return scope;
            });
        }
    }
}

export default new OfferUsingStore()