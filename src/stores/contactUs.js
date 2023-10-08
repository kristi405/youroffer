import { makeAutoObservable } from 'mobx'
import api from '../services/api'
import { REQUEST_STATUS } from '../services/constants'

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
        }
        return status
    }
}

export default new ContactUsStore()