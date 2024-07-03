import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'
// import * as Sentry from 'sentry-expo';

class ContactUsStore {
    constructor() {
        makeAutoObservable(this)
    }

    async sendMail(name, text, contact) {
        let status =  REQUEST_STATUS.success
        try {
            const resp = await api.post('api/v1/email/create', {
                name: name,
                text: text,
                contact: contact
            })
        } catch (e) {
            status =  REQUEST_STATUS.error
            console.log(e.message)
            // Sentry.Native.captureException(e, (scope) => {
            //     scope.setTransactionName('ContactUsStore:sendMail');
            //     return scope;
            // });
        }
        return status
    }
}

export default new ContactUsStore()