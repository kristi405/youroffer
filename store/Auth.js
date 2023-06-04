import { makeAutoObservable } from "mobx"
import { Login } from "../Networking/LoginService/logineService"
import { Code } from "../Networking/LoginService/logineService"

class AuthStore {
    phoneNumber = null
    user = null
    session = null

    constructor() {
        makeAutoObservable(this)
    }

    async getPin(number) {
       this.phoneNumber = number
       console.log(this.phoneNumber)
       const data = await Login(number)
       console.log('44444444', data)
    }

    async setPin(pin) {
       const data = await Code(this.phoneNumber, pin)
       console.log('5555555', data)
    }
}

export default new AuthStore()