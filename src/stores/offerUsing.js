import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
// import * as Sentry from 'sentry-expo';

class OfferUsingStore {
    constructor() {
        makeAutoObservable(this)
    }

    async useOffer({number_client, id_offer, id_waiter, count}) {
        let status = REQUEST_STATUS.success
        try {
            const resp = await api.patch('api/v2/offer/using', {number_client, id_offer, id_waiter, count})
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('OfferUsingStore:useOffer');
            //     return scope;
            // });
        }
        return [];
    }

    async useBonuses({id_offer, number_client, id_waiter, bonuses}) {
        let status = REQUEST_STATUS.success
        try {
            const resp = await api.patch('api/v2/offer/using_bonusess', {number_client, id_offer, id_waiter, bonuses })
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('OfferUsingStore:useOffer');
            //     return scope;
            // });
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
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('OfferUsingStore:getOfferById');
            //     return scope;
            // });
        }
    }

    async getOfferToScan({user_number, offer_number}) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.get('/api/v2/offer/offer_to_scan', {
                params: { user_number, offer_number }
            })
            return resp.data
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e)
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('OfferUsingStore:getOfferToScan');
            //     return scope;
            // });
        }
    }
}

export default new OfferUsingStore()