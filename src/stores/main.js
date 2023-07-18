import { makeAutoObservable } from 'mobx'

class MainStore {
    loading = false

    constructor() {
        makeAutoObservable(this)
    }

    loaderStart() {
        this.loading = true
    }

    loaderStop() {
        this.loading = false
    }
}

export default new MainStore()
