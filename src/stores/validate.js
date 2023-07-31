import { makeAutoObservable } from 'mobx'
import { validate, resetValidation, resetValidationByKey } from '../services/validate'

class ValidateStore {
  schema = {}

  constructor(schema) {
    this.schema = schema;
    makeAutoObservable(this)
  }

  validate(data) {
    return validate(data, this.schema)
  }

  resetValidation() {
    resetValidation(this.schema)

  }

  resetValidationByKey(key) {
    resetValidationByKey(this.schema, key)
  }
}

export default ValidateStore