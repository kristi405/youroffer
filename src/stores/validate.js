import { makeAutoObservable } from 'mobx'
import { validate } from '../services/validate'

class ValidateStore {
  schema = {}

  constructor(schema) {
    this.schema = schema
    makeAutoObservable(this)
  }

  validate(data) {
    return validate(data, this.schema)
  }
}

export default ValidateStore